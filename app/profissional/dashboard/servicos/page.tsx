"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Wrench,
} from "lucide-react";
import { ServiceCard } from "../components/service-card";
import { ServiceFilter } from "../components/service-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServicos } from "@/app/api/servicos";
import { Servico } from "@/types";
import { useServicosState, type SortOption } from "./hooks/use-servicos-state";
import { CATEGORIES } from "./constants/filter-config";

const SORT_LABELS: Record<SortOption, string> = {
  relevancia: "Relevância",
  "preco-asc": "Menor preço",
  "preco-desc": "Maior preço",
  distancia: "Mais próximo",
};

const CATEGORY_CARD_ICONS = Object.fromEntries(
  CATEGORIES.map(({ id, cardIcon }) => [id, cardIcon])
);

function toCardData(s: Servico) {
  return {
    ...s,
    icon: CATEGORY_CARD_ICONS[s.category] ?? <Wrench className="h-5 w-5 text-gray-500" />,
  };
}

export default function ServicosPage() {
  const { state, dispatch, hasActiveFilters, activeCount } = useServicosState();
  const { searchTerm, viewMode, filters, sortBy, showMobileFilters, showSortMenu } = state;

  const { data: servicos = [], isLoading } = useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
  });

  const filteredServices = useMemo(() => {
    let result = servicos.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q);

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(s.category);

      const matchesPrice =
        s.priceMax >= filters.priceMin && s.priceMin <= filters.priceMax;

      const matchesDistance = s.distanceValue <= filters.distanceMax;

      return matchesSearch && matchesCategory && matchesPrice && matchesDistance;
    });

    switch (sortBy) {
      case "preco-asc":
        result = [...result].sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "preco-desc":
        result = [...result].sort((a, b) => b.priceMax - a.priceMax);
        break;
      case "distancia":
        result = [...result].sort((a, b) => a.distanceValue - b.distanceValue);
        break;
    }

    return result;
  }, [searchTerm, filters, sortBy, servicos]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por serviço ou bairro..."
                className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:bg-white transition-all"
                value={searchTerm}
                onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
              />
              {searchTerm && (
                <button
                  onClick={() => dispatch({ type: "SET_SEARCH", payload: "" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: "TOGGLE_MOBILE_FILTERS" })}
                className="lg:hidden flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                    {activeCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => dispatch({ type: "TOGGLE_SORT_MENU" })}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span className="hidden sm:inline">{SORT_LABELS[sortBy]}</span>
                </button>
                {showSortMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => dispatch({ type: "CLOSE_SORT_MENU" })} />
                    <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => dispatch({ type: "SET_SORT", payload: key })}
                          className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors ${
                            sortBy === key ? "bg-gray-900 font-semibold text-white" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {SORT_LABELS[key]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-0.5 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "list" })}
                  className={`rounded-lg p-2 transition-all ${viewMode === "list" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                  title="Lista"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "grid" })}
                  className={`rounded-lg p-2 transition-all ${viewMode === "grid" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                  title="Grade"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <div className="hidden w-72 shrink-0 lg:block xl:w-80">
            <ServiceFilter
              filters={filters}
              onChange={(f) => dispatch({ type: "SET_FILTERS", payload: f })}
              onToggleCategory={(id) => dispatch({ type: "TOGGLE_CATEGORY", payload: id })}
              totalResults={filteredServices.length}
              hasActiveFilters={hasActiveFilters}
              activeCount={activeCount}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {isLoading
                    ? "Carregando..."
                    : filteredServices.length > 0
                      ? `${filteredServices.length} serviço${filteredServices.length !== 1 ? "s" : ""} disponíve${filteredServices.length !== 1 ? "is" : "l"}`
                      : "Nenhum resultado"}
                </h1>
                {searchTerm && (
                  <p className="mt-0.5 text-sm text-gray-500">
                    Resultados para &ldquo;<span className="font-medium text-gray-700">{searchTerm}</span>&rdquo;
                  </p>
                )}
              </div>
              {(hasActiveFilters || searchTerm) && (
                <button
                  onClick={() => dispatch({ type: "CLEAR_ALL" })}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Limpar tudo
                </button>
              )}
            </div>

            {filters.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.categories.map((cat) => (
                  <span key={cat} className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                    {cat}
                    <button onClick={() => dispatch({ type: "REMOVE_CATEGORY", payload: cat })}>
                      <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-24 text-sm text-gray-400">
                Carregando serviços...
              </div>
            ) : filteredServices.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} {...toCardData(service)} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-800">Nenhum serviço encontrado</p>
                <p className="mt-1.5 text-sm text-gray-500 max-w-xs">
                  Tente buscar por outro nome de serviço ou bairro, ou ajuste os filtros.
                </p>
                <Button
                  onClick={() => dispatch({ type: "CLEAR_ALL" })}
                  className="mt-6 bg-gray-900 px-6 text-sm font-semibold text-white hover:bg-gray-800 shadow-sm"
                >
                  Limpar todos os filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => dispatch({ type: "TOGGLE_MOBILE_FILTERS" })}
          />
          <div className="fixed bottom-0 left-0 right-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl lg:hidden">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <span className="text-base font-bold text-gray-900">Filtros</span>
              <button
                onClick={() => dispatch({ type: "TOGGLE_MOBILE_FILTERS" })}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 pb-8">
              <ServiceFilter
                filters={filters}
                onChange={(f) => dispatch({ type: "SET_FILTERS", payload: f })}
                onToggleCategory={(id) => dispatch({ type: "TOGGLE_CATEGORY", payload: id })}
                totalResults={filteredServices.length}
                hasActiveFilters={hasActiveFilters}
                activeCount={activeCount}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

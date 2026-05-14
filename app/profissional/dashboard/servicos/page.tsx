"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Zap,
  Paintbrush,
  Hammer,
  Eraser,
  Wrench,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ArrowUpDown,
} from "lucide-react";
import { ServiceCard, type ServiceCardData } from "../components/service-card";
import { ServiceFilter, type FilterState, DEFAULT_FILTERS } from "../components/service-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const MOCK_SERVICES: ServiceCardData[] = [
  {
    id: 1,
    title: "Instalação de Tomadas e Disjuntor",
    category: "ELÉTRICA",
    type: "RESIDENCIAL",
    location: "Aldeota",
    distance: "2.3 km",
    distanceValue: 2.3,
    priceRange: "R$ 150 – 200",
    priceMin: 150,
    priceMax: 200,
    timeAgo: "45 min atrás",
    isNew: true,
    highlighted: true,
    rating: 4.9,
    reviewCount: 218,
    description: "Instalação completa de tomadas, disjuntores e aterramento elétrico com segurança e garantia.",
    photos: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Zap className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 2,
    title: "Pintura de Quarto com Textura Grafiato",
    category: "PINTURA",
    type: "REFORMA",
    location: "Meireles",
    distance: "1.1 km",
    distanceValue: 1.1,
    priceRange: "R$ 300 – 450",
    priceMin: 300,
    priceMax: 450,
    timeAgo: "2h atrás",
    isNew: false,
    highlighted: false,
    rating: 4.7,
    reviewCount: 134,
    description: "Pintura profissional com acabamento em grafiato ou massa corrida, todas as cores disponíveis.",
    photos: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Paintbrush className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 3,
    title: "Montagem de Guarda-Roupa Modulado",
    category: "CARPINTARIA",
    type: "MONTAGEM",
    location: "Varjota",
    distance: "3.5 km",
    distanceValue: 3.5,
    priceRange: "R$ 100 – 150",
    priceMin: 100,
    priceMax: 150,
    timeAgo: "3h atrás",
    isNew: false,
    highlighted: false,
    rating: 4.6,
    reviewCount: 87,
    description: "Montagem e desmontagem de móveis modulados de qualquer marca, com ferramentas profissionais.",
    photos: [
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Hammer className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 4,
    title: "Limpeza Pesada Pós-Obra",
    category: "LIMPEZA",
    type: "PESADA",
    location: "Centro",
    distance: "5.0 km",
    distanceValue: 5.0,
    priceRange: "R$ 200 – 350",
    priceMin: 200,
    priceMax: 350,
    timeAgo: "1 dia atrás",
    isNew: false,
    highlighted: false,
    rating: 4.8,
    reviewCount: 302,
    description: "Limpeza completa após reformas e construções, remoção de cimento, tinta e entulho.",
    photos: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Eraser className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 5,
    title: "Conserto de Vazamento na Pia",
    category: "HIDRÁULICA",
    type: "URGENTE",
    location: "Papicu",
    distance: "4.2 km",
    distanceValue: 4.2,
    priceRange: "R$ 80 – 130",
    priceMin: 80,
    priceMax: 130,
    timeAgo: "2 dias atrás",
    isNew: false,
    highlighted: false,
    rating: 4.5,
    reviewCount: 56,
    description: "Reparo urgente de vazamentos em pias, torneiras, registros e canos embutidos.",
    photos: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Wrench className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 6,
    title: "Instalação de Ar Condicionado Split",
    category: "ELÉTRICA",
    type: "COMERCIAL",
    location: "Cocó",
    distance: "2.8 km",
    distanceValue: 2.8,
    priceRange: "R$ 250 – 400",
    priceMin: 250,
    priceMax: 400,
    timeAgo: "5h atrás",
    isNew: true,
    highlighted: false,
    rating: 4.9,
    reviewCount: 411,
    description: "Instalação e manutenção de ar condicionado split de qualquer capacidade e marca.",
    photos: [
      "https://images.unsplash.com/photo-1631545806609-5e3c01e50451?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Zap className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 7,
    title: "Limpeza Residencial Semanal",
    category: "LIMPEZA",
    type: "RESIDENCIAL",
    location: "Aldeota",
    distance: "1.9 km",
    distanceValue: 1.9,
    priceRange: "R$ 80 – 120",
    priceMin: 80,
    priceMax: 120,
    timeAgo: "1h atrás",
    isNew: false,
    highlighted: false,
    rating: 4.7,
    reviewCount: 189,
    description: "Limpeza completa de casas e apartamentos com produtos de qualidade e equipe treinada.",
    photos: [
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Eraser className="h-5 w-5 text-gray-500" />,
  },
  {
    id: 8,
    title: "Troca de Revestimento de Banheiro",
    category: "REFORMA",
    type: "RESIDENCIAL",
    location: "Meireles",
    distance: "0.8 km",
    distanceValue: 0.8,
    priceRange: "R$ 500 – 900",
    priceMin: 500,
    priceMax: 900,
    timeAgo: "3 dias atrás",
    isNew: false,
    highlighted: false,
    rating: 4.8,
    reviewCount: 73,
    description: "Remoção de azulejos antigos e aplicação de novos revestimentos cerâmicos ou porcelanato.",
    photos: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800&h=600",
    ],
    icon: <Hammer className="h-5 w-5 text-gray-500" />,
  },
];

type SortOption = "relevancia" | "preco-asc" | "preco-desc" | "distancia";

const SORT_LABELS: Record<SortOption, string> = {
  relevancia: "Relevância",
  "preco-asc": "Menor preço",
  "preco-desc": "Maior preço",
  distancia: "Mais próximo",
};

// ─── PAGE COMPONENT ──────────────────────────────────────────────────────────
export default function ServicosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // ─── FILTERING + SORTING ──────────────────────────────────────
  const filteredServices = useMemo(() => {
    let result = MOCK_SERVICES.filter((s) => {
      // Search: title OR location (bairro)
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q);

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(s.category);

      // Type filter
      const matchesType =
        filters.types.length === 0 || filters.types.includes(s.type);

      // Price filter
      const matchesPrice =
        (s.priceMax ?? 0) >= filters.priceMin && (s.priceMin ?? 0) <= filters.priceMax;

      // Distance filter
      const matchesDistance = (s.distanceValue ?? 0) <= filters.distanceMax;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesPrice &&
        matchesDistance
      );
    });

    // Sort
    switch (sortBy) {
      case "preco-asc":
        result = [...result].sort((a, b) => (a.priceMin ?? 0) - (b.priceMin ?? 0));
        break;
      case "preco-desc":
        result = [...result].sort((a, b) => (b.priceMax ?? 0) - (a.priceMax ?? 0));
        break;
      case "distancia":
        result = [...result].sort((a, b) => (a.distanceValue ?? 0) - (b.distanceValue ?? 0));
        break;
    }

    return result;
  }, [searchTerm, filters, sortBy]);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.types.length > 0 ||
    filters.priceMax < 9999 ||
    filters.distanceMax < 99;

  const clearAll = () => {
    setSearchTerm("");
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── TOP HEADER ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* Search bar */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por serviço ou bairro..."
                className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-4 text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:bg-white transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                    {filters.categories.length +
                      filters.types.length +
                      (filters.priceMax < 9999 ? 1 : 0) +
                      (filters.distanceMax < 99 ? 1 : 0)}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span className="hidden sm:inline">{SORT_LABELS[sortBy]}</span>
                </button>
                {showSortMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortMenu(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSortBy(key);
                            setShowSortMenu(false);
                          }}
                          className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors ${
                            sortBy === key
                              ? "bg-gray-900 font-semibold text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {SORT_LABELS[key]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center gap-0.5 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-2 transition-all ${
                    viewMode === "list"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  title="Lista"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-2 transition-all ${
                    viewMode === "grid"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  title="Grade"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ───────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Sidebar — desktop only */}
          <div className="hidden w-72 shrink-0 lg:block xl:w-80">
            <ServiceFilter
              filters={filters}
              onChange={setFilters}
              totalResults={filteredServices.length}
            />
          </div>

          {/* Results column */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {filteredServices.length > 0
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
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Limpar tudo
                </button>
              )}
            </div>

            {/* Active filter pills */}
            {(filters.categories.length > 0 || filters.types.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white"
                  >
                    {cat}
                    <button
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          categories: f.categories.filter((c) => c !== cat),
                        }))
                      }
                    >
                      <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                    </button>
                  </span>
                ))}
                {filters.types.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-white"
                  >
                    {t}
                    <button
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          types: f.types.filter((x) => x !== t),
                        }))
                      }
                    >
                      <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Cards grid / list */}
            {filteredServices.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    {...service}
                    viewMode={viewMode}
                  />
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
                  onClick={clearAll}
                  className="mt-6 bg-gray-900 px-6 text-sm font-semibold text-white hover:bg-gray-800 shadow-sm"
                >
                  Limpar todos os filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── MOBILE FILTERS DRAWER ──────────────────────────── */}
      {showMobileFilters && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl lg:hidden">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <span className="text-base font-bold text-gray-900">Filtros</span>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 pb-8">
              <ServiceFilter
                filters={filters}
                onChange={(f) => {
                  setFilters(f);
                }}
                totalResults={filteredServices.length}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

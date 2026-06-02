"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FilterState,
  DEFAULT_FILTERS,
  CATEGORIES,
  PRICE_MIN_LIMIT,
  PRICE_MAX_LIMIT,
  DISTANCE_MAX_LIMIT,
} from "../servicos/constants/filter-config";

export type { FilterState };

interface ServiceFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onToggleCategory: (categoryId: string) => void;
  totalResults: number;
  hasActiveFilters: boolean;
  activeCount: number;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 pb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-1 text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-gray-900 transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function ServiceFilter({
  filters,
  onChange,
  onToggleCategory,
  totalResults,
  hasActiveFilters,
  activeCount,
}: ServiceFilterProps) {
  const priceMinPct = ((filters.priceMin - PRICE_MIN_LIMIT) / (PRICE_MAX_LIMIT - PRICE_MIN_LIMIT)) * 100;
  const priceMaxPct = ((filters.priceMax - PRICE_MIN_LIMIT) / (PRICE_MAX_LIMIT - PRICE_MIN_LIMIT)) * 100;
  const distPct = (filters.distanceMax / DISTANCE_MAX_LIMIT) * 100;

  return (
    <aside className="sticky top-19.25 flex flex-col max-h-[calc(100vh-100px)] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-bold text-gray-800">Filtros</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ ...DEFAULT_FILTERS })}
            className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="h-3 w-3" />
            Limpar
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 p-5 overflow-y-auto flex-1">
        <Section title="Categoria">
          <div className="flex flex-col gap-1.5">
            {CATEGORIES.map(({ id, label, icon: Icon, color }) => {
              const active = filters.categories.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => onToggleCategory(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active ? "bg-gray-900 text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      active ? "bg-white/20" : color
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-white" : ""}`} />
                  </span>
                  {label}
                  {active && <X className="ml-auto h-3.5 w-3.5 opacity-60" />}
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Faixa de Preço">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                R$ {filters.priceMin}
              </span>
              <span className="text-xs text-gray-400">até</span>
              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                {filters.priceMax >= PRICE_MAX_LIMIT ? `R$ ${PRICE_MAX_LIMIT}+` : `R$ ${filters.priceMax}`}
              </span>
            </div>

            <div className="relative h-5 w-full">
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-900"
                style={{ left: `${priceMinPct}%`, right: `${100 - priceMaxPct}%` }}
              />
              <input
                type="range"
                min={PRICE_MIN_LIMIT}
                max={PRICE_MAX_LIMIT}
                step={50}
                value={filters.priceMin}
                onChange={(e) =>
                  onChange({ ...filters, priceMin: Math.min(Number(e.target.value), filters.priceMax - 50) })
                }
                className="range-thumb absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
              />
              <input
                type="range"
                min={PRICE_MIN_LIMIT}
                max={PRICE_MAX_LIMIT}
                step={50}
                value={filters.priceMax}
                onChange={(e) =>
                  onChange({ ...filters, priceMax: Math.max(Number(e.target.value), filters.priceMin + 50) })
                }
                className="range-thumb absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
              />
            </div>

            <div className="flex justify-between text-[10px] text-gray-400">
              <span>R$ {PRICE_MIN_LIMIT}</span>
              <span>R$ {PRICE_MAX_LIMIT}+</span>
            </div>
          </div>
        </Section>

        <Section title="Distância">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Raio máximo</span>
              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                {filters.distanceMax >= DISTANCE_MAX_LIMIT
                  ? `${DISTANCE_MAX_LIMIT}+ km`
                  : `${filters.distanceMax} km`}
              </span>
            </div>

            <div className="relative h-5 w-full">
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />
              <div
                className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full bg-gray-900"
                style={{ width: `${distPct}%` }}
              />
              <input
                type="range"
                min={1}
                max={DISTANCE_MAX_LIMIT}
                step={0.5}
                value={filters.distanceMax}
                onChange={(e) => onChange({ ...filters, distanceMax: Number(e.target.value) })}
                className="range-thumb absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
              />
            </div>

            <div className="flex justify-between text-[10px] text-gray-400">
              <span>1 km</span>
              <span>{DISTANCE_MAX_LIMIT}+ km</span>
            </div>
          </div>
        </Section>
      </div>

      <div className="border-t border-gray-100 p-4">
        <Button className="w-full bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 shadow-sm">
          {totalResults} serviço{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
        </Button>
      </div>
    </aside>
  );
}

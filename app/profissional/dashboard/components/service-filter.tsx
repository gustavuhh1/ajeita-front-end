"use client";

import { useState } from "react";
import {
  Zap,
  Paintbrush,
  Hammer,
  Eraser,
  Wrench,
  Home,
  Leaf,
  Wind,
  Truck,
  Shield,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FilterState {
  categories: string[];
  priceMin: number;
  priceMax: number;
  distanceMax: number;
  types: string[];
}

interface ServiceFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
}

const CATEGORY_OPTIONS = [
  { id: "ELÉTRICA", label: "Eletricidade", icon: Zap, color: "text-yellow-500 bg-yellow-50" },
  { id: "PINTURA", label: "Pintura", icon: Paintbrush, color: "text-blue-500 bg-blue-50" },
  { id: "CARPINTARIA", label: "Carpintaria", icon: Hammer, color: "text-orange-500 bg-orange-50" },
  { id: "LIMPEZA", label: "Limpeza", icon: Eraser, color: "text-green-500 bg-green-50" },
  { id: "HIDRÁULICA", label: "Hidráulica", icon: Wrench, color: "text-cyan-500 bg-cyan-50" },
  { id: "REFORMA", label: "Reforma Geral", icon: Home, color: "text-purple-500 bg-purple-50" },
  { id: "JARDINAGEM", label: "Jardinagem", icon: Leaf, color: "text-lime-500 bg-lime-50" },
  { id: "AR CONDICIONADO", label: "Ar Condicionado", icon: Wind, color: "text-sky-500 bg-sky-50" },
  { id: "MUDANÇA", label: "Mudança", icon: Truck, color: "text-rose-500 bg-rose-50" },
  { id: "SEGURANÇA", label: "Segurança", icon: Shield, color: "text-indigo-500 bg-indigo-50" },
];

const TYPE_OPTIONS = [
  { id: "URGENTE", label: "Urgente" },
  { id: "RESIDENCIAL", label: "Residencial" },
  { id: "COMERCIAL", label: "Comercial" },
  { id: "REFORMA", label: "Reforma" },
  { id: "MONTAGEM", label: "Montagem" },
  { id: "PESADA", label: "Pesada" },
];

const PRICE_PRESETS = [
  { label: "Até R$ 100", min: 0, max: 100 },
  { label: "R$ 100 – 200", min: 100, max: 200 },
  { label: "R$ 200 – 400", min: 200, max: 400 },
  { label: "Acima de R$ 400", min: 400, max: 9999 },
];

const DISTANCE_PRESETS = [
  { label: "Até 1 km", max: 1 },
  { label: "Até 3 km", max: 3 },
  { label: "Até 5 km", max: 5 },
  { label: "Qualquer", max: 99 },
];

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: 0,
  priceMax: 9999,
  distanceMax: 99,
  types: [],
};

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

export function ServiceFilter({ filters, onChange, totalResults }: ServiceFilterProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.types.length > 0 ||
    filters.priceMax < 9999 ||
    filters.distanceMax < 99;

  const toggleCategory = (id: string) => {
    const updated = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories: updated });
  };

  const toggleType = (id: string) => {
    const updated = filters.types.includes(id)
      ? filters.types.filter((t) => t !== id)
      : [...filters.types, id];
    onChange({ ...filters, types: updated });
  };

  const setPrice = (min: number, max: number) => {
    onChange({ ...filters, priceMin: min, priceMax: max });
  };

  const setDistance = (max: number) => {
    onChange({ ...filters, distanceMax: max });
  };

  const reset = () => onChange({ ...DEFAULT_FILTERS });

  return (
    <aside className="sticky top-6 flex h-fit flex-col gap-0 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-bold text-gray-800">Filtros</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
              {filters.categories.length +
                filters.types.length +
                (filters.priceMax < 9999 ? 1 : 0) +
                (filters.distanceMax < 99 ? 1 : 0)}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="h-3 w-3" />
            Limpar
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* Categoria */}
        <Section title="Categoria">
          <div className="flex flex-col gap-1.5">
            {CATEGORY_OPTIONS.map(({ id, label, icon: Icon, color }) => {
              const active = filters.categories.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleCategory(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
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

        {/* Faixa de Preço */}
        <Section title="Faixa de Preço">
          <div className="flex flex-col gap-1.5">
            {PRICE_PRESETS.map(({ label, min, max }) => {
              const active = filters.priceMin === min && filters.priceMax === max;
              return (
                <button
                  key={label}
                  onClick={() => setPrice(min, max)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                  {active && <X className="h-3.5 w-3.5 opacity-60" />}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Distância */}
        <Section title="Distância">
          <div className="flex flex-col gap-1.5">
            {DISTANCE_PRESETS.map(({ label, max }) => {
              const active = filters.distanceMax === max;
              return (
                <button
                  key={label}
                  onClick={() => setDistance(max)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                  {active && <X className="h-3.5 w-3.5 opacity-60" />}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Tipo */}
        <Section title="Tipo de Serviço" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {TYPE_OPTIONS.map(({ id, label }) => {
              const active = filters.types.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleType(id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <Button className="w-full bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 shadow-sm">
          {totalResults} serviço{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
        </Button>
      </div>
    </aside>
  );
}

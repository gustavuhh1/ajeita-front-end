import React from "react";
import { Zap, Paintbrush, Hammer, Eraser, Wrench, Home, Leaf, Wind, Truck, Shield } from "lucide-react";

export const PRICE_MIN_LIMIT = 0;
export const PRICE_MAX_LIMIT = 1000;
export const DISTANCE_MAX_LIMIT = 20;

export interface FilterState {
  categories: string[];
  priceMin: number;
  priceMax: number;
  distanceMax: number;
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: PRICE_MIN_LIMIT,
  priceMax: PRICE_MAX_LIMIT,
  distanceMax: DISTANCE_MAX_LIMIT,
};

export const CATEGORIES = [
  { id: "ELÉTRICA",       label: "Eletricidade",   icon: Zap,       cardIcon: <Zap className="h-5 w-5 text-gray-500" />,       color: "text-yellow-500 bg-yellow-50" },
  { id: "PINTURA",        label: "Pintura",         icon: Paintbrush, cardIcon: <Paintbrush className="h-5 w-5 text-gray-500" />, color: "text-blue-500 bg-blue-50" },
  { id: "CARPINTARIA",    label: "Carpintaria",     icon: Hammer,    cardIcon: <Hammer className="h-5 w-5 text-gray-500" />,    color: "text-orange-500 bg-orange-50" },
  { id: "LIMPEZA",        label: "Limpeza",         icon: Eraser,    cardIcon: <Eraser className="h-5 w-5 text-gray-500" />,    color: "text-green-500 bg-green-50" },
  { id: "HIDRÁULICA",     label: "Hidráulica",      icon: Wrench,    cardIcon: <Wrench className="h-5 w-5 text-gray-500" />,    color: "text-cyan-500 bg-cyan-50" },
  { id: "REFORMA",        label: "Reforma Geral",   icon: Home,      cardIcon: <Hammer className="h-5 w-5 text-gray-500" />,    color: "text-purple-500 bg-purple-50" },
  { id: "JARDINAGEM",     label: "Jardinagem",      icon: Leaf,      cardIcon: <Leaf className="h-5 w-5 text-gray-500" />,      color: "text-lime-500 bg-lime-50" },
  { id: "AR CONDICIONADO",label: "Ar Condicionado", icon: Wind,      cardIcon: <Wind className="h-5 w-5 text-gray-500" />,      color: "text-sky-500 bg-sky-50" },
  { id: "MUDANÇA",        label: "Mudança",         icon: Truck,     cardIcon: <Truck className="h-5 w-5 text-gray-500" />,     color: "text-rose-500 bg-rose-50" },
  { id: "SEGURANÇA",      label: "Segurança",       icon: Shield,    cardIcon: <Shield className="h-5 w-5 text-gray-500" />,    color: "text-indigo-500 bg-indigo-50" },
];

export function computeActiveFilters(filters: FilterState) {
  const hasActive =
    filters.categories.length > 0 ||
    filters.priceMin > PRICE_MIN_LIMIT ||
    filters.priceMax < PRICE_MAX_LIMIT ||
    filters.distanceMax < DISTANCE_MAX_LIMIT;

  const count =
    filters.categories.length +
    (filters.priceMin > PRICE_MIN_LIMIT || filters.priceMax < PRICE_MAX_LIMIT ? 1 : 0) +
    (filters.distanceMax < DISTANCE_MAX_LIMIT ? 1 : 0);

  return { hasActive, count };
}

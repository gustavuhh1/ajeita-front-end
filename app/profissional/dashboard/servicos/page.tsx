"use client";

import { useState } from "react";
import { Search, Zap, Paintbrush, Hammer, Eraser, Wrench, LayoutGrid, List } from "lucide-react";
import { ServiceCard } from "../components/service-card";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  "Todos",
  "Eletricidade",
  "Pintura",
  "Carpintaria",
  "Limpeza",
  "Hidráulica",
  "Geral"
];

const MOCK_SERVICES = [
  {
    id: 1,
    title: "Instalação de Tomadas e Disjuntor",
    category: "ELÉTRICA",
    type: "RESIDENCIAL",
    location: "Aldeota",
    distance: "2.3 km",
    priceRange: "R$ 150 - 200",
    timeAgo: "45 min atrás",
    isNew: true,
    highlighted: true,
    photos: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600&h=400"],
    icon: <Zap className="h-5 w-5 text-gray-500" />
  },
  {
    id: 2,
    title: "Pintura de Parede (Quarto)",
    category: "PINTURA",
    type: "REFORMA",
    location: "Meireles",
    distance: "1.1 km",
    priceRange: "R$ 300 - 450",
    timeAgo: "2h atrás",
    isNew: false,
    highlighted: false,
    photos: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600&h=400"],
    icon: <Paintbrush className="h-5 w-5 text-gray-500" />
  },
  {
    id: 3,
    title: "Montagem de Guarda-Roupa",
    category: "CARPINTARIA",
    type: "MONTAGEM",
    location: "Varjota",
    distance: "3.5 km",
    priceRange: "R$ 100 - 150",
    timeAgo: "3h atrás",
    isNew: false,
    highlighted: false,
    photos: ["https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=600&h=400"],
    icon: <Hammer className="h-5 w-5 text-gray-500" />
  },
  {
    id: 4,
    title: "Limpeza Pós-Obra",
    category: "LIMPEZA",
    type: "PESADA",
    location: "Centro",
    distance: "5.0 km",
    priceRange: "R$ 200 - 300",
    timeAgo: "1 dia atrás",
    isNew: false,
    highlighted: false,
    photos: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600&h=400"],
    icon: <Eraser className="h-5 w-5 text-gray-500" />
  },
  {
    id: 5,
    title: "Conserto de Vazamento na Pia",
    category: "HIDRÁULICA",
    type: "URGENTE",
    location: "Papicu",
    distance: "4.2 km",
    priceRange: "R$ 80 - 120",
    timeAgo: "2 dias atrás",
    isNew: false,
    highlighted: false,
    photos: [],
    icon: <Wrench className="h-5 w-5 text-gray-500" />
  }
];

export default function ServicosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || service.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-350 space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buscar Serviços</h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Encontre oportunidades de trabalho próximas a você.
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="space-y-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input 
              type="text"
              placeholder="Ex: Instalação de tomada, Pintura..."
              className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-yellow-400 text-base h-12 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Toggle View Mode (Hidden on very small screens) */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg bg-gray-100 p-1 mb-2 border border-gray-200">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-2 transition-colors ${
                  viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Visualização em Lista"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-2 transition-colors ${
                  viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
                title="Visualização em Grade"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Resultados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              {filteredServices.length} serviços encontrados
            </h2>
          </div>
          
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
              : "grid grid-cols-1 gap-6 xl:grid-cols-2"
          }>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  category={service.category}
                  type={service.type}
                  location={service.location}
                  distance={service.distance}
                  priceRange={service.priceRange}
                  timeAgo={service.timeAgo}
                  isNew={service.isNew}
                  highlighted={service.highlighted}
                  photos={service.photos}
                  icon={service.icon}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
                <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900">Nenhum serviço encontrado</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">Tente buscar por termos diferentes ou mudar a categoria.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("Todos"); }}
                  className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

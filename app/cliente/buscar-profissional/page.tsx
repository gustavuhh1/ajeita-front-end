"use client";

import React, { useMemo, useState } from "react";

import {
  ChevronDown,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Header from "@/app/cliente/components/header";
import { ProviderList } from "../components/ProviderList";

import { Provider } from "@/types";

const ALL_PROFESSIONALS: Provider[] = [
  {
    id: 1,
    name: "João Silva",
    role: "Eletricista Residencial",
    rating: 4.8,
    reviews: 124,
    price: 80,
    unit: "hora",
    tags: ["Instalação", "Reparos", "Fiação"],
    category: "Eletricista",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    role: "Pintura e Acabamentos",
    rating: 5.0,
    reviews: 89,
    price: 150,
    unit: "dia",
    tags: ["Pintura Interna", "Textura"],
    category: "Pintura",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    role: "Encanador Especialista",
    rating: 4.5,
    reviews: 210,
    price: 100,
    unit: "visita",
    tags: ["Vazamentos", "Tubulação", "Esgoto"],
    category: "Encanamento",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Pedro Santos",
    role: "Marido de Aluguel",
    rating: 4.9,
    reviews: 56,
    price: 60,
    unit: "hora",
    tags: ["Montagem", "Pequenos Reparos"],
    category: "Reformas",
    image:
      "https://images.unsplash.com/photo-1624561172888-ac9336965e05?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Ana Costa",
    role: "Limpeza Profissional",
    rating: 5.0,
    reviews: 340,
    price: 180,
    unit: "dia",
    tags: ["Faxina", "Pós-obra", "Escritório"],
    category: "Limpeza",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Fernanda Lima",
    role: "Paisagista",
    rating: 3.9,
    reviews: 45,
    price: 120,
    unit: "visita",
    tags: ["Jardinagem", "Projetos"],
    category: "Jardinagem",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Ricardo Alves",
    role: "Técnico em Ar Condicionado",
    rating: 4.7,
    reviews: 72,
    price: 130,
    unit: "visita",
    tags: ["Manutenção", "Limpeza", "Instalação"],
    category: "Eletricista",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Beatriz Souza",
    role: "Organizadora de Ambientes",
    rating: 4.9,
    reviews: 112,
    price: 90,
    unit: "hora",
    tags: ["Organização", "Closet", "Home Office"],
    category: "Limpeza",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Lucas Ferreira",
    role: "Marceneiro",
    rating: 4.6,
    reviews: 67,
    price: 200,
    unit: "dia",
    tags: ["Móveis Planejados", "Reparos"],
    category: "Reformas",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    name: "Mariana Rocha",
    role: "Pintora Profissional",
    rating: 4.8,
    reviews: 94,
    price: 140,
    unit: "dia",
    tags: ["Pintura", "Acabamento"],
    category: "Pintura",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Roberto Dias",
    role: "Encanador Industrial",
    rating: 4.9,
    reviews: 32,
    price: 200,
    unit: "visita",
    tags: ["Tubulação", "Manutenção"],
    category: "Encanamento",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Júlio César",
    role: "Jardineiro",
    rating: 4.7,
    reviews: 88,
    price: 70,
    unit: "dia",
    tags: ["Poda", "Manutenção"],
    category: "Jardinagem",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&h=400&fit=crop",
  },
];

export default function ProfessionalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Todas as categorias");

  const [minRating, setMinRating] = useState(0);

  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });

  const filteredProfessionals = useMemo(() => {
    return ALL_PROFESSIONALS.filter((pro) => {
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        pro.name.toLowerCase().includes(searchLower) ||
        pro.role.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === "Todas as categorias" ||
        pro.category === selectedCategory;

      const matchesRating =
        (pro.rating ?? 0) >= minRating;

      const minP =
        priceRange.min === ""
          ? 0
          : Number(priceRange.min);

      const maxP =
        priceRange.max === ""
          ? Infinity
          : Number(priceRange.max);

      const matchesPrice =
        pro.price >= minP &&
        pro.price <= maxP;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesPrice
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    minRating,
    priceRange,
  ]);

  const handleClearFilters = () => {
    setSelectedCategory("Todas as categorias");
    setMinRating(0);
    setSearchQuery("");

    setPriceRange({
      min: "",
      max: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:px-10 lg:py-10">
        <aside className="w-full shrink-0 lg:w-[290px]">
          <div className="sticky top-24 rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-yellow-100 p-2 text-yellow-600">
                  <SlidersHorizontal size={18} />
                </div>

                <h2 className="text-lg font-black text-gray-950">
                  Filtros
                </h2>
              </div>

              <button
                onClick={handleClearFilters}
                className="text-xs font-black uppercase tracking-widest text-yellow-500 transition-colors hover:text-yellow-600"
              >
                Limpar
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Categoria
                </label>

                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Todas as categorias
                    </option>

                    <option>
                      Eletricista
                    </option>

                    <option>
                      Pintura
                    </option>

                    <option>
                      Encanamento
                    </option>

                    <option>
                      Limpeza
                    </option>

                    <option>
                      Reformas
                    </option>

                    <option>
                      Jardinagem
                    </option>
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-4 block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Avaliação mínima
                </label>

                <div className="space-y-3">
                  {[4.5, 4.0].map((rating) => (
                    <label
                      key={rating}
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition-all hover:border-yellow-100 hover:bg-yellow-50"
                    >
                      <input
                        type="radio"
                        name="rating"
                        className="h-5 w-5 cursor-pointer accent-yellow-400"
                        checked={
                          minRating === rating
                        }
                        onChange={() =>
                          setMinRating(rating)
                        }
                      />

                      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors group-hover:text-gray-900">
                        <span className="text-yellow-500">
                          ★
                        </span>

                        {rating} ou mais
                      </span>
                    </label>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setMinRating(0)
                    }
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all ${
                      minRating === 0
                        ? "bg-yellow-50 text-yellow-700"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Todas avaliações
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Faixa de preço
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: e.target.value,
                      })
                    }
                  />

                  <span className="text-gray-300">
                    —
                  </span>

                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 space-y-8">
          <div className="group relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-yellow-500"
              size={20}
            />

            <input
              type="text"
              placeholder="Buscar profissional ou serviço..."
              className="w-full rounded-[24px] border border-gray-100 bg-white py-5 pl-14 pr-5 text-sm font-medium shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
            />
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-yellow-100 bg-yellow-50/80 p-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-black text-gray-950">
                Não encontrou o que precisava?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Crie um pedido personalizado e receba propostas de
                profissionais qualificados em poucos minutos.
              </p>
            </div>

            <button className="flex shrink-0 items-center gap-2 rounded-2xl bg-gray-950 px-7 py-4 text-sm font-black text-white shadow-lg transition-all hover:opacity-90 active:scale-95">
              <Plus size={18} />
              Criar pedido
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-gray-950">
                {filteredProfessionals.length} profissionais
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Os melhores avaliados da sua região
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-5 py-3 text-sm font-black text-gray-600 shadow-sm transition-all hover:bg-gray-50">
              Relevância
              <ChevronDown size={16} />
            </button>
          </div>

          <ProviderList
            providers={filteredProfessionals}
            viewMode="grid"
          />

          {filteredProfessionals.length === 0 && (
            <div className="rounded-[32px] border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Search
                  size={28}
                  className="text-gray-400"
                />
              </div>

              <h3 className="text-xl font-black text-gray-900">
                Nenhum profissional encontrado
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Tente ajustar os filtros ou realizar outra busca.
              </p>

              <button
                onClick={handleClearFilters}
                className="mt-6 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 transition-all hover:bg-yellow-500"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 sm:flex-row sm:text-left">
          <p>
            © 2026 Ajeitai - Todos os direitos reservados.
          </p>

          <div className="flex gap-8">
            <a
              href="#"
              className="transition-colors hover:text-gray-700"
            >
              Termos
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-700"
            >
              Privacidade
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-700"
            >
              Ajuda
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Star, ChevronDown, Search } from 'lucide-react';

// Importações dos componentes (ajuste os caminhos se sua estrutura mudar)
import { MainHeader } from '../components/MainHeader';
import { ProviderList } from '../components/ProviderList';
import { Provider } from '@/types';

// Mock de dados 100% alinhado com a interface Provider atualizada
const ALL_PROFESSIONALS: Provider[] = [
  { id: 1, name: "João Silva", role: "Eletricista Residencial", rating: 4.8, reviews: 124, price: 80, unit: "hora", tags: ["Instalação", "Reparos", "Fiação"], category: "Eletricista", image: null },
  { id: 2, name: "Maria Oliveira", role: "Pintura e Acabamentos", rating: 5.0, reviews: 89, price: 150, unit: "dia", tags: ["Pintura Interna", "Textura"], category: "Pintura", image: null },
  { id: 3, name: "Carlos Mendes", role: "Encanador Especialista", rating: 4.5, reviews: 210, price: 100, unit: "visita", tags: ["Vazamentos", "Tubulação", "Esgoto"], category: "Encanamento", image: null },
  { id: 4, name: "Pedro Santos", role: "Marido de Aluguel", rating: 4.9, reviews: 56, price: 60, unit: "hora", tags: ["Montagem", "Pequenos Reparos"], category: "Reformas", image: null },
  { id: 5, name: "Ana Costa", role: "Limpeza Profissional", rating: 5.0, reviews: 340, price: 180, unit: "dia", tags: ["Faxina", "Pós-obra", "Escritório"], category: "Limpeza", image: null },
  { id: 6, name: "Fernanda Lima", role: "Paisagista", rating: 3.9, reviews: 45, price: 120, unit: "visita", tags: ["Jardinagem", "Projetos"], category: "Jardinagem", image: null },
];

export default function ProfessionalsPage() {
  // Estados para gerenciar os filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias');
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Lógica de filtragem protegida e otimizada
  const filteredProfessionals = useMemo(() => {
    return ALL_PROFESSIONALS.filter(pro => {
      // Filtro de texto (busca no nome ou na função)
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = pro.name.toLowerCase().includes(searchLower) || 
                            pro.role.toLowerCase().includes(searchLower);
      
      // Filtro de Categoria
      const matchesCategory = selectedCategory === 'Todas as categorias' || pro.category === selectedCategory;
      
      // Filtro de Rating (O operador ?? garante que se rating for undefined, ele assume 0)
      const matchesRating = (pro.rating ?? 0) >= minRating;
      
      // Filtro de Preço
      const minP = priceRange.min === '' ? 0 : Number(priceRange.min);
      const maxP = priceRange.max === '' ? Infinity : Number(priceRange.max);
      const matchesPrice = pro.price >= minP && pro.price <= maxP;
      
      return matchesSearch && matchesCategory && matchesRating && matchesPrice;
    });
  }, [searchQuery, selectedCategory, minRating, priceRange]);

  // Função limpa-filtros extraída para melhor legibilidade
  const handleClearFilters = () => {
    setSelectedCategory('Todas as categorias');
    setMinRating(0);
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* Cabeçalho Principal */}
      <MainHeader />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-8">
        
        {/* Sidebar de Filtros */}
        <aside className="w-full md:w-64 space-y-8 shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Filtros</h2>
            <button 
              onClick={handleClearFilters}
              className="text-xs font-bold text-yellow-500 hover:text-yellow-600 hover:underline transition-colors"
            >
              Limpar
            </button>
          </div>

          <div className="space-y-6">
            {/* Select Categoria */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-3">Categoria</label>
              <select 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>Todas as categorias</option>
                <option>Eletricista</option>
                <option>Pintura</option>
                <option>Encanamento</option>
                <option>Limpeza</option>
                <option>Reformas</option>
                <option>Jardinagem</option>
              </select>
            </div>

            {/* Avaliações em Radio Buttons */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase block mb-3">Avaliações</label>
              <div className="space-y-3">
                {[4.5, 4.0].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="rating" 
                      className="w-5 h-5 accent-yellow-400 cursor-pointer" 
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                    />
                    <span className="text-sm text-gray-600 flex items-center gap-1 group-hover:text-gray-900 transition-colors">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" /> 
                      {rating} ou mais
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Inputs de Preço */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Faixa de Preço</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-yellow-400/20"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-yellow-400/20"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Listagem Principal e Busca */}
        <main className="grow space-y-8">
          
          {/* Campo de Busca */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Buscar profissional ou serviço..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-yellow-400/20 outline-none shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Banner Publicar Pedido */}
          <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Não achou o que precisava?</h3>
              <p className="text-gray-600 text-sm">Publique um pedido personalizado e receba orçamentos.</p>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 whitespace-nowrap">
              <Plus size={20} /> Publicar um pedido
            </button>
          </div>

          {/* Contagem e Ordenação */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">{filteredProfessionals.length} profissionais disponíveis</h2>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-gray-400">Ordenar por:</span>
              <button className="flex items-center gap-1 hover:text-yellow-600 transition-colors">
                Relevância <ChevronDown size={16}/>
              </button>
            </div>
          </div>

          {/* Componente que exibe os Cards */}
          <ProviderList providers={filteredProfessionals} viewMode="grid" />
        </main>
      </div>

      {/* Footer Simples */}
      <footer className="py-8 border-t border-gray-200 text-center text-sm text-gray-400 bg-white">
        © 2024 Ajeitai - Todos os direitos reservados. Feito com cuidado para o seu lar.
      </footer>
    </div>
  );
}
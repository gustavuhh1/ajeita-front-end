"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Bell, User, Star, Heart, 
  ChevronDown 
} from 'lucide-react';

const ProfessionalsPage = () => {
  // Estados para os Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias');
  const [availability, setAvailability] = useState('Qualquer data');
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Dados dos Profissionais
  const allProfessionals = [
    { id: 1, name: "João Silva", role: "Eletricista Residencial", rating: 4.8, reviews: 124, price: 80, unit: "hora", tags: ["Instalação", "Reparos", "Fiação"], category: "Eletricista" },
    { id: 2, name: "Maria Oliveira", role: "Pintura e Acabamentos", rating: 5.0, reviews: 89, price: 150, unit: "dia", tags: ["Pintura Interna", "Textura"], category: "Pintura" },
    { id: 3, name: "Carlos Mendes", role: "Encanador Especialista", rating: 4.5, reviews: 210, price: 100, unit: "visita", tags: ["Vazamentos", "Tubulação", "Esgoto"], category: "Encanamento" },
    { id: 4, name: "Pedro Santos", role: "Marido de Aluguel", rating: 4.9, reviews: 56, price: 60, unit: "hora", tags: ["Montagem", "Pequenos Reparos"], category: "Reformas" },
    { id: 5, name: "Ana Costa", role: "Limpeza Profissional", rating: 5.0, reviews: 340, price: 180, unit: "dia", tags: ["Faxina", "Pós-obra", "Escritório"], category: "Limpeza" },
    { id: 6, name: "Fernanda Lima", role: "Paisagista", rating: 3.9, reviews: 45, price: 120, unit: "visita", tags: ["Jardinagem", "Projetos"], category: "Jardinagem" },
  ];

  // Lógica de Filtragem
  const filteredProfessionals = useMemo(() => {
    return allProfessionals.filter(pro => {
      const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pro.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas as categorias' || pro.category === selectedCategory;
      const matchesRating = pro.rating >= minRating;
      
      const priceVal = pro.price;
      const matchesMinPrice = priceRange.min === '' || priceVal >= Number(priceRange.min);
      const matchesMaxPrice = priceRange.max === '' || priceVal <= Number(priceRange.max);
      
      return matchesSearch && matchesCategory && matchesRating && matchesMinPrice && matchesMaxPrice;
    });
  }, [searchQuery, selectedCategory, minRating, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* HEADER PADRONIZADO */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
              <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-yellow-400 p-3 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      ⚒
                    </div>
                    <span className="font-bold text-gray-900 text-2xl tracking-tight">Ajeitai</span>
                  </div>
      
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    {/* Início sem fundo azul conforme solicitado */}
                    <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors">
                      Início
                    </a>
                     <div className="relative flex items-center group">
                      <Search size={16} className="absolute left-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                        <input 
                          type="text"
                          placeholder="Buscar Profissionais"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-11 pr-5 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-yellow-400 focus:outline-none transition-all w-64 text-gray-700"
                         />
                     </div>
                    <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors">
                      Meus Pedidos
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors">
                      Mensagens
                    </a>
                  </div>
                </div>
      
                <div className="flex items-center gap-6">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-6 py-3 rounded-2xl flex items-center gap-2.5 transition-colors">
                    <div className="bg-gray-950 p-1.5 rounded-full flex items-center justify-center text-white text-xs">
                        <Plus size={14} strokeWidth={3} />
                    </div>
                    Criar Pedido
                  </button>
                  <div className="h-8 w-px bg-gray-100"></div>
                  <div className="flex items-center gap-4">
                    <div className="relative p-1">
                      <Bell className="text-gray-400" size={24} />
                      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-gray-200 bg-green-50 flex items-center justify-center text-green-700/60 overflow-hidden">
                      <User size={24} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </nav>

      <div className="max-w-[1400px] mx-auto flex gap-8 p-8">
        
        {/* SIDEBAR DE FILTROS COMPLETA */}
        <aside className="w-64 flex-shrink-0 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-gray-900">Filtros</h2>
            <button 
              onClick={() => {
                setSelectedCategory('Todas as categorias');
                setMinRating(0);
                setSearchQuery('');
                setPriceRange({ min: '', max: '' });
                setAvailability('Qualquer data');
              }}
              className="text-xs font-bold text-yellow-500 hover:underline"
            >
              Limpar
            </button>
          </div>

          <div className="space-y-6">
            {/* Categoria */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Categoria</label>
              <select 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>Todas as categorias</option>
                <option>Eletricista</option>
                <option>Pintura</option>
                <option>Encanamento</option>
                <option>Limpeza</option>
              </select>
            </div>

            {/* Disponibilidade */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Disponibilidade</label>
              <select 
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option>Qualquer data</option>
                <option>Hoje</option>
                <option>Esta semana</option>
              </select>
            </div>

            {/* Avaliações */}
            <div>
  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
    Avaliações
  </label>
  <div className="space-y-3">
    {[4.5, 4.0].map((rating) => (
      <label key={rating} className="flex items-center gap-3 cursor-pointer group">
        <input 
          type="radio" 
          name="rating" 
          className="w-5 h-5 accent-yellow-400" 
          // Alteramos o onChange para onClick para capturar o clique no que já está marcado
          onClick={() => {
            if (minRating === rating) {
              setMinRating(0); // Desmarca se clicar no que já está selecionado
            } else {
              setMinRating(rating); // Marca o novo valor
            }
          }}
          // O onChange vazio evita avisos do React sobre campos controlados
          onChange={() => {}}
          checked={minRating === rating}
        />
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" /> 
          {rating} ou mais
        </span>
      </label>
    ))}
  </div>
</div>

            {/* Bairro */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Bairro</label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none">
                <option>Todos os bairros</option>
              </select>
            </div>

            {/* Faixa de Preço */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Faixa de Preço</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                />
                <span className="text-gray-300">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow space-y-8">
          {/* Banner Publicar Pedido */}
          <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Não achou o que precisava?</h3>
              <p className="text-gray-500 text-sm">Publique um pedido personalizado e deixe os profissionais virem até você.</p>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-md">
              <Plus size={20} strokeWidth={3} /> Publicar um pedido
            </button>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Profissionais disponíveis</h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">Ordenar por:</span>
              <button className="font-bold flex items-center gap-1 text-gray-800">
                Relevância <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* GRID DE CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProfessionals.map((pro) => (
              <div key={pro.id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-rose-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>

                <div className="space-y-1 mb-4">
                  <h4 className="font-bold text-gray-900 text-lg">{pro.name}</h4>
                  <p className="text-gray-400 text-sm font-medium">{pro.role}</p>
                  <div className="flex items-center gap-1 text-sm pt-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">{pro.rating}</span>
                    <span className="text-gray-300 text-xs">({pro.reviews} avaliações)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {pro.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-gray-100/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">A partir de</p>
                    <p className="font-bold text-gray-900">
                      R$ {pro.price}<span className="text-gray-400 font-medium text-sm">/{pro.unit}</span>
                    </p>
                  </div>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalsPage;
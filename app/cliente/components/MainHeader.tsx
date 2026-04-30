"use client";
import React, { useState, useEffect } from 'react';
import { Bell, Plus } from 'lucide-react'; // Removi o 'User' que não estava sendo usado
import { NavLink, HeaderSearchBar } from './HeaderElements';
import { ProviderAvatar } from './ProviderAvatar';

export const MainHeader = ({ activePage = 'inicio' }: { activePage?: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedImage = async () => {
      const savedImage = localStorage.getItem('userProfileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    };

    fetchSavedImage();
  }, []);

  return (
    // Troquei max-w-[1400px] por max-w-7xl para evitar o aviso do Tailwind
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo e Navegação */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="bg-yellow-400 p-2.5 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm">
              ⚒
            </div>
            <span className="font-bold text-gray-900 text-2xl tracking-tight italic">Ajeitai</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5">
            <NavLink label="Início" href="/" active={activePage === 'inicio'} />
            <HeaderSearchBar value={searchQuery} onChange={setSearchQuery} />
            <NavLink label="Meus Pedidos" href="/pedidos" active={activePage === 'pedidos'} />
            <NavLink label="Mensagens" href="/mensagens" active={activePage === 'mensagens'} />
          </div>
        </div>

        {/* Lado Direito: Ações e Perfil */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:flex bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-6 py-3 rounded-2xl items-center gap-2.5 transition-all shadow-sm active:scale-95">
            <div className="bg-gray-950 p-1 rounded-full flex items-center justify-center text-white">
              <Plus size={14} strokeWidth={3} />
            </div>
            Criar Pedido
          </button>

          <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>

          <div className="flex items-center gap-4">
            {/* Notificações */}
            <div className="relative p-2 text-gray-400 hover:text-yellow-500 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
              <Bell size={24} />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Avatar Dinâmico */}
            <a href="/perfil" className="transition-transform hover:scale-105">
              <ProviderAvatar 
                src={profileImage} 
                name="Usuário" 
                size="sm" 
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
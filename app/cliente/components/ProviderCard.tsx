"use client";

import Link from "next/link";
import { Heart, MapPin, ChevronRight } from 'lucide-react';
import { ProviderAvatar } from './ProviderAvatar';
import { RatingBadge, ServiceTag } from './ProviderCardElements';

interface ProviderCardProps {
  provider: {
    id: number | string;
    name: string;
    role: string;
    rating?: number;
    reviews?: number;
    price: number;
    unit: string;
    tags: string[];
    location?: string;
    image?: string | null;
  };
  viewMode?: 'grid' | 'list';
}

export const ProviderCard = ({ provider, viewMode = 'grid' }: ProviderCardProps) => {
  const isGrid = viewMode === 'grid';

  return (
    <div className={`
      bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group
      ${isGrid 
        ? 'rounded-[32px] p-6 flex flex-col' 
        : 'rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'
      }
    `}>
      
      {/* Lado Esquerdo / Topo: Avatar e Favorito */}
      <div className={`flex ${isGrid ? 'justify-between items-start mb-4' : 'justify-between sm:justify-start items-center shrink-0'}`}>
        <div className="relative">
          <ProviderAvatar src={provider.image} name={provider.name} size={isGrid ? "md" : "sm"} />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        
        {(!isGrid || isGrid) && (
          <button 
            className={`p-2 text-gray-300 hover:text-rose-500 transition-colors ${!isGrid ? 'sm:hidden' : ''}`}
            aria-label="Adicionar aos favoritos"
          >
            <Heart size={20} />
          </button>
        )}
      </div>

      {/* Centro: Informações */}
      <div className={`grow ${isGrid ? 'space-y-4' : 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full'}`}>
        <div className="space-y-1">
          <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-amber-500 transition-colors">
            {provider.name}
          </h4>
          <p className="text-gray-400 text-sm font-medium">{provider.role}</p>
          
          {!isGrid && provider.location && (
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
              <MapPin size={12} /> {provider.location}
            </div>
          )}
          
          <div className="pt-1">
            <RatingBadge rating={provider.rating} reviews={provider.reviews} />
          </div>
        </div>

        {/* Tags e Localização (apenas Grid) */}
        {isGrid && (
          <div className="space-y-3">
             <div className="flex flex-wrap gap-1.5">
                {provider.tags.slice(0, 3).map(tag => <ServiceTag key={tag} label={tag} />)}
             </div>
             {provider.location && (
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                   <MapPin size={12} /> Atende em: {provider.location}
                </p>
             )}
          </div>
        )}
      </div>

      {/* Lado Direito / Rodapé: Preço e CTA */}
      <div className={`
        ${isGrid 
          ? 'pt-4 border-t border-gray-50 flex items-center justify-between mt-4' 
          : 'flex items-center justify-between sm:justify-end gap-6 shrink-0 w-full sm:w-auto border-t sm:border-t-0 border-gray-50 pt-3 sm:pt-0'
        }
      `}>
        <div className="text-left">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">A partir de</p>
          <p className="font-bold text-gray-900 mt-1">
            R$ {provider.price}<span className="text-gray-400 font-medium text-sm">/{provider.unit}</span>
          </p>
        </div>
        
        {/* Redirecionamento configurado para buscar-profissional/perfil/[id] */}
        <Link 
          href={`/cliente/buscar-profissional/perfil/${provider.id}`}
          className={`
            bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold transition-colors shadow-sm flex items-center justify-center gap-2
            ${isGrid ? 'px-6 py-2.5 rounded-xl text-sm' : 'px-5 py-3 rounded-2xl text-base w-fit'}
          `}
        >
          Ver Perfil {!isGrid && <ChevronRight size={18} />}
        </Link>
      </div>
    </div>
  );
};
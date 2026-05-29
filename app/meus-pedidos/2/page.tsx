"use client";

import { ArrowLeft, MapPin, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { MainHeader } from '../../cliente/components/MainHeader';

export default function PedidoDetalhe2() {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <MainHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        {/* Botão Voltar */}
        <Link
          href="/meus-pedidos"
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Voltar para Meus Pedidos
        </Link>

        {/* Header do Pedido */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-950 md:text-3xl">
              Instalação de Tomadas
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-400">
              Pedido #AJ-99321 · Criado em 10 de Outubro, 2023
            </p>
          </div>

          <span className="w-fit rounded-full bg-green-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-green-700">
            Agendado
          </span>
        </div>

        {/* Grid Principal */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Coluna Esquerda: Detalhes */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-sm font-black text-gray-950">Detalhes</h2>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Categoria</p>
                  <p className="mt-1 font-bold text-gray-700">⚡ Elétrica / Eletricista</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Localização</p>
                  <p className="mt-1 flex items-center gap-2 font-bold text-gray-700">
                    <MapPin size={14} /> Fortaleza, CE
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Descrição</p>
                  <p className="mt-1 leading-relaxed text-gray-600">
                    Instalação de novas tomadas na sala e cozinha. Necessário verificar a fiação existente e garantir a segurança da instalação elétrica.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Fotos Anexadas</p>
                  <div className="mt-3 flex gap-3">
                    <img src="https://i.pravatar.cc/100?img=6" className="h-16 w-16 rounded-2xl object-cover" alt="Foto 1" />
                    <img src="https://i.pravatar.cc/100?img=7" className="h-16 w-16 rounded-2xl object-cover" alt="Foto 2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Profissional */}
          <div className="lg:col-span-2">
            <h2 className="mb-5 text-sm font-black text-gray-950">Profissional Selecionado</h2>
            
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100?img=3"
                    className="h-16 w-16 rounded-2xl object-cover"
                    alt="Marcos Oliveira"
                  />
                  <div>
                    <h3 className="font-black text-gray-950">Marcos Oliveira</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      4.9 <span className="text-gray-300 font-normal">• 124 avaliações</span>
                    </div>
                    <p className="text-sm font-black text-gray-950 mt-1">R$ 200,00</p>
                  </div>
                </div>

                <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 transition-all hover:bg-yellow-500 active:scale-95 flex items-center justify-center gap-2">
                  <MessageSquare size={16} />
                  Ver Proposta
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs font-medium text-gray-400">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  );
}
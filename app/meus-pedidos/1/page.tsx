"use client";

import { ArrowLeft, MapPin, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { MainHeader } from '../../cliente/components/MainHeader';

export default function PedidoDetalhe() {
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
              Conserto de Vazamento
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-400">
              Pedido #AJ-88291 · Criado em 12 de Outubro, 2023
            </p>
          </div>

          <span className="w-fit rounded-full bg-orange-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-orange-600">
            EM NEGOCIAÇÃO
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
                  <p className="mt-1 font-bold text-gray-700">🔧 Hidráulica / Encanador</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Localização</p>
                  <p className="mt-1 flex items-center gap-2 font-bold text-gray-700">
                    <MapPin size={14} /> Moema, São Paulo - SP
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400">Descrição</p>
                  <p className="mt-1 leading-relaxed text-gray-600">
                    Preciso de um profissional para identificar e consertar um vazamento na parede do banheiro social. A mancha de umidade está aumentando rapidamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Propostas */}
          <div className="lg:col-span-2">
            <h2 className="mb-5 text-sm font-black text-gray-950">Propostas Recebidas (3)</h2>
            
            <div className="space-y-4">
              {[
                { nome: "Marcos Oliveira", nota: "4.9", preco: "150,00", img: "3" },
                { nome: "Ana Costa", nota: "4.7", preco: "135,00", img: "4" },
                { nome: "Carlos Mendes", nota: "5.0", preco: "180,00", img: "5" },
              ].map((proposta, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-yellow-200 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://i.pravatar.cc/100?img=${proposta.img}`}
                      className="h-14 w-14 rounded-2xl object-cover"
                      alt={proposta.nome}
                    />
                    <div>
                      <h3 className="font-black text-gray-950">{proposta.nome}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        {proposta.nota}
                      </div>
                      <p className="text-sm font-black text-gray-950 mt-1">R$ {proposta.preco}</p>
                    </div>
                  </div>

                  <button className="rounded-2xl bg-gray-50 px-5 py-3 text-sm font-black text-gray-600 transition-all hover:bg-gray-100 active:scale-95">
                    Ver Proposta
                  </button>
                </div>
              ))}
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
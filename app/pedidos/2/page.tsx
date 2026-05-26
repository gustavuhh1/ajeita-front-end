"use client"

import {
  ArrowLeft,
  MapPin,
  Star,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

// Importação da Topbar unificada do seu projeto
import Header from "@/app/cliente/components/header"

export default function PedidoDetalhe2() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Topbar unificada aplicada aqui */}
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
        {/* BREADCRUMB */}
        <Link
          href="/pedidos"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Voltar para Meus Pedidos
        </Link>

        {/* TÍTULO E STATUS */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 md:text-[28px]">
              Instalação de Tomadas
            </h1>
            <p className="text-sm text-gray-500">
              Pedido #AJ-99321 · Criado em 10 de Outubro, 2023
            </p>
          </div>

          <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-700">
            ● AGENDADO
          </span>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* COLUNA ESQUERDA: DETALHES */}
          <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-6">
            <h2 className="mb-5 text-sm font-semibold text-gray-700">
              Detalhes do Pedido
            </h2>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-xs text-gray-400">CATEGORIA</p>
                <p className="mt-1 font-medium text-gray-700">
                  ⚡ Elétrica / Eletricista
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">LOCALIZAÇÃO</p>
                <p className="mt-1 flex items-center gap-2 text-gray-700">
                  <MapPin size={14} /> Fortaleza, CE
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">DESCRIÇÃO</p>
                <p className="mt-1 leading-relaxed text-gray-600">
                  Instalação de novas tomadas na sala e cozinha. Necessário verificar a fiação existente e garantir a segurança da instalação elétrica.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">FOTOS ANEXADAS</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=6"
                    className="h-16 w-16 rounded-xl object-cover"
                    alt="Foto do local 1"
                  />
                  <img
                    src="https://i.pravatar.cc/100?img=7"
                    className="h-16 w-16 rounded-xl object-cover"
                    alt="Foto do local 2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: PROFISSIONAL */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                Profissional Selecionado
              </h2>
              <span className="text-xs text-gray-400">
                Serviço já confirmado
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between md:p-5">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100?img=3"
                    className="h-14 w-14 rounded-full object-cover"
                    alt="Marcos Oliveira"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Marcos Oliveira
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star size={14} className="text-yellow-500" />
                      4.9 <span>(124)</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Eletricista • 10 anos de exp.
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      R$ 200,00
                    </p>
                  </div>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-medium hover:bg-yellow-500 md:w-auto">
                  <MessageSquare size={16} />
                  Conversar / Ver Proposta
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  )
}
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

export default function PedidoDetalhe() {
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
              Conserto de Vazamento
            </h1>
            <p className="text-sm text-gray-500">
              Pedido #AJ-88291 · Criado em 12 de Outubro, 2023
            </p>
          </div>

          <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 text-xs font-medium text-yellow-700">
            ● EM NEGOCIAÇÃO
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
                  🔧 Hidráulica / Encanador
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">LOCALIZAÇÃO</p>
                <p className="mt-1 flex items-center gap-2 text-gray-700">
                  <MapPin size={14} /> Moema, São Paulo - SP
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">DESCRIÇÃO</p>
                <p className="mt-1 leading-relaxed text-gray-600">
                  Preciso de um profissional para identificar e consertar um
                  vazamento na parede do banheiro social. A mancha de umidade
                  está aumentando rapidamente. Necessário ter ferramentas próprias.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">FOTOS ANEXADAS</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=1"
                    className="h-16 w-16 rounded-xl object-cover"
                    alt="Foto do problema 1"
                  />
                  <img
                    src="https://i.pravatar.cc/100?img=2"
                    className="h-16 w-16 rounded-xl object-cover"
                    alt="Foto do problema 2"
                  />
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed text-gray-400">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: PROPOSTAS */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-semibold text-gray-700">
                Propostas Recebidas (3)
              </h2>
              <span className="text-xs text-gray-400">
                Selecione o melhor profissional para você
              </span>
            </div>

            <div className="space-y-5">
              {/* PROPOSTA 1 */}
              <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 transition hover:shadow-md md:flex-row md:items-center md:justify-between md:p-5">
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
                      Hidráulica • 12 anos de exp.
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      R$ 150,00
                    </p>
                  </div>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-medium hover:bg-yellow-500 md:w-auto">
                  <MessageSquare size={16} />
                  Conversar / Ver Proposta
                </button>
              </div>

              {/* PROPOSTA 2 */}
              <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 transition hover:shadow-md md:flex-row md:items-center md:justify-between md:p-5">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100?img=4"
                    className="h-14 w-14 rounded-full object-cover"
                    alt="Ana Costa"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Ana Costa
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star size={14} className="text-yellow-500" />
                      4.7 <span>(89)</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Reparos Residenciais
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      R$ 135,00
                    </p>
                  </div>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-medium hover:bg-yellow-500 md:w-auto">
                  <MessageSquare size={16} />
                  Conversar / Ver Proposta
                </button>
              </div>

              {/* PROPOSTA 3 */}
              <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 transition hover:shadow-md md:flex-row md:items-center md:justify-between md:p-5">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100?img=5"
                    className="h-14 w-14 rounded-full object-cover"
                    alt="Carlos Mendes"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">
                      Carlos Mendes
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star size={14} className="text-yellow-500" />
                      5.0 <span>(42)</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Encanador Certificado
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      R$ 180,00
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
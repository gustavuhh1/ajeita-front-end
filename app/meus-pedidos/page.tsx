"use client"

import { useRouter } from "next/navigation"
import { PerfilPageLayout } from "../cliente/perfil/components/PerfilPageLayout"

type Pedido = {
  id: number
  titulo: string
  descricao: string
  data: string
  status: string
  corStatus: string
  icone: string
}

export default function PedidosPage() {
  const router = useRouter()

  const verDetalhes = (id: number): void => {
    router.push(`/meus-pedidos/${id}`)
  }

  const pagarAgora = (id: number): void => {
    router.push(`/pagamento?id=${id}`)
  }

  const pedidos: Pedido[] = [
    {
      id: 1,
      titulo: "Conserto de Vazamento",
      descricao: "Profissional sendo selecionado...",
      data: "Solicitado em 12 de Out, 2023",
      status: "EM NEGOCIAÇÃO",
      corStatus: "bg-orange-100 text-orange-600",
      icone: "🔧",
    },
    {
      id: 2,
      titulo: "Instalação de Tomadas",
      descricao: "Profissional: Marcos Oliveira",
      data: "Agendado para 15 de Out, 2023 às 09:00",
      status: "AGENDADO",
      corStatus: "bg-green-100 text-green-600",
      icone: "⚡",
    },
    {
      id: 3,
      titulo: "Pintura de Parede (Sala)",
      descricao: "Profissional: Ana Costa",
      data: "Solicitado em 10 de Out, 2023",
      status: "AGUARDANDO PAGAMENTO",
      corStatus: "bg-blue-100 text-blue-600",
      icone: "🎨",
    },
  ]

  return (
    <PerfilPageLayout
      title="Meus Pedidos"
      description="Acompanhe seus serviços em lifestyle, andamento e veja seu histórico."
    >
      <div className="mt-2 flex gap-6 border-b text-sm">
        <span className="border-b-2 border-yellow-400 pb-3 font-medium text-yellow-600 cursor-pointer">
          Ativos
        </span>
        <span className="pb-3 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
          Histórico
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-xl">
                {pedido.icone}
              </div>

              <div>
                <h3 className="font-black text-gray-950">
                  {pedido.titulo}
                </h3>
                <p className="text-xs font-medium text-gray-400 mt-0.5">
                  {pedido.data}
                </p>
                <p className="text-sm font-bold text-gray-500 mt-1">
                  {pedido.descricao}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-gray-50 pt-3 sm:border-0 sm:pt-0">
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${pedido.corStatus}`}
              >
                {pedido.status}
              </span>

              {pedido.status === "AGUARDANDO PAGAMENTO" ? (
                <button
                  onClick={() => pagarAgora(pedido.id)}
                  className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 shadow-sm transition-all hover:bg-yellow-500 active:scale-95"
                >
                  Pagar Agora
                </button>
              ) : (
                <button
                  onClick={() => verDetalhes(pedido.id)}
                  className="rounded-2xl bg-gray-50 px-5 py-3 text-sm font-black text-gray-600 transition-all hover:bg-gray-100 active:scale-95"
                >
                  Ver Detalhes
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </PerfilPageLayout>
  )
}
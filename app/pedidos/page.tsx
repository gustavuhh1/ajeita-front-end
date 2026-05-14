"use client"

import { useRouter } from "next/navigation"
import {
  User,
  MapPin,
  Shield,
  LogOut,
  Bell,
  ShoppingCart,
} from "lucide-react"

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
    router.push(`/pedidos/${id}`)
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
    <div className="min-h-screen bg-[#f6f8fb]">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
            🔧
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Ajeitai
          </span>
        </div>

        <div className="w-[420px]">
          <input
            placeholder="Buscar serviços..."
            className="w-full rounded-full bg-gray-100 px-5 py-2 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>Início</span>
          <span>Explorar</span>
          <span>Serviços</span>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <Bell size={16} />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart size={16} />
            </div>
            <div className="h-9 w-9 rounded-full bg-yellow-300" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <aside className="w-[280px] rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div>
              <h3 className="font-semibold text-gray-800">
                Ricardo Silva
              </h3>
              <span className="text-xs text-gray-400">
                CLIENTE PRIME
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-500">
              <User size={16} /> Dados Pessoais
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <ShoppingCart size={16} /> Meus Pedidos
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <MapPin size={16} /> Endereços
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <Shield size={16} /> Segurança
            </div>
          </div>

          <button className="mt-10 flex items-center gap-2 text-sm text-red-500">
            <LogOut size={16} /> Sair da Conta
          </button>
        </aside>

        <main className="flex-1">
          <h1 className="text-[28px] font-semibold text-gray-800">
            Meus Pedidos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Acompanhe seus serviços em andamento e veja seu histórico.
          </p>

          <div className="mt-6 flex gap-6 border-b text-sm">
            <span className="border-b-2 border-yellow-400 pb-3 font-medium text-yellow-600">
              Ativos
            </span>
            <span className="pb-3 text-gray-400">
              Histórico
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                    {pedido.icone}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">
                      {pedido.titulo}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {pedido.data}
                    </p>
                    <p className="text-xs text-gray-400">
                      {pedido.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${pedido.corStatus}`}
                  >
                    {pedido.status}
                  </span>

                  {pedido.status === "AGUARDANDO PAGAMENTO" ? (
                    <button
                      onClick={() => pagarAgora(pedido.id)}
                      className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-medium"
                    >
                      Pagar Agora
                    </button>
                  ) : (
                    <button
                      onClick={() => verDetalhes(pedido.id)}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm"
                    >
                      Ver Detalhes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai. Todos os direitos reservados.
      </footer>
    </div>
  )
}
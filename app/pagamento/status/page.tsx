"use client"

import {
  Bell,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCcw,
  Star,
} from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function PagamentoStatusPage() {
  const params = useSearchParams()
  const router = useRouter()

  const status = params.get("status") || "sucesso"

  const isSuccess = status === "sucesso"
  const isPending = status === "pendente"
  const isError = status === "erro"

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

     
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center">

         
          <div
            className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full
            ${isSuccess && "bg-green-100"}
            ${isPending && "bg-yellow-100"}
            ${isError && "bg-red-100"}
            `}
          >
            {isSuccess && <CheckCircle size={40} className="text-green-600" />}
            {isPending && <Clock size={40} className="text-yellow-600" />}
            {isError && <XCircle size={40} className="text-red-600" />}
          </div>

       
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {isSuccess && "Pagamento confirmado!"}
            {isPending && "Pagamento pendente"}
            {isError && "Pagamento não aprovado"}
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            {isSuccess && "Seu pagamento foi aprovado com sucesso."}
            {isPending && "Aguardando confirmação do pagamento."}
            {isError && "O pagamento falhou. Tente novamente."}
          </p>

          <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600 mb-6 text-left">
            <p>Pedido: <b>#AJ-88291</b></p>
            <p>Serviço: <b>Higienização de Sofá</b></p>
            <p>Valor: <b className="text-yellow-600">R$ 250,00</b></p>
          </div>

        
          <div className="flex flex-col gap-3">

            {isSuccess && (
              <>
                <button
                  onClick={() => router.push("/pedidos")}
                  className="w-full bg-yellow-400 py-3 rounded-full font-medium hover:bg-yellow-500"
                >
                  Acompanhar serviço
                </button>

                <Link href="/avaliar">
                  <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50">
                    <Star size={16} />
                    Avaliar prestador
                  </button>
                </Link>
              </>
            )}

            {isPending && (
              <button
                onClick={() => router.push("/pedidos")}
                className="w-full bg-yellow-400 py-3 rounded-full hover:bg-yellow-500"
              >
                Ver status
              </button>
            )}

            {isError && (
              <>
                <button
                  onClick={() => router.push("/pagamento")}
                  className="w-full bg-yellow-400 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-yellow-500"
                >
                  Tentar novamente
                  <RefreshCcw size={16} />
                </button>

                <button className="w-full border py-3 rounded-full hover:bg-gray-50">
                  Contatar suporte
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai
      </footer>
    </div>
  )
}
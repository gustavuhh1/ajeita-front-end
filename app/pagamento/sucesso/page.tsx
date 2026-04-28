"use client"

import {
  Bell,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function PagamentoSucesso() {
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

         
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Pagamento confirmado!
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Seu pagamento foi realizado com sucesso. O profissional já foi notificado e em breve iniciará o serviço.
          </p>

        
          <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600 mb-6">
            <p>
              Pedido <span className="font-medium text-gray-800">#AJ-88291</span>
            </p>
            <p>
              Valor pago:{" "}
              <span className="font-medium text-yellow-600">R$ 250,00</span>
            </p>
          </div>

          
          <div className="flex flex-col gap-3">
            <Link href="/pedidos">
              <button className="w-full rounded-full bg-yellow-400 py-3 font-medium hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                Ver meus pedidos
                <ArrowRight size={16} />
              </button>
            </Link>

            <Link href="/">
              <button className="w-full rounded-full border border-gray-200 py-3 text-sm text-gray-600 hover:bg-gray-50 transition">
                Voltar para início
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  )
}
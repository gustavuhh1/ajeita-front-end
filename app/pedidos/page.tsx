"use client"

import {
  User,
  MapPin,
  Shield,
  LogOut,
  Bell,
  ShoppingCart,
} from "lucide-react"

export default function PedidosPage() {
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

            <div className="flex items-center gap-3 rounded-full bg-yellow-100 px-4 py-2 font-medium text-yellow-700">
              📄 Meus Pedidos
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


      </div>

      
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai. Todos os direitos reservados.
      </footer>
    </div>
  )
}
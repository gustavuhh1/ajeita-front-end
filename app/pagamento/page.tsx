"use client"

import {
  Bell,
  ShoppingCart,
  ShieldCheck,
  Copy,
  CreditCard,
  QrCode,
} from "lucide-react"
import Link from "next/link"

export default function PagamentoPage() {
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

     
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 gap-6 lg:grid-cols-2">

    
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Resumo do Pedido
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-gray-100" />
            <div>
              <p className="font-medium text-gray-700">
                Higienização de Sofá
              </p>
              <p className="text-sm text-gray-400">
                ID: #849201
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Profissional</span>
              <span className="text-gray-800">Carlos Silva</span>
            </div>

            <div className="flex justify-between">
              <span>Data</span>
              <span className="text-gray-800">11 Jun, 14:00</span>
            </div>

            <div className="flex justify-between">
              <span>Taxa</span>
              <span className="text-gray-800">R$ 0,00</span>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="font-medium text-gray-700">Total</span>
            <span className="text-xl font-semibold text-yellow-600">
              R$ 250,00
            </span>
          </div>

          <div className="mt-6 flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            <ShieldCheck size={18} />
            Seu pagamento está protegido. O valor só será liberado após o serviço.
          </div>
        </div>

        
        <div className="rounded-3xl border border-gray-200 bg-white p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Método de Pagamento
              </h2>
              <p className="text-xs text-gray-400">
                Processado por AbacatePay
              </p>
            </div>

            <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              AbacatePay
            </span>
          </div>

         
          <div className="flex gap-3 mb-6">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-yellow-400 bg-yellow-50 py-2 text-sm font-medium">
              <QrCode size={16} />
              Pix
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm text-gray-500">
              <CreditCard size={16} />
              Cartão
            </button>
          </div>

        
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-gray-400 mb-4">
            <QrCode size={60} />
            <p className="text-xs mt-2">QR Code Pix</p>
          </div>

          <p className="text-center text-sm text-gray-500 mb-4">
            O código expira em{" "}
            <span className="text-yellow-600 font-medium">14:59</span>
          </p>

         
          <div className="flex items-center justify-between rounded-xl border bg-gray-50 px-4 py-3 text-sm mb-5">
            <span className="truncate text-gray-500">
              00020126580014BR.GOV.BCB.PIX0136...
            </span>

            <button className="flex items-center gap-1 text-yellow-600 text-xs font-medium">
              <Copy size={14} />
              COPIAR
            </button>
          </div>

          
          <button className="w-full rounded-full bg-yellow-400 py-3 font-medium hover:bg-yellow-500 transition">
            Confirmar e Pagar →
          </button>

        
          <div className="mt-6 flex justify-center gap-6 text-xs text-gray-400">
            <span>SSL Encrypted</span>
            <span>PCI-DSS Compliant</span>
          </div>
        </div>
      </div>

      
      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  )
}
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Suspense } from "react";
import Header from "@/app/cliente/components/header";

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");

  const isSucesso = status === "sucesso";

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        {isSucesso ? (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Pagamento Confirmado!
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Seu pedido foi processado com sucesso. O profissional já foi notificado.
            </p>

            <div className="rounded-2xl bg-gray-50 p-4 text-left space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Serviço:</span>
                <span className="text-gray-800 font-medium">Higienização de Sofá</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Data agendada:</span>
                <span className="text-gray-800 font-medium">11 Jun às 14:00</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/cliente/agendamentos")}
              className="w-full rounded-full bg-yellow-400 py-3 font-medium hover:bg-yellow-500 flex items-center justify-center gap-2 transition-colors text-gray-900"
            >
              <Calendar size={18} />
              Ver Meus Agendamentos
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Falha no Pagamento
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Houve um problem ao processar sua transação. Nenhuma cobrança foi realizada.
            </p>

            <button
              onClick={() => router.back()}
              className="w-full rounded-full bg-gray-900 py-3 font-medium text-white hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors"
            >
              Tentar Novamente
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PagamentoStatusPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Header />
      <Suspense fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="animate-spin text-yellow-500" size={32} />
        </div>
      }>
        <StatusContent />
      </Suspense>
      
      <footer className="text-center text-xs text-gray-400 py-6 fixed bottom-0 w-full">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  );
}
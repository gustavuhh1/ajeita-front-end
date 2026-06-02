"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Suspense } from "react";
import { MainHeader } from "../../cliente/components/MainHeader";

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");

  const isSucesso = status === "sucesso";

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        {isSucesso ? (
          <>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-2xl font-black text-gray-950 mb-2">
              Pagamento Confirmado!
            </h1>
            <p className="text-sm font-medium text-gray-400 mb-8">
              Seu pedido foi processado com sucesso. O profissional já foi notificado.
            </p>

            <div className="rounded-2xl bg-gray-50 p-5 text-left space-y-3 text-sm mb-8">
              <div className="flex justify-between">
                <span className="font-bold text-gray-400 uppercase text-[10px]">Serviço</span>
                <span className="text-gray-950 font-black">Higienização de Sofá</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-400 uppercase text-[10px]">Agendado</span>
                <span className="text-gray-950 font-black">11 Jun às 14:00</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/cliente/agendamentos")}
              className="w-full rounded-2xl bg-yellow-400 py-4 font-black text-gray-950 hover:bg-yellow-500 active:scale-95 flex items-center justify-center gap-2 transition-all"
            >
              <Calendar size={18} />
              Ver Meus Agendamentos
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={48} />
            </div>
            <h1 className="text-2xl font-black text-gray-950 mb-2">
              Falha no Pagamento
            </h1>
            <p className="text-sm font-medium text-gray-400 mb-8">
              Houve um problema ao processar sua transação. Nenhuma cobrança foi realizada.
            </p>

            <button
              onClick={() => router.back()}
              className="w-full rounded-2xl bg-gray-950 py-4 font-black text-white hover:bg-gray-800 active:scale-95 flex items-center justify-center gap-2 transition-all"
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
      <MainHeader />
      
      <Suspense fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="animate-spin text-yellow-500" size={32} />
        </div>
      }>
        <StatusContent />
      </Suspense>
      
      <footer className="py-8 text-center text-xs font-medium text-gray-400">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  );
}
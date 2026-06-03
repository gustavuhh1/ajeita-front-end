"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatScreen } from "@/components/chat/chat-screen";

function ProfissionalMensagensContent() {
  const searchParams = useSearchParams();

  const budgetId = searchParams.get("budgetId");

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      {budgetId ? (
        <ChatScreen currentUserRole="prestador" budgetId={budgetId} />
      ) : (
        <main className="flex min-h-[70vh] items-center justify-center px-6 py-10">
          <div className="max-w-md rounded-3xl border border-yellow-100 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-black text-gray-950">
              Nenhum orçamento selecionado
            </h1>

            <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500">
              O chat do prestador também precisa receber o budgetId na URL.
            </p>

            <p className="mt-5 rounded-2xl bg-gray-50 px-4 py-3 text-xs font-bold text-gray-500">
              Exemplo:
              /profissional/dashboard/mensagens?budgetId=ID_DO_ORCAMENTO
            </p>
          </div>
        </main>
      )}
    </div>
  );
}

export default function ProfissionalMensagensPage() {
  return (
    <Suspense>
      <ProfissionalMensagensContent />
    </Suspense>
  );
}
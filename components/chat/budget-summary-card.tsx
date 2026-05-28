import {
  CheckCircle2,
  CreditCard,
  FileText,
  PencilLine,
  Sparkles,
} from "lucide-react";

import { BudgetProposal, BudgetStatus } from "./chat-types";
import {
  formatCurrency,
  formatServiceDate,
  statusContent,
} from "./chat-utils";

interface BudgetSummaryCardProps {
  proposal: BudgetProposal;
  status: BudgetStatus;
  canAccept: boolean;
  canCounterOffer: boolean;
  canPay: boolean;
  onAccept: () => void;
  onCounterOffer: () => void;
  onPay: () => void;
}

export function BudgetSummaryCard({
  proposal,
  status,
  canAccept,
  canCounterOffer,
  canPay,
  onAccept,
  onCounterOffer,
  onPay,
}: BudgetSummaryCardProps) {
  const currentStatus = statusContent[status];

  return (
    <section className="rounded-[28px] border-2 border-yellow-300 bg-yellow-50/50 p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-950">
            Orçamento Atual
          </h2>

          <p className="mt-1 text-xs font-bold text-gray-500">
            {currentStatus.helper}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-yellow-500">
          <FileText size={20} />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
          Valor total
        </p>

        <p className="mt-2 text-4xl font-black text-gray-950">
          {formatCurrency(proposal.value)}
        </p>

        <div className="mt-5 space-y-4 border-t border-gray-100 pt-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Descrição
            </p>

            <p className="mt-1 text-xs font-bold leading-relaxed text-gray-600">
              {proposal.description}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Data do serviço
            </p>

            <p className="mt-1 text-xs font-bold text-gray-600">
              {formatServiceDate(proposal.serviceDate)}
            </p>
          </div>
        </div>
      </div>

      {status === BudgetStatus.PAGO ? (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-center">
          <CheckCircle2 className="mx-auto mb-2 text-emerald-500" />

          <p className="text-sm font-black text-emerald-700">
            Pagamento confirmado!
          </p>

          <p className="mt-1 text-xs font-medium text-emerald-600">
            Agora o serviço pode seguir no fluxo normal.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {canAccept && (
            <button
              onClick={onAccept}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 text-sm font-black text-gray-950 shadow-md shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
            >
              Aceitar proposta
              <Sparkles size={17} />
            </button>
          )}

          {canCounterOffer && (
            <button
              onClick={onCounterOffer}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-5 py-3 text-sm font-black text-gray-600 transition-colors hover:border-yellow-200 hover:bg-yellow-50"
            >
              Lançar contraproposta
              <PencilLine size={16} />
            </button>
          )}

          {canPay && (
            <button
              onClick={onPay}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-4 text-sm font-black text-white shadow-md shadow-green-100 transition-all hover:bg-green-600 active:scale-95"
            >
              Marcar como pago
              <CreditCard size={17} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
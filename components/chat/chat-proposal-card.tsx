import { Check, PencilLine } from "lucide-react";

import { BudgetProposal } from "./chat-types";
import { formatCurrency, formatServiceDate } from "./chat-utils";

interface ChatProposalCardProps {
  proposal: BudgetProposal;
}

export function ChatProposalCard({ proposal }: ChatProposalCardProps) {
  const isCounterProposal = proposal.source === "counter";

  return (
    <div className="mt-4 rounded-2xl border border-yellow-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
            {isCounterProposal
              ? "Contraproposta enviada"
              : "Proposta do prestador"}
          </p>

          <p className="mt-1 text-2xl font-black text-yellow-600">
            {formatCurrency(proposal.value)}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
          {isCounterProposal ? (
            <PencilLine size={16} />
          ) : (
            <Check size={17} strokeWidth={3} />
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 text-xs font-bold text-gray-600">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Descrição negociada
          </p>

          <p className="mt-1 leading-relaxed">{proposal.description}</p>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Data do serviço
          </p>

          <p className="mt-1">{formatServiceDate(proposal.serviceDate)}</p>
        </div>
      </div>
    </div>
  );
}
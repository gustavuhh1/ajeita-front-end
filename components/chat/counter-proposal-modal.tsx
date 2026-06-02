import { FormEvent } from "react";
import { X } from "lucide-react";

interface CounterProposalForm {
  description: string;
  value: string;
  serviceDate: string;
}

interface CounterProposalModalProps {
  isOpen: boolean;
  counterProposal: CounterProposalForm;
  onChange: (counterProposal: CounterProposalForm) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
}

export function CounterProposalModal({
  isOpen,
  counterProposal,
  onChange,
  onClose,
  onSubmit,
}: CounterProposalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-gray-950/40 px-4 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl rounded-[30px] bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-yellow-600">
              Nova negociação
            </p>

            <h2 className="mt-1 text-2xl font-black text-gray-950">
              Lançar contraproposta
            </h2>

            <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
              Altere descrição, valor e data do serviço. Ao enviar, o orçamento
              fica como AGUARDANDO_PRESTADOR.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">
              Descrição
            </span>

            <textarea
              value={counterProposal.description}
              onChange={(event) =>
                onChange({
                  ...counterProposal,
                  description: event.target.value,
                })
              }
              rows={4}
              className="mt-2 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition-all focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                Valor
              </span>

              <input
                value={counterProposal.value}
                onChange={(event) =>
                  onChange({
                    ...counterProposal,
                    value: event.target.value,
                  })
                }
                inputMode="decimal"
                className="mt-2 h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 text-sm font-bold text-gray-700 outline-none transition-all focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                placeholder="Ex: 220"
              />
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                Data do serviço
              </span>

              <input
                type="datetime-local"
                value={counterProposal.serviceDate}
                onChange={(event) =>
                  onChange({
                    ...counterProposal,
                    serviceDate: event.target.value,
                  })
                }
                className="mt-2 h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 text-sm font-bold text-gray-700 outline-none transition-all focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-gray-100 px-5 py-3 text-sm font-black text-gray-500 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 shadow-md shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
          >
            Enviar contraproposta
          </button>
        </div>
      </form>
    </div>
  );
}
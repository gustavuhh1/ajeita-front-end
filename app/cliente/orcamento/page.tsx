"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Info,
  LockKeyhole,
  MapPin,
  MoreVertical,
  Paperclip,
  SendHorizontal,
  ShieldCheck,
  Sofa,
  Star,
  X,
} from "lucide-react";

import { MainHeader } from "../components/MainHeader";
import { ProviderAvatar } from "../components/ProviderAvatar";

import {
  BudgetState,
  BudgetStatus,
  ChatMessage,
} from "../../../components/chat/chat-types";

import {
  formatDateForInput,
  formatServiceDate,
  getCurrentTime,
  statusContent,
} from "../../../components/chat/chat-utils";

import { ChatMessageBubble } from "../../../components/chat/chat-message-bubble";
import { ChatTypingIndicator } from "../../../components/chat/chat-typing-indicator";
import { CounterProposalModal } from "../../../components/chat/counter-proposal-modal";
import { BudgetSummaryCard } from "../../../components/chat/budget-summary-card";

export default function ClienteOrcamentoPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isProviderTyping, setIsProviderTyping] = useState(false);
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);

  const [budget, setBudget] = useState<BudgetState>({
    source: "original",
    description:
      "Higienização completa de sofá retrátil de 3 lugares, tecido suede, com remoção de manchas de café e finalização com extratora.",
    value: 250,
    serviceDate: "2026-06-11T14:00",
    status: BudgetStatus.AGUARDANDO_CLIENTE,
  });

  const [counterProposal, setCounterProposal] = useState({
    description:
      "Higienização completa do sofá, mas gostaria de ajustar o valor e confirmar o serviço no mesmo dia sugerido.",
    value: "220",
    serviceDate: "2026-06-11T14:00",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      author: "prestador",
      text: "Olá, Lavor! Vi seu pedido para higienização do sofá. O tecido suede precisa de um cuidado especial. Você teria fotos das manchas?",
      time: "08:42",
    },
    {
      id: 2,
      author: "cliente",
      text: "Oi Carlos! Sim, acabei de tirar. Segue em anexo.",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
      time: "08:45",
    },
    {
      id: 3,
      author: "prestador",
      text: "Entendi. Consigo remover essas manchas com a extratora. Como é um sofá retrátil de 3 lugares, o serviço leva cerca de 2 horas. Minha proposta fica assim:",
      proposal: {
        source: "original",
        description:
          "Higienização completa de sofá retrátil de 3 lugares, tecido suede, com remoção de manchas de café e finalização com extratora.",
        value: 250,
        serviceDate: "2026-06-11T14:00",
      },
      time: "08:50",
    },
  ]);

  const currentStatus = statusContent[budget.status];

  const lastProposal = useMemo(() => {
    return (
      [...messages].reverse().find((chatMessage) => chatMessage.proposal)
        ?.proposal ?? budget
    );
  }, [messages, budget]);

  const canClientAct = budget.status === BudgetStatus.AGUARDANDO_CLIENTE;
  const canPay = budget.status === BudgetStatus.ACEITO;

  const simulateProviderTyping = () => {
    setIsProviderTyping(true);

    setTimeout(() => {
      setIsProviderTyping(false);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 1,
          author: "prestador",
          text: "Perfeito, estou acompanhando por aqui. Se quiser, você também pode aceitar a proposta ou me mandar uma contraproposta pelo card lateral.",
          time: getCurrentTime(),
        },
      ]);
    }, 1200);
  };

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (!message.trim() && !attachedImage) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      author: "cliente",
      text: message.trim() || undefined,
      image: attachedImage || undefined,
      time: getCurrentTime(),
    };

    setMessages((previousMessages) => [...previousMessages, newMessage]);
    setMessage("");
    setAttachedImage(null);

    simulateProviderTyping();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAttachedImage(previewUrl);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAcceptProposal = () => {
    setBudget((previousBudget) => ({
      ...previousBudget,
      status: BudgetStatus.ACEITO,
    }));

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now(),
        author: "system",
        text: "Proposta aceita pelo cliente. Status do orçamento alterado para aguardando pagamento.",
        time: getCurrentTime(),
      },
    ]);
  };

  const handleOpenCounterProposalModal = () => {
    setCounterProposal({
      description: budget.description,
      value: String(budget.value),
      serviceDate: formatDateForInput(budget.serviceDate),
    });

    setIsCounterModalOpen(true);
  };

  const handleSendCounterProposal = (event: FormEvent) => {
    event.preventDefault();

    const parsedValue = Number(counterProposal.value.replace(",", "."));

    if (
      !counterProposal.description.trim() ||
      !parsedValue ||
      !counterProposal.serviceDate
    ) {
      return;
    }

    const updatedBudget: BudgetState = {
      source: "counter",
      description: counterProposal.description.trim(),
      value: parsedValue,
      serviceDate: counterProposal.serviceDate,
      status: BudgetStatus.AGUARDANDO_PRESTADOR,
    };

    setBudget(updatedBudget);

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now(),
        author: "cliente",
        text: "Carlos, estou te enviando uma contraproposta com alguns ajustes. Dá uma olhada pra mim?",
        proposal: {
          source: updatedBudget.source,
          description: updatedBudget.description,
          value: updatedBudget.value,
          serviceDate: updatedBudget.serviceDate,
        },
        time: getCurrentTime(),
      },
      {
        id: Date.now() + 1,
        author: "system",
        text: "Contraproposta enviada pelo cliente. Status do orçamento alterado para aguardando prestador.",
        time: getCurrentTime(),
      },
    ]);

    setIsCounterModalOpen(false);

    setIsProviderTyping(true);

    setTimeout(() => {
      setIsProviderTyping(false);
    }, 1200);
  };

  const handleMarkAsPaid = () => {
    setBudget((previousBudget) => ({
      ...previousBudget,
      status: BudgetStatus.PAGO,
    }));

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: Date.now(),
        author: "system",
        text: "Pagamento confirmado. Status do orçamento alterado para pago.",
        time: getCurrentTime(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      <MainHeader activePage="mensagens" />

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[300px_1fr_300px]">
        <aside className="space-y-5">
          <Link
            href="/pedidos"
            className="flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-gray-700"
          >
            <ArrowLeft size={18} />
            Voltar para pedidos
          </Link>

          <section className="rounded-[28px] border border-yellow-100 bg-white p-6 shadow-sm">
            <span
              className={`mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${currentStatus.badge}`}
            >
              {currentStatus.label}
            </span>

            <h1 className="text-2xl font-black leading-tight text-gray-950">
              Higienização de Sofá
            </h1>

            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              ID: #849201
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Localização
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    Rua dos Flares, 123 - Meireles, Fortaleza
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Data sugerida
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {formatServiceDate(budget.serviceDate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <Sofa size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Descrição
                  </p>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
                    {budget.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <ProviderAvatar name="Carlos Silva" src={null} size="sm" />

              <div>
                <h3 className="text-base font-black text-gray-950">
                  Carlos Silva
                </h3>

                <div className="mt-1 flex items-center gap-1">
                  <Star
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-bold text-yellow-500">
                    4.9
                  </span>

                  <span className="text-sm font-medium text-gray-400">
                    (120)
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section className="flex min-h-180 flex-col overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-gray-100 bg-yellow-50/50 px-6 py-4">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Conversando com{" "}
                <span className="font-black text-gray-900">Carlos Silva</span>
              </p>

              <p className="mt-1 text-[11px] font-bold text-gray-400">
                Negociação vinculada ao orçamento #849201
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white hover:text-gray-700"
            >
              <MoreVertical size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <div className="flex justify-center">
              <span className="rounded-full bg-gray-50 px-4 py-1.5 text-[11px] font-bold text-gray-400">
                Hoje
              </span>
            </div>

            {messages.map((chat) => (
              <ChatMessageBubble
                key={chat.id}
                message={chat}
                currentUserRole="cliente"
                providerName="Carlos Silva"
                clientName="Lavor Argento"
              />
            ))}

            {isProviderTyping && (
              <div className="flex items-end gap-3">
                <ProviderAvatar name="Carlos Silva" src={null} size="sm" />
                <ChatTypingIndicator />
              </div>
            )}
          </div>

          {attachedImage && (
            <div className="border-t border-gray-100 bg-yellow-50/40 px-6 py-3">
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-yellow-100 bg-white p-2 shadow-sm">
                <img
                  src={attachedImage}
                  alt="Prévia do anexo"
                  className="h-12 w-16 rounded-xl object-cover"
                />

                <span className="text-xs font-bold text-gray-500">
                  Imagem anexada
                </span>

                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {message.trim() && (
            <div className="border-t border-gray-100 bg-white px-6 pt-3 text-[11px] font-bold text-yellow-600">
              Você está digitando...
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 border-t border-gray-100 bg-white px-6 py-5"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-500"
            >
              <Paperclip size={20} />
            </button>

            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Digite sua mensagem..."
              className="h-12 flex-1 rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
            />

            <button
              type="submit"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
            >
              <SendHorizontal size={20} fill="currentColor" />
            </button>
          </form>
        </section>

        <aside className="space-y-5">
          <BudgetSummaryCard
            proposal={lastProposal}
            status={budget.status}
            canAccept={canClientAct}
            canCounterOffer={canClientAct}
            canPay={canPay}
            onAccept={handleAcceptProposal}
            onCounterOffer={handleOpenCounterProposalModal}
            onPay={handleMarkAsPaid}
          />

          <section className="rounded-[28px] border border-green-100 bg-green-50 p-5 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <LockKeyhole size={18} />
              </div>

              <div>
                <h3 className="text-sm font-black text-green-900">
                  Pagamento Seguro
                </h3>

                <p className="mt-1 text-xs font-medium leading-relaxed text-green-700">
                  No back-end real, depois do orçamento ficar ACEITO, o botão
                  deve chamar a rota de pagamento.
                </p>

                <Link
                  href="/pagamento"
                  className="mt-3 inline-block text-xs font-black text-green-600 hover:underline"
                >
                  Ir para pagamento
                </Link>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-yellow-500" />

              <h3 className="text-sm font-black text-gray-950">
                Dicas de Segurança
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex gap-3 text-xs font-medium leading-relaxed text-gray-500">
                <Info size={15} className="mt-0.5 shrink-0 text-yellow-500" />
                Mantenha toda a negociação dentro do chat.
              </li>

              <li className="flex gap-3 text-xs font-medium leading-relaxed text-gray-500">
                <Clock3
                  size={15}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />
                Nunca faça pagamentos fora da plataforma.
              </li>

              <li className="flex gap-3 text-xs font-medium leading-relaxed text-gray-500">
                <BadgeCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />
                Verifique as avaliações do prestador antes de aceitar.
              </li>
            </ul>
          </section>
        </aside>
      </main>

      <CounterProposalModal
        isOpen={isCounterModalOpen}
        counterProposal={counterProposal}
        onChange={setCounterProposal}
        onClose={() => setIsCounterModalOpen(false)}
        onSubmit={handleSendCounterProposal}
      />
    </div>
  );
}
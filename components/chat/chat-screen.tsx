"use client";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Loader2,
  MapPin,
  MoreVertical,
  Paperclip,
  RefreshCcw,
  Search,
  SendHorizontal,
  X,
} from "lucide-react";

import { BudgetSummaryCard } from "@/components/chat/budget-summary-card";
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import { CounterProposalModal } from "@/components/chat/counter-proposal-modal";
import {
  BudgetProposal,
  BudgetStatus,
  ChatMessage,
  ChatUserRole,
} from "@/components/chat/chat-types";
import {
  formatDateForInput,
  getCurrentTime,
  statusContent,
} from "@/components/chat/chat-utils";
import { Button } from "@/components/ui/button";
import {
  aceitarOrcamento,
  encontrarOrcamentoPorId,
  enviarContraProposta,
  OrcamentoApi,
} from "@/app/api/orcamentos";
import { enviarMensagem, getMensagens, MensagemApi } from "@/app/api/mensagens";
import { realizarPagamento } from "@/app/api/pagamentos";

interface ChatScreenProps {
  currentUserRole: ChatUserRole;
  budgetId: string;
  serviceId?: string;
}

interface ProposalForm {
  description: string;
  value: string;
  serviceDate: string;
}

interface ChatData {
  budgetId: string;
  serviceId?: string;
  serviceTitle: string;
  serviceCode: string;
  location: string;
  serviceDate: string;
  description: string;
  clientName: string;
  providerName: string;
  status: BudgetStatus;
  proposal: BudgetProposal;
  messages: ChatMessage[];
}

function normalizeRole(role?: string): ChatUserRole {
  const normalized = role?.toLowerCase();

  if (
    normalized === "provider" ||
    normalized === "prestador" ||
    normalized === "professional"
  ) {
    return "prestador";
  }

  return "cliente";
}

function normalizeBudgetStatus(apiBudget?: OrcamentoApi | null): BudgetStatus {
  const rawStatus = apiBudget?.status?.toUpperCase();

  if (rawStatus && rawStatus in BudgetStatus) {
    return rawStatus as BudgetStatus;
  }

  if (apiBudget?.aprovoval || apiBudget?.approved) {
    return BudgetStatus.ACEITO;
  }

  return BudgetStatus.AGUARDANDO_CLIENTE;
}

function normalizeMessage(message: MensagemApi): ChatMessage {
  const sender = message.sender ?? message.user;
  const role = normalizeRole(message.author ?? message.role ?? sender?.role);

  const createdAt = message.createdAt ?? message.created_at;

  const time = createdAt
    ? new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(createdAt))
    : getCurrentTime();

  return {
    id: Number(message.id?.replace(/\D/g, "").slice(0, 10)) || Date.now(),
    author: role,
    text: message.text ?? undefined,
    image: message.imageUrl ?? message.image_url ?? undefined,
    time,
  };
}

function normalizeBudget(
  budget: OrcamentoApi | null,
  budgetId: string,
  serviceId?: string,
): Omit<ChatData, "messages"> {
  const address = budget?.service?.address;

  const location = address
    ? [
        address.rua,
        address.numero,
        address.bairro,
        address.cidade,
        address.estado,
      ]
        .filter(Boolean)
        .join(", ")
    : "Endereço do serviço";

  const estimatedDate =
    budget?.estimatedDate ??
    budget?.estimated_date ??
    new Date().toISOString();

  const price = Number(budget?.price ?? budget?.value ?? 0);

  return {
    budgetId,
    serviceId,
    serviceTitle: budget?.service?.title ?? "Orçamento do serviço",
    serviceCode: budget?.service?.id ?? serviceId ?? budgetId,
    location,
    serviceDate: estimatedDate,
    description:
      budget?.service?.description ??
      budget?.description ??
      "Detalhes do serviço ainda não carregados.",
    clientName:
      budget?.client?.name ??
      budget?.cliente?.name ??
      budget?.service?.client?.name ??
      budget?.service?.user?.name ??
      "Cliente",
    providerName:
      budget?.provider?.name ?? budget?.prestador?.name ?? "Prestador",
    status: normalizeBudgetStatus(budget),
    proposal: {
      source: "original",
      description: budget?.description ?? "Proposta enviada pelo prestador.",
      value: price,
      serviceDate: estimatedDate,
    },
  };
}

export function ChatScreen({
  currentUserRole,
  budgetId,
  serviceId,
}: ChatScreenProps) {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [message, setMessage] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const [proposalForm, setProposalForm] = useState<ProposalForm>({
    description: "",
    value: "",
    serviceDate: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isCliente = currentUserRole === "cliente";
  const isPrestador = currentUserRole === "prestador";

  const currentStatus = chatData
    ? statusContent[chatData.status]
    : statusContent[BudgetStatus.AGUARDANDO_CLIENTE];

  const otherUserName = chatData
    ? isCliente
      ? chatData.providerName
      : chatData.clientName
    : "";

  const canClienteAcceptProposal =
    isCliente && chatData?.status === BudgetStatus.AGUARDANDO_CLIENTE;

  const canClienteCounterOffer =
    isCliente && chatData?.status === BudgetStatus.AGUARDANDO_CLIENTE;

  const canPrestadorAcceptCounterOffer =
    isPrestador && chatData?.status === BudgetStatus.AGUARDANDO_PRESTADOR;

  const canPrestadorCounterOffer =
    isPrestador && chatData?.status === BudgetStatus.AGUARDANDO_PRESTADOR;

  const canAccept =
    canClienteAcceptProposal || canPrestadorAcceptCounterOffer;

  const canCounterOffer =
    canClienteCounterOffer || canPrestadorCounterOffer;

  const canPay = isCliente && chatData?.status === BudgetStatus.ACEITO;

  const loadChat = useCallback(async () => {
    if (!budgetId) {
      setError("Nenhum orçamento foi selecionado para abrir o chat.");
      setIsLoading(false);
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const [apiMessages, apiBudget] = await Promise.all([
        getMensagens(budgetId),
        encontrarOrcamentoPorId({
          budgetId,
          serviceId,
          currentUserRole,
        }),
      ]);

      const baseBudget = normalizeBudget(apiBudget, budgetId, serviceId);

      setChatData({
        ...baseBudget,
        messages: apiMessages.map(normalizeMessage),
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar o chat.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [budgetId, serviceId, currentUserRole]);

  useEffect(() => {
    loadChat();
  }, [loadChat]);

  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!chatData) return;
    if (!message.trim() && !attachedImage) return;

    try {
      setIsSendingMessage(true);

      const sentMessage = await enviarMensagem({
        budgetId: chatData.budgetId,
        text: message.trim(),
        imageUrl: attachedImage ?? undefined,
      });

      setChatData((current) => {
        if (!current) return current;

        return {
          ...current,
          messages: [...current.messages, normalizeMessage(sentMessage)],
        };
      });

      setMessage("");
      setAttachedImage(null);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a mensagem.",
      );
    } finally {
      setIsSendingMessage(false);
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAttachedImage(preview);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openProposalModal() {
    if (!chatData) return;

    setProposalForm({
      description: chatData.proposal.description,
      value: String(chatData.proposal.value),
      serviceDate: formatDateForInput(chatData.proposal.serviceDate),
    });

    setIsProposalModalOpen(true);
  }

  async function handleSubmitProposal(event: FormEvent) {
    event.preventDefault();

    if (!chatData) return;

    const parsedValue = Number(
      proposalForm.value.replace(/\./g, "").replace(",", "."),
    );

    if (!proposalForm.description.trim()) {
      alert("Informe a descrição da proposta.");
      return;
    }

    if (!parsedValue || parsedValue <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    if (!proposalForm.serviceDate) {
      alert("Informe a data estimada.");
      return;
    }

    try {
      await enviarContraProposta(chatData.budgetId, {
        price: parsedValue,
        description: proposalForm.description,
        estimatedDate: new Date(proposalForm.serviceDate).toISOString(),
      });

      await enviarMensagem({
        budgetId: chatData.budgetId,
        text: isCliente
          ? "Enviei uma contraproposta para esse orçamento."
          : "Enviei uma nova proposta para esse orçamento.",
      });

      setIsProposalModalOpen(false);
      await loadChat();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a proposta.",
      );
    }
  }

  async function handleAcceptProposal() {
    if (!chatData) return;

    try {
      await aceitarOrcamento(chatData.budgetId);

      await enviarMensagem({
        budgetId: chatData.budgetId,
        text: isCliente
          ? "Aceitei a proposta enviada."
          : "Aceitei a contraproposta do cliente.",
      });

      await loadChat();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível aceitar o orçamento.",
      );
    }
  }

  async function handlePay() {
    if (!chatData) return;

    try {
      await realizarPagamento({
        budgetId: chatData.budgetId,
        method: "PIX",
      });

      await enviarMensagem({
        budgetId: chatData.budgetId,
        text: "Pagamento realizado com sucesso.",
      });

      await loadChat();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar o pagamento.",
      );
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-10">
        <div className="flex items-center gap-3 rounded-3xl border border-yellow-100 bg-white px-6 py-5 text-sm font-bold text-gray-500 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
          Carregando chat do orçamento...
        </div>
      </main>
    );
  }

  if (error || !chatData) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-10">
        <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-black text-gray-950">
            Não foi possível abrir o chat
          </h2>

          <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
            {error || "Verifique se o orçamento existe e tente novamente."}
          </p>

          <Button
            type="button"
            onClick={loadChat}
            className="mt-5 rounded-2xl bg-yellow-400 font-black text-gray-950 hover:bg-yellow-500"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[300px_1fr_300px]">
      <aside className="space-y-5">
        <button
          type="button"
          onClick={() => history.back()}
          className="flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-gray-700"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <section className="rounded-[28px] border border-yellow-100 bg-white p-6 shadow-sm">
          <span
            className={`mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${currentStatus.badge}`}
          >
            {currentStatus.label}
          </span>

          <h1 className="text-2xl font-black leading-tight text-gray-950">
            {chatData.serviceTitle}
          </h1>

          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            ID: #{chatData.serviceCode}
          </p>

          <div className="mt-6 space-y-5">
            <InfoItem
              icon={<MapPin size={18} />}
              label="Localização"
              value={chatData.location}
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Data estimada"
              value={new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(chatData.serviceDate))}
            />

            <InfoItem
              icon={<FileText size={18} />}
              label="Descrição"
              value={chatData.description}
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-yellow-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-black text-gray-950">Mensagens</h2>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />

            <input
              placeholder="Buscar conversa..."
              className="w-full rounded-2xl bg-gray-50 py-2.5 pr-4 pl-10 text-xs font-medium outline-none"
            />
          </div>

          <div className="rounded-2xl border border-yellow-100 bg-[#FFFCF5] p-4">
            <div className="mb-1 flex items-start justify-between">
              <span className="text-sm font-black text-gray-950">
                {otherUserName}
              </span>

              <span className="text-[10px] font-bold text-gray-400">
                {chatData.messages.at(-1)?.time ?? "--:--"}
              </span>
            </div>

            <p className="truncate text-xs font-medium text-gray-500">
              {chatData.messages.at(-1)?.text ?? "Chat do orçamento"}
            </p>
          </div>
        </section>
      </aside>

      <section className="flex min-h-180 flex-col overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-gray-100 bg-yellow-50/50 px-6 py-4">
          <div>
            <p className="text-xs font-medium text-gray-500">
              Conversando com{" "}
              <span className="font-black text-gray-900">{otherUserName}</span>
            </p>

            <p className="mt-1 text-[11px] font-bold text-gray-400">
              {isCliente ? "Você está como cliente" : "Você está como prestador"}
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
              Chat do orçamento #{chatData.budgetId}
            </span>
          </div>

          {chatData.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <h3 className="text-lg font-black text-gray-950">
                  Nenhuma mensagem ainda
                </h3>

                <p className="mt-2 text-sm font-medium text-gray-500">
                  Envie uma mensagem para iniciar a conversa deste orçamento.
                </p>
              </div>
            </div>
          ) : (
            chatData.messages.map((chat) => (
              <ChatMessageBubble
                key={`${chat.id}-${chat.time}`}
                message={chat}
                currentUserRole={currentUserRole}
                providerName={chatData.providerName}
                clientName={chatData.clientName}
              />
            ))
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
            disabled={isSendingMessage}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95 disabled:opacity-60"
          >
            {isSendingMessage ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <SendHorizontal size={20} fill="currentColor" />
            )}
          </button>
        </form>
      </section>

      <aside className="space-y-5">
        <BudgetSummaryCard
          proposal={chatData.proposal}
          status={chatData.status}
          canAccept={canAccept}
          canCounterOffer={canCounterOffer}
          canPay={canPay}
          onAccept={handleAcceptProposal}
          onCounterOffer={openProposalModal}
          onPay={handlePay}
        />
      </aside>

      <CounterProposalModal
        isOpen={isProposalModalOpen}
        counterProposal={proposalForm}
        onChange={setProposalForm}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmit={handleSubmitProposal}
      />
    </main>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}
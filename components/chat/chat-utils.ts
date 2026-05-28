import { BudgetStatus } from "./chat-types";

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDateForInput = (date: string) => {
  return date.slice(0, 16);
};

export const formatServiceDate = (date: string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const getCurrentTime = () => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
};

export const statusContent: Record<
  BudgetStatus,
  {
    label: string;
    badge: string;
    helper: string;
  }
> = {
  [BudgetStatus.AGUARDANDO_CLIENTE]: {
    label: "Aguardando cliente",
    badge: "bg-yellow-100 text-yellow-700",
    helper:
      "O prestador enviou uma proposta. O cliente pode aceitar ou lançar uma contraproposta.",
  },
  [BudgetStatus.AGUARDANDO_PRESTADOR]: {
    label: "Aguardando prestador",
    badge: "bg-blue-100 text-blue-700",
    helper:
      "O cliente enviou uma contraproposta. Agora o prestador precisa aceitar ou responder.",
  },
  [BudgetStatus.ACEITO]: {
    label: "Aguardando pagamento",
    badge: "bg-green-100 text-green-700",
    helper:
      "A proposta foi aceita. O próximo passo é realizar o pagamento seguro.",
  },
  [BudgetStatus.PAGO]: {
    label: "Pago",
    badge: "bg-emerald-100 text-emerald-700",
    helper: "Pagamento confirmado. O serviço pode seguir no fluxo normal.",
  },
  [BudgetStatus.RECUSADO]: {
    label: "Recusado",
    badge: "bg-red-100 text-red-700",
    helper: "Essa negociação foi encerrada.",
  },
};
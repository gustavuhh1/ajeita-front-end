export type ChatUserRole = "cliente" | "prestador";

export type MessageAuthor = "cliente" | "prestador" | "system";

export type ProposalSource = "original" | "counter";

export enum BudgetStatus {
  AGUARDANDO_CLIENTE = "AGUARDANDO_CLIENTE",
  AGUARDANDO_PRESTADOR = "AGUARDANDO_PRESTADOR",
  ACEITO = "ACEITO",
  PAGO = "PAGO",
  RECUSADO = "RECUSADO",
}

export interface BudgetProposal {
  source: ProposalSource;
  description: string;
  value: number;
  serviceDate: string;
}

export interface BudgetState extends BudgetProposal {
  status: BudgetStatus;
}

export interface ChatMessage {
  id: number;
  author: MessageAuthor;
  text?: string;
  image?: string;
  time: string;
  proposal?: BudgetProposal;
}
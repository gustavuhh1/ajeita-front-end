import api from "@/lib/api";

export interface MensagemApi {
  id?: string;
  budgetId?: string;
  budget_id?: string;
  text?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  createdAt?: string;
  created_at?: string;
  sender?: {
    id?: string;
    name?: string;
    role?: string;
  };
  user?: {
    id?: string;
    name?: string;
    role?: string;
  };
  author?: string;
  role?: string;
}

export interface EnviarMensagemInput {
  budgetId: string;
  text: string;
  imageUrl?: string;
}

function normalizeListResponse(data: MensagemApi[] | { messages?: MensagemApi[]; mensagens?: MensagemApi[] }) {
  if (Array.isArray(data)) return data;
  return data.messages ?? data.mensagens ?? [];
}

export async function getMensagens(budgetId: string) {
  const response = await api.get<MensagemApi[] | { messages?: MensagemApi[]; mensagens?: MensagemApi[] }>(
    `/mensagens/${budgetId}`,
  );

  return normalizeListResponse(response.data);
}

export async function enviarMensagem(data: EnviarMensagemInput) {
  const response = await api.post<MensagemApi>("/mensagens", {
    budgetId: data.budgetId,
    text: data.text,
    imageUrl: data.imageUrl ?? "",
  });

  return response.data;
}
import api from "@/lib/api";

export interface NotificacaoApi {
  id: string;
  title?: string;
  message?: string;
  text?: string;
  type?: string;
  read?: boolean;
  lida?: boolean;
  createdAt?: string;
  created_at?: string;
}

export async function getNotificacoes() {
  const response = await api.get<NotificacaoApi[]>("/notificacoes");
  return response.data;
}

export async function marcarTodasNotificacoesComoLidas() {
  const response = await api.patch("/notificacoes/lidas");
  return response.data;
}

export async function marcarNotificacaoComoLida(id: string) {
  const response = await api.patch(`/notificacoes/${id}/lida`);
  return response.data;
}
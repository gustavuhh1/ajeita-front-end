import api from "@/lib/api";

export interface PagamentoApi {
  id: string;
  budgetId?: string;
  budget_id?: string;
  method?: string;
  status?: string;
  value?: number;
  amount?: number;
  createdAt?: string;
  created_at?: string;
}

export interface RealizarPagamentoInput {
  budgetId: string;
  method: string;
}

export async function realizarPagamento(data: RealizarPagamentoInput) {
  const response = await api.post<PagamentoApi>("/pagamentos", {
    budgetId: data.budgetId,
    method: data.method,
  });

  return response.data;
}
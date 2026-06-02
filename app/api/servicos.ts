import api from "@/lib/api";
import { Servico } from "@/types";

export async function getServicos(): Promise<Servico[]> {
  const res = await api.get<Servico[]>("/servicos");
  return res.data;
}

export async function getServico(id: number): Promise<Servico | null> {
  const res = await api.get<Servico>(`/servicos/${id}`);
  return res.data ?? null;
}

import api from "@/lib/api";

export type OrcamentoStatus =
  | "AGUARDANDO_CLIENTE"
  | "AGUARDANDO_PRESTADOR"
  | "ACEITO"
  | "PAGO"
  | "AGENDADO"
  | "EM_ANDAMENTO"
  | "FINALIZADO"
  | "RECUSADO"
  | "CANCELADO"
  | string;

export interface OrcamentoApi {
  id: string;
  serviceId?: string;
  service_id?: string;
  price?: number;
  value?: number;
  description?: string;
  estimatedDate?: string;
  estimated_date?: string;
  status?: OrcamentoStatus;
  aprovoval?: boolean;
  approved?: boolean;
  service?: {
    id?: string;
    title?: string;
    description?: string;
    images_url?: string[];
    client?: {
      id?: string;
      name?: string;
      image?: string;
    };
    user?: {
      id?: string;
      name?: string;
      image?: string;
    };
    address?: {
      rua?: string;
      numero?: string;
      bairro?: string;
      cidade?: string;
      estado?: string;
    };
  };
  provider?: {
    id?: string;
    name?: string;
    image?: string;
  };
  prestador?: {
    id?: string;
    name?: string;
    image?: string;
  };
  client?: {
    id?: string;
    name?: string;
    image?: string;
  };
  cliente?: {
    id?: string;
    name?: string;
    image?: string;
  };
}

export interface CriarOrcamentoInput {
  serviceId: string;
  price: number;
  description: string;
  estimatedDate: string;
}

export interface ContraPropostaInput {
  price: number;
  description: string;
  estimatedDate: string;
}

function normalizeListResponse(data: OrcamentoApi[] | { budgets?: OrcamentoApi[]; orcamentos?: OrcamentoApi[] }) {
  if (Array.isArray(data)) return data;
  return data.budgets ?? data.orcamentos ?? [];
}

export async function getMeusOrcamentos() {
  const response = await api.get<OrcamentoApi[] | { budgets?: OrcamentoApi[]; orcamentos?: OrcamentoApi[] }>(
    "/orcamentos/me",
  );

  return normalizeListResponse(response.data);
}

export async function getOrcamentosPorServico(serviceId: string) {
  const response = await api.get<OrcamentoApi[] | { budgets?: OrcamentoApi[]; orcamentos?: OrcamentoApi[] }>(
    `/orcamentos/${serviceId}`,
  );

  return normalizeListResponse(response.data);
}

export async function criarOrcamento(data: CriarOrcamentoInput) {
  const response = await api.post<OrcamentoApi>("/orcamentos", {
    serviceId: data.serviceId,
    price: data.price,
    description: data.description,
    estimatedDate: data.estimatedDate,
  });

  return response.data;
}

export async function enviarContraProposta(
  id: string,
  data: ContraPropostaInput,
) {
  const response = await api.patch<OrcamentoApi>(
    `/orcamentos/${id}/contra-proposta`,
    {
      price: data.price,
      description: data.description,
      estimatedDate: data.estimatedDate,
    },
  );

  return response.data;
}

export async function aceitarOrcamento(id: string) {
  const response = await api.patch<OrcamentoApi>(`/orcamentos/${id}/aceitar`);
  return response.data;
}

export async function encontrarOrcamentoPorId({
  budgetId,
  serviceId,
  currentUserRole,
}: {
  budgetId: string;
  serviceId?: string;
  currentUserRole: "cliente" | "prestador";
}) {
  if (currentUserRole === "prestador") {
    const orcamentos = await getMeusOrcamentos();
    return orcamentos.find((orcamento) => orcamento.id === budgetId) ?? null;
  }

  if (serviceId) {
    const orcamentos = await getOrcamentosPorServico(serviceId);
    return orcamentos.find((orcamento) => orcamento.id === budgetId) ?? null;
  }

  return null;
}
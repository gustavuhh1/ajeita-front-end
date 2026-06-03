import api from "@/lib/api";

export interface ServicoApi {
  id: string;
  title: string;
  description: string;
  images_url?: string[];
  categoryIds?: string[];
  address_id?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  address?: {
    id?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    ponto_de_referencia?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
    latitude?: number;
    longitude?: number;
  };
  categories?: {
    id: string;
    name: string;
  }[];
  client?: {
    id?: string;
    name?: string;
    image?: string;
  };
}

export interface ListarServicosParams {
  categoryId?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export interface CriarServicoInput {
  title: string;
  description: string;
  images_url: string[];
  categoryIds: string[];
  address_id: string;
}

export interface EditarServicoInput {
  title?: string;
  description?: string;
  images_url?: string[];
  address_id?: string;
}

export async function getServicos(params?: ListarServicosParams) {
  const response = await api.get<ServicoApi[]>("/servicos", {
    params: {
      categoryId: params?.categoryId,
      city: params?.city,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    },
  });

  return response.data;
}

export async function getMeusServicos() {
  const response = await api.get<ServicoApi[]>("/servicos/me");
  return response.data;
}

export async function getServico(id: string) {
  const response = await api.get<ServicoApi>(`/servicos/${id}`);
  return response.data;
}

export async function criarServico(data: CriarServicoInput) {
  const response = await api.post<ServicoApi>("/servicos", data);
  return response.data;
}

export async function editarServico(id: string, data: EditarServicoInput) {
  const response = await api.patch<ServicoApi>(`/servicos/${id}`, data);
  return response.data;
}

export async function deletarServico(id: string) {
  const response = await api.delete(`/servicos/${id}`);
  return response.data;
}
import api from "@/lib/api";

export interface EnderecoApi {
  id: string;
  rua: string;
  numero: string;
  complemento?: string;
  ponto_de_referencia?: string;
  cep: string;
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
  principal?: boolean;
  isMain?: boolean;
}

export interface CriarEnderecoInput {
  rua: string;
  numero: string;
  complemento?: string;
  ponto_de_referencia?: string;
  cep: string;
  cidade: string;
  estado: string;
  latitude?: number;
  longitude?: number;
}

export async function criarEndereco(data: CriarEnderecoInput) {
  const response = await api.post<EnderecoApi>("/enderecos", {
    rua: data.rua,
    numero: data.numero,
    complemento: data.complemento ?? "",
    ponto_de_referencia: data.ponto_de_referencia ?? "",
    cep: data.cep,
    cidade: data.cidade,
    estado: data.estado,
    latitude: data.latitude ?? 0,
    longitude: data.longitude ?? 0,
  });

  return response.data;
}

export async function getEnderecos() {
  const response = await api.get<EnderecoApi[]>("/enderecos");
  return response.data;
}

export async function getEndereco(id: string) {
  const response = await api.get<EnderecoApi>(`/enderecos/${id}`);
  return response.data;
}

export async function deletarEndereco(id: string) {
  const response = await api.delete(`/enderecos/${id}`);
  return response.data;
}

export async function definirEnderecoPrincipal(id: string) {
  const response = await api.patch<EnderecoApi>(`/enderecos/${id}/principal`);
  return response.data;
}
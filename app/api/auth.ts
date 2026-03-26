import api from "@/lib/api";
import { UserProvider } from "@/types";
import { FormRegisterData } from "../profissional/cadastro/page";

export async function loginPrestador(
  email: string,
  password: string,
): Promise<UserProvider | null> {
  const res = await api.get<UserProvider[]>("/prestadores");

  const found = res.data.find(
    (p) => p.email === email && p.password === password,
  );
  // Devolve o usuário encontrado ou null se não houver correspondência
  return found ?? null;
}

export async function registerPrestador(
  data: FormRegisterData,
): Promise<number | null> {
  const res = await api.post<UserProvider>("/prestadores", data);
  // Devolve o status da resposta para indicar sucesso ou falha
  return res.status ?? null;
}

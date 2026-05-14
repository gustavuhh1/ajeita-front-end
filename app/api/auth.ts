import api from "@/lib/api";
import { UserClient, UserProvider } from "@/types";
import { FormRegisterData } from "../profissional/cadastro/page";
import { RegisterClientForm } from "../auth/components/register-form";
import { LoginClientForm } from "../auth/components/login-form";

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

export async function loginCliente(
  data: LoginClientForm,
): Promise<UserClient | null> {
  const res = await api.get<UserClient[]>("/clientes");
  const found = res.data.find(
    (c) => c.email === data.email && c.password === data.password,
  );
  return found ?? null;
}

export async function registerCliente(
  data: RegisterClientForm,
): Promise<number | null> {
  const res = await api.post<UserClient>("/clientes", data);
  return res.status ?? null;
}

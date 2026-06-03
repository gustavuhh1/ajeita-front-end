import api from "@/lib/api";

export interface LoginInput {
  email: string;
  password: string;
}

export interface ClienteRegisterInput {
  name: string;
  email: string;
  image?: string;
  password: string;
  cpf: string;
  phone?: string;
  telefone?: string;
}

export interface PrestadorRegisterInput {
  name: string;
  email: string;
  password: string;
  cpf: string;
  image?: string | File | null;
  phone?: string;
  birthDate?: string;
  description?: string;
  bio?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}

export interface ForgetPasswordInput {
  email: string;
  redirectTo: string;
}

export interface ResetPasswordInput {
  newPassword: string;
  token: string;
}

function savePossibleAuthData(data: unknown) {
  if (typeof window === "undefined") return;
  if (!data || typeof data !== "object") return;

  const response = data as {
    token?: string;
    accessToken?: string;
    session?: {
      token?: string;
    };
    user?: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  };

  const token =
    response.token || response.accessToken || response.session?.token;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (response.user) {
    localStorage.setItem("user", JSON.stringify(response.user));
  }
}

export async function loginCliente(data: LoginInput) {
  const response = await api.post("/api/auth/sign-in/email", {
    email: data.email,
    password: data.password,
  });

  savePossibleAuthData(response.data);

  return response.data;
}

export async function loginPrestador(email: string, password: string) {
  const response = await api.post("/api/auth/sign-in/email", {
    email,
    password,
  });

  savePossibleAuthData(response.data);

  return response.data;
}

export async function logout() {
  const response = await api.post("/api/auth/sign-out");

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  return response.data;
}

export async function registerCliente(data: ClienteRegisterInput) {
  const response = await api.post("/clientes", {
    name: data.name,
    email: data.email,
    image: data.image ?? "",
    password: data.password,
    cpf: data.cpf,
    phone: data.phone ?? data.telefone ?? "",
  });

  return response.data;
}

export async function registerPrestador(data: PrestadorRegisterInput) {
  const response = await api.post("/prestadores", {
    name: data.name,
    email: data.email,
    password: data.password,
    cpf: data.cpf,
    image: typeof data.image === "string" ? data.image : "",
    phone: data.phone ?? "",
    birthDate: data.birthDate ?? new Date().toISOString(),
    description: data.description ?? data.bio ?? "",
  });

  return response.data;
}

export async function updatePerfil(data: {
  name?: string;
  phone?: string;
  description?: string;
  image?: string;
}) {
  const response = await api.patch("/perfil", data);
  return response.data;
}

export async function changePassword(data: ChangePasswordInput) {
  const response = await api.post("/change-password", {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    revokeOtherSessions: data.revokeOtherSessions ?? true,
  });

  return response.data;
}

export async function forgetPassword(data: ForgetPasswordInput) {
  const response = await api.post("/forget-password", {
    email: data.email,
    redirectTo: data.redirectTo,
  });

  return response.data;
}

export async function resetPassword(data: ResetPasswordInput) {
  const response = await api.post("/reset-password", {
    newPassword: data.newPassword,
    token: data.token,
  });

  return response.data;
}
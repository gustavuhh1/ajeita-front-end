"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Save, UserRound } from "lucide-react";

import { updatePerfil } from "@/app/api/auth";
import { PerfilPageLayout } from "../components/PerfilPageLayout";

interface StoredUser {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  description?: string;
}

export default function DadosPessoaisPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {
      const user = JSON.parse(storedUser) as StoredUser;

      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
      setImage(user.image ?? "");
    } catch {
      console.warn("Não foi possível ler os dados do usuário no localStorage.");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Informe seu nome.");
      return;
    }

    try {
      setIsSaving(true);

      const updatedUser = await updatePerfil({
        name,
        phone,
        image,
      });

      if (typeof window !== "undefined") {
        const previousUser = localStorage.getItem("user");

        const parsedPreviousUser = previousUser
          ? JSON.parse(previousUser)
          : {};

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...parsedPreviousUser,
            ...updatedUser,
            name,
            phone,
            image,
          }),
        );
      }

      setSuccess("Perfil atualizado com sucesso.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar seu perfil.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PerfilPageLayout
      title="Dados Pessoais"
      description="Atualize suas informações principais de cadastro."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm"
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
            <UserRound className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-950">
              Informações do perfil
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Esses dados serão usados para identificar sua conta.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-black text-gray-700">
              Nome completo
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-bold outline-none transition-all focus:border-yellow-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-gray-700">
              E-mail
            </label>

            <input
              value={email}
              disabled
              placeholder="seuemail@exemplo.com"
              className="h-12 w-full rounded-2xl border border-gray-100 bg-gray-100 px-5 text-sm font-bold text-gray-400 outline-none"
            />

            <p className="mt-2 text-xs font-medium text-gray-400">
              O e-mail não é atualizado por esta rota da API.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-gray-700">
              Telefone
            </label>

            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="(00) 00000-0000"
              className="h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-bold outline-none transition-all focus:border-yellow-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-gray-700">
              URL da imagem
            </label>

            <input
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://..."
              className="h-12 w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-bold outline-none transition-all focus:border-yellow-400 focus:bg-white"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="flex gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 text-base font-black text-gray-950 hover:bg-yellow-500 disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar alterações
              </>
            )}
          </button>
        </div>
      </form>
    </PerfilPageLayout>
  );
}
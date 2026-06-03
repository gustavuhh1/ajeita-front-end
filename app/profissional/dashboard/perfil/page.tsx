"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  ImageIcon,
  Loader2,
  Save,
  UserRound,
} from "lucide-react";

import { updatePerfil } from "@/app/api/auth";
import { PageShell } from "../../components/page-shell";

interface StoredUser {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  description?: string;
}

export default function PerfilPrestadorPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
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
      setDescription(user.description ?? "");
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
        description,
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
            description,
            image,
          }),
        );
      }

      setSuccess("Perfil profissional atualizado com sucesso.");
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
    <PageShell
      eyebrow="Provider · Perfil"
      title="Perfil profissional"
      description="Atualize as informações exibidas para clientes na plataforma."
    >
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-[1fr_340px]"
      >
        <section className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
              <UserRound className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-950">
                Dados do prestador
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Essas informações ajudam clientes a conhecerem seu trabalho.
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
                Descrição profissional
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                placeholder="Conte sobre sua experiência, especialidades e forma de atendimento..."
                className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm font-bold outline-none transition-all focus:border-yellow-400 focus:bg-white"
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
        </section>

        <aside className="rounded-[36px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
            <ImageIcon className="h-7 w-7" />
          </div>

          <h3 className="text-xl font-black text-gray-950">
            Imagem de perfil
          </h3>

          <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
            A API recebe uma URL de imagem. Por enquanto, informe uma URL
            pública.
          </p>

          <div className="mt-5">
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

          {image && (
            <div className="mt-5 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
              <img
                src={image}
                alt="Prévia do perfil"
                className="h-56 w-full object-cover"
              />
            </div>
          )}
        </aside>
      </form>
    </PageShell>
  );
}
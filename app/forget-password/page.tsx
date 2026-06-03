"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { forgetPassword } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Informe seu e-mail para continuar.");
      return;
    }

    try {
      setIsLoading(true);

      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/reset-password`
          : "/reset-password";

      await forgetPassword({
        email,
        redirectTo,
      });

      setSuccess(
        "Enviamos um link de recuperação para seu e-mail. Verifique sua caixa de entrada.",
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o e-mail de recuperação.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFCF5] px-6 py-10">
      <section className="w-full max-w-md rounded-3xl border border-yellow-100 bg-white p-8 shadow-sm">
        <Link
          href="/auth?mode=login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-yellow-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para login
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
            <Mail className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-black text-gray-950">
            Recuperar senha
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Digite o e-mail da sua conta para receber o link de redefinição de
            senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>

            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-2xl"
              autoComplete="email"
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

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-2xl bg-yellow-400 font-black text-gray-950 hover:bg-yellow-500 disabled:opacity-60"
          >
            {isLoading ? "Enviando..." : "Enviar link de recuperação"}
          </Button>
        </form>
      </section>
    </main>
  );
}
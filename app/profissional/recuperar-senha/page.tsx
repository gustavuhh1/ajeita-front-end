"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react";
import { forgetPassword } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "../components/header";
import Footer from "../components/footer";

export default function RecuperarSenhaPrestadorPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Informe o e-mail cadastrado para continuar.");
      return;
    }

    try {
      setIsLoading(true);

      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/profissional/redefinir-senha`
          : "/profissional/redefinir-senha";

      await forgetPassword({
        email,
        redirectTo,
      });

      setSuccess(
        "Link de recuperação enviado. Verifique seu e-mail para continuar.",
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o link de recuperação.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-svh flex-col bg-white">
      <Header variant="auth" />

      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <section className="w-full max-w-lg rounded-4xl border border-gray-100 bg-white p-8 shadow-lg">
          <Link
            href="/profissional/entrar"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-yellow-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para login
          </Link>

          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
              <KeyRound className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-950">
              Recuperação de senha
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Digite seu e-mail profissional para receber o link de redefinição.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>

              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="h-12 rounded-2xl pl-11 font-medium"
                  autoComplete="email"
                />

                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
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
              className="h-13 w-full rounded-2xl bg-yellow-400 text-base font-black text-gray-950 hover:bg-yellow-500 disabled:opacity-60"
            >
              {isLoading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>
        </section>
      </main>

      <Footer variant="auth" />
    </div>
  );
}
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldAlert,
} from "lucide-react";
import { resetPassword } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Token ausente. Solicite um novo link de recuperação.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A nova senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);

      await resetPassword({
        token,
        newPassword,
      });

      setSuccess("Senha redefinida com sucesso. Você já pode fazer login.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível redefinir sua senha.",
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

        <div className="mb-8 text-center">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl ${
              token
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {token ? (
              <LockKeyhole className="h-8 w-8" />
            ) : (
              <ShieldAlert className="h-8 w-8" />
            )}
          </div>

          <h1 className="text-2xl font-black text-gray-950">
            Redefinir senha
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {token
              ? "Crie uma nova senha para recuperar o acesso à sua conta."
              : "Não encontramos o token no link. Solicite uma nova recuperação."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordField
            id="newPassword"
            label="Nova senha"
            value={newPassword}
            onChange={setNewPassword}
            show={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirmar senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((current) => !current)}
          />

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
            disabled={!token || isLoading}
            className="h-12 w-full rounded-2xl bg-yellow-400 font-black text-gray-950 hover:bg-yellow-500 disabled:opacity-60"
          >
            {isLoading ? "Redefinindo..." : "Redefinir senha"}
          </Button>
        </form>
      </section>
    </main>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-2xl pr-12"
          autoComplete="new-password"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
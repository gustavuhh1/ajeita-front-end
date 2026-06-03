"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from "lucide-react";

import { changePassword } from "@/app/api/auth";
import { PageShell } from "../../components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PrestadorSegurancaPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [revokeOtherSessions, setRevokeOtherSessions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
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

      await changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions,
      });

      setSuccess("Senha alterada com sucesso.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar sua senha.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Provider · Segurança"
      title="Segurança da conta"
      description="Altere sua senha e mantenha seu acesso profissional protegido."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700">
              <KeyRound className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-950">
                Alterar senha
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Use sua senha atual para definir uma nova senha.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <PasswordField
              id="currentPassword"
              label="Senha atual"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrentPassword}
              onToggle={() => setShowCurrentPassword((current) => !current)}
              autoComplete="current-password"
            />

            <PasswordField
              id="newPassword"
              label="Nova senha"
              value={newPassword}
              onChange={setNewPassword}
              show={showNewPassword}
              onToggle={() => setShowNewPassword((current) => !current)}
              autoComplete="new-password"
            />

            <PasswordField
              id="confirmPassword"
              label="Confirmar nova senha"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((current) => !current)}
              autoComplete="new-password"
            />

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <input
                type="checkbox"
                checked={revokeOtherSessions}
                onChange={(event) => setRevokeOtherSessions(event.target.checked)}
                className="mt-1"
              />

              <div>
                <p className="text-sm font-black text-gray-800">
                  Encerrar outras sessões
                </p>

                <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">
                  Recomendado caso você tenha acessado sua conta em outro
                  dispositivo.
                </p>
              </div>
            </label>

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
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Alterando...
                </>
              ) : (
                "Alterar senha"
              )}
            </Button>
          </form>
        </section>

        <aside className="rounded-[36px] border border-blue-100 bg-blue-50 p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h3 className="text-xl font-black text-blue-950">
            Conta profissional
          </h3>

          <p className="mt-2 text-sm font-medium leading-relaxed text-blue-700">
            Mantenha sua senha protegida para evitar alterações indevidas em
            orçamentos, agenda e atendimento ao cliente.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggle: () => void;
  autoComplete: string;
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
          className="h-12 rounded-2xl pr-12 font-medium"
          autoComplete={autoComplete}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
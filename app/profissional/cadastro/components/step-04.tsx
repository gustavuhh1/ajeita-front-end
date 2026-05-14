// app/cadastro/steps/Step04.tsx
"use client";

import { SealCheckIcon } from "@phosphor-icons/react";
import { MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Step04() {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-4xl bg-white px-4 py-8 text-center shadow-lg">
      {/* Ícone de verificação */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
        <SealCheckIcon
          weight="fill"
          className="h-12 w-12 fill-yellow-400 text-white"
        />
      </div>

      {/* Título e descrição */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Cadastro em Análise!
        </h2>
        <p className="max-w-xs text-sm text-gray-500">
          Seu perfil foi enviado com sucesso para nossa equipe. Estamos
          revisando suas informações e documentos para garantir a segurança da
          plataforma.
        </p>
      </div>

      {/* Card de aviso de e-mail */}
      <div className="flex w-full max-w-sm items-start gap-3 rounded-xl bg-blue-50 px-4 py-3 text-left">
        <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-blue-700">
            Fique de olho no seu e-mail
          </span>
          <span className="text-xs text-blue-500">
            Você será notificado assim que sua conta for aprovada. O prazo médio
            é de 24 horas.
          </span>
        </div>
      </div>

      {/* Botão de ação */}
      <button
        onClick={() => router.push("/profissional/dashboard")}
        data-testid="btn-ir-home"
        className="flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-yellow-400 py-4 text-base font-semibold text-gray-900 transition-colors hover:bg-yellow-500"
      >
        Entendi, ir para a Home
        <span>→</span>
      </button>
    </div>
  );
}

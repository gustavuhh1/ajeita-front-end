"use client";

import React, { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { PerfilPageLayout } from "../components/PerfilPageLayout";

export default function TrocarSenhaPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsSaved(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formData.novaSenha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setIsSaved(true);

    setFormData({
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    });
  };

  return (
    <PerfilPageLayout
      title="Trocar Senha"
      description="Atualize sua senha para manter sua conta segura."
    >
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* CARD PRINCIPAL */}
          <section className="overflow-hidden rounded-[36px] border border-gray-100 bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b border-gray-100 from-yellow-50 to-white px-8 py-7">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-400 text-white shadow-lg shadow-yellow-100">
                  <ShieldCheck size={30} />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-gray-950">
                    Segurança da Conta
                  </h2>

                  <p className="mt-1 text-sm font-medium text-gray-400">
                    Escolha uma senha forte para proteger suas informações.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-7 p-8">
              {/* SENHA ATUAL */}
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-gray-950">
                  Senha Atual
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  />

                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.senhaAtual}
                    onChange={(event) =>
                      handleChange("senhaAtual", event.target.value)
                    }
                    placeholder="Digite sua senha atual"
                    className="h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-14 text-sm font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(!showCurrentPassword)
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* NOVA SENHA */}
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-gray-950">
                  Nova Senha
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  />

                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={formData.novaSenha}
                    onChange={(event) =>
                      handleChange("novaSenha", event.target.value)
                    }
                    placeholder="Digite sua nova senha"
                    className="h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-14 text-sm font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* REGRAS */}
                <div className="mt-4 rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-yellow-700">
                    Requisitos da senha
                  </p>

                  <ul className="mt-3 space-y-2 text-sm font-medium text-yellow-800">
                    <li>• Pelo menos 8 caracteres</li>
                    <li>• Uma letra maiúscula</li>
                    <li>• Um número</li>
                    <li>• Um caractere especial</li>
                  </ul>
                </div>
              </div>

              {/* CONFIRMAR */}
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-gray-950">
                  Confirmar Nova Senha
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmarSenha}
                    onChange={(event) =>
                      handleChange("confirmarSenha", event.target.value)
                    }
                    placeholder="Confirme sua nova senha"
                    className="h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-14 text-sm font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ALERTA */}
          {isSaved && (
            <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-sm font-black text-green-700">
              <Check size={18} />
              Sua senha foi alterada com sucesso.
            </div>
          )}

          {/* BOTÕES */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-7 py-4 text-sm font-black text-gray-600 transition-all hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-yellow-400 px-9 py-4 text-sm font-black text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
            >
              Atualizar Senha
            </button>
          </div>
        </form>
      </div>
    </PerfilPageLayout>
  );
}
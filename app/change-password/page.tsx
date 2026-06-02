"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

export default function ChangePasswordPage() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro("");
    setSucesso(false);

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 6) {
      setErro("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senhaAtual === novaSenha) {
      setErro("A nova senha precisa ser diferente da senha atual.");
      return;
    }

    try {
      setCarregando(true);

      /**
       * Aqui futuramente entra a integração com o BetterAuth.
       *
       * Exemplo futuro:
       *
       * await authClient.changePassword({
       *   currentPassword: senhaAtual,
       *   newPassword: novaSenha,
       * });
       */

      setSucesso(true);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (error) {
      setErro("Não foi possível alterar a senha. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <LockKeyhole
                className="text-yellow-500"
                size={30}
                strokeWidth={1.8}
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Alterar senha
            </h1>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Informe sua senha atual e escolha uma nova senha para manter sua
              conta segura.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="senhaAtual"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Senha atual
              </label>

              <div className="relative">
                <input
                  id="senhaAtual"
                  type={mostrarSenhaAtual ? "text" : "password"}
                  value={senhaAtual}
                  onChange={(event) => setSenhaAtual(event.target.value)}
                  placeholder="Digite sua senha atual"
                  className="w-full px-5 py-4 pr-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={
                    mostrarSenhaAtual ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  {mostrarSenhaAtual ? (
                    <EyeOff size={20} strokeWidth={1.7} />
                  ) : (
                    <Eye size={20} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="novaSenha"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Nova senha
              </label>

              <div className="relative">
                <input
                  id="novaSenha"
                  type={mostrarNovaSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(event) => setNovaSenha(event.target.value)}
                  placeholder="Digite sua nova senha"
                  className="w-full px-5 py-4 pr-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={mostrarNovaSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarNovaSenha ? (
                    <EyeOff size={20} strokeWidth={1.7} />
                  ) : (
                    <Eye size={20} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Confirmar nova senha
              </label>

              <div className="relative">
                <input
                  id="confirmarSenha"
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(event) => setConfirmarSenha(event.target.value)}
                  placeholder="Confirme sua nova senha"
                  className="w-full px-5 py-4 pr-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={
                    mostrarConfirmarSenha ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  {mostrarConfirmarSenha ? (
                    <EyeOff size={20} strokeWidth={1.7} />
                  ) : (
                    <Eye size={20} strokeWidth={1.7} />
                  )}
                </button>
              </div>
            </div>

            {erro && (
              <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-sm font-medium text-red-600">{erro}</p>
              </div>
            )}

            {sucesso && (
              <div className="rounded-2xl bg-green-50 border border-green-100 px-4 py-3 flex items-start gap-2">
                <CheckCircle2
                  className="text-green-600 mt-0.5"
                  size={18}
                  strokeWidth={1.8}
                />

                <p className="text-sm font-medium text-green-700 leading-relaxed">
                  Senha alterada com sucesso.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? "Alterando..." : "Alterar senha"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/cliente/perfil/seguranca"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
              Voltar para segurança
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
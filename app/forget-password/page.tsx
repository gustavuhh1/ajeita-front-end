"use client";

import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EsqueceuSenhaPage() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro("");
    setSucesso(false);

    if (!email.trim()) {
      setErro("Informe seu e-mail para continuar.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      setErro("Informe um e-mail válido.");
      return;
    }

    try {
      setCarregando(true);

      /**
       * Aqui futuramente entra a integração com o BetterAuth.
       *
       * A ideia será chamar a função responsável por solicitar
       * a redefinição de senha.
       *
       * Exemplo futuro:
       *
       * await authClient.forgetPassword({
       *   email,
       *   redirectTo: "/redefinir-senha",
       * });
       *
       * Ou a rota que vocês definirem no projeto.
       */

      setSucesso(true);
    } catch (error) {
      setErro("Não foi possível enviar o link de recuperação. Tente novamente.");
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
              <Mail className="text-yellow-500" size={30} strokeWidth={1.8} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Esqueceu sua senha?
            </h1>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Informe o e-mail cadastrado na sua conta. Enviaremos um link para
              você redefinir sua senha com segurança.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                E-mail
              </label>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Digite seu e-mail"
                  className="w-full px-5 py-4 pr-12 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium placeholder:text-gray-400"
                />

                <Mail
                  size={20}
                  strokeWidth={1.7}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                />
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
                  Link de recuperação enviado. Verifique seu e-mail para
                  continuar a redefinição da senha.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-yellow-500 transition-colors"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
              Voltar para o login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
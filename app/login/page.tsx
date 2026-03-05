"use client"

import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">

      {/* LADO ESQUERDO */}
      <div className="relative hidden w-1/2 lg:flex">
        <Image
          src="/login-bg.jpg"
          alt="casa"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-16 left-16 text-white max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Transforme sua casa
            com especialistas de confiança.
          </h1>

          <p className="mt-4 text-lg">
            Encontre os melhores profissionais para reparos e
            reformas residenciais em poucos cliques.
          </p>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="flex w-full flex-col justify-center px-12 lg:w-1/2">

        {/* LOGO */}
        <div className="absolute top-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
            🔧
          </div>
          <span className="font-semibold text-lg">Ajeitai</span>
          <span className="text-sm text-gray-500">- Para Clientes</span>
        </div>

        {/* CRIAR CONTA */}
        <div className="absolute right-10 top-8">
          <Link href="/auth" className="text-sm text-gray-700">
            Criar conta
          </Link>
        </div>

        <div className="max-w-md">

          <h2 className="text-3xl font-bold mb-2">
            Bem-vindo de volta!
          </h2>

          <p className="text-gray-500 mb-6">
            Acesse sua conta para solicitar e gerenciar seus serviços de manutenção.
          </p>

          {/* LOGIN SOCIAL */}
          <div className="flex gap-4 mb-6">
            <button className="flex flex-1 items-center justify-center gap-2 border rounded-full py-3">
              Google
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 border rounded-full py-3">
              Facebook
            </button>
          </div>

          <div className="text-center text-sm text-gray-400 mb-6">
            Ou continue com e-mail
          </div>

          {/* FORM */}
          <form className="space-y-4">

            <div>
              <label className="text-sm font-medium">E-mail</label>
              <input
                type="email"
                placeholder="voce@exemplo.com"
                className="w-full mt-1 border rounded-full px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 border rounded-full px-4 py-3"
              />
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Lembrar de mim
              </label>

              <Link href="#" className="text-yellow-600">
                Esqueceu sua senha?
              </Link>
            </div>

            <button className="w-full rounded-full bg-yellow-400 py-4 font-semibold">
              Entrar na conta
            </button>

          </form>

          <p className="text-center text-sm mt-6">
            Ainda não tem uma conta?{" "}
            <Link href="/auth" className="text-yellow-600">
              Cadastre-se gratuitamente
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-10">
            © 2024 Ajeitai. Todos os direitos reservados.
          </p>

        </div>

      </div>
    </div>
  )
}
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  GithubLogoIcon,
  LockIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // TODO: Implementar lógica de autenticação e validação de formulário

  return (
    <div className="flex min-h-screen">
      {/* LADO ESQUERDO */}
      <div className="relative hidden w-1/2 lg:flex">
        <Image src="/login-bg.jpg" alt="casa" fill className="object-cover" />

        {/* Gradiente fundo da imagem */}
        <div className="absolute inset-0 bg-linear-to-t from-black to-white opacity-50" />

        <div className="absolute bottom-16 left-16 max-w-md text-white">
          <h1 className="text-4xl leading-tight font-bold">
            Transforme sua casa com especialistas de confiança.
          </h1>

          <p className="mt-4 text-lg">
            Encontre os melhores profissionais para reparos e reformas
            residenciais em poucos cliques.
          </p>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="relative flex w-full flex-col justify-center px-12 lg:w-1/2">
        {/* LOGO */}
        <div className="absolute top-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
            {/* TODO: Mudar logo para a oficial */}
            🔧
          </div>
          <h1 className="text-2xl font-semibold">Ajeitai</h1>
          <p className="text-sm text-gray-500">- Para Clientes</p>
        </div>

        {/* CRIAR CONTA */}
        <div className="absolute top-8 right-10">
          <Link href="/register" className="font-semibold text-gray-700">
            Criar conta
          </Link>
        </div>

        <div className="flex h-full w-full items-center justify-center">
          <div className="max-w-md lg:max-w-xl">
            <div className="mb-5 flex flex-col items-start gap-8">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold">Bem-vindo de volta!</h2>
                <p className="text-gray-500">
                  Acesse sua conta para solicitar e gerenciar seus serviços de
                  manutenção.
                </p>
              </div>

              {/* LOGIN SOCIAL */}
              <div className="flex w-full gap-4">
                <Button
                  variant="custom"
                  size="xl"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-200 py-3 hover:bg-zinc-200"
                >
                  <Image
                    width="26"
                    height="26"
                    src="/google-icon.png"
                    alt="google-logo"
                  />
                  {/* TODO: Implementar login com Google */}
                  Google
                </Button>

                <Button
                  variant="custom"
                  size="xl"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-200 py-3 hover:bg-zinc-200"
                >
                  <GithubLogoIcon weight="bold" size={20} />
                  {/* TODO: Implementar login com Github */}
                  Github
                </Button>
              </div>
              <div className="flex w-full items-center justify-center gap-2 text-zinc-400">
                <hr className="flex-1 border-zinc-200" />
                <span className="text-center text-sm">
                  ou continue com e-mail
                </span>
                <hr className="flex-1 border-zinc-200" />
              </div>
            </div>

            {/* FORM */}
            <form className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    className="h-12 rounded-full pl-9 shadow-sm"
                  />
                  <EnvelopeSimpleIcon
                    weight="bold"
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="h-12 rounded-full pl-9 shadow-sm"
                  />
                  <LockIcon
                    weight="fill"
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  {!showPassword ? (
                    <EyeSlashIcon
                      weight="regular"
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                      size={20}
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <EyeIcon
                      weight="regular"
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                      size={20}
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <Label className="flex items-center gap-2">
                  {/* TODO: adicionar estado ao checkbox e atualizar o valor e aumentar duração de Session de acordo */}
                  <Checkbox />
                  <p className="text-sm font-medium">Lembrar de mim</p>
                </Label>

                {/* TODO: Implementar rota de recuperação de senha */}
                <Link
                  href="#"
                  className="text-sm font-medium text-yellow-600 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button
                size="xl"
                className="w-full rounded-full bg-yellow-400 py-4 font-semibold"
              >
                Entrar na conta
              </Button>
            </form>

            <p className="text-muted-foreground mt-6 text-center text-sm">
              Ainda não tem uma conta?{" "}
              <Link href="/register" className="text-yellow-600">
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <p className="text-center text-xs text-gray-400">
            © 2024 Ajeitai. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

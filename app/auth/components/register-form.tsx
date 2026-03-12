"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  IdentificationCardIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

const RegisterForm = () => {

  return (
    <div className="max-w-md lg:max-w-xl">
      <div className="mb-5 flex flex-col items-start gap-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Crie sua conta</h2>
          <p className="text-gray-500">
            Preencha os dados abaixo para começar a usar a plataforma.
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
          <span className="text-center text-sm">ou continue com e-mail</span>
          <hr className="flex-1 border-zinc-200" />
        </div>
      </div>

      {/* FORM */}
      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome Completo
          </Label>
          <div className="relative">
            <Input
              name="name"
              id="name"
              type="name"
              placeholder="Seu nome completo"
              className="h-12 rounded-full pl-9 shadow-sm"
            />
            <UserIcon
              weight="bold"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

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

        <div className="flex w-full items-center gap-4">
          <div className="flex-1 space-y-1">
            <Label htmlFor="cpf">
              CPF{" "}
              <span className="text-xs font-normal text-red-500">
                *Obrigatório
              </span>
            </Label>
            <div className="relative">
              <Input
                type="text"
                name="cpf"
                id="cpf"
                maxLength={14}
                placeholder="000.000.000-00"
                className="h-12 rounded-full pl-9 shadow-sm"
              />
              <IdentificationCardIcon
                weight="bold"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="telefone">Telefone </Label>
            <div className="relative">
              <Input
                type="tel"
                name="telefone"
                id="telefone"
                placeholder="(00) 00000-0000"
                className="h-12 rounded-full pl-9 shadow-sm"
              />
              <PhoneIcon
                weight="bold"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm font-medium">
            Senha
          </Label>
          <div className="relative">
            <Input
              type="password"
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
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirm-password" className="text-sm font-medium">
            Confirmar Senha
          </Label>
          <div className="relative">
            <Input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className="h-12 rounded-full pl-9 shadow-sm"
            />
            <LockIcon
              weight="duotone"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <Label className="flex items-center gap-2">
          {/* TODO: adicionar estado ao checkbox e atualizar o valor e aumentar duração de Session de acordo */}
          <Checkbox />
          <p className="text-sm font-medium">
            Li e concordo com os{" "}
            <a href="#" className="text-yellow-600 hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-yellow-600 hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </Label>

        <Button
          size="xl"
          className="w-full rounded-full bg-yellow-400 py-4 font-semibold"
        >
          Criar minha conta
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Já tem uma conta?{" "}
        <Button size="link" variant="link" className="text-yellow-600">
          Faça login
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;

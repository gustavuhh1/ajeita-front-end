"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  IdentificationCardIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schemeLogin = z
  .object({
    name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    cpf: z
      .string()
      .min(14, "CPF inválido")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato: 000.000.000-00"),
    telefone: z.string().optional(),
    password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    },
  );

type FormData = z.infer<typeof schemeLogin>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemeLogin),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // TODO: Implementar autenticação real e lidar com erros adequadamente
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const res = await api.post("/prestadores", data);
    if (res.status === 201) {
      alert("Conta criada com sucesso! Redirecionando para login...");
      // router.push("/auth?mode=login");
    }
    if (res.status !== 201) {
      alert("Ocorreu um erro ao criar sua conta. Tente novamente.");
    }

    setIsLoading(false);
  };
  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl">
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
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-medium">
            Nome Completo
          </Label>
          <div className="relative">
            <UserIcon
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Ex: Maria Silva"
                  className="h-12 rounded-full pl-9 shadow-sm"
                  autoComplete="name"
                />
              )}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm font-medium">
            E-mail
          </Label>
          <div className="relative">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="h-12 rounded-full pl-9 shadow-sm"
                  autoComplete="email"
                />
              )}
            />
            <EnvelopeSimpleIcon
              weight="bold"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
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
              {/* TODO: Ver Error dps */}
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    className="h-12 rounded-full pl-9 shadow-sm"
                    maxLength={14}
                    onChange={(e) => {
                      const masked = e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                      field.onChange(masked);
                    }}
                  />
                )}
              />
              <IdentificationCardIcon
                weight="bold"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            {errors.cpf && (
            <p className="text-xs text-red-500">{errors.cpf.message}</p>
          )}
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
          type="submit"
          disabled={isLoading}
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

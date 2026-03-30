"use client";

import { registerCliente } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  IdentificationCardIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schemeRegister = z
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

export type RegisterClientForm = z.infer<typeof schemeRegister>;

const RegisterForm = () => {
  const router = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: registerCliente,
    mutationKey: ["register-client"],
    onSuccess(data) {
      router.refresh();
      alert("Conta criada com sucesso!");
      console.log(data);
    },
    onError(error) {
      alert("Ocorreu um erro ao criar sua conta. Tente novamente.");
      console.error("Erro ao criar conta:", error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientForm>({
    resolver: zodResolver(schemeRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cpf: "",
      telefone: "",
    },
    mode: "onBlur",
  });

  // TODO: Implementar autenticação real e lidar com erros adequadamente
  const onSubmit = async (data: RegisterClientForm) => {
    await mutateAsync(data);
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
              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="h-12 rounded-full pl-9 shadow-sm"
                    maxLength={14}
                    onChange={(e) => {
                      const masked = e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{2})(\d)/, "($1) $2")
                        .replace(/(\d{5})(\d)/, "$1-$2")
                        .replace(/(-\d{4})\d+?$/, "$1");
                      field.onChange(masked);
                    }}
                  />
                )}
              />
              <PhoneIcon
                weight="bold"
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            {errors.telefone && (
              <p className="text-xs text-red-500">{errors.telefone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm font-medium">
            Senha
          </Label>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 rounded-full pl-9 shadow-sm"
                  minLength={8}
                />
              )}
            />
            <LockIcon
              weight="fill"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmar Senha
          </Label>
          <div className="relative">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 rounded-full pl-9 shadow-sm"
                  minLength={8}
                />
              )}
            />
            <LockIcon
              weight="duotone"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Label className="flex items-center gap-2">
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
          disabled={isPending}
        >
          Criar minha conta
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Já tem uma conta?{" "}
        <Button
          size="link"
          variant="link"
          className="text-yellow-600"
          onClick={() => router.push("/auth?mode=login")}
        >
          Faça login
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;

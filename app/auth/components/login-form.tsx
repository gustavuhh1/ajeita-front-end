"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EnvelopeSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  GithubLogoIcon,
  LockIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const schemeLogin = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 6 caracteres"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schemeLogin>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemeLogin),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const rememberMe = useWatch({ control, name: "rememberMe" });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: FormData) => {
      // TODO: Implementar autenticação real e lidar com erros adequadamente

      console.log(data);
      const res = await api.get("/users");
      const users = res.data as { email: string; password: string }[];

      const user = users.find(
        (u) => u.email === data.email && u.password === data.password,
      );
      if (!user) {
        throw new Error("E-mail ou senha incorretos");
      }
      return user;
    },
    mutationKey: ["login-client"],
    onSuccess(data) {
      if (data) {
        alert("Login bem-sucedido! Redirecionando...");
        reset();
      }
    },
    onError() {
      setError("email", { message: "E-mail ou senha incorretos" });
      setError("password", { message: "E-mail ou senha incorretos" });
      setValue("password", ""); // Limpa o campo de senha para segurança
    },
    retry: false, // Não tenta novamente automaticamente em caso de erro
  });
  const onSubmit = async (data: FormData) => {
    await mutateAsync(data);
  };

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl">
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
          <span className="text-center text-sm">ou continue com e-mail</span>
          <hr className="flex-1 border-zinc-200" />
        </div>
      </div>

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-full pl-9 shadow-sm"
                  autoComplete="password"
                />
              )}
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
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-between text-sm">
          <Label className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setValue("rememberMe", Boolean(checked))
              }
            />
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
          type="submit"
          className="w-full rounded-full bg-yellow-400 py-4 font-semibold"
          disabled={isPending}
        >
          Entrar na conta
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Ainda não tem uma conta?{" "}
        <Link href="/auth?mode=register" className="text-yellow-600">
          Cadastre-se gratuitamente
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

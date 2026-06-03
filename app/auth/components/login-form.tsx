"use client";

import { loginCliente } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const schemeLogin = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
  rememberMe: z.boolean().optional(),
});

export type LoginClientForm = z.infer<typeof schemeLogin>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<LoginClientForm>({
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
    mutationFn: loginCliente,
    mutationKey: ["login-client"],
    onSuccess() {
      reset();
      router.push("/cliente/home");
    },
    onError(error) {
      const message =
        error instanceof Error ? error.message : "E-mail ou senha incorretos";

      setError("email", { message });
      setError("password", { message: "Verifique sua senha" });
      setValue("password", "");
    },
    retry: false,
  });

  const onSubmit = async (data: LoginClientForm) => {
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

        <div className="flex w-full gap-4">
          <Button
            type="button"
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
            Google
          </Button>

          <Button
            type="button"
            variant="custom"
            size="xl"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-200 py-3 hover:bg-zinc-200"
          >
            <GithubLogoIcon weight="bold" size={20} />
            Github
          </Button>
        </div>

        <div className="flex w-full items-center justify-center gap-2 text-zinc-400">
          <hr className="flex-1 border-zinc-200" />
          <span className="text-center text-sm">ou continue com e-mail</span>
          <hr className="flex-1 border-zinc-200" />
        </div>
      </div>

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
                  className="h-12 rounded-full pl-9 pr-10 shadow-sm"
                  autoComplete="current-password"
                />
              )}
            />

            <LockIcon
              weight="fill"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeIcon weight="regular" size={20} />
              ) : (
                <EyeSlashIcon weight="regular" size={20} />
              )}
            </button>
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

          <Link
            href="/forget-password"
            className="text-sm font-medium text-yellow-600 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          size="xl"
          type="submit"
          className="w-full rounded-full bg-yellow-400 py-4 font-semibold text-black hover:bg-yellow-500"
          disabled={isPending}
        >
          {isPending ? "Entrando..." : "Entrar na conta"}
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
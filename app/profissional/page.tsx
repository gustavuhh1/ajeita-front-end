"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  ArrowRightIcon,
  SignInIcon,
  UserGearIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Footer from "./components/footer";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import api from "@/lib/api";
import { EnvelopeIcon, LockIcon } from "@phosphor-icons/react";
import { UserProvider } from "@/types";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;

export default function ProviderPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await api.get(`/prestadores`);
      console.log(res.data);
      if (res.status === 200) {
        res.data.forEach((prestador: UserProvider) => {
          if (
            prestador.email === data.email &&
            prestador.password === data.password
          ) {
            alert("Login bem-sucedido!");
            // TODO: Redirecionar para a dashboard do profissional
            router.push(`#`);
          }
        });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(
        "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
      );
    }
  });

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col justify-between">
      <div className="flex w-full flex-col items-center justify-around gap-10 px-6 py-10 md:flex-row md:items-start md:px-12 lg:px-30">
        {/* Left Column */}
        <div className="flex w-full max-w-lg flex-col space-y-4 lg:max-w-xl">
          <h1 className="text-3xl font-semibold md:text-4xl">
            Ajeite sua agenda e maximize seus ganhos
          </h1>
          <p className="text-muted-foreground">
            Junte-se a milhares de profissionais que usam o Ajeitai para
            encontrar novos clientes e gerenciar seus serviços com facilidade.
          </p>
          <div className="no-mobile mt-5 flex items-center gap-3">
            <AvatarGroup>
              <Avatar>
                <AvatarImage
                  src="https://github.com/bebetofreitass.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/FilipeGz.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/gustavuhh1.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+2k</AvatarGroupCount>
            </AvatarGroup>
            <span className="text-muted-foreground text-sm">
              Profissionais ativos hoje
            </span>
          </div>

          {/* Hero Image */}
          <div className="no-mobile relative h-80 w-full rounded-4xl">
            <div className="absolute inset-0 z-10 rounded-4xl bg-linear-to-t from-black/70 to-transparent" />
            <Image
              src="/provider-worker-auth.png"
              alt="Hero image"
              className="h-full w-full rounded-4xl object-cover"
              width={592}
              height={380}
            />
            <div className="absolute bottom-4 left-4 z-20 text-white">
              <div className="mb-2 flex gap-2">
                <span className="flex w-fit items-center rounded-4xl bg-yellow-400 px-2 text-sm text-black">
                  Destaque
                </span>
                <p className="font-light">Marcenaria e Reparos</p>
              </div>
              <div>
                <p className="text-xl">
                  &quot;Dobrei meus atendimentos no primeiro mês.&quot;
                </p>
                <p className="font-light italic">— Carlos M., Marceneiro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Login Card */}
        <div className="border-primary-foreground/30 flex w-full max-w-lg flex-col space-y-4 rounded-4xl border bg-white/50 p-8 shadow-lg">
          {/* Icon */}
          <div className="bg-secondary text-primary flex w-fit items-center justify-center rounded-full p-3">
            <UserGearIcon size={28} />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Área do Profissional</h1>
            <p className="text-muted-foreground text-sm">
              Acesse sua conta para gerenciar pedidos e agenda.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <EnvelopeIcon
                  size={18}
                  className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      className="pl-9"
                      autoComplete="email"
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="/forgot-password"
                    className="text-muted-foreground hover:text-primary text-xs transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <LockIcon
                    size={16}
                    className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-9"
                        autoComplete="new-password"
                      />
                    )}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="xl"
              className="mt-2 w-full bg-yellow-400 font-semibold text-black hover:bg-yellow-500"
            >
              Entrar na conta <SignInIcon size={18} className="ml-2" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">
              Novo por aqui?
            </span>
            <Separator className="flex-1" />
          </div>

          <p className="text-muted-foreground text-center text-sm">
            Comece a oferecer seus serviços hoje mesmo.
          </p>

          {/* Register CTA */}
          <Button
            size="xl"
            variant="outline"
            className="w-full font-semibold"
            asChild
          >
            <Link href="/profissional/register">
              Quero ser um Prestador <ArrowRightIcon size={18} />
            </Link>
          </Button>
        </div>
      </div>
      <Footer className="" />
    </div>
  );
}

"use client";

import {
  AvatarGroup,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ChatIcon,
  CheckCircleIcon,
  CheckIcon,
  CreditCardIcon,
  FacebookLogoIcon,
  HandshakeIcon,
  HouseSimpleIcon,
  InstagramLogoIcon,
  LogIcon,
  UserCircleGearIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <header className="flex h-20 w-full items-center justify-center">
        <div className="flex w-full items-center justify-between border-b border-zinc-300/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-11 w-11 items-center justify-center rounded-full p-1">
              <HouseSimpleIcon size={32} />
            </div>
            <h2 className="font-semibold!">Ajeitaí</h2>
          </div>
          <div className="no-mobile flex items-center gap-6 text-sm">
            <Link href="#">Como funciona</Link>
            <Link href="#">Para clientes</Link>
            <Link href="#">Para profissionais</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              type="button"
              className="hover:bg-primary/20 px-4 py-2"
              size="xl"
            >
              <Link href="/auth?mode=login">Entrar</Link>
            </Button>
            <Button asChild type="button" className="px-4 py-2" size="xl">
              <Link href="/auth?mode=register">Cadastre-se</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="from-primary/30 to-primary/30 flex items-center justify-center gap-12 bg-linear-to-bl via-white px-8 py-8 md:justify-between lg:justify-around lg:px-15 lg:py-15">
        <div className="flex max-w-md flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-center text-5xl font-bold md:text-left">
              Encontre o profissional certo para resolver seu{" "}
              <strong className="text-primary decoration-primary/50 md:underline">
                problema
              </strong>
            </h1>
            <span className="text-foreground text-center text-xl font-light md:text-left">
              Conectamos você aos melhores prestadores de serviço da sua região
              de forma rápida, segura e descomplicada. O jeito mais fácil de
              ajeitar sua vida.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              type="button"
              className="flex h-15 items-center gap-2 rounded-full px-8 py-2 hover:cursor-pointer"
              size="xl"
            >
              <Link href="/auth?mode=login">
                <UserIcon weight="bold" size={22} />
                <span className="text-lg font-semibold">Sou cliente</span>
              </Link>
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="bg-background hover:bg-primary/10 flex h-15 items-center gap-2 rounded-full px-8 py-2 hover:cursor-pointer"
              size="xl"
            >
              <Link href="/profissional">
                <UserCircleGearIcon weight="bold" size={22} />
                <span className="ml-1 text-lg font-semibold">
                  Sou profissional
                </span>
              </Link>
            </Button>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
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
            </AvatarGroup>
            <span className="text-muted-foreground text-sm">
              Mais de <strong>5.000+</strong> profissionais cadastrados
            </span>
          </div>
        </div>
        <div className="no-mobile relative h-110 items-center justify-center rounded-4xl shadow-lg">
          {/* Gradiente de fundo */}
          <div className="absolute inset-0 z-0 rounded-4xl bg-linear-to-r from-zinc-700 to-white opacity-10" />
          {/* Caixa animada */}
          <motion.div
            animate={{ y: [20, 0] }}
            transition={{
              times: [0, 0.2, 0.5, 0.8, 1],
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="blur-out-2xl absolute -bottom-5 -left-10 z-10 flex items-center justify-center rounded-4xl border border-zinc-300 bg-white p-3 shadow-lg"
          >
            <div className="flex items-center justify-center rounded-full bg-green-300 p-3">
              <CheckCircleIcon
                weight="bold"
                size={22}
                className="text-green-700"
              />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-zinc-400 uppercase">
                status
              </p>
              <p className="text-foreground text-sm font-semibold">
                Serviço concluído
              </p>
            </div>
          </motion.div>
          <Image
            className="h-full overflow-hidden rounded-4xl object-cover"
            src={"/worker-img-home.png"}
            width={500}
            height={500}
            alt={""}
          />
        </div>
      </section>
      <section className="flex flex-col gap-12 px-8 py-15 max-[1024px]:px-10 md:gap-16 lg:gap-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2>Como o Ajeita funciona</h2>
          <span>
            Simples, rápido e seguro. Veja como é fácil contratar ou oferecer
            serviços na nossa plataforma em apenas 4 passos.
          </span>
        </div>
        {/* Box Modals */}
        <div className="mt-5 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Modals */}
          <div className="bg-secondary/20 hover:border-border group flex min-w-65 flex-col rounded-4xl border border-zinc-300 p-5 transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/20 mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <span className="text-primary">
                <ChatIcon weight="bold" size={20} />
              </span>
            </div>
            <h3 className="text-foreground mb-1 font-semibold">1. Solicite</h3>
            <p className="text-foreground text-md font-light">
              Descreva o serviço que você precisa com detalhes e fotos se
              necessário.
            </p>
          </div>
          <div className="bg-secondary/20 hover:border-border group flex min-w-65 flex-col rounded-4xl border border-zinc-300 p-5 transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/20 mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <span className="text-primary">
                <HandshakeIcon weight="bold" size={20} />
              </span>
            </div>
            <h3 className="text-foreground mb-1 font-semibold">2. Negocie</h3>
            <p className="text-foreground text-md font-light">
              Receba orçamentos de profissionais avaliados e escolha a melhor
              opção.
            </p>
          </div>
          <div className="bg-secondary/20 hover:border-border group flex min-w-65 flex-col rounded-4xl border border-zinc-300 p-5 transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/20 mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <span className="text-primary">
                <CreditCardIcon weight="bold" size={20} />
              </span>
            </div>
            <h3 className="text-foreground mb-1 font-semibold">
              3. Pagamento seguro
            </h3>
            <p className="text-foreground text-md font-light">
              O valor fica retido na plataforma e só é liberado após a
              conclusão.
            </p>
          </div>
          <div className="bg-secondary/20 hover:border-border group flex min-w-65 flex-col rounded-4xl border border-zinc-300 p-5 transition-all duration-300 hover:shadow-lg">
            <div className="bg-primary/20 mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <span className="text-primary">
                <CheckCircleIcon weight="bold" size={20} />
              </span>
            </div>
            <h3 className="text-foreground mb-1 font-semibold">
              4. Serviço Realizado
            </h3>
            <p className="text-foreground text-md font-light">
              O profissional realiza o serviço e você avalia a experiência.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-secondary/50 flex flex-col items-center justify-center gap-12 px-8 py-15 lg:flex-row lg:px-15 lg:py-20">
        <div className="flex max-w-xl flex-1 flex-col rounded-2xl bg-white shadow-lg">
          <Image
            src="/family-bg.png"
            className="h-90 w-full overflow-hidden rounded-t-xl object-cover"
            width={360}
            height={200}
            alt={""}
          />
          <div className="flex flex-col gap-2 p-6">
            <span className="w-fit rounded-4xl bg-blue-600/40 px-2 py-1 text-xs font-semibold text-blue-900 uppercase">
              para cliente
            </span>
            <h2>Resolva tudo sem sair de casa</h2>
            <span className="flex items-center gap-2 text-zinc-700">
              <CheckIcon weight="bold" size={18} className="text-green-500" />{" "}
              Profissionais verificados e avaliados.
            </span>
            <span className="flex items-center gap-2 text-zinc-700">
              <CheckIcon weight="bold" size={18} className="text-green-500" />{" "}
              Garantia de satisfação ou seu dinheiro de volta.
            </span>
            <span className="flex items-center gap-2 text-zinc-700">
              <CheckIcon weight="bold" size={18} className="text-green-500" />{" "}
              Suporte dedicado 24/7.
            </span>
            <Link href="/auth?mode=login" className="w-full">
              <Button
                className="mt-4 h-13 w-full rounded-4xl bg-black text-white"
                size="xl"
                type="button"
              >
                Encontrar profissional{" "}
                <ArrowRightIcon size={16} weight="bold" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex max-w-xl flex-1 flex-col rounded-2xl bg-[#1d180c] shadow-lg">
          <Image
            src="/worker-bg.png"
            className="h-90 w-full overflow-hidden rounded-t-xl object-cover"
            width={360}
            height={200}
            alt={""}
          />
          <div className="flex flex-col gap-2 p-6 text-white">
            <span className="w-fit rounded-4xl bg-yellow-400 px-2 py-1 text-xs font-semibold text-black uppercase">
              para profissionais
            </span>
            <h2>Aumente sua renda e clientela</h2>
            <span className="flex items-center gap-2">
              <CheckIcon weight="bold" size={18} className="text-yellow-500" />{" "}
              Milhares de pedidos de serviço todos os dias.
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon weight="bold" size={18} className="text-yellow-500" />{" "}
              Receba pagamentos garantidos sem calote.
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon weight="bold" size={18} className="text-yellow-500" />{" "}
              Gerencie sua agenda e reputação online.
            </span>
            <Button
              asChild
              className="mt-4 h-13 w-full rounded-4xl bg-yellow-500 font-semibold"
              size="xl"
              type="button"
            >
              <Link href="/profissional">
                Começar a Trabalhar <ArrowRightIcon size={16} weight="bold" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <footer className="flex flex-col border-t border-zinc-300/50 py-5">
        <div className="flex w-full flex-col justify-around px-15 py-2 md:flex-row">
          <div className="max-w-xs space-y-5 pt-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                <LogIcon size={25} />
              </div>
              Ajeitai
            </div>
            <p className="text-foreground mt-2 font-light">
              A plataforma que conecta quem precisa de ajuda com quem sabe
              resolver.
            </p>
            <div className="flex gap-6">
              <div className="mt-3 flex h-10 w-10 items-center justify-center gap-4 rounded-full bg-gray-300 text-zinc-700">
                <FacebookLogoIcon size={20} weight="fill" />
              </div>
              <div className="mt-3 flex h-10 w-10 items-center justify-center gap-4 rounded-full bg-gray-300 text-zinc-700">
                <InstagramLogoIcon size={20} weight="bold" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20">
            <div className="max-w-xs space-y-5 pt-4">
              <h4 className="mb-5 font-bold">Empresa</h4>
              <ul className="space-y-2">
                <li>Sobre nós</li>
                <li>Carreiras</li>
                <li>Blog</li>
                <li>Imprensa</li>
              </ul>
            </div>
            <div className="max-w-xs space-y-5 pt-4">
              <h4 className="mb-5 font-bold">Descubra</h4>
              <ul className="space-y-2">
                <li>Como funciona</li>
                <li>Segurança</li>
                <li>Serviços</li>
                <li>Cidades</li>
              </ul>
            </div>
            <div className="max-w-xs space-y-5 pt-4">
              <h4 className="mb-5 font-bold">Suporte</h4>
              <ul className="space-y-2">
                <li>Central de Ajuda</li>
                <li>Termos de Uso</li>
                <li>Privacidade</li>
                <li>Fale Conosco</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex h-20 items-center justify-center">
          <span className="text-muted-foreground text-sm">
            &copy; 2024 Ajeitaí. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </main>
  );
}

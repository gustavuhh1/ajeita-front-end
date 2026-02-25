"use client";

import {
  AvatarGroup,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  HouseSimpleIcon,
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
            <Link href="/login">
              <Button
                variant="ghost"
                type="button"
                className="hover:bg-primary/20 px-4 py-2"
                size="xl"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/login">
              <Button type="button" className="px-4 py-2" size="xl">
                Cadastre-se
              </Button>
            </Link>
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
            <Link href="/login">
              <Button
                type="button"
                className="flex h-15 items-center gap-2 rounded-full px-8 py-2 hover:cursor-pointer"
                size="xl"
              >
                <UserIcon weight="bold" size={22} />
                <span className="text-lg font-semibold">Sou cliente</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button
                type="button"
                variant="outline"
                className="bg-background hover:bg-primary/10 flex h-15 items-center gap-2 rounded-full px-8 py-2 hover:cursor-pointer"
                size="xl"
              >
                <UserCircleGearIcon weight="bold" size={22} />
                <span className="ml-1 text-lg font-semibold">
                  Sou profissional
                </span>
              </Button>
            </Link>
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
    </main>
  );
}

import Link from "next/link";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

import { ClipboardPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Header from "@/app/cliente/components/header";
import NavCategory from "@/app/cliente/components/nav-category";
import ProvidersWeek from "@/app/cliente/components/providers-week";

const nameUser = "Gustavo";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />

      <main className="space-y-10 p-6 lg:p-12">
        <div className="flex w-full flex-col gap-8 xl:flex-row">
          <section className="relative flex w-full flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm lg:p-8">
            <div className="max-w-xl space-y-2">
              <h1 className="text-3xl font-bold text-zinc-900 lg:text-4xl">
                Olá, {nameUser}!
              </h1>

              <p className="text-lg text-zinc-600">
                Encontre o profissional ideal para resolver seu problema hoje
                mesmo.
              </p>
            </div>

            <div className="relative flex w-full items-center">
              <MagnifyingGlassIcon
                size={20}
                className="absolute left-4 z-10 text-zinc-400"
              />

              <Input
                className="h-14 rounded-2xl border border-zinc-300/80 bg-background pl-11 pr-28 shadow-xs placeholder:text-zinc-400"
                placeholder="Qual serviço você precisa? (Ex: Eletricista, Faxina)"
              />

              <Button
                size="custom"
                className="absolute right-2 rounded-[32px] px-5 py-2.5 font-semibold hover:opacity-90"
              >
                Buscar
              </Button>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <NavCategory />
            </div>
          </section>

          <section className="bg-primary flex min-h-[340px] w-full max-w-full flex-col justify-between gap-6 rounded-[32px] p-8 shadow-md xl:max-w-[420px]">
            <div className="bg-secondary flex h-14 w-14 items-center justify-center rounded-full">
              <ClipboardPlus size={24} />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-zinc-950">
                Não encontrou o que procura?
              </h2>

              <p className="text-md text-zinc-800">
                Crie um pedido personalizado agora e receba propostas de
                profissionais qualificados em minutos.
              </p>
            </div>

            <Button
              asChild
              variant="custom"
              size="xl"
              className="bg-black shadow-2xl"
            >
              <Link
                href="/cliente/criar-pedido"
                className="flex items-center gap-2 text-white"
              >
                Criar Pedido Agora

                <ArrowRightIcon
                  size={20}
                  weight="bold"
                />
              </Link>
            </Button>
          </section>
        </div>

        <section className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">
                Profissionais em Destaque
              </h2>

              <p className="text-zinc-600">
                Os melhores avaliados da sua região esta semana.
              </p>
            </div>

            <Link
              href="/cliente/buscar-profissional"
              className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              Ver todos

              <ArrowRightIcon
                size={16}
                weight="bold"
              />
            </Link>
          </div>

          <ProvidersWeek />
        </section>
      </main>
    </div>
  );
}
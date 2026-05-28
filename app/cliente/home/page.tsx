"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ClipboardPlus } from "lucide-react";
import Link from "next/link";

// Importando o componente correto MainHeader
import { MainHeader } from '../components/MainHeader';
import NavCategory from "../components/nav-category";
import ProvidersWeek from "../components/providers-week";

const nameUser = "Gustavo";

export default function Home() {
  return (
    <>
      <MainHeader />
      
      <main className="space-y-8 p-12">
        <div className="flex w-full flex-col gap-8 md:flex-row">
          
          {/* Caixa Procurar Profissional */}
          <div className="relative flex w-full flex-col gap-4 rounded-[24px] bg-white p-4 shadow-sm lg:p-8">
            <div className="max-w-lg space-y-2">
              <h2 className="text-[30px] font-semibold">Olá, {nameUser}!</h2>
              <p className="text-lg text-zinc-600">
                Encontre o profissional ideal para resolver seu problema hoje mesmo.
              </p>
            </div>
            
            <div className="relative flex w-full max-w-2xl items-center">
              <Input
                className="flex h-14 w-full items-center gap-3 rounded-lg border border-zinc-300/80 px-4 pl-10 shadow-sm placeholder:text-zinc-400"
                placeholder="Qual serviço você precisa? (ex: Eletricista, Faxina)"
              />
              <MagnifyingGlassIcon
                size={20}
                className="absolute left-3 text-zinc-400"
              />
              <Button
                size="default"
                className="absolute right-2 gap-2 rounded-[32px] px-5 py-2.5 font-semibold hover:opacity-90"
              >
                Buscar
              </Button>
            </div>
            
            <div className="mt-4 flex items-center gap-4 p-4 overflow-x-auto">
              <NavCategory />
            </div>
          </div>

          {/* Caixa "não encontrou o que procura" */}
          <div className="flex min-h-[340px] flex-col justify-around gap-4 rounded-[24px] bg-yellow-400 p-8 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <ClipboardPlus className="text-black" />
            </div>
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold">Não encontrou o que procura?</h2>
              <p className="mt-2 text-md font-medium">
                Crie um pedido personalizado agora e receba propostas de profissionais qualificados em minutos.
              </p>
            </div>
            <Button
              asChild
              className="bg-black text-white shadow-2xl hover:bg-black/90"
            >
              <Link
                href="/cliente/pedido"
                className="flex items-center gap-2"
              >
                Criar Pedido Agora <ArrowRightIcon size={20} weight="bold" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Seção Profissionais */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Profissionais em Destaque</h1>
              <p className="text-zinc-600">
                Os melhores avaliados da sua região esta semana
              </p>
            </div>
            <Link
              href="/cliente/profissionais"
              className="flex items-center gap-1 text-sm font-semibold text-yellow-600 hover:underline"
            >
              Ver todos <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </div>
          <ProvidersWeek />
        </div>
      </main>
    </>
  );
}
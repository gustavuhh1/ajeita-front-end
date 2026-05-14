import { Input } from "@/components/ui/input";
import Header from "../components/header";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { Button } from "@/components/ui/button";
import NavCategory from "../components/nav-category";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ClipboardPlus } from "lucide-react";
import ProvidersWeek from "../components/providers-week";

const nameUser = "Gustavo";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="space-y-8 p-12">
        <div className="flex w-full flex-col gap-8 md:flex-row">
          {/* Caixa Procurar Profissional */}
          <div className="relative flex w-full flex-col gap-4 rounded-[24px] bg-white p-4 shadow-sm lg:p-8">
            <div className="max-w-lg space-y-2">
              <h2 className="text-[30px]">Olá, {nameUser}!</h2>
              <p className="text-lg text-zinc-600">
                Encontre o profissional ideal para resolver seu problema hoje
                mesmo.
              </p>
            </div>
            <div className="relative flex w-full max-w-200 items-center">
              <Input
                className="bg-background flex h-14 max-w-200 items-center gap-3 rounded-lg border border-zinc-300/80 px-4 pl-10 shadow-xs placeholder:text-zinc-400"
                placeholder="Qual serviço você precisa? (ex: Eletricista, Faxina)"
              />
              <MagnifyingGlassIcon
                size={20}
                className="absolute left-3 text-zinc-400"
              />
              {/* TODO: Adicionar funcionalidade de busca */}
              <Button
                size="custom"
                className="absolute right-2 gap-2 rounded-[32px] px-5 py-2.5 font-semibold hover:opacity-90"
              >
                Buscar
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-4 p-4">
              <NavCategory />
            </div>
          </div>

          {/* Caixa "não encontrou oque procura" */}
          <div className="bg-primary flex min-h-84.75 flex-col justify-around gap-4 rounded-[24px] p-8 shadow-md">
            <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full">
              <ClipboardPlus />
            </div>
            <div className="max-w-lg">
              <h2 className="text-3xl">Não encontrou o que procura?</h2>
              <p className="text-md mt-2">
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
                href="/cliente/pedidos/novo"
                className="flex items-center gap-1 text-white"
              >
                Criar Pedido Agora <ArrowRightIcon size={20} weight="bold" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Profissionais em Destaque</h1>
              <p className="text-zinc-600">
                Os melhores avaliados da sua região está semana
              </p>
            </div>
            <Link
              href="/cliente/profissionais"
              className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              Ver todos <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </div>
          <ProvidersWeek />
        </div>
      </main>
    </div>
  );
}
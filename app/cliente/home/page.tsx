import { Input } from "@/components/ui/input";
import Header from "../components/header";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { Button } from "@/components/ui/button";
import NavCategory from "../components/nav-category";

const profissionais = [
  {
    nome: "João Silva",
    servico: "Eletricista Residencial",
    nota: 4.8,
    preco: "R$ 80/h",
    tags: ["Instalação", "Reparos"],
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    nome: "Maria Oliveira",
    servico: "Pintura e Acabamentos",
    nota: 5.0,
    preco: "R$ 150/dia",
    tags: ["Pintura", "Textura"],
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    nome: "Ana Costa",
    servico: "Limpeza Profissional",
    nota: 5.0,
    preco: "R$ 180/dia",
    tags: ["Faxina", "Pós-obra"],
    img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    nome: "Pedro Santos",
    servico: "Marido de Aluguel",
    nota: 4.9,
    preco: "R$ 60/h",
    tags: ["Montagem", "Reparos"],
    img: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    nome: "Carlos Pereira",
    servico: "Encanador",
    nota: 4.7,
    preco: "R$ 120/visita",
    tags: ["Vazamento", "Instalação"],
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const nameUser = "Gustavo";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="p-12">
        <div className="flex w-full flex-col gap-8 md:flex-row">
          {/* Caixa Procurar Profissional */}
          <div className="flex w-full flex-col gap-4 rounded-[24px] bg-white p-4 shadow-lg lg:p-8">
            <div className="max-w-lg space-y-2">
              <h2 className="text-[30px]">Olá, {nameUser}!</h2>
              <p className="text-lg text-zinc-600">
                Encontre o profissional ideal para resolver seu problema hoje
                mesmo.
              </p>
            </div>
            <div className="relative flex w-full max-w-200 items-center">
              <Input
                className="bg-background flex h-14 max-w-200 items-center gap-3 rounded-lg border border-zinc-300/80 px-4 pl-10 shadow-sm placeholder:text-zinc-400"
                placeholder="Qual serviço você precisa? (ex: Eletricista, Faxina)"
              />
              <MagnifyingGlassIcon
                size={20}
                className="absolute left-3 text-zinc-400"
              />
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
          <div className="bg-primary rounded-[24px] p-8 shadow-lg md:min-w-1/3"></div>
        </div>
      </main>
    </div>
  );
}

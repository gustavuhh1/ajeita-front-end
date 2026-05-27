"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

const profissionais = [
  {
    id: "joao-silva",
    nome: "João Silva",
    servico: "Eletricista Residencial",
    nota: 4.8,
    avaliacoes: 124,
    preco: "R$ 80",
    periodo: "/h",
    tags: ["Instalação", "Reparos"],
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    online: true,
  },
  {
    id: "maria-oliveira",
    nome: "Maria Oliveira",
    servico: "Pintura e Acabamentos",
    nota: 5.0,
    avaliacoes: 89,
    preco: "R$ 150",
    periodo: "/dia",
    tags: ["Pintura", "Textura"],
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    online: false,
  },
  {
    id: "ana-costa",
    nome: "Ana Costa",
    servico: "Limpeza Profissional",
    nota: 5.0,
    avaliacoes: 340,
    preco: "R$ 180",
    periodo: "/dia",
    tags: ["Faxina", "Pós-obra"],
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    online: true,
  },
  {
    id: "pedro-santos",
    nome: "Pedro Santos",
    servico: "Marido de Aluguel",
    nota: 4.9,
    avaliacoes: 56,
    preco: "R$ 60",
    periodo: "/h",
    tags: ["Montagem", "Reparos"],
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    online: true,
  },
];

const ProvidersWeek = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {profissionais.map((profissional) => (
        <div
          key={profissional.id}
          className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Image
                src={profissional.img}
                alt={profissional.nome}
                width={52}
                height={52}
                className="rounded-full object-cover"
              />
              {profissional.online && (
                <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {profissional.nome}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {profissional.servico}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-800">
              {profissional.nota.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">
              ({profissional.avaliacoes})
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {profissional.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-gray-600 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="h-px border-gray-100" />

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-wide text-gray-400 uppercase">
                A partir de
              </p>
              <p className="text-sm font-bold text-gray-900">
                {profissional.preco}
                <span className="text-xs font-normal text-gray-400">
                  {profissional.periodo}
                </span>
              </p>
            </div>

            {/* Redirecionamento configurado para buscar-profissional/perfil/[id] */}
            <Link
              href={`/cliente/buscar-profissional/perfil/${profissional.id}`}
              aria-label={`Ver perfil de ${profissional.nome}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-white transition-colors hover:bg-amber-500 active:bg-amber-600"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProvidersWeek;
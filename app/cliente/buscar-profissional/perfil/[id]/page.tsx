"use client";

import React, { use } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  Star,
} from "lucide-react";

import Header from "../../../components/header";
import { ProviderAvatar } from "../../../components/ProviderAvatar";

const dadosProfissionais: Record<string, any> = {
  "joao-silva": {
    nome: "João Silva",
    servico: "Eletricista Residencial",
    nota: 4.8,
    avaliacoes: 124,
    anosExperiencia: 5,
    sobre:
      "Olá! Sou o João, especialista em manutenção elétrica residencial. Trabalho com instalação de chuveiros, painéis de LED, troca de fiação antiga e garantia de total segurança para a sua família.",

    tags: [
      "Instalação Elétrica",
      "Reparos",
      "Iluminação",
      "Quadro de Energia",
    ],

    localizacao:
      "Atende em Fortaleza e região.",

    disponibilidade:
      "Segunda a Sexta • 08h às 18h",

    coresCapa:
      "from-[#d68a8a] via-[#915c5c] to-[#6b4242]",
  },

  "maria-oliveira": {
    nome: "Maria Oliveira",
    servico: "Pintura e Acabamentos",
    nota: 5.0,
    avaliacoes: 89,
    anosExperiencia: 8,

    sobre:
      "Especialista em acabamentos finos e pintura decorativa. Transformo ambientes residenciais e comerciais com agilidade, limpeza extrema e materiais de primeira qualidade.",

    tags: [
      "Pintura",
      "Textura",
      "Massa Corrida",
      "Verniz",
    ],

    localizacao:
      "Atende em Fortaleza e arredores.",

    disponibilidade:
      "Segunda a Sábado • 07h às 17h",

    coresCapa:
      "from-amber-400 via-yellow-500 to-amber-500",
  },

  "ana-costa": {
    nome: "Ana Costa",
    servico: "Limpeza Profissional",
    nota: 5.0,
    avaliacoes: 340,
    anosExperiencia: 6,

    sobre:
      "Ofereço serviços detalhados de limpeza residencial, comercial e pós-obra. Pontualidade, discrição e uso de produtos biodegradáveis de alta eficiência.",

    tags: [
      "Faxina",
      "Pós-obra",
      "Limpeza Comercial",
      "Organização",
    ],

    localizacao:
      "Atende em Fortaleza (Todos os bairros).",

    disponibilidade:
      "Segunda a Sexta • 08h às 16h",

    coresCapa:
      "from-blue-400 via-indigo-500 to-slate-700",
  },

  "pedro-santos": {
    nome: "Pedro Santos",
    servico: "Marido de Aluguel",
    nota: 4.9,
    avaliacoes: 56,
    anosExperiencia: 4,

    sobre:
      "Resolvo pequenos problemas do seu dia a dia: instalação de suportes de TV, montagem de móveis, troca de torneiras e reparos hidráulicos ou elétricos em geral.",

    tags: [
      "Montagem",
      "Reparos",
      "Fixação",
      "Suportes",
    ],

    localizacao:
      "Atende em Fortaleza.",

    disponibilidade:
      "Todos os dias • 08h às 20h",

    coresCapa:
      "from-teal-500 via-emerald-600 to-zinc-700",
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProfilePage({
  params,
}: PageProps) {
  const router = useRouter();

  const resolvedParams = use(params);
  const providerId = resolvedParams.id;

  const profissional =
    dadosProfissionais[providerId] || {
      nome: "Carlos Silva",

      servico:
        "Eletricista Residencial e Predial",

      nota: 4.9,
      avaliacoes: 152,
      anosExperiencia: 3,

      sobre:
        "Olá! Sou Carlos, eletricista com mais de 10 anos de experiência em instalações elétricas residenciais e comerciais. Especialista em quadros elétricos, iluminação LED, manutenção preventiva e resolução de curto-circuitos.",

      tags: [
        "Instalação Elétrica",
        "Manutenção",
        "Iluminação",
        "Quadro de Energia",
      ],

      localizacao:
        "Atende em Fortaleza e região.",

      disponibilidade:
        "Segunda a Sexta • 08h às 18h",

      coresCapa:
        "from-[#d68a8a] via-[#915c5c] to-[#6b4242]",
    };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link
            href="/cliente/home"
            className="transition-colors hover:text-gray-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/cliente/buscar-profissional"
            className="transition-colors hover:text-gray-600"
          >
            Prestadores
          </Link>

          <span>/</span>

          <span className="font-semibold text-gray-600">
            {profissional.nome}
          </span>
        </div>

        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-800"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <section className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <div
            className={`relative h-52 bg-gradient-to-r ${profissional.coresCapa}`}
          />

          <div className="relative px-6 pb-8 md:px-10">
            <div className="-mt-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="shrink-0 rounded-full border-4 border-white bg-white shadow-lg">
                  <ProviderAvatar
                    name={profissional.nome}
                    src={null}
                    size="lg"
                  />
                </div>

                <div className="pb-1">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    <CheckCircle size={14} />
                    Verificado
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-gray-950">
                    {profissional.nome}
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                    <span className="text-lg">
                      ⚡
                    </span>

                    {profissional.servico}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-5 sm:w-fit">
                <div className="min-w-[90px] text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
                    {profissional.nota.toFixed(1)}

                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  </div>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Avaliação
                  </p>
                </div>

                <div className="min-w-[90px] border-x border-gray-200 text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {profissional.avaliacoes}
                  </div>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Serviços
                  </p>
                </div>

                <div className="min-w-[90px] text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {profissional.anosExperiencia}
                  </div>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Anos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="space-y-6 lg:order-2 lg:col-span-4">
            <section className="sticky top-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Interessado no serviço?
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Solicite um orçamento sem compromisso.
                O profissional responderá em até 24h.
              </p>

              <div className="mt-6 space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98]">
                  <FileText size={18} />
                  Solicitar Orçamento
                </button>

                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50">
                  <MessageSquare size={18} />
                  Enviar Mensagem
                </button>
              </div>

              <div className="mt-8 space-y-5 border-t border-gray-50 pt-6">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <CheckCircle size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Identidade Verificada
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      Documentação validada pela plataforma.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Localização
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      {profissional.localizacao}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Clock size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Disponibilidade
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      {profissional.disponibilidade}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          <div className="space-y-6 lg:order-1 lg:col-span-8">
            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex items-center gap-2">
                <span className="text-xl">
                  👤
                </span>

                <h2 className="text-xl font-bold text-gray-900">
                  Sobre mim
                </h2>
              </div>

              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600 md:text-base">
                {profissional.sobre}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {profissional.tags.map(
                  (tag: string) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    📁
                  </span>

                  <h2 className="text-xl font-bold text-gray-900">
                    Portfólio
                  </h2>
                </div>

                <button className="text-sm font-bold text-blue-600 hover:underline">
                  Ver tudo
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-orange-200 to-orange-300 shadow-inner" />

                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 shadow-inner" />

                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-rose-300 to-rose-400 shadow-inner" />
              </div>
            </section>

            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8 flex items-center gap-2">
                <span className="text-xl">
                  💬
                </span>

                <h2 className="text-xl font-bold text-gray-900">
                  Avaliações de Clientes
                </h2>
              </div>

              <div className="space-y-8">
                <div className="border-b border-gray-100 pb-8">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-pink-200" />

                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          Mariana Souza
                        </p>

                        <p className="text-xs text-gray-400">
                          2 dias atrás
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={15}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-500">
                    O profissional foi extremamente atencioso,
                    pontual e resolveu o problema rapidamente.
                    Serviço impecável e muito educado.
                    Recomendo com certeza!
                  </p>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-green-100" />

                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          Roberto Almeida
                        </p>

                        <p className="text-xs text-gray-400">
                          1 semana atrás
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={15}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-500">
                    Excelente trabalho. Explicou tudo com clareza
                    antes de iniciar e deixou o local completamente
                    limpo e organizado após o serviço.
                  </p>
                </div>

                <button className="mt-2 w-full rounded-2xl border border-gray-100 py-3 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-50">
                  Ver mais avaliações
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-400 md:flex-row md:px-8 lg:px-12">
          <p>
            © 2026 Ajeitai — Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <button className="transition-colors hover:text-gray-600">
              Termos
            </button>

            <button className="transition-colors hover:text-gray-600">
              Privacidade
            </button>

            <button className="transition-colors hover:text-gray-600">
              Ajuda
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
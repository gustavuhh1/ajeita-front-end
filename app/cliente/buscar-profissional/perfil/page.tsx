"use client";

import React from "react";

import Link from "next/link";

import {
  Search,
  Plus,
  Bell,
  User,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  FileText,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

import Header from "../../components/header";
import { ProviderAvatar } from "../../components/ProviderAvatar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER PADRÃO */}
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 lg:px-12">
        {/* BREADCRUMB */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link
            href="/cliente/home"
            className="transition-colors hover:text-gray-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/cliente/prestador"
            className="transition-colors hover:text-gray-600"
          >
            Prestadores
          </Link>

          <span>/</span>

          <span className="font-semibold text-gray-600">
            Carlos Silva
          </span>
        </div>

        {/* VOLTAR */}
        <button className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-800">
          <ArrowLeft size={18} />
          Voltar
        </button>

        {/* HERO */}
        <section className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          {/* CAPA */}
          <div className="relative h-52 bg-gradient-to-r from-[#d68a8a] via-[#915c5c] to-[#6b4242]" />

          {/* CONTEÚDO */}
          <div className="relative px-6 pb-8 md:px-10">
            <div className="-mt-16 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              {/* PERFIL */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="rounded-full border-4 border-white bg-white shadow-lg">
                  <ProviderAvatar
                    name="Carlos Silva"
                    src={null}
                    size="lg"
                  />
                </div>

                <div className="pb-1">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    <CheckCircle size={14} />
                    Verificado
                  </div>

                  <h1 className="text-3xl font-bold text-gray-950">
                    Carlos Silva
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                    <span className="text-lg">⚡</span>
                    Eletricista Residencial e Predial
                  </p>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-5 sm:w-fit">
                <div className="min-w-[90px] text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
                    4.9
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
                    152
                  </div>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Serviços
                  </p>
                </div>

                <div className="min-w-[90px] text-center">
                  <div className="text-xl font-bold text-gray-900">
                    3
                  </div>

                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Anos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* SIDEBAR */}
          <aside className="space-y-6 lg:col-span-4">
            {/* AÇÕES */}
            <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Interessado no serviço?
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Solicite um orçamento sem compromisso.
                O profissional responderá em até 24h.
              </p>

              <div className="mt-6 space-y-3">
                <button className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-white transition-all active:scale-[0.98]">
                  <FileText size={18} />
                  Solicitar Orçamento
                </button>

                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50">
                  <MessageSquare size={18} />
                  Enviar Mensagem
                </button>
              </div>

              {/* INFO */}
              <div className="mt-8 space-y-5">
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl">
                    <CheckCircle size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Identidade Verificada
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      Documentação validada pela
                      plataforma.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Localização
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      Atende em Fortaleza e região.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl">
                    <Clock size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Disponibilidade
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500">
                      Segunda a Sexta • 08h às 18h
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          {/* CONTEÚDO */}
          <div className="space-y-6 lg:col-span-8">
            {/* SOBRE */}
            <section className="rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <span className="text-xl">👤</span>

                <h2 className="text-xl font-bold text-gray-900">
                  Sobre mim
                </h2>
              </div>

              <p className="leading-relaxed text-gray-600">
                Olá! Sou Carlos, eletricista com
                mais de 10 anos de experiência em
                instalações elétricas residenciais e
                comerciais. Especialista em quadros
                elétricos, iluminação LED,
                manutenção preventiva e resolução de
                curto-circuitos.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Instalação Elétrica",
                  "Manutenção",
                  "Iluminação",
                  "Quadro de Energia",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* PORTFÓLIO */}
            <section className="rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📁</span>

                  <h2 className="text-xl font-bold text-gray-900">
                    Portfólio
                  </h2>
                </div>

                <button className="text-primary text-sm font-bold hover:underline">
                  Ver tudo
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-orange-200 to-orange-300" />

                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200" />

                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-rose-300 to-rose-400" />
              </div>
            </section>

            {/* AVALIAÇÕES */}
            <section className="rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-2">
                <span className="text-xl">💬</span>

                <h2 className="text-xl font-bold text-gray-900">
                  Avaliações de Clientes
                </h2>
              </div>

              <div className="space-y-8">
                {/* AVALIAÇÃO */}
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
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-500">
                    O Carlos foi extremamente
                    profissional e resolveu o problema
                    rapidamente. Serviço impecável e
                    muito educado.
                  </p>
                </div>

                {/* AVALIAÇÃO */}
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
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-500">
                    Excelente profissional. Explicou
                    tudo com clareza e deixou o local
                    organizado após o serviço.
                  </p>
                </div>

                <button className="hover:bg-gray-50 mt-2 w-full rounded-2xl border border-gray-100 py-3 text-sm font-bold text-gray-500 transition-colors">
                  Ver mais avaliações
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-400 md:flex-row md:px-8 lg:px-12">
          <p>
            © 2026 Ajeitai — Todos os direitos
            reservados.
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
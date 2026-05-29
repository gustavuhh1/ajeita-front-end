"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
} from "lucide-react";

import { MainHeader } from "@/app/cliente/components/MainHeader";
import { ProviderAvatar } from "@/app/cliente/components/ProviderAvatar";

type AvaliacaoTipo = "prestador" | "cliente";

export default function ServicoConcluidoPage() {
  const [tipoAvaliacao, setTipoAvaliacao] = useState<AvaliacaoTipo>("prestador");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");

    if (tipo === "cliente") {
      setTipoAvaliacao("cliente");
    }
  }, []);

  const avaliacaoHref = useMemo(() => {
    return `/avaliar?tipo=${tipoAvaliacao}&pedidoId=AJ-849201`;
  }, [tipoAvaliacao]);

  const pessoaAvaliada =
    tipoAvaliacao === "prestador" ? "Carlos Silva" : "Lavor Gabriel";

  const tituloAvaliacao =
    tipoAvaliacao === "prestador"
      ? "Avaliar prestador"
      : "Avaliar cliente";

  const descricaoAvaliacao =
    tipoAvaliacao === "prestador"
      ? "Conte como foi sua experiência com o profissional. Sua avaliação ajuda outros clientes a escolherem melhor."
      : "Conte como foi sua experiência com o cliente. Isso ajuda a manter a comunidade mais segura e confiável.";

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      <MainHeader activePage="pedidos" />

      <main className="mx-auto w-full max-w-7xl px-6 py-8">
        <Link
          href="/pedidos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-gray-700"
        >
          <ArrowLeft size={18} />
          Voltar para meus pedidos
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[36px] border border-yellow-100 bg-white shadow-sm">
            <div className="relative bg-linear-to-br from-yellow-300 via-yellow-400 to-yellow-500 px-8 py-10">
              <div className="absolute right-8 top-8 hidden h-28 w-28 rounded-full bg-white/20 blur-2xl md:block" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-800">
                    <CheckCircle2 size={16} />
                    Serviço finalizado
                  </span>

                  <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-gray-950 md:text-5xl">
                    Tudo certo! O serviço foi concluído com sucesso.
                  </h1>

                  <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-yellow-950/80">
                    O serviço foi marcado como finalizado. Agora falta apenas a
                    avaliação para encerrar completamente o ciclo do pedido.
                  </p>
                </div>

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[32px] bg-white text-yellow-500 shadow-sm">
                  <BadgeCheck size={54} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-3">
              <StatusCard
                icon={<FileCheck2 size={20} />}
                title="Pedido"
                value="#AJ-849201"
                description="Higienização de sofá"
              />

              <StatusCard
                icon={<CreditCard size={20} />}
                title="Pagamento"
                value="Confirmado"
                description="Valor garantido na plataforma"
              />

              <StatusCard
                icon={<ShieldCheck size={20} />}
                title="Status"
                value="FINALIZADO"
                description="Pronto para avaliação"
              />
            </div>
          </div>

          <aside className="rounded-[36px] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Próxima etapa
                </p>
                <h2 className="mt-2 text-2xl font-black text-gray-950">
                  {tituloAvaliacao}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                <Star size={24} />
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold leading-relaxed text-gray-500">
              {descricaoAvaliacao}
            </p>

            <div className="mt-6 rounded-[28px] border border-gray-100 bg-gray-50 p-5">
              <div className="flex items-center gap-4">
                <ProviderAvatar
                  name={pessoaAvaliada}
                  src={
                    tipoAvaliacao === "prestador"
                      ? "https://i.pravatar.cc/100?img=12"
                      : null
                  }
                  size="md"
                />

                <div>
                  <h3 className="text-lg font-black text-gray-950">
                    {pessoaAvaliada}
                  </h3>

                  <div className="mt-1 flex items-center gap-1">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-bold text-yellow-500">
                      4.9
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      avaliação média
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={avaliacaoHref}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 text-sm font-black text-gray-950 shadow-sm transition-all hover:bg-yellow-500 active:scale-[0.98]"
            >
              <Star size={18} />
              {tituloAvaliacao}
            </Link>

            <Link
              href="/pedidos"
              className="mt-3 flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-black text-gray-600 transition-all hover:bg-gray-50"
            >
              Avaliar depois
            </Link>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-950">
              Resumo do serviço
            </h2>

            <div className="mt-6 space-y-5">
              <InfoItem
                icon={<MapPin size={18} />}
                label="Local"
                value="Rua dos Flares, 123 - Meireles, Fortaleza"
              />

              <InfoItem
                icon={<CalendarDays size={18} />}
                label="Data combinada"
                value="11 de Junho, 14:00"
              />

              <InfoItem
                icon={<Clock3 size={18} />}
                label="Duração estimada"
                value="Aproximadamente 2 horas"
              />

              <InfoItem
                icon={<MessageSquare size={18} />}
                label="Orçamento aceito"
                value="R$ 250,00"
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                <Sparkles size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Por que avaliar é importante?
                </h2>

                <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-500">
                  A avaliação ajuda o Ajeitaí a recomendar profissionais mais
                  confiáveis, melhora a reputação de quem presta um bom serviço
                  e também protege a comunidade contra experiências ruins.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <MiniBenefit
                    icon={<Star size={18} />}
                    title="Reputação"
                    text="A nota média é atualizada no perfil."
                  />

                  <MiniBenefit
                    icon={<ShieldCheck size={18} />}
                    title="Confiança"
                    text="Outros usuários tomam decisões melhores."
                  />

                  <MiniBenefit
                    icon={<UserCheck size={18} />}
                    title="Histórico"
                    text="O pedido fica encerrado corretamente."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[26px] border border-gray-100 bg-gray-50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-yellow-500 shadow-sm">
        {icon}
      </div>

      <p className="mt-4 text-xs font-black uppercase tracking-widest text-gray-400">
        {title}
      </p>

      <h3 className="mt-1 text-lg font-black text-gray-950">{value}</h3>

      <p className="mt-1 text-sm font-semibold text-gray-500">
        {description}
      </p>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function MiniBenefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-gray-100 bg-gray-50 p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-yellow-500 shadow-sm">
        {icon}
      </div>

      <h3 className="text-sm font-black text-gray-950">{title}</h3>

      <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-500">
        {text}
      </p>
    </div>
  );
}
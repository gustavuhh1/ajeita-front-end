"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import {
  CalendarCheck2,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "../../components/page-shell";
import { ProviderStatusBadge } from "../../components/provider-status-badge";

export default function ConfirmacaoAgendamentoPage() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <PageShell
      eyebrow="Provider · Agendamento"
      title="Confirmação de Agendamento"
      description="Revise os dados combinados com o cliente e confirme sua presença no serviço agendado."
    >
      <div className="mx-auto w-full max-w-4xl">
        <Card className="overflow-hidden rounded-[32px] border-gray-100 shadow-sm">
          <div className="border-b border-gray-100 bg-gradient-to-br from-yellow-50 via-white to-yellow-100/60 px-6 py-10 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-700 shadow-inner">
              <CalendarCheck2 className="h-9 w-9" />
            </div>

            <ProviderStatusBadge status={confirmed ? "Confirmado" : "Pendente"} />

            <h2 className="mt-4 text-3xl font-black text-gray-950">
              Instalação de tomadas
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
              Confirme o agendamento para deixar o cliente ciente de que o
              atendimento está mantido.
            </p>
          </div>

          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Info icon={<UserRound />} label="Cliente" value="Mariana Souza" />

              <Info
                icon={<Clock />}
                label="Data e horário"
                value="22/02/2026 às 14:00"
              />

              <Info
                icon={<MapPin />}
                label="Endereço"
                value="Rua Tibúrcio Cavalcante, 1200 · Aldeota"
              />

              <Info
                icon={<MessageCircle />}
                label="Observação"
                value="Levar material para duas tomadas extras."
              />
            </div>

            {confirmed ? (
              <div className="rounded-3xl border border-green-100 bg-green-50 p-5 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-green-600" />

                <h3 className="mt-3 text-lg font-black text-green-800">
                  Agendamento confirmado
                </h3>

                <p className="mt-1 text-sm font-medium text-green-700">
                  O cliente poderá visualizar que você confirmou o atendimento.
                </p>
              </div>
            ) : (
              <Button
                onClick={() => setConfirmed(true)}
                className="h-14 w-full rounded-2xl bg-yellow-400 text-base font-black text-gray-950 hover:bg-yellow-500"
              >
                Confirmar agendamento
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-2xl font-bold"
            >
              <Link href="/profissional/dashboard/agenda">
                Voltar para agenda
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: ReactElement;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-gray-50/70 p-5">
      <div className="mb-2 flex items-center gap-2 text-xs font-black tracking-widest text-gray-400 uppercase">
        {icon}
        {label}
      </div>

      <p className="text-sm font-bold leading-relaxed text-gray-800">{value}</p>
    </div>
  );
}
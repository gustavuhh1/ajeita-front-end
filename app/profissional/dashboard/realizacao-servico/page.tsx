"use client";

import { useMemo, useState, type ReactElement } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  PlayCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "../../components/page-shell";
import { ProviderStatusBadge } from "../../components/provider-status-badge";

const service = {
  code: "AJ-88291",
  title: "Instalação de tomadas e revisão elétrica",
  client: "Mariana Souza",
  address: "Rua Tibúrcio Cavalcante, 1200 · Aldeota",
  date: "Hoje, 14:00",
  price: "R$ 280,00",
};

type ServiceStatus = "Agendado" | "Em andamento" | "Finalizado";

export default function RealizacaoServicoPage() {
  const [status, setStatus] = useState<ServiceStatus>("Agendado");
  const [loadingAction, setLoadingAction] = useState<
    "check-in" | "check-out" | null
  >(null);
  const [error, setError] = useState("");

  const timeline = useMemo(
    () => [
      { label: "Agendado", active: true },
      {
        label: "Em andamento",
        active: status === "Em andamento" || status === "Finalizado",
      },
      { label: "Finalizado", active: status === "Finalizado" },
    ],
    [status],
  );

  function simulateAction(
    nextStatus: ServiceStatus,
    action: "check-in" | "check-out",
  ) {
    setError("");
    setLoadingAction(action);

    setTimeout(() => {
      setStatus(nextStatus);
      setLoadingAction(null);
    }, 700);
  }

  function handleCheckIn() {
    if (status !== "Agendado") {
      setError("O check-in só pode ser feito quando o serviço está agendado.");
      return;
    }

    simulateAction("Em andamento", "check-in");
  }

  function handleCheckOut() {
    if (status !== "Em andamento") {
      setError("Faça o check-in antes de finalizar o serviço.");
      return;
    }

    simulateAction("Finalizado", "check-out");
  }

  const isFinished = status === "Finalizado";

  return (
    <PageShell
      eyebrow="Provider · Execução"
      title="Realização do Serviço"
      description="Gerencie o atendimento no dia agendado, iniciando o serviço com check-in e finalizando com check-out."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="rounded-3xl border-gray-100 shadow-sm">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                Serviço #{service.code}
              </p>

              <CardTitle className="mt-2 text-2xl font-extrabold text-gray-950">
                {service.title}
              </CardTitle>
            </div>

            <ProviderStatusBadge status={status} />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<UserRound />}
                label="Cliente"
                value={service.client}
              />

              <InfoItem
                icon={<CalendarClock />}
                label="Horário"
                value={service.date}
              />

              <InfoItem
                icon={<MapPin />}
                label="Endereço"
                value={service.address}
              />

              <InfoItem
                icon={<CheckCircle2 />}
                label="Valor acordado"
                value={service.price}
              />
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="text-sm font-extrabold text-gray-800">
                Andamento
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {timeline.map((item, index) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl border p-4 ${
                      item.active
                        ? "border-yellow-200 bg-yellow-50 text-yellow-800"
                        : "border-gray-100 bg-white text-gray-400"
                    }`}
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                      {index + 1}
                    </div>

                    <p className="text-sm font-extrabold">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                disabled={status !== "Agendado" || loadingAction !== null}
                onClick={handleCheckIn}
                className="h-12 flex-1 rounded-2xl bg-yellow-400 font-extrabold text-gray-950 hover:bg-yellow-500"
              >
                {loadingAction === "check-in" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlayCircle className="mr-2 h-4 w-4" />
                )}
                Fazer check-in
              </Button>

              <Button
                type="button"
                disabled={status !== "Em andamento" || loadingAction !== null}
                onClick={handleCheckOut}
                className="h-12 flex-1 rounded-2xl bg-gray-950 font-extrabold text-white hover:bg-gray-800"
              >
                {loadingAction === "check-out" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Fazer check-out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <Clock3 className="h-5 w-5 text-yellow-500" />
              Regras do fluxo
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm leading-relaxed text-gray-500">
            <p>O botão de check-in muda o status para “Em andamento”.</p>
            <p>O botão de check-out só fica liberado após o check-in.</p>
            <p>
              Durante a requisição simulada, os botões ficam desabilitados para
              evitar ações duplicadas.
            </p>

            {isFinished && (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-4 font-bold text-green-700">
                Serviço finalizado com sucesso. A próxima etapa pode ser
                avaliação ou recebimento.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactElement;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
        {icon}
        {label}
      </div>

      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  );
}
"use client";

import { useState, type ReactElement } from "react";
import { CalendarDays, CreditCard, Eye, Filter, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageShell } from "../../components/page-shell";
import { ProviderStatusBadge } from "../../components/provider-status-badge";
import { ProviderEmptyState } from "../../components/provider-states";

const payments = [
  {
    id: "PAY-1008",
    service: "Instalação de tomadas",
    client: "Mariana Souza",
    date: "22/02/2026",
    value: "R$ 280,00",
    status: "Recebido",
    method: "Pix",
  },
  {
    id: "PAY-1007",
    service: "Manutenção no quadro elétrico",
    client: "Roberto Lima",
    date: "20/02/2026",
    value: "R$ 450,00",
    status: "Pendente",
    method: "Cartão de crédito",
  },
  {
    id: "PAY-1006",
    service: "Troca de luminárias",
    client: "Clara Mendes",
    date: "18/02/2026",
    value: "R$ 160,00",
    status: "Recebido",
    method: "Pix",
  },
];

export default function FaturamentoPage() {
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredPayments = payments.filter(
    (payment) => statusFilter === "Todos" || payment.status === statusFilter,
  );

  return (
    <PageShell
      eyebrow="Provider · Pagamentos"
      title="Recebimento de Pagamento"
      description="Acompanhe pagamentos recebidos, pendentes e os detalhes de cada transação relacionada aos seus serviços."
      actions={
        <div className="flex gap-2 rounded-2xl border border-gray-100 bg-white p-1 shadow-sm">
          {["Todos", "Recebido", "Pendente"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-colors ${
                statusFilter === status
                  ? "bg-yellow-400 text-gray-950"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={<Wallet />}
          label="Recebido no mês"
          value="R$ 3.450,00"
        />

        <SummaryCard
          icon={<CreditCard />}
          label="Pendente"
          value="R$ 450,00"
        />

        <SummaryCard
          icon={<CalendarDays />}
          label="Transações"
          value={`${filteredPayments.length}`}
        />
      </div>

      <Card className="rounded-3xl border-gray-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-extrabold">
            Histórico de recebimentos
          </CardTitle>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Filter className="h-4 w-4" />
            {statusFilter}
          </div>
        </CardHeader>

        <CardContent>
          {filteredPayments.length === 0 ? (
            <ProviderEmptyState
              title="Nenhum pagamento encontrado"
              description="Não encontramos recebimentos com esse filtro. Tente alterar o status selecionado."
            />
          ) : (
            <div className="space-y-3">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-5 transition-all hover:border-yellow-200 hover:shadow-sm lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase">
                        {payment.id}
                      </p>

                      <ProviderStatusBadge status={payment.status} />
                    </div>

                    <h3 className="mt-2 text-lg font-extrabold text-gray-950">
                      {payment.service}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {payment.client} · {payment.date} · {payment.method}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:justify-end">
                    <p className="text-xl font-black text-gray-950">
                      {payment.value}
                    </p>

                    <PaymentDetails payment={payment} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactElement;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-3xl border-gray-100 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
          {icon}
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {label}
          </p>

          <p className="text-2xl font-black text-gray-950">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentDetails({ payment }: { payment: (typeof payments)[number] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl font-bold">
          <Eye className="mr-2 h-4 w-4" />
          Detalhes
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Detalhe do pagamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 rounded-2xl bg-gray-50 p-5 text-sm">
          <Detail label="Transação" value={payment.id} />
          <Detail label="Serviço" value={payment.service} />
          <Detail label="Cliente" value={payment.client} />
          <Detail label="Data" value={payment.date} />
          <Detail label="Método" value={payment.method} />
          <Detail label="Valor" value={payment.value} />
          <Detail label="Status" value={payment.status} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2 last:border-0 last:pb-0">
      <span className="font-bold text-gray-400">{label}</span>
      <span className="text-right font-extrabold text-gray-900">{value}</span>
    </div>
  );
}
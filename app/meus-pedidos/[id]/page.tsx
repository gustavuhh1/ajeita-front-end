"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  MessageCircle,
  RefreshCcw,
  UserRound,
  Wallet,
} from "lucide-react";

import { MainHeader } from "@/app/cliente/components/MainHeader";
import { getServico, ServicoApi } from "@/app/api/servicos";
import {
  getOrcamentosPorServico,
  OrcamentoApi,
} from "@/app/api/orcamentos";

function formatDate(date?: string) {
  if (!date) return "Data não informada";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatCurrency(value?: number) {
  return Number(value ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getBudgetValue(budget: OrcamentoApi) {
  return Number(budget.price ?? budget.value ?? 0);
}

function getBudgetDate(budget: OrcamentoApi) {
  return budget.estimatedDate ?? budget.estimated_date;
}

function getProviderName(budget: OrcamentoApi) {
  return budget.provider?.name ?? budget.prestador?.name ?? "Prestador";
}

function getAddressLabel(service: ServicoApi | null) {
  const address = service?.address;

  if (!address) return "Endereço não informado";

  return `${address.rua ?? ""}, ${address.numero ?? ""} - ${
    address.cidade ?? ""
  }/${address.estado ?? ""}`;
}

function getBudgetStatusLabel(budget: OrcamentoApi) {
  const normalized = budget.status?.toUpperCase();

  if (budget.aprovoval || budget.approved) return "Aceito";

  const labels: Record<string, string> = {
    AGUARDANDO_CLIENTE: "Aguardando você",
    AGUARDANDO_PRESTADOR: "Aguardando prestador",
    ACEITO: "Aceito",
    PAGO: "Pago",
    AGENDADO: "Agendado",
    EM_ANDAMENTO: "Em andamento",
    FINALIZADO: "Finalizado",
    RECUSADO: "Recusado",
    CANCELADO: "Cancelado",
  };

  return labels[normalized ?? ""] ?? budget.status ?? "Pendente";
}

function getBudgetStatusStyle(budget: OrcamentoApi) {
  const normalized = budget.status?.toUpperCase();

  if (budget.aprovoval || budget.approved || normalized === "ACEITO") {
    return "bg-green-100 text-green-700";
  }

  if (normalized === "RECUSADO" || normalized === "CANCELADO") {
    return "bg-red-100 text-red-700";
  }

  if (normalized === "PAGO" || normalized === "FINALIZADO") {
    return "bg-emerald-100 text-emerald-700";
  }

  return "bg-yellow-100 text-yellow-700";
}

export default function PedidoDetalhePage() {
  const params = useParams<{ id: string }>();
  const serviceId = params.id;

  const [service, setService] = useState<ServicoApi | null>(null);
  const [budgets, setBudgets] = useState<OrcamentoApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDetails() {
    if (!serviceId) return;

    try {
      setError("");
      setIsLoading(true);

      const [serviceData, budgetsData] = await Promise.all([
        getServico(serviceId),
        getOrcamentosPorServico(serviceId),
      ]);

      setService(serviceData);
      setBudgets(budgetsData);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os detalhes do pedido.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDetails();
  }, [serviceId]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFCF5] text-gray-800">
      <MainHeader activePage="pedidos" />

      <main className="mx-auto w-full max-w-6xl grow px-6 py-8">
        <Link
          href="/meus-pedidos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-black text-gray-400 transition-colors hover:text-gray-700"
        >
          <ArrowLeft size={18} />
          Voltar para meus pedidos
        </Link>

        {isLoading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="flex items-center gap-3 rounded-3xl border border-yellow-100 bg-white px-6 py-5 text-sm font-bold text-gray-500 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
              Carregando detalhes do pedido...
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-black text-gray-950">
                Erro ao carregar pedido
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={loadDetails}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
              >
                <RefreshCcw size={16} />
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && service && (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <section className="space-y-6">
              <div className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-yellow-700">
                  Pedido #{service.id.slice(0, 8)}
                </span>

                <h1 className="mt-4 text-3xl font-black text-gray-950">
                  {service.title}
                </h1>

                <p className="mt-3 text-sm font-medium leading-relaxed text-gray-500">
                  {service.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <InfoCard
                    icon={<MapPin size={20} />}
                    label="Endereço"
                    value={getAddressLabel(service)}
                  />

                  <InfoCard
                    icon={<CalendarDays size={20} />}
                    label="Criado em"
                    value={formatDate(service.createdAt)}
                  />

                  <InfoCard
                    icon={<Clock size={20} />}
                    label="Status"
                    value={service.status ?? "Aberto"}
                  />

                  <InfoCard
                    icon={<CheckCircle2 size={20} />}
                    label="Orçamentos"
                    value={`${budgets.length} recebido${
                      budgets.length === 1 ? "" : "s"
                    }`}
                  />
                </div>
              </div>

              <div className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-gray-950">
                      Orçamentos recebidos
                    </h2>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Compare propostas e abra o chat para negociar.
                    </p>
                  </div>
                </div>

                {budgets.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                    <h3 className="text-lg font-black text-gray-950">
                      Nenhum orçamento ainda
                    </h3>

                    <p className="mt-2 text-sm font-medium text-gray-500">
                      Quando um prestador enviar uma proposta, ela aparecerá
                      aqui.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {budgets.map((budget) => (
                      <div
                        key={budget.id}
                        className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-yellow-200"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getBudgetStatusStyle(
                                  budget,
                                )}`}
                              >
                                {getBudgetStatusLabel(budget)}
                              </span>

                              <span className="rounded-full bg-gray-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                #{budget.id.slice(0, 8)}
                              </span>
                            </div>

                            <h3 className="text-lg font-black text-gray-950">
                              {getProviderName(budget)}
                            </h3>

                            <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-gray-500">
                              {budget.description ??
                                "Prestador enviou uma proposta para este serviço."}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                              <span className="flex items-center gap-1.5">
                                <Wallet size={15} />
                                {formatCurrency(getBudgetValue(budget))}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <CalendarDays size={15} />
                                {formatDate(getBudgetDate(budget))}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                            <Link
                              href={`/cliente/mensagens?budgetId=${budget.id}&serviceId=${service.id}`}
                              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 transition-all hover:bg-yellow-500"
                            >
                              <MessageCircle size={17} />
                              Abrir chat
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[36px] border border-yellow-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-gray-950">
                  Próximo passo
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                  Aguarde propostas dos prestadores. Quando receber uma
                  proposta, abra o chat para negociar, aceitar ou fazer
                  contraproposta.
                </p>

                <Link
                  href="/cliente/pedido"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
                >
                  Criar outro pedido
                </Link>
              </div>

              <div className="rounded-[36px] border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-gray-950">
                  Dica de segurança
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                  Use o chat do orçamento para manter o histórico da negociação
                  salvo no pedido.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
        <span className="text-yellow-500">{icon}</span>
        {label}
      </div>

      <p className="text-sm font-bold leading-relaxed text-gray-800">
        {value}
      </p>
    </div>
  );
}
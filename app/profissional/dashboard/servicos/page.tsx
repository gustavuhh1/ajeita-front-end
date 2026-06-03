"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Loader2,
  MapPin,
  MessageCircle,
  RefreshCcw,
  Search,
  Send,
  UserRound,
  Wallet,
  X,
} from "lucide-react";

import { getServicos, ServicoApi } from "@/app/api/servicos";
import { criarOrcamento, OrcamentoApi } from "@/app/api/orcamentos";
import { Button } from "@/components/ui/button";

interface BudgetForm {
  serviceId: string;
  serviceTitle: string;
  price: string;
  description: string;
  estimatedDate: string;
}

const initialBudgetForm: BudgetForm = {
  serviceId: "",
  serviceTitle: "",
  price: "",
  description: "",
  estimatedDate: "",
};

function getAddressLabel(service: ServicoApi) {
  const address = service.address;

  if (!address) return "Endereço não informado";

  return `${address.rua ?? ""}, ${address.numero ?? ""} - ${
    address.cidade ?? ""
  }/${address.estado ?? ""}`;
}

function formatDate(date?: string) {
  if (!date) return "Data não informada";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getClientName(service: ServicoApi) {
  return service.client?.name ?? "Cliente";
}

export default function ProfissionalServicosPage() {
  const [services, setServices] = useState<ServicoApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingBudget, setIsSendingBudget] = useState(false);
  const [error, setError] = useState("");

  const [city, setCity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetForm, setBudgetForm] = useState<BudgetForm>(initialBudgetForm);
  const [createdBudget, setCreatedBudget] = useState<OrcamentoApi | null>(null);

  async function loadServices() {
    try {
      setError("");
      setIsLoading(true);

      const data = await getServicos({
        city: city.trim() || undefined,
        categoryId: categoryId.trim() || undefined,
        page: 1,
        limit: 20,
      });

      setServices(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os serviços disponíveis.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function handleOpenBudgetModal(service: ServicoApi) {
    setCreatedBudget(null);

    setBudgetForm({
      serviceId: service.id,
      serviceTitle: service.title,
      price: "",
      description: "",
      estimatedDate: "",
    });

    setIsBudgetModalOpen(true);
  }

  function handleCloseBudgetModal() {
    setIsBudgetModalOpen(false);
    setBudgetForm(initialBudgetForm);
    setCreatedBudget(null);
  }

  async function handleSubmitBudget(event: FormEvent) {
    event.preventDefault();

    const parsedPrice = Number(
      budgetForm.price.replace(/\./g, "").replace(",", "."),
    );

    if (!budgetForm.serviceId) {
      alert("Serviço não selecionado.");
      return;
    }

    if (!parsedPrice || parsedPrice <= 0) {
      alert("Informe um valor válido para o orçamento.");
      return;
    }

    if (!budgetForm.description.trim()) {
      alert("Informe a descrição do orçamento.");
      return;
    }

    if (!budgetForm.estimatedDate) {
      alert("Informe a data estimada para execução.");
      return;
    }

    try {
      setIsSendingBudget(true);

      const budget = await criarOrcamento({
        serviceId: budgetForm.serviceId,
        price: parsedPrice,
        description: budgetForm.description.trim(),
        estimatedDate: new Date(budgetForm.estimatedDate).toISOString(),
      });

      setCreatedBudget(budget);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o orçamento.",
      );
    } finally {
      setIsSendingBudget(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Prestador
            </p>

            <h1 className="mt-1 text-3xl font-black text-gray-950">
              Serviços disponíveis
            </h1>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-gray-500">
              Encontre pedidos abertos dos clientes e envie uma proposta de
              orçamento.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-[28px] border border-gray-100 bg-white p-3 shadow-sm sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Filtrar cidade"
                className="h-11 w-full rounded-2xl bg-gray-50 pl-10 pr-4 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-yellow-100 sm:w-44"
              />
            </div>

            <div className="relative">
              <input
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                placeholder="categoryId"
                className="h-11 w-full rounded-2xl bg-gray-50 px-4 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-yellow-100 sm:w-44"
              />

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <Button
              type="button"
              onClick={loadServices}
              className="h-11 rounded-2xl bg-yellow-400 px-5 font-black text-gray-950 hover:bg-yellow-500"
            >
              Filtrar
            </Button>
          </div>
        </header>

        {isLoading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="flex items-center gap-3 rounded-3xl border border-yellow-100 bg-white px-6 py-5 text-sm font-bold text-gray-500 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
              Carregando serviços disponíveis...
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-black text-gray-950">
                Erro ao carregar serviços
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={loadServices}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
              >
                <RefreshCcw size={16} />
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && services.length === 0 && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="max-w-md rounded-3xl border border-yellow-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-50 text-yellow-500">
                <ClipboardList size={32} />
              </div>

              <h2 className="text-xl font-black text-gray-950">
                Nenhum serviço disponível
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                Tente alterar os filtros ou volte mais tarde para encontrar
                novos pedidos.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="grid gap-5">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-yellow-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-yellow-700">
                        Disponível
                      </span>

                      <span className="rounded-full bg-gray-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        #{service.id.slice(0, 8)}
                      </span>
                    </div>

                    <h2 className="truncate text-xl font-black text-gray-950">
                      {service.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm font-medium leading-relaxed text-gray-500">
                      {service.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <UserRound size={15} />
                        {getClientName(service)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} />
                        {getAddressLabel(service)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} />
                        {formatDate(service.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <button
                      type="button"
                      onClick={() => handleOpenBudgetModal(service)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 transition-all hover:bg-yellow-500"
                    >
                      <Send size={17} />
                      Enviar orçamento
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-[36px] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-8 py-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                  Novo orçamento
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-950">
                  {budgetForm.serviceTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseBudgetModal}
                className="rounded-2xl p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>

            {createdBudget ? (
              <div className="p-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600">
                  <MessageCircle size={32} />
                </div>

                <h3 className="text-2xl font-black text-gray-950">
                  Orçamento enviado!
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-gray-500">
                  Agora o cliente poderá visualizar sua proposta. Você também já
                  pode abrir o chat desse orçamento.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCloseBudgetModal}
                    className="flex-1 rounded-2xl border border-gray-100 px-5 py-3 text-sm font-black text-gray-500 hover:bg-gray-50"
                  >
                    Fechar
                  </button>

                  <Link
                    href={`/profissional/dashboard/mensagens?budgetId=${createdBudget.id}`}
                    className="flex-1 rounded-2xl bg-yellow-400 px-5 py-3 text-center text-sm font-black text-gray-950 hover:bg-yellow-500"
                  >
                    Abrir chat
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitBudget} className="space-y-5 p-8">
                <div>
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Valor do orçamento
                  </label>

                  <div className="relative">
                    <Wallet
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      required
                      value={budgetForm.price}
                      onChange={(event) =>
                        setBudgetForm((current) => ({
                          ...current,
                          price: event.target.value,
                        }))
                      }
                      placeholder="Ex: 250,00"
                      className="h-13 w-full rounded-2xl border border-gray-100 bg-gray-50 pl-11 pr-4 text-sm font-bold outline-none transition-all focus:border-yellow-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Descrição da proposta
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={budgetForm.description}
                    onChange={(event) =>
                      setBudgetForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Explique o que será feito, materiais inclusos e observações importantes..."
                    className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Data estimada
                  </label>

                  <input
                    required
                    type="datetime-local"
                    value={budgetForm.estimatedDate}
                    onChange={(event) =>
                      setBudgetForm((current) => ({
                        ...current,
                        estimatedDate: event.target.value,
                      }))
                    }
                    className="h-13 w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-bold outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCloseBudgetModal}
                    className="flex-1 rounded-2xl border border-gray-100 px-5 py-3 text-sm font-black text-gray-500 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSendingBudget}
                    className="flex-1 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500 disabled:opacity-60"
                  >
                    {isSendingBudget ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      "Enviar orçamento"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
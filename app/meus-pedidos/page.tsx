"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Loader2,
  MapPin,
  Plus,
  RefreshCcw,
} from "lucide-react";

import { MainHeader } from "@/app/cliente/components/MainHeader";
import { getMeusServicos, ServicoApi } from "@/app/api/servicos";

function formatDate(date?: string) {
  if (!date) return "Data não informada";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getAddressLabel(service: ServicoApi) {
  const address = service.address;

  if (!address) return "Endereço não informado";

  return `${address.rua ?? ""}, ${address.numero ?? ""} - ${
    address.cidade ?? ""
  }/${address.estado ?? ""}`;
}

function getStatusLabel(status?: string) {
  const normalized = status?.toUpperCase();

  const labels: Record<string, string> = {
    ABERTO: "Aberto",
    OPEN: "Aberto",
    PENDENTE: "Pendente",
    PENDING: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    IN_PROGRESS: "Em andamento",
    FINALIZADO: "Finalizado",
    DONE: "Finalizado",
    CANCELADO: "Cancelado",
    CANCELED: "Cancelado",
  };

  return labels[normalized ?? ""] ?? status ?? "Aberto";
}

function getStatusStyle(status?: string) {
  const normalized = status?.toUpperCase();

  if (normalized === "FINALIZADO" || normalized === "DONE") {
    return "bg-green-100 text-green-700";
  }

  if (normalized === "CANCELADO" || normalized === "CANCELED") {
    return "bg-red-100 text-red-700";
  }

  if (normalized === "EM_ANDAMENTO" || normalized === "IN_PROGRESS") {
    return "bg-orange-100 text-orange-700";
  }

  return "bg-yellow-100 text-yellow-700";
}

export default function MeusPedidosPage() {
  const [services, setServices] = useState<ServicoApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadServices() {
    try {
      setError("");
      setIsLoading(true);

      const data = await getMeusServicos();
      setServices(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar seus pedidos.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFCF5] text-gray-800">
      <MainHeader activePage="pedidos" />

      <main className="mx-auto w-full max-w-6xl grow px-6 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Cliente
            </p>

            <h1 className="mt-1 text-3xl font-black text-gray-950">
              Meus Pedidos
            </h1>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-gray-500">
              Acompanhe os serviços que você criou, veja propostas recebidas e
              abra o chat de cada orçamento.
            </p>
          </div>

          <Link
            href="/cliente/pedido"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
          >
            <Plus size={18} />
            Novo pedido
          </Link>
        </div>

        {isLoading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="flex items-center gap-3 rounded-3xl border border-yellow-100 bg-white px-6 py-5 text-sm font-bold text-gray-500 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
              Carregando seus pedidos...
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-black text-gray-950">
                Erro ao carregar pedidos
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
                Nenhum pedido criado
              </h2>

              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
                Crie seu primeiro pedido para receber propostas de prestadores.
              </p>

              <Link
                href="/cliente/pedido"
                className="mt-6 inline-flex rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
              >
                Criar pedido
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="grid gap-5">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/meus-pedidos/${service.id}`}
                className="group rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-yellow-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getStatusStyle(
                          service.status,
                        )}`}
                      >
                        {getStatusLabel(service.status)}
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
                        <MapPin size={15} />
                        {getAddressLabel(service)}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} />
                        {formatDate(service.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:justify-end">
                    <span className="text-sm font-black text-yellow-600">
                      Ver detalhes
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500 transition-colors group-hover:bg-yellow-400 group-hover:text-white">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";
import {
  CheckCircleIcon,
  MoneyIcon,
  StarIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";

const CardsModal = () => {
  return (
    // TODO: Implmentar responsividade para telas menores (exibir em carrossel ou em colunas)
    <section className="mt-3 flex w-full items-center justify-between gap-8">
      {/* Card de Ganhos do Mês */}
      <div className="flex h-35 flex-1 items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 pr-20 shadow-md">
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-green-100">
          <MoneyIcon size={28} className="text-green-500" />
        </div>
        <div className="space-y-1">
          <p className="text-md font-medium text-gray-500">Ganhos do mês</p>
          <h2 className="text-lg font-semibold md:text-xl lg:text-3xl">
            R$ 1.250,00
          </h2>
          <span
            className={cn(
              "flex items-center gap-1 text-sm",
              true ? "text-green-500" : "text-red-500",
            )}
          >
            {true ? <TrendUpIcon /> : <TrendDownIcon />}
            12% em relação ao mês anterior
          </span>
        </div>
      </div>
      {/* Card Contador de Serviços Concluídos no mês */}
      <div className="flex h-35 flex-1 items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 pr-20 shadow-md">
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-blue-100">
          <CheckCircleIcon size={28} weight="fill" className="text-blue-500" />
        </div>
        <div className="space-y-1">
          <p className="text-md font-medium text-gray-500">
            Serviços Concluídos
          </p>
          <h2 className="text-lg font-semibold md:text-xl lg:text-3xl">28</h2>
          <span className="text-sm text-gray-500">Este mês</span>
        </div>
      </div>
      {/* Card de Média de Avaliações */}
      <div className="flex h-35 flex-1 items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 pr-20 shadow-md">
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-yellow-100">
          <StarIcon size={28} weight="fill" className="text-yellow-500" />
        </div>
        <div className="space-y-1">
          <p className="text-md font-medium text-gray-500">
            Média de Avaliações
          </p>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold md:text-xl lg:text-3xl">
              4.8
            </h2>
            <p className="text-muted-foreground mb-1 self-end text-xs">
              (120 avaliações)
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {false
              ? "Excelente desempenho!"
              : false
                ? "Matenha o bom desempenho!"
                : "Podemos melhorar!"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CardsModal;

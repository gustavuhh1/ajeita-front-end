"use client";

import {
  CurrencyDollarIcon,
  LightningIcon,
  MapPinIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { LandPlot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ServiceList = () => {
  return (
    <section className="mt-3 w-full max-w-2/3 space-y-4">
      <div className="flex h-fit w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500">
            <ThumbsUpIcon size={18} weight="fill" className="text-white" />
          </span>
          <h3 className="text-lg font-semibold">
            Pedidos recomendados para você
          </h3>
        </div>
        <Link
          href="/profissional/pedidos"
          className="text-primary font-semibold hover:underline"
        >
          Ver todos
        </Link>
      </div>
      <ServiceItem />
      <ServiceItem />
      <ServiceItem />
    </section>
  );
};

function ServiceItem() {
  const router = useRouter();

  return (
    <div className="roundend-xl relative flex w-full items-center gap-4 rounded-2xl border-l-4 bg-white p-4 shadow-lg">
      <div className="flex h-12 items-center justify-center rounded-2xl bg-orange-200 p-3">
        <LightningIcon size={24} weight="fill" className="text-orange-500" />
      </div>
      <div className="space-y-1">
        <h4 className="text-md text-lg font-semibold">Reparo de Fiação</h4>
        <p className="text-sm text-gray-500">Elétrica - Manutenção</p>
        <div className="flex h-fit w-full items-center gap-4 pt-2">
          <div className="flex items-center gap-1">
            <MapPinIcon size={16} weight="fill" className="text-gray-600" />
            <span className="text-sm text-gray-500">Aldeota, Fortaleza</span>
          </div>
          <div className="flex items-center gap-1">
            <LandPlot size={16} className="text-gray-600" />
            <span className="text-sm text-gray-500">2.3 km</span>
          </div>
          <div className="flex items-center gap-1">
            <CurrencyDollarIcon
              size={16}
              weight="duotone"
              className="text-gray-600"
            />
            <span className="text-sm font-semibold text-gray-700">
              R$ 150 - 200
            </span>
          </div>
        </div>
      </div>
      <div className="relative ml-auto flex">
        {true ? (
          <span className="absolute -top-5 -left-20 text-sm text-gray-500">
            Há 45 min
          </span>
        ) : (
          <div className="absolute -top-5 -left-20 h-6 rounded-lg bg-green-100 px-2 py-0.5 text-xs">
            <span className="font-medium text-green-800">Novo</span>
          </div>
        )}
        <Button
          onClick={() => {
            router.push("/profissional/servico/123");
          }}
          variant="outline"
          size="lg"
          className="p-4"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}

export default ServiceList;

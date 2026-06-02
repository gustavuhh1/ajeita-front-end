import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  CreditCard,
  Star,
  Clock,
  Tag,
} from "lucide-react";
import { getServico } from "@/app/api/servicos";
import { PropostaDialog } from "../../components/proposta-dialog";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServicoDetalhesPage({ params }: Props) {
  const { id } = await params;
  const service = await getServico(Number(id));

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/profissional/dashboard/servicos"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para serviços
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">

          <div className="flex flex-col gap-6 lg:col-span-2">
            {service.photos && service.photos.length > 0 && (
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-80">
                <Image
                  src={service.photos[0]}
                  alt={service.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {service.isNew && (
                  <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-yellow-900 shadow-sm">
                    Novo
                  </span>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-700">
                  {service.category}
                </span>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {service.type}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {service.title}
              </h1>

              {service.rating && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-700">{service.rating.toFixed(1)}</span>
                  {service.reviewCount && <span>({service.reviewCount} avaliações)</span>}
                </div>
              )}

              {service.description && (
                <p className="mt-4 text-sm leading-relaxed text-gray-600">{service.description}</p>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-bold text-gray-900">Informações</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <InfoItem icon={<MapPin className="h-4 w-4" />} label="Bairro" value={service.location} />
                <InfoItem icon={<Navigation className="h-4 w-4" />} label="Distância" value={service.distance} />
                <InfoItem icon={<CreditCard className="h-4 w-4" />} label="Faixa de preço" value={service.priceRange} />
                <InfoItem icon={<Tag className="h-4 w-4" />} label="Categoria" value={service.category} />
                {service.timeAgo && (
                  <InfoItem icon={<Clock className="h-4 w-4" />} label="Publicado" value={service.timeAgo} />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Faixa de preço</p>
              <p className="text-2xl font-extrabold text-gray-900">{service.priceRange}</p>

              <div className="mt-6 flex flex-col gap-3">
                <PropostaDialog />
              </div>

              <p className="mt-4 text-center text-xs text-gray-500">
                Ao enviar uma proposta, você não está assumindo um compromisso imediato com este serviço. Sua proposta será avaliada pelo cliente e poderá ser excluída caso não seja aceita ou se você mudar de ideia.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold text-gray-700">Resumo</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                  {service.location} · {service.distance}
                </li>
                {service.rating && (
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                    {service.rating.toFixed(1)} / 5.0
                  </li>
                )}
                {service.timeAgo && (
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-gray-400" />
                    {service.timeAgo}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, CreditCard } from "lucide-react";

interface JobCardProps {
  icon: React.ReactNode;
  title: string;
  isNew?: boolean;
  timeAgo?: string;
  category: string;
  type: string;
  location: string;
  distance: string;
  priceRange: string;
  highlighted?: boolean;
}

export function ServiceCard({
  icon,
  title,
  isNew,
  timeAgo,
  category,
  type,
  location,
  distance,
  priceRange,
  highlighted = false,
}: JobCardProps) {
  return (
    // TODO: adicionar borda amarela e sombra quando for destacado (Serviço Novo)
    <div
      className={`flex items-start gap-4 rounded-lg border p-4 transition-all ${
        highlighted
          ? "border-yellow-300 bg-yellow-50/30 shadow-sm"
          : "border-zinc-400 bg-white hover:bg-gray-50"
      }`}
    >
      {/* Ícone do tipo de serviço */}
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        {/* Título + badge de status + botão */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm leading-tight font-semibold text-gray-900">
                {title}
              </h3>
              {isNew && (
                <Badge className="rounded bg-yellow-400 px-2 py-0 text-xs text-yellow-900 hover:bg-yellow-400">
                  NOVO
                </Badge>
              )}
              {timeAgo && (
                <span className="text-xs text-gray-400">{timeAgo}</span>
              )}
            </div>
            {/* Categorias do serviço */}
            <p className="mt-0.5 text-xs tracking-wide text-gray-400 uppercase">
              {category} • {type}
            </p>
          </div>

          <Button
            size="lg"
            className={
              highlighted
                ? "shrink-0 bg-yellow-400 text-xs font-semibold text-yellow-900 hover:bg-yellow-500"
                : "shrink-0 border border-gray-200 bg-transparent text-xs text-gray-600 hover:bg-gray-50"
            }
            variant={highlighted ? "default" : "outline"}
          >
            Ver Detalhes
          </Button>
        </div>

        {/* Metadados: localização, distância e preço */}
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Navigation className="h-3 w-3" />
            {distance}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CreditCard className="h-3 w-3" />
            {priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}

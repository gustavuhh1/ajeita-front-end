/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
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
  photos?: string[];
  viewMode?: "grid" | "list";
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
  photos,
  viewMode = "list",
}: JobCardProps) {
  const containerBaseClass = `rounded-xl border p-4 sm:p-5 transition-all duration-200 ${
    highlighted
      ? "border-yellow-300 bg-yellow-50/30 shadow-md"
      : "border-zinc-200 bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-1"
  }`;

  if (viewMode === "grid") {
    return (
      <div className={`flex h-full flex-col gap-4 ${containerBaseClass}`}>
        {/* Imagem (Grid) */}
        {photos && photos.length > 0 ? (
          <Image
            src={photos[0]}
            alt={title}
            width={600}
            height={400}
            unoptimized
            className="h-48 sm:h-56 w-full rounded-xl object-cover border border-gray-100"
          />
        ) : (
          <div className="flex h-48 sm:h-56 w-full items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
            {React.cloneElement(icon as React.ReactElement<any>, { className: "h-14 w-14 text-gray-400" })}
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between gap-4 mt-1">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {isNew && (
                  <Badge className="rounded bg-yellow-400 px-2 py-0.5 text-xs font-bold text-yellow-900 hover:bg-yellow-400">
                    NOVO
                  </Badge>
                )}
                {timeAgo && (
                  <span className="text-xs sm:text-sm font-medium text-gray-500">{timeAgo}</span>
                )}
              </div>
            </div>
            
            <h3 className="text-base sm:text-lg font-bold leading-tight text-gray-900 line-clamp-2">
              {title}
            </h3>
            
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-500 uppercase">
              {category} • {type}
            </p>
          </div>

          <div className="space-y-4">
            {/* Metadados: localização, distância e preço */}
            <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-3 border border-gray-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {location}
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600">
                  <Navigation className="h-4 w-4 text-gray-400" />
                  {distance}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-gray-900">
                <CreditCard className="h-4 w-4 text-gray-400" />
                {priceRange}
              </span>
            </div>

            <Button
              className={`w-full ${
                highlighted
                  ? "bg-yellow-400 font-bold text-yellow-900 hover:bg-yellow-500 shadow-sm"
                  : "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
              }`}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Lista (Balanceada)
  return (
    <div className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-5 ${containerBaseClass}`}>
      {/* Imagem do serviço ou Ícone fallback */}
      {photos && photos.length > 0 ? (
        <Image
          src={photos[0]}
          alt={title}
          width={400}
          height={400}
          unoptimized
          className="h-40 w-full sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 rounded-lg object-cover border border-gray-100 shadow-sm"
        />
      ) : (
        <div className="flex h-40 w-full sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
          {React.cloneElement(icon as React.ReactElement<any>, { className: "h-10 w-10 text-gray-400" })}
        </div>
      )}

      <div className="min-w-0 flex-1 flex flex-col h-full justify-between w-full">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold leading-tight text-gray-900">
                {title}
              </h3>
              {isNew && (
                <Badge className="rounded bg-yellow-400 px-2 py-0 text-[10px] sm:text-xs font-bold text-yellow-900 hover:bg-yellow-400">
                  NOVO
                </Badge>
              )}
              {timeAgo && (
                <span className="text-xs sm:text-sm font-medium text-gray-500">{timeAgo}</span>
              )}
            </div>
            {/* Categorias do serviço */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-500 uppercase">
              {category} • {type}
            </p>
          </div>

          <Button
            size="sm"
            className={`shrink-0 hidden sm:inline-flex ${
              highlighted
                ? "bg-yellow-400 font-bold text-yellow-900 hover:bg-yellow-500 shadow-sm"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
            variant={highlighted ? "default" : "outline"}
          >
            Ver Detalhes
          </Button>
        </div>

        {/* Metadados: localização, distância e preço */}
        <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            {location}
          </span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600">
            <Navigation className="h-4 w-4 text-gray-400" />
            {distance}
          </span>
          <span className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-gray-900">
            <CreditCard className="h-4 w-4 text-gray-400" />
            {priceRange}
          </span>
        </div>
        
        {/* Botão Mobile */}
        <Button
          size="sm"
          className={`mt-4 w-full sm:hidden ${
            highlighted
              ? "bg-yellow-400 font-bold text-yellow-900 hover:bg-yellow-500 shadow-sm"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
          }`}
          variant={highlighted ? "default" : "outline"}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}

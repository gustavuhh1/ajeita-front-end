"use client"

import Link from "next/link"

import {
  ChevronRight,
  Heart,
  MapPin,
} from "lucide-react"

import { ProviderAvatar } from "./ProviderAvatar"

import {
  RatingBadge,
  ServiceTag,
} from "./ProviderCardElements"

interface ProviderCardProps {
  provider: {
    id: number | string
    name: string
    role: string
    rating?: number
    reviews?: number
    price: number
    unit: string
    tags: string[]
    location?: string
    image?: string | null
  }

  viewMode?: "grid" | "list"
}

export const ProviderCard = ({
  provider,
  viewMode = "grid",
}: ProviderCardProps) => {
  const isGrid = viewMode === "grid"

  return (
    <div
      className={`
        group border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md
        ${
          isGrid
            ? "flex flex-col rounded-[32px] p-6"
            : "flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-6"
        }
      `}
    >
      <div
        className={`flex ${
          isGrid
            ? "mb-4 items-start justify-between"
            : "items-center justify-between sm:shrink-0 sm:justify-start"
        }`}
      >
        <div className="relative">
          <ProviderAvatar
            src={provider.image}
            name={provider.name}
            size={isGrid ? "md" : "sm"}
          />

          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
        </div>

        <button
          aria-label="Adicionar aos favoritos"
          className={`p-2 text-gray-300 transition-colors hover:text-rose-500 ${
            !isGrid ? "sm:hidden" : ""
          }`}
        >
          <Heart size={20} />
        </button>
      </div>

      <div
        className={`grow ${
          isGrid
            ? "space-y-4"
            : "flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center"
        }`}
      >
        <div className="space-y-1">
          <h4 className="text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-amber-500">
            {provider.name}
          </h4>

          <p className="text-sm font-medium text-gray-400">
            {provider.role}
          </p>

          {!isGrid && provider.location && (
            <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={12} />
              {provider.location}
            </div>
          )}

          <div className="pt-1">
            <RatingBadge
              rating={provider.rating}
              reviews={provider.reviews}
            />
          </div>
        </div>

        {isGrid && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {provider.tags
                .slice(0, 3)
                .map((tag) => (
                  <ServiceTag
                    key={tag}
                    label={tag}
                  />
                ))}
            </div>

            {provider.location && (
              <p className="flex items-center gap-1 text-[11px] text-gray-400">
                <MapPin size={12} />
                Atende em:
                {provider.location}
              </p>
            )}
          </div>
        )}
      </div>

      <div
        className={`
          ${
            isGrid
              ? "mt-4 flex items-center justify-between border-t border-gray-50 pt-4"
              : "flex w-full items-center justify-between gap-6 border-t border-gray-50 pt-3 sm:w-auto sm:shrink-0 sm:justify-end sm:border-t-0 sm:pt-0"
          }
        `}
      >
        <div className="text-left">
          <p className="text-[10px] font-bold uppercase leading-none tracking-widest text-gray-400">
            A partir de
          </p>

          <p className="mt-1 font-bold text-gray-900">
            R$ {provider.price}

            <span className="text-sm font-medium text-gray-400">
              /{provider.unit}
            </span>
          </p>
        </div>

        <Link
          href={`/cliente/buscar-profissional/perfil/${provider.id}`}
          className={`
            flex items-center justify-center gap-2 bg-yellow-400 font-bold text-gray-900 shadow-sm transition-colors hover:bg-yellow-500
            ${
              isGrid
                ? "rounded-xl px-6 py-2.5 text-sm"
                : "w-fit rounded-2xl px-5 py-3 text-base"
            }
          `}
        >
          Ver Perfil

          {!isGrid && (
            <ChevronRight size={18} />
          )}
        </Link>
      </div>
    </div>
  )
}
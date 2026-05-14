/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Navigation, CreditCard, Star, Clock, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ServiceCardData {
  id: number;
  title: string;
  category: string;
  type: string;
  location: string;
  distance: string;
  distanceValue?: number; // numeric km for filtering
  priceRange: string;
  priceMin?: number; // numeric for filtering
  priceMax?: number; // numeric for filtering
  timeAgo?: string;
  isNew?: boolean;
  highlighted?: boolean;
  photos: string[];
  icon: React.ReactNode;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

interface ServiceCardProps extends ServiceCardData {
  viewMode?: "grid" | "list";
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "ELÉTRICA":       { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-400" },
  "PINTURA":        { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-400" },
  "CARPINTARIA":    { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-400" },
  "LIMPEZA":        { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-400" },
  "HIDRÁULICA":     { bg: "bg-cyan-100",   text: "text-cyan-800",   dot: "bg-cyan-400" },
  "REFORMA":        { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-400" },
  "JARDINAGEM":     { bg: "bg-lime-100",   text: "text-lime-800",   dot: "bg-lime-400" },
  "AR CONDICIONADO":{ bg: "bg-sky-100",    text: "text-sky-800",    dot: "bg-sky-400" },
  "MUDANÇA":        { bg: "bg-rose-100",   text: "text-rose-800",   dot: "bg-rose-400" },
  "SEGURANÇA":      { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-400" },
};

function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_COLORS[category] ?? { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
      {category}
    </span>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      <span className="text-xs font-bold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
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
  rating,
  reviewCount,
  description,
}: ServiceCardProps) {
  const [saved, setSaved] = useState(false);

  const imageUrl = photos && photos.length > 0 ? photos[0] : null;

  // ─── GRID CARD ────────────────────────────────────────────────
  if (viewMode === "grid") {
    return (
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          highlighted
            ? "border-yellow-300 ring-1 ring-yellow-200 shadow-md"
            : "border-gray-200 shadow-sm hover:border-gray-300"
        }`}
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              {React.cloneElement(icon as React.ReactElement<any>, {
                className: "h-14 w-14 text-gray-300",
              })}
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            {isNew && (
              <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-yellow-900 shadow-sm">
                Novo
              </span>
            )}
            {highlighted && (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-800 shadow-sm backdrop-blur-sm">
                ✦ Destaque
              </span>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={() => setSaved(!saved)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
            aria-label="Salvar serviço"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 fill-gray-900 text-gray-900" />
            ) : (
              <Bookmark className="h-4 w-4 text-gray-600" />
            )}
          </button>

          {/* Price badge on image */}
          <div className="absolute bottom-3 right-3">
            <span className="rounded-xl bg-white/95 px-2.5 py-1 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-sm">
              {priceRange}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Category + type */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={category} />
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              {type}
            </span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{description}</p>
          )}

          {/* Meta row */}
          <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                {location}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Navigation className="h-3.5 w-3.5 text-gray-400" />
                {distance}
              </span>
            </div>
            <div className="flex items-center justify-between">
              {rating && <RatingStars rating={rating} />}
              {timeAgo && (
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Clock className="h-3 w-3" />
                  {timeAgo}
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <Button
            className={`w-full text-sm font-semibold ${
              highlighted
                ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-sm"
                : "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
            }`}
          >
            Ver Detalhes
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ─── LIST CARD ────────────────────────────────────────────────
  return (
    <div
      className={`group flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white transition-all duration-300 sm:flex-row hover:shadow-lg hover:-translate-y-0.5 ${
        highlighted
          ? "border-yellow-300 ring-1 ring-yellow-200 shadow-md"
          : "border-gray-200 shadow-sm hover:border-gray-300"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:w-52 lg:w-60">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            {React.cloneElement(icon as React.ReactElement<any>, {
              className: "h-12 w-12 text-gray-300",
            })}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {isNew && (
            <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-yellow-900 shadow-sm">
              Novo
            </span>
          )}
          {highlighted && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-800 shadow-sm backdrop-blur-sm">
              ✦ Destaque
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4 sm:py-5 sm:pr-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={category} />
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              {type}
            </span>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:scale-110 hover:border-gray-300 hover:bg-gray-50"
            aria-label="Salvar serviço"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 fill-gray-900 text-gray-900" />
            ) : (
              <Bookmark className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm leading-relaxed text-gray-500 line-clamp-2">{description}</p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-gray-500">
            <MapPin className="h-4 w-4 text-gray-400" />
            {location}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-gray-500">
            <Navigation className="h-4 w-4 text-gray-400" />
            {distance}
          </span>
          <span className="flex items-center gap-1.5 font-bold text-gray-800">
            <CreditCard className="h-4 w-4 text-gray-400" />
            {priceRange}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-4">
            {rating && (
              <div className="flex items-center gap-1.5">
                <RatingStars rating={rating} />
                {reviewCount && (
                  <span className="text-xs text-gray-400">({reviewCount} avaliações)</span>
                )}
              </div>
            )}
            {timeAgo && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className={`shrink-0 text-sm font-semibold ${
              highlighted
                ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-sm"
                : "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
            }`}
          >
            Ver Detalhes
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StateMessageProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ProviderListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <Card key={index} className="rounded-3xl border-gray-100 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <Skeleton className="h-20 w-full rounded-2xl sm:w-28" />

            <div className="flex flex-1 flex-col gap-3">
              <Skeleton className="h-4 w-28 rounded-full" />
              <Skeleton className="h-6 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-2/3 rounded-full" />
            </div>

            <Skeleton className="h-11 w-full rounded-2xl sm:w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProviderInlineLoading({
  label = "Carregando informações...",
}: {
  label?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-white p-8 text-sm font-semibold text-gray-500 shadow-sm">
      <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
      {label}
    </div>
  );
}

export function ProviderErrorState({
  title,
  description,
  actionLabel = "Tentar novamente",
  onAction,
}: StateMessageProps) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50/70 p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h2 className="text-xl font-extrabold text-red-950">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-red-700">
        {description}
      </p>

      {onAction && (
        <Button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-2xl bg-red-600 font-bold text-white hover:bg-red-700"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ProviderEmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: StateMessageProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
        <Inbox className="h-7 w-7" />
      </div>

      <h2 className="text-xl font-extrabold text-gray-950">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-2xl bg-yellow-400 font-bold text-gray-950 hover:bg-yellow-500"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
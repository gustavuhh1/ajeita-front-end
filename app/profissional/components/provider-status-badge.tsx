import { Badge } from "@/components/ui/badge";

const statusStyles: Record<string, string> = {
  agendado: "border-blue-200 bg-blue-50 text-blue-700",
  "em andamento": "border-yellow-200 bg-yellow-50 text-yellow-700",
  finalizado: "border-green-200 bg-green-50 text-green-700",
  confirmado: "border-green-200 bg-green-50 text-green-700",
  pendente: "border-orange-200 bg-orange-50 text-orange-700",
  recebido: "border-green-200 bg-green-50 text-green-700",
  cancelado: "border-red-200 bg-red-50 text-red-700",
};

export function ProviderStatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-1 text-xs font-extrabold ${
        statusStyles[key] ?? "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {status}
    </Badge>
  );
}
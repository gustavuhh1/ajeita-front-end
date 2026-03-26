import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  badge?: string;
}

export function StatCard({ icon, label, value, sub, badge }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
            {icon}
          </div>
          {badge && (
            <Badge className="bg-green-100 text-xs font-semibold text-green-700 hover:bg-green-100">
              {badge}
            </Badge>
          )}
        </div>
        <p className="mb-1 text-sm text-zinc-700">{label}</p>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
        {sub && <p className="text-sm text-zinc-400">{sub}</p>}
      </CardContent>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Settings,
  DollarSign,
  CheckSquare,
  Star,
  Zap,
  Sun,
  Calendar,
} from "lucide-react";
import { StatCard } from "./components/cards-stats";
import { AgendaItem } from "./components/agenda-card";
import { ServiceCard } from "./components/service-card";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr";

export default function ProfessionalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* ── HEADER ── */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Dashboard Profissional
            </p>
            <h1 className="mt-0.5 text-3xl font-bold text-gray-900">
              Olá, Carlos
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Aqui está o resumo das suas atividades hoje.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-end">
            <Badge
              variant="outline"
              className="flex h-9 items-center gap-1 rounded-lg border-green-400 px-3 py-1.5 text-green-600 shadow-sm"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Verificado
            </Badge>
            <Button
              size="lg"
              className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
            >
              <Settings className="h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<DollarSign className="h-5 w-5 text-yellow-600" />}
            label="Ganhos em Julho"
            value="R$ 3.450,00"
            sub="+ 12% que Junho"
            badge="+ 12%"
          />
          <StatCard
            icon={<CheckSquare className="h-5 w-5 text-yellow-600" />}
            label="Serviços Concluídos"
            value="28"
          />
          <StatCard
            icon={<Star className="h-5 w-5 text-yellow-600" />}
            label="Avaliação Média"
            value="4.9"
            sub="(152 reviews)"
          />
        </div>

        {/* ── PEDIDOS + AGENDA ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Seção de Pedidos Recomendados */}
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <BriefcaseIcon size={28} className="text-yellow-500" /> Pedidos
                Recomendados
              </h2>
              <button className="text-sm font-medium text-yellow-600 hover:underline">
                Ver todos
              </button>
            </div>

            <div className="space-y-1 p-3">
              <ServiceCard
                icon={<Zap className="h-4 w-4 text-gray-500" />}
                title="Instalação de Disjuntor"
                isNew
                category="RESIDENCIAL"
                type="ELÉTRICA"
                location="Aldeota"
                distance="2.3 km"
                priceRange="R$ 150 - 200"
                highlighted
              />
              <div className="mx-4 h-px bg-gray-100" />
              <ServiceCard
                icon={<Zap className="h-4 w-4 text-gray-500" />}
                title="Reparo de Fiação"
                timeAgo="45 min atrás"
                category="MANUTENÇÃO"
                type="URGENTE"
                location="Meireles"
                distance="1.1 km"
                priceRange="R$ 300 - 450"
              />
              <div className="mx-4 h-px bg-gray-100" />
              <ServiceCard
                icon={<Sun className="h-4 w-4 text-gray-500" />}
                title="Troca de Luminárias"
                timeAgo="2h atrás"
                category="INSTALAÇÃO"
                type="SIMPLES"
                location="Varjota"
                distance="3.5 km"
                priceRange="R$ 100 - 150"
              />
            </div>
          </div>

          {/* Seção de Agenda */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <Calendar className="text-yellow-500" /> Agenda
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs text-gray-600"
              >
                Semana
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <AgendaItem
                  timeLabel="HOJE"
                  time="14:00"
                  title="Instalação de Tomadas"
                  clientName="Mariana S."
                  address="R. Tibúrcio Cavalcante, 1200"
                  isToday
                />
                <AgendaItem
                  timeLabel="AMANHÃ"
                  time="09:00"
                  title="Manutenção Quadro Elétrico"
                  clientName="Roberto M."
                  address="Av. Santos Dumont, 3000"
                />
                <AgendaItem
                  timeLabel="AMANHÃ"
                  time="15:30"
                  title="Visita Técnica"
                  address="Shopping Del Paseo"
                  showLine={false}
                />
                <Button
                  variant="outline"
                  className="mt-3 w-full border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Ver agenda completa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

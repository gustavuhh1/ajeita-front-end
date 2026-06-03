"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "../../components/page-shell";
import {
  ProviderEmptyState,
  ProviderErrorState,
  ProviderInlineLoading,
  ProviderListSkeleton,
} from "../../components/provider-states";

export default function EstadosGlobaisPage() {
  return (
    <PageShell
      eyebrow="Provider · Estados Globais"
      title="Skeleton e erro padrão"
      description="Padrão visual reutilizável para telas do prestador enquanto os dados carregam, quando uma ação falha ou quando não existem registros para exibir."
      actions={
        <Button className="gap-2 rounded-2xl bg-gray-950 font-bold text-white hover:bg-gray-800">
          <RefreshCcw className="h-4 w-4" />
          Simular recarregamento
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle>Skeleton de listagem</CardTitle>
          </CardHeader>

          <CardContent>
            <ProviderListSkeleton rows={2} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <ProviderInlineLoading label="Buscando dados do prestador..." />

          <ProviderErrorState
            title="Não foi possível carregar os dados"
            description="Verifique sua conexão e tente novamente. Esse estado deve ser usado em falhas de fetch ou ações do Provider."
            onAction={() =>
              alert("Aqui entraria uma nova tentativa de requisição.")
            }
          />

          <ProviderEmptyState
            title="Nenhum registro encontrado"
            description="Use este padrão quando a tela estiver funcionando, mas ainda não houver dados cadastrados ou retornados pela API."
          />
        </div>
      </div>
    </PageShell>
  );
}
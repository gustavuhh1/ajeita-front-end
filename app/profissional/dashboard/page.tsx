"use client";

import { HandWavingIcon, SealCheckIcon } from "@phosphor-icons/react";
import Header from "../components/header";
import Footer from "../components/footer";
import CardsModal from "./components/cards-modal";
import ServiceList from "./components/service-list";
import PreviewSchedule from "./components/preview-schedule";

export default function DashboardPage() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Header variant="default" />
      <main className="bg-secondary h-full w-full flex-1 flex-col space-y-6 px-8 py-6 md:px-12 lg:px-18">
        <div className="flex h-fit w-full justify-between">
          <div>
            {/* TODO: Implement dashboard content (Dados do profissional) */}

            <span className="text-foreground flex items-center gap-1">
              <HandWavingIcon
                weight="fill"
                className="text-primary rotate-y-180"
              />
              Bem-vindo de voltar, Carlos
            </span>
            <h1>Visão Geral</h1>
            <p className="text-foreground/80">
              Confira seu desempenho e novas oportunidades.
            </p>
          </div>

          {/* TODO: Implement verification badge */}
          <div className="flex items-center gap-2 self-end rounded-md bg-green-200 px-2 py-1 text-green-900">
            <SealCheckIcon weight="fill" />
            <span>Perfil Verificado</span>
          </div>
        </div>

        <CardsModal />
        <div className="flex w-full justify-between gap-8">
          <ServiceList />
          <PreviewSchedule />
        </div>
      </main>
      <Footer variant="default" />
    </div>
  );
}

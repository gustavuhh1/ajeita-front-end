"use client";

import { useQuery } from "@tanstack/react-query";
import { getServicos } from "@/app/api/servicos";
import { CalendarDays } from "lucide-react";
import { formatAgendaData } from "./utils/agenda-utils";
import { AgendaCard } from "./components/agenda-card";

export default function Agenda() {
  const { data: servicos = [], isLoading } = useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
  });

  const agendaData = formatAgendaData(servicos);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 relative mx-auto min-h-[calc(100vh-100px)] w-full max-w-4xl pb-24 pt-24 duration-500">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[32px] leading-tight font-extrabold tracking-tight text-slate-800">
            Seus Próximos Serviços
          </h1>
          <p className="text-base text-slate-500">
            Aqui está o seu feed de tarefas e compromissos.
          </p>
        </div>
      </div>

      <div className="mb-8 h-px w-full bg-slate-100"></div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-slate-500">
          Carregando seus serviços...
        </div>
      ) : agendaData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarDays size={48} className="mb-4 text-slate-300" />
          <h2 className="mb-2 text-xl font-bold text-slate-700">
            Nenhum serviço agendado
          </h2>
          <p className="text-slate-500">
            Você não possui serviços agendados no momento.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {agendaData.map((group, idx) => (
            <div key={idx}>
              {/* Date header */}
              <div className="mb-5 flex items-center gap-3">
                {group.isToday && (
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
                )}
                <span
                  className={`text-[13px] font-bold tracking-widest uppercase ${group.isToday ? "text-amber-600" : "text-slate-400"}`}
                >
                  {group.dateStr}
                </span>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>

              {/* Cards list */}
              <div className="flex flex-col">
                {group.items.map((item) => (
                  <AgendaCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className="fixed right-10 bottom-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 transition-transform hover:scale-105 hover:bg-indigo-700 active:scale-95"
        aria-label="Adicionar compromisso"
      >
        <CalendarDays size={28} />
      </button>
    </div>
  );
}

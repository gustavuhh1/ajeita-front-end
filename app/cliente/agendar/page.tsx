"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import Header from "@/app/cliente/components/header";

type Horario = {
  hora: string;
  disponivel: boolean;
};

export default function AgendamentoPage() {
  const router = useRouter();

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [loading, setLoading] = useState(false);

  const horarios: Horario[] = [
    { hora: "08:00", disponivel: true },
    { hora: "09:00", disponivel: false },
    { hora: "10:00", disponivel: true },
    { hora: "11:00", disponivel: false },
    { hora: "13:00", disponivel: true },
    { hora: "14:00", disponivel: true },
    { hora: "15:00", disponivel: false },
    { hora: "16:00", disponivel: true },
    { hora: "17:00", disponivel: true },
  ];

  async function confirmarAgendamento() {
    if (!dataSelecionada || !horarioSelecionado) {
      alert("Selecione uma data e um horário.");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        `Agendamento confirmado para ${dataSelecionada} às ${horarioSelecionado}`
      );

      router.push("/meus-pedidos");
    } catch (error) {
      alert("Erro ao confirmar agendamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <Header />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Agendar Serviço
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Escolha a melhor data e horário conforme a disponibilidade do
                profissional.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-700">
              <CalendarDays size={18} />
              Disponibilidade Atualizada
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={20}
                  className="text-yellow-600"
                />

                <h2 className="font-semibold text-gray-800">
                  Selecione a Data
                </h2>
              </div>

              <input
                type="date"
                value={dataSelecionada}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setDataSelecionada(e.target.value)
                }
                className="mt-5 w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-yellow-400"
              />

              <div className="mt-6 rounded-2xl bg-white p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle2
                    size={16}
                    className="text-green-600"
                  />

                  Horários disponíveis
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <XCircle
                    size={16}
                    className="text-red-500"
                  />

                  Horários indisponíveis
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center gap-2">
                <Clock3
                  size={20}
                  className="text-yellow-600"
                />

                <h2 className="font-semibold text-gray-800">
                  Horários Disponíveis
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {horarios.map((horario) => {
                  const selecionado =
                    horarioSelecionado === horario.hora;

                  return (
                    <button
                      key={horario.hora}
                      disabled={!horario.disponivel}
                      onClick={() =>
                        setHorarioSelecionado(horario.hora)
                      }
                      className={`
                        rounded-2xl border px-4 py-4 text-sm font-medium transition-all
                        
                        ${
                          horario.disponivel
                            ? "border-gray-200 bg-white hover:border-yellow-400 hover:bg-yellow-50"
                            : "cursor-not-allowed border-gray-100 bg-gray-200 text-gray-400 opacity-60"
                        }

                        ${
                          selecionado
                            ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                            : ""
                        }
                      `}
                    >
                      {horario.hora}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-yellow-100 bg-yellow-50 p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Resumo do Agendamento
            </h3>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Serviço:</strong> Instalação Elétrica
              </p>

              <p>
                <strong>Profissional:</strong> Marcos Oliveira
              </p>

              <p>
                <strong>Data:</strong>{" "}
                {dataSelecionada || "Não selecionada"}
              </p>

              <p>
                <strong>Horário:</strong>{" "}
                {horarioSelecionado || "Não selecionado"}
              </p>
            </div>

            <button
              onClick={confirmarAgendamento}
              disabled={
                !dataSelecionada ||
                !horarioSelecionado ||
                loading
              }
              className="mt-6 w-full rounded-2xl bg-yellow-400 px-6 py-4 text-sm font-semibold text-gray-800 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Confirmando agendamento..."
                : "Confirmar Agendamento"}
            </button>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-xs text-gray-400">
        © 2026 Ajeitai. Todos os direitos reservados.
      </footer>
    </div>
  );
}
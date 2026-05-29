"use client";

import { useRouter } from "next/navigation";
import { MainHeader } from '../cliente/components/MainHeader';


type Pedido = {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  status: string;
  corStatus: string;
  icone: string;
};

export default function PedidosPage() {
  const router = useRouter();

  const verDetalhes = (id: number): void => {
    router.push(`/meus-pedidos/${id}`);
  };

  const pagarAgora = (id: number): void => {
    router.push(`/pagamento?id=${id}`);
  };

  const pedidos: Pedido[] = [
    {
      id: 1,
      titulo: "Conserto de Vazamento",
      descricao: "Profissional sendo selecionado...",
      data: "Solicitado em 12 de Out, 2023",
      status: "EM NEGOCIAÇÃO",
      corStatus: "bg-orange-100 text-orange-600",
      icone: "🔧",
    },
    {
      id: 2,
      titulo: "Instalação de Tomadas",
      descricao: "Profissional: Marcos Oliveira",
      data: "Agendado para 15 de Out, 2023 às 09:00",
      status: "AGENDADO",
      corStatus: "bg-green-100 text-green-600",
      icone: "⚡",
    },
    {
      id: 3,
      titulo: "Pintura de Parede (Sala)",
      descricao: "Profissional: Ana Costa",
      data: "Solicitado em 10 de Out, 2023",
      status: "AGUARDANDO PAGAMENTO",
      corStatus: "bg-blue-100 text-blue-600",
      icone: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <MainHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        {/* Título da Página */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-950">Meus Pedidos</h1>
          <p className="mt-1 text-sm text-gray-400">
            Acompanhe seus serviços em andamento e veja seu histórico.
          </p>
        </div>

        {/* Abas Internas */}
        <div className="flex gap-6 border-b border-gray-200 text-sm">
          <span className="cursor-pointer border-b-2 border-yellow-400 pb-3 font-black text-yellow-600">
            Ativos
          </span>
          <span className="cursor-pointer pb-3 font-medium text-gray-400 transition-colors hover:text-gray-600">
            Histórico
          </span>
        </div>

        {/* Lista de Pedidos */}
        <div className="mt-6 space-y-5">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="flex flex-col justify-between gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-xl">
                  {pedido.icone}
                </div>

                <div>
                  <h3 className="font-black text-gray-950">{pedido.titulo}</h3>
                  <p className="mt-0.5 text-xs font-medium text-gray-400">
                    {pedido.data}
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-500">
                    {pedido.descricao}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-gray-50 pt-3 sm:justify-end sm:border-0 sm:pt-0">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${pedido.corStatus}`}
                >
                  {pedido.status}
                </span>

                {pedido.status === "AGUARDANDO PAGAMENTO" ? (
                  <button
                    onClick={() => pagarAgora(pedido.id)}
                    className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 shadow-sm transition-all hover:bg-yellow-500 active:scale-95"
                  >
                    Pagar Agora
                  </button>
                ) : (
                  <button
                    onClick={() => verDetalhes(pedido.id)}
                    className="rounded-2xl bg-gray-50 px-5 py-3 text-sm font-black text-gray-600 transition-all hover:bg-gray-100 active:scale-95"
                  >
                    Ver Detalhes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 text-center text-xs font-medium text-gray-400">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  );
}
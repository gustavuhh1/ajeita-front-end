import { CalendarCheckIcon, MapPinIcon } from "@phosphor-icons/react";
import Link from "next/link";

const PreviewSchedule = () => {
  return (
    <section className="flex w-full max-w-1/3 flex-col rounded-4xl border border-zinc-200 bg-white px-6 pt-8 shadow-md">
      <div className="flex items-center gap-2">
        <CalendarCheckIcon weight="bold" size={24} className="text-primary" />
        <h3 className="text-xl font-semibold">Próximos Agendamentos</h3>
      </div>
      <div className="p-2">
        {/* TODO: Implmentar Lógica de Exibição de Agendamento  */}
        <div className="flex gap-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200">
            <span className="font-medium text-blue-800">14:00</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-muted-foreground font-bold">HOJE</h3>
            <h2 className="text-lg font-semibold">Instalação de Tomadas</h2>
            <p className="text-zinc-700">Cliente: Mariana S.</p>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <MapPinIcon />
              Rua Tibúrcio Cavalcante, 1200
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto flex flex-col items-center justify-center gap-6 p-6 text-center">
        <hr className="w-full border-zinc-200" />
        <Link
          href="/profissional/agenda"
          className="text-primary text-xl font-semibold hover:underline"
        >
          Ver agenda completa
        </Link>
      </div>
    </section>
  );
};

export default PreviewSchedule;

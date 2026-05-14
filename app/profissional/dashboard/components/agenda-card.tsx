interface AgendaItemProps {
  timeLabel: string;
  time: string;
  title: string;
  clientName?: string;
  address?: string;
  isToday?: boolean;
  showLine?: boolean;
}

export function AgendaItem({
  timeLabel,
  time,
  title,
  clientName,
  address,
  isToday = false,
  showLine = true,
}: AgendaItemProps) {
  return (
    <div className="flex gap-3">
      {/* Indicador visual: bolinha + linha conectora */}
      <div className="flex flex-col items-center">
        <div
          className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
            isToday ? "bg-green-500" : "bg-gray-300"
          }`}
        />
        {showLine && <div className="mt-1 min-h-5 w-px flex-1 bg-gray-100" />}
      </div>

      {/* Conteúdo: horário, título, cliente e endereço */}
      <div className="flex-1 pb-4">
        <p
          className={`text-xs font-semibold tracking-wide uppercase ${
            isToday ? "text-green-600" : "text-gray-400"
          }`}
        >
          {timeLabel}, {time}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-gray-800">{title}</p>
        {(clientName || address) && (
          <p className="mt-0.5 text-xs text-gray-400">
            {clientName && `${clientName} • `}
            {address}
          </p>
        )}
      </div>
    </div>
  );
}

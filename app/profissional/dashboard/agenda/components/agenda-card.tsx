import { MapPin, MoreVertical } from "lucide-react";

export function AgendaCard({ item }) {
  return (
    <div className="relative mb-4 flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:gap-5 sm:pl-5">
      {/* Left indicator */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-2.5 ${item.theme.border}`}
      />

      {/* Time block */}
      <div
        className={`flex h-[72px] w-full flex-col items-center justify-center rounded-xl sm:h-[88px] sm:w-[88px] ${item.theme.timeBg} ${item.theme.timeText} shrink-0`}
      >
        <span className="text-[26px] leading-none font-black">
          {item.startTime}
        </span>
        <span className="mt-1 text-[11px] font-medium">às {item.endTime}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-center py-1">
        <div className="mb-2 flex flex-wrap gap-2">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${tag.bg} ${tag.text}`}
            >
              {tag.icon && <tag.icon size={12} className={tag.iconColor} />}
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className="mb-1.5 text-xl leading-tight font-bold text-slate-800">
          {item.title}
        </h3>
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
          <MapPin size={16} />
          {item.address}
        </div>
      </div>

      {/* Action */}
      <div className="flex shrink-0 items-center justify-center pr-2">
        {item.action.type === "icon" && (
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200">
            <MoreVertical size={20} />
          </button>
        )}
        {item.action.type === "button" && (
          <button
            className={`w-full rounded-xl px-6 py-2.5 text-sm font-bold transition-colors sm:w-auto ${
              item.action.variant === "dark"
                ? "bg-[#2d2d2d] text-white hover:bg-black"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {item.action.label}
          </button>
        )}
      </div>
    </div>
  );
}

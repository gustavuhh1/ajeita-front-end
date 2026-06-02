import {
  Wrench,
  Snowflake,
  Zap,
  Paintbrush,
  Droplets,
  Hammer,
} from "lucide-react";

export const getCategoryIcon = (category: string) => {
  switch (category?.toUpperCase()) {
    case "ELÉTRICA":
      return Zap;
    case "HIDRÁULICA":
      return Droplets;
    case "CARPINTARIA":
      return Hammer;
    case "PINTURA":
      return Paintbrush;
    case "LIMPEZA":
      return Snowflake;
    default:
      return Wrench;
  }
};

export const getTheme = (category: string) => {
  switch (category?.toUpperCase()) {
    case "ELÉTRICA":
      return {
        border: "bg-amber-400",
        timeBg: "bg-amber-100/50",
        timeText: "text-amber-900",
        tagBg: "bg-amber-100",
        tagText: "text-amber-800",
        iconColor: "text-amber-600",
      };
    case "HIDRÁULICA":
      return {
        border: "bg-blue-400",
        timeBg: "bg-blue-50",
        timeText: "text-blue-800",
        tagBg: "bg-blue-100",
        tagText: "text-blue-700",
        iconColor: "text-blue-600",
      };
    case "LIMPEZA":
      return {
        border: "bg-indigo-400",
        timeBg: "bg-indigo-50",
        timeText: "text-indigo-800",
        tagBg: "bg-indigo-100",
        tagText: "text-indigo-700",
        iconColor: "text-indigo-600",
      };
    case "PINTURA":
      return {
        border: "bg-pink-400",
        timeBg: "bg-pink-50",
        timeText: "text-pink-800",
        tagBg: "bg-pink-100",
        tagText: "text-pink-700",
        iconColor: "text-pink-600",
      };
    case "CARPINTARIA":
      return {
        border: "bg-orange-400",
        timeBg: "bg-orange-50",
        timeText: "text-orange-800",
        tagBg: "bg-orange-100",
        tagText: "text-orange-700",
        iconColor: "text-orange-600",
      };
    default:
      return {
        border: "bg-stone-600",
        timeBg: "bg-stone-200",
        timeText: "text-stone-900",
        tagBg: "bg-stone-200",
        tagText: "text-stone-700",
        iconColor: "text-stone-600",
      };
  }
};

export function formatAgendaData(servicos) {
  if (!servicos || servicos.length === 0) return [];

  // Dividindo os serviços da API em dois grupos (Hoje e Amanhã) apenas para ilustrar a UI
  const midIndex = Math.ceil(servicos.length / 2);
  const todayItems = servicos.slice(0, midIndex);
  const tomorrowItems = servicos.slice(midIndex);

  const groups = [];

  if (todayItems.length > 0) {
    groups.push({
      dateStr: "HOJE, 15 ABR",
      isToday: true,
      items: todayItems.map((s, idx) => {
        const themeInfo = getTheme(s.category);
        return {
          id: s.id.toString(),
          startTime: `${(8 + idx).toString().padStart(2, "0")}:00`,
          endTime: `${(10 + idx).toString().padStart(2, "0")}:00`,
          title: s.title,
          address: s.location || "Endereço não especificado",
          theme: themeInfo,
          tags: [
            {
              label: s.category || "Serviço",
              icon: getCategoryIcon(s.category),
              bg: themeInfo.tagBg,
              text: themeInfo.tagText,
              iconColor: themeInfo.iconColor,
            },
            {
              label: s.type || "Geral",
              bg: "bg-slate-200",
              text: "text-slate-600",
            },
          ],
          action: { type: "button", label: "Detalhes", variant: "dark" },
        };
      }),
    });
  }

  if (tomorrowItems.length > 0) {
    groups.push({
      dateStr: "AMANHÃ, 16 ABR",
      isToday: false,
      items: tomorrowItems.map((s, idx) => {
        const themeInfo = getTheme(s.category);
        return {
          id: s.id.toString(),
          startTime: `${(14 + idx).toString().padStart(2, "0")}:00`,
          endTime: `${(16 + idx).toString().padStart(2, "0")}:00`,
          title: s.title,
          address: s.location || "Endereço não especificado",
          theme: themeInfo,
          tags: [
            {
              label: s.category || "Serviço",
              icon: getCategoryIcon(s.category),
              bg: themeInfo.tagBg,
              text: themeInfo.tagText,
              iconColor: themeInfo.iconColor,
            },
          ],
          action: {
            type: "button",
            label: "Preparar...",
            variant: "secondary",
          },
        };
      }),
    });
  }

  return groups;
}

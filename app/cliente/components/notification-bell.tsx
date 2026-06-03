"use client";

import { Bell, MessageCircle, FileText, X } from "lucide-react";

type NotificationType = "message" | "proposal";

const notifications: {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}[] = [
  {
    id: 1,
    type: "message",
    title: "Prestador mandou mensagem",
    description: "Carlos Silva enviou uma nova mensagem sobre seu pedido.",
    time: "Agora",
    unread: true,
  },
  {
    id: 2,
    type: "proposal",
    title: "Proposta de orçamento enviada",
    description: "Um prestador enviou uma proposta para o seu serviço.",
    time: "12 min",
    unread: true,
  },
  {
    id: 3,
    type: "proposal",
    title: "Proposta de orçamento alterada",
    description: "O valor do orçamento foi atualizado pelo prestador.",
    time: "1h",
  },
];

interface NotificationsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsPopup({
  isOpen,
  onClose,
}: NotificationsPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 z-50 w-90 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">
            <Bell size={20} />
          </div>

          <div>
            <h3 className="text-sm font-black text-gray-900">Notificações</h3>
            <p className="text-xs font-medium text-gray-400">
              Atualizações dos seus serviços
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>

      <div className="max-h-95 overflow-y-auto p-3">
        {notifications.map((notification) => {
          const Icon =
            notification.type === "message" ? MessageCircle : FileText;

          return (
            <button
              key={notification.id}
              type="button"
              className="flex w-full gap-3 rounded-2xl p-3 text-left transition hover:bg-gray-50"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  notification.type === "message"
                    ? "bg-blue-50 text-blue-500"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-extrabold text-gray-800">
                    {notification.title}
                  </h4>

                  {notification.unread && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                  )}
                </div>

                <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">
                  {notification.description}
                </p>

                <span className="mt-2 block text-[11px] font-bold text-gray-400">
                  {notification.time}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-gray-100 p-3">
        <button
          type="button"
          className="w-full rounded-2xl bg-gray-50 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-yellow-100 hover:text-yellow-700"
        >
          Ver todas as notificações
        </button>
      </div>
    </div>
  );
}
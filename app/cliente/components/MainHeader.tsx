"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Bell,
  Check,
  MessageCircle,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";

import { NavLink } from "./HeaderElements";

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
}

export const MainHeader = ({
  activePage = "inicio",
}: {
  activePage?: string;
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Novo orçamento recebido",
      description: "João enviou uma proposta para seu pedido.",
      time: "Agora",
      read: false,
      icon: <ShoppingBag size={18} />,
    },
    {
      id: 2,
      title: "Nova mensagem",
      description: "Você recebeu uma nova mensagem no chat.",
      time: "5 min",
      read: false,
      icon: <MessageCircle size={18} />,
    },
    {
      id: 3,
      title: "Pedido finalizado",
      description: "Seu serviço foi concluído com sucesso.",
      time: "1 hora",
      read: true,
      icon: <Check size={18} />,
    },
  ]);

  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <Link href="/cliente/home" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5B800] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-950"
              >
                <path
                  d="M14.7 5.3L18.7 9.3"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M5.5 18.5L11.8 12.2"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M7.2 5.6L18.4 16.8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M16.6 18.7L18.8 16.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M5.3 7.3L7.5 5.1"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span className="text-[22px] font-semibold tracking-[-0.03em] text-[#2F343B]">
              Ajeitai
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <NavLink
              label="Início"
              href="/cliente/home"
              active={activePage === "inicio"}
            />

            <NavLink
              label="Meus Pedidos"
              href="/meus-pedidos"
              active={activePage === "pedidos"}
            />

            <NavLink
              label="Mensagens"
              href="/cliente/mensagens"
              active={activePage === "mensagens"}
            />
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/cliente/pedido"
            className="hidden items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-950 shadow-sm transition hover:bg-yellow-300 active:scale-95 sm:flex"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-950 text-white">
              <Plus size={12} strokeWidth={3} />
            </span>

            Criar Pedido
          </Link>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* NOTIFICAÇÕES */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              aria-label="Notificações"
              onClick={() =>
                setIsNotificationsOpen(!isNotificationsOpen)
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
            >
              <Bell size={21} strokeWidth={1.8} />

              {unreadNotifications > 0 && (
                <span className="absolute right-1 top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-black text-gray-950">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* DROPDOWN */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-14 w-[380px] overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-2xl">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                  <div>
                    <h2 className="text-lg font-black text-gray-950">
                      Notificações
                    </h2>

                    <p className="text-xs font-medium text-gray-400">
                      Você possui {unreadNotifications} não lidas
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-black text-yellow-600 transition hover:text-yellow-700"
                  >
                    Marcar todas
                  </button>
                </div>

                {/* LISTA */}
                <div className="max-h-[420px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                      <Bell
                        size={40}
                        className="mb-4 text-gray-200"
                      />

                      <h3 className="text-sm font-black text-gray-700">
                        Nenhuma notificação
                      </h3>

                      <p className="mt-1 text-xs font-medium text-gray-400">
                        Você está em dia 🎉
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`group relative border-b border-gray-100 px-6 py-5 transition hover:bg-gray-50 ${
                          !notification.read
                            ? "bg-yellow-50/40"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                              notification.read
                                ? "bg-gray-100 text-gray-500"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {notification.icon}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-black text-gray-900">
                                  {notification.title}
                                </h3>

                                <p className="mt-1 text-sm font-medium leading-relaxed text-gray-500">
                                  {notification.description}
                                </p>

                                <span className="mt-3 block text-xs font-bold text-gray-400">
                                  {notification.time}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeNotification(
                                    notification.id
                                  )
                                }
                                className="opacity-0 transition hover:text-red-500 group-hover:opacity-100"
                              >
                                <X size={16} />
                              </button>
                            </div>

                            {!notification.read && (
                              <button
                                type="button"
                                onClick={() =>
                                  markAsRead(notification.id)
                                }
                                className="mt-4 rounded-xl bg-yellow-400 px-4 py-2 text-xs font-black text-gray-950 transition hover:bg-yellow-500"
                              >
                                Marcar como lida
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* FOOTER */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                  <Link
                    href="/cliente/notificacoes"
                    className="flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-gray-700 transition hover:bg-gray-100"
                  >
                    Ver todas notificações
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* PERFIL */}
          <Link
            href="/cliente/perfil"
            aria-label="Perfil"
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#8fa179] text-white shadow-sm transition hover:scale-105"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="h-full w-full object-cover"
              />
            ) : (
              <ArrowUp size={19} strokeWidth={3} />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
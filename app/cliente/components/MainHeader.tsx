"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Bell, Plus } from "lucide-react";
import { NavLink } from "./HeaderElements";

export const MainHeader = ({
  activePage = "inicio",
}: {
  activePage?: string;
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

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
              href="/pedidos"
              active={activePage === "pedidos"}
            />

            <NavLink
              label="Mensagens"
              href="/mensagens"
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

          <button
            type="button"
            aria-label="Notificações"
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
          >
            <Bell size={21} strokeWidth={1.8} />
          </button>

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
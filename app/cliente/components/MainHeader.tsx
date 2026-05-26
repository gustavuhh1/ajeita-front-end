"use client";

import React, {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Bell,
  Plus,
} from "lucide-react";

import {
  HeaderSearchBar,
  NavLink,
} from "@/app/cliente/components/HeaderElements";

import { ProviderAvatar } from "@/app/cliente/components/ProviderAvatar";

interface MainHeaderProps {
  activePage?:
    | "inicio"
    | "pedidos"
    | "mensagens"
    | "perfil";
}

export const MainHeader = ({
  activePage = "inicio",
}: MainHeaderProps) => {
  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    profileImage,
    setProfileImage,
  ] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const loadProfileImage =
      () => {
        const savedImage =
          localStorage.getItem(
            "userProfileImage",
          );

        setProfileImage(
          savedImage,
        );
      };

    loadProfileImage();

    window.addEventListener(
      "profileImageUpdated",
      loadProfileImage,
    );

    window.addEventListener(
      "storage",
      loadProfileImage,
    );

    return () => {
      window.removeEventListener(
        "profileImageUpdated",
        loadProfileImage,
      );

      window.removeEventListener(
        "storage",
        loadProfileImage,
      );
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* ESQUERDA */}
        <div className="flex items-center gap-10">
          {/* LOGO */}
          <Link
            href="/cliente/home"
            className="flex items-center gap-2.5"
          >
            <div className="flex items-center justify-center rounded-full bg-yellow-400 p-2.5 text-lg font-bold text-white shadow-sm">
              ⚒
            </div>

            <span className="text-2xl font-bold italic tracking-tight text-gray-900">
              Ajeitai
            </span>
          </Link>

          {/* MENU */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <NavLink
              label="Início"
              href="/cliente/home"
              active={
                activePage ===
                "inicio"
              }
            />

            <HeaderSearchBar
              value={
                searchQuery
              }
              onChange={
                setSearchQuery
              }
            />

            <NavLink
              label="Meus Pedidos"
              href="/pedidos"
              active={
                activePage ===
                "pedidos"
              }
            />

            <NavLink
              label="Mensagens"
              href="/mensagens"
              active={
                activePage ===
                "mensagens"
              }
            />
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-6">
          {/* BOTÃO */}
          <Link
            href="/cliente/criar-pedido"
            className="hidden items-center gap-2.5 rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-gray-950 shadow-sm transition-all hover:bg-yellow-500 active:scale-95 sm:flex"
          >
            <div className="flex items-center justify-center rounded-full bg-gray-950 p-1 text-white">
              <Plus
                size={14}
                strokeWidth={3}
              />
            </div>

            Criar Pedido
          </Link>

          <div className="hidden h-8 w-px bg-gray-100 sm:block" />

          {/* AÇÕES */}
          <div className="flex items-center gap-4">
            {/* NOTIFICAÇÃO */}
            <button
              type="button"
              className="relative rounded-xl p-2 text-gray-400 transition-all hover:bg-gray-50 hover:text-yellow-500"
            >
              <Bell size={24} />

              <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>

            {/* PERFIL */}
            <Link
              href="/cliente/perfil"
              className="transition-transform hover:scale-105"
            >
              <ProviderAvatar
                src={profileImage}
                name="Usuário"
                size="sm"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
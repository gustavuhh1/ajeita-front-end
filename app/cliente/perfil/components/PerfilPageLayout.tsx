"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ClipboardList,
  LogOut,
  MapPin,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

import { ProviderAvatar } from "@/app/cliente/components/ProviderAvatar";

// Importação da topbar oficial unificada que limpa a duplicação
import Header from "@/app/cliente/components/header";

interface PerfilPageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const menuItems = [
  {
    name: "Dados Pessoais",
    href: "/cliente/perfil/dados-pessoais",
    icon: UserCircle,
  },
  {
    name: "Meus Pedidos",
    href: "/pedidos",
    icon: ClipboardList,
  },
  {
    name: "Endereços",
    href: "/cliente/perfil/enderecos",
    icon: MapPin,
  },
  {
    name: "Segurança",
    href: "#",
    icon: ShieldCheck,
  },
];

export function PerfilPageLayout({
  children,
  title,
  description,
}: PerfilPageLayoutProps) {
  const pathname = usePathname();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileImage = () => {
      const savedImage = localStorage.getItem("userProfileImage");
      setProfileImage(savedImage);
    };

    loadProfileImage();

    window.addEventListener("profileImageUpdated", loadProfileImage);
    window.addEventListener("storage", loadProfileImage);

    return () => {
      window.removeEventListener("profileImageUpdated", loadProfileImage);
      window.removeEventListener("storage", loadProfileImage);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFCF5] font-sans text-gray-800">
      {/* Substituído MainHeader pela Topbar oficial unificada */}
      <Header />

      <main className="mx-auto flex w-full max-w-6xl grow flex-col gap-8 px-6 py-10 lg:flex-row">
        {/* SIDEBAR */}
        <aside className="w-full shrink-0 lg:w-72">
          <section className="sticky top-24 rounded-[40px] border border-gray-100 bg-white p-8 shadow-sm">
            {/* PERFIL */}
            <div className="mb-10 flex items-center gap-4">
              <ProviderAvatar
                name="Ricardo Silva"
                src={profileImage}
                size="md"
              />

              <div>
                <h3 className="text-base font-black leading-tight text-gray-950">
                  Ricardo Silva
                </h3>

                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Cliente Prime
                </p>
              </div>
            </div>

            {/* MENU */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                if (item.href === "#") {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className="relative flex w-full items-center gap-4 rounded-3xl px-5 py-4 text-left text-sm font-black text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-700"
                    >
                      <Icon size={18} className="text-gray-400" />
                      {item.name}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex w-full items-center gap-4 rounded-3xl px-5 py-4 text-sm font-black transition-all ${
                      isActive
                        ? "bg-yellow-50 text-gray-950"
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-yellow-500" : "text-gray-400"}
                    />

                    {item.name}

                    {isActive && (
                      <span className="absolute left-0 h-6 w-1.5 rounded-r-full bg-yellow-400" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* LOGOUT */}
            <div className="mt-10 border-t border-gray-50 pt-6">
              <button
                type="button"
                className="flex w-full items-center gap-4 rounded-2xl px-5 py-3 text-sm font-black text-rose-500 transition-all hover:bg-rose-50"
              >
                <LogOut size={18} />
                Sair da Conta
              </button>
            </div>
          </section>
        </aside>

        {/* CONTEÚDO */}
        <section className="min-w-0 flex-1">
          <div className="mb-7">
            <h1 className="text-3xl font-black tracking-tight text-gray-950">
              {title}
            </h1>

            <p className="mt-2 text-sm font-medium text-gray-500">
              {description}
            </p>
          </div>

          {children}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 sm:flex-row sm:text-left">
          <p>
            © 2026 Ajeitai - Todos os direitos reservados.
          </p>

          <div className="flex gap-8">
            <Link href="#" className="transition-colors hover:text-gray-800">
              Termos
            </Link>

            <Link href="#" className="transition-colors hover:text-gray-800">
              Privacidade
            </Link>

            <Link href="#" className="transition-colors hover:text-gray-800">
              Ajuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
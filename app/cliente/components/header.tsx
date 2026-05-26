import Link from "next/link";

import {
  PlusCircleIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";

import NavLinks from "@/app/cliente/components/nav-links";
import NotificationBell from "@/app/cliente/components/notification-bell";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface HeaderProps {
  hasNav?: boolean;
  hasSearch?: boolean;
  hasBtnService?: boolean;
}

export default function Header({
  hasNav = true,
  hasSearch = false,
  hasBtnService = true,
}: HeaderProps) {
  return (
    <header className="flex h-18 w-full items-center gap-10 border-b border-gray-200 bg-white px-6 py-4 lg:px-12">
      {/* LOGO */}
      <Link
        href="/cliente/home"
        className="flex items-center gap-2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
          <WrenchIcon
            weight="fill"
            size={20}
            className="text-black"
          />
        </div>

        <h2 className="text-lg font-bold">
          Ajeitai
        </h2>
      </Link>

      {/* NAV */}
      {hasNav && <NavLinks />}

      {/* AÇÕES */}
      <div className="ml-auto flex items-center gap-4">
        {/* BOTÃO */}
        {hasBtnService && (
          <Button
            asChild
            size="custom"
            variant="default"
            className="flex items-center justify-center gap-2 rounded-[32px] px-5 py-2.5 font-semibold hover:opacity-90"
          >
            <Link href="/cliente/criar-pedido">
              <PlusCircleIcon
                weight="bold"
                size={18}
              />

              Criar Pedido
            </Link>
          </Button>
        )}

        {/* DIVISOR */}
        <hr className="hidden w-6 rotate-90 border-zinc-300 md:flex" />

        {/* NOTIFICAÇÃO */}
        <NotificationBell />

        {/* AVATAR */}
        <Link href="/cliente/perfil">
          <Avatar className="transition-transform hover:scale-105">
            <AvatarImage src="https://github.com/shadcn.png" />

            <AvatarFallback>
              CN
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
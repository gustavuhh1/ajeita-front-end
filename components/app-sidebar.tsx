"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CalendarCheckIcon,
  CalendarDotsIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  LayoutIcon,
  ListBulletsIcon,
  MoneyIcon,
  ShieldCheckIcon,
  SignOutIcon,
  StarIcon,
  ToolboxIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { logout } from "@/app/api/auth";
import { useRouter } from "next/navigation";

const links = [
  {
    name: "Visão Geral",
    url: "/profissional/dashboard",
    icon: LayoutIcon,
  },
  {
    name: "Serviços",
    url: "/profissional/dashboard/servicos",
    icon: ListBulletsIcon,
  },
  {
    name: "Mensagens",
    url: "/profissional/dashboard/mensagens",
    icon: ChatCircleDotsIcon,
  },
  {
    name: "Agenda",
    url: "/profissional/dashboard/agenda",
    icon: CalendarDotsIcon,
  },
  {
    name: "Confirmar agenda",
    url: "/profissional/dashboard/agendamento/confirmacao",
    icon: CalendarCheckIcon,
  },
  {
    name: "Realizar serviço",
    url: "/profissional/dashboard/realizacao-servico",
    icon: CheckCircleIcon,
  },
  {
    name: "Perfil",
    url: "/profissional/dashboard/perfil",
    icon: UserIcon,
  },
  {
    name: "Segurança",
    url: "/profissional/dashboard/seguranca",
    icon: ShieldCheckIcon,
  },
  {
    name: "Faturamento",
    url: "/profissional/dashboard/faturamento",
    icon: MoneyIcon,
  },
  {
    name: "Avaliar cliente",
    url: "/profissional/dashboard/avaliar-cliente",
    icon: StarIcon,
  },
];

export function AppSidebar() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.push("/profissional/entrar");
    } catch {
      router.push("/profissional/entrar");
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="bg-primary-dashboard items-start justify-center p-6">
        <Link href="/profissional/dashboard" className="flex items-center gap-2">
          <ToolboxIcon weight="fill" size={34} className="text-yellow-400" />

          <h1 className="text-2xl font-bold text-white">Ajeita</h1>
        </Link>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton size="lg" asChild>
                  <Link href={link.url}>
                    <link.icon weight="bold" />
                    <span>{link.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="border-sidebar" />

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/gustavuhh1.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h2 className="text-sm font-semibold text-white">
            Carlos Nascimento
          </h2>

          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto cursor-pointer text-white transition-colors hover:text-yellow-400"
            aria-label="Sair da conta"
          >
            <SignOutIcon weight="bold" size={22} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
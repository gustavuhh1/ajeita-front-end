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
  CalendarDotsIcon,
  LayoutIcon,
  ListBulletsIcon,
  MoneyIcon,
  SignOutIcon,
  ToolboxIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    name: "Agenda",
    url: "/profissional/dashboard/agendamentos",
    icon: CalendarDotsIcon,
  },
  {
    name: "Perfil",
    url: "/profissional/dashboard/perfil",
    icon: UserIcon,
  },
  {
    name: "Faturamento",
    url: "/profissional/dashboard/faturamento",
    icon: MoneyIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-primary-dashboard items-start justify-center p-6">
        <div className="div flex items-center gap-2">
          <ToolboxIcon weight="fill" size={34} className="text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Ajeita</h1>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton size="lg" asChild>
                  <a href={link.url}>
                    <link.icon weight="bold" />
                    <span>{link.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator className="border-sidebar" />
      <SidebarFooter className="p-4">
        {/* TODO: Inserir valores dinâmicos */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/gustavuhh1.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-sm font-semibold text-white">
            Carlos Nascimento
          </h2>
          {/* TODO: Fazer lógica logout */}
          <SignOutIcon
            weight="bold"
            className="ml-auto cursor-pointer text-white"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

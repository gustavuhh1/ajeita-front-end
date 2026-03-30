import { PlusCircleIcon, WrenchIcon } from "@phosphor-icons/react/dist/ssr";
import NavLinks from "./nav-links";
import { Button } from "@/components/ui/button";
import NotificationBell from "./notification-bell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  hasNav?: boolean;
  hasSearch?: boolean;
  hasBtnService?: boolean;
}

// TODO: Implementar logica de header com diferentes exibições
export default function Header({
  hasNav = true,
  hasSearch = false,
  hasBtnService = true,
}: HeaderProps) {
  return (
    <header className="flex h-18 max-h-18 w-full items-center gap-10 border-b border-gray-200 bg-white px-12 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
          <WrenchIcon weight="fill" size={20} className="text-black" />
        </div>
        <h2>Ajeitai</h2>
      </div>
      {hasNav && <NavLinks />}

      <div className="ml-auto flex items-center gap-4">
        {hasBtnService && (
          <Button
            size="custom"
            variant="default"
            className="flex items-center justify-center gap-2 rounded-[32px] px-5 py-2.5 font-semibold hover:opacity-90"
          >
            <PlusCircleIcon weight="bold" size={18} className="" />
            Criar Pedido
          </Button>
        )}
        <hr className="flex w-6 rotate-90 border-zinc-300" />

        <NotificationBell />

        {/* TODO: Adicionar Dialog componente no click do avatar e Dados reais */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

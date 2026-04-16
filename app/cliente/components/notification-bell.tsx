import { Bell, BellDot } from "lucide-react";

const hasNotification = true; // Exemplo: você pode substituir isso por uma lógica real para verificar notificações

const NotificationBell = () => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 hover:bg-gray-100">
      {/* TODO: Adicionar Dialog componente no click do sino */}
      {hasNotification ? (
        <BellDot strokeWidth={1.5} />
      ) : (
        <Bell strokeWidth={1.5} />
      )}
    </div>
  );
};

export default NotificationBell;

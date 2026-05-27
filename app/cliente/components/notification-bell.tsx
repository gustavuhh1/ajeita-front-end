"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle2, XCircle } from "lucide-react";

// Defina a estrutura da notificação
interface Notification {
  id: number;
  type: 'accepted' | 'declined';
  proName: string;
  message: string;
}

const NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'accepted', proName: 'João Silva', message: 'Aceitou seu pedido de eletricista.' },
  { id: 2, type: 'declined', proName: 'Ana Costa', message: 'Recusou o pedido por falta de agenda.' },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Botão do Sino */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-all text-gray-600"
      >
        <Bell size={20} />
        {NOTIFICATIONS.length > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Janela de Notificações */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl z-50 animate-in fade-in zoom-in duration-200">
          <h4 className="px-2 pb-3 font-black text-gray-950 text-sm">Notificações</h4>
          <div className="space-y-1 max-h-[300px] overflow-y-auto">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="flex gap-3 rounded-2xl p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className={`mt-1 ${n.type === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                  {n.type === 'accepted' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-tight">{n.proName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
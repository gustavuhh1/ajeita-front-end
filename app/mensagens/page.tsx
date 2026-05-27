"use client";

import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Paperclip,
  Send,
  CheckCheck,
  Phone,
  Video,
} from "lucide-react";
import Header from "@/app/cliente/components/header";

interface Message {
  id: number;
  sender: "user" | "pro";
  text: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const CHATS: Chat[] = [
  {
    id: 1,
    name: "João Silva",
    lastMessage: "O material já foi comprado, chego aí às 09:00.",
    time: "14:30",
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: "user", text: "Bom dia, João! Conseguiu ver o orçamento dos fios?" },
      { id: 2, sender: "pro", text: "Bom dia! Sim, tudo certo. O material já foi comprado, chego aí às 09:00." },
    ],
  },
  {
    id: 2,
    name: "Ana Costa",
    lastMessage: "A limpeza pós-obra foi concluída com sucesso.",
    time: "Ontem",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "user", text: "Ana, como está o andamento da faxina?" },
      { id: 2, sender: "pro", text: "Oi! A limpeza pós-obra foi concluída com sucesso. Pode conferir!" },
    ],
  },
  {
    id: 3,
    name: "Carlos Mendes",
    lastMessage: "Preciso de uma foto do registro para confirmar o modelo.",
    time: "10:15",
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: "user", text: "Carlos, o vazamento na pia continua." },
      { id: 2, sender: "pro", text: "Olá, sobre o vazamento na pia, preciso de uma foto do registro para confirmar o modelo." },
    ],
  },
  {
    id: 4,
    name: "Fernanda Lima",
    lastMessage: "O projeto do jardim está ficando incrível!",
    time: "09:00",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "pro", text: "Bom dia! O projeto do jardim está ficando incrível! Vamos adicionar aquelas plantas que você pediu." },
    ],
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Chat>(CHATS[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Header />
      <main className="mx-auto flex h-[calc(100vh-120px)] max-w-7xl gap-4 p-6">
        <aside className="flex w-96 flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="mb-4 text-xl font-black">Mensagens</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="w-full rounded-2xl bg-gray-50 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Buscar conversa..."
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CHATS.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex cursor-pointer gap-4 border-b border-gray-50 p-5 transition-all ${
                  selectedChat.id === chat.id ? "bg-yellow-50/50" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full font-bold text-gray-500 ${
                    chat.online ? "bg-green-100" : "bg-gray-200"
                  }`}
                >
                  {chat.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-950">{chat.name}</h4>
                    <span className="font-bold text-[10px] text-gray-400">{chat.time}</span>
                  </div>
                  <p className="mt-1 truncate text-xs text-gray-500">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex flex-1 flex-col rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold">
                {selectedChat.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold">{selectedChat.name}</h3>
                <span className={`text-[10px] font-bold uppercase ${selectedChat.online ? "text-green-500" : "text-gray-400"}`}>
                  {selectedChat.online ? "Online agora" : "Offline"}
                </span>
              </div>
            </div>
            <div className="flex gap-3 text-gray-400">
              <Phone size={18} className="cursor-pointer hover:text-gray-900" />
              <Video size={18} className="cursor-pointer hover:text-gray-900" />
              <MoreVertical size={18} className="cursor-pointer hover:text-gray-900" />
            </div>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-8">
            {selectedChat.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl p-4 text-sm ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-yellow-400 text-gray-950"
                      : "rounded-bl-none bg-gray-100 text-gray-700"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`mt-1 flex items-center gap-1 text-[10px] ${
                      msg.sender === "user" ? "justify-end opacity-70" : "text-gray-400"
                    }`}
                  >
                    <CheckCheck size={12} /> 14:35
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-gray-100 p-4">
            <button className="transition-colors p-3 text-gray-400 hover:text-gray-900">
              <Paperclip size={20} />
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-2xl bg-gray-50 px-5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Escreva sua mensagem..."
            />
            <button className="shadow-lg active:scale-95 rounded-2xl bg-gray-950 p-4 text-white transition-all hover:bg-gray-800">
              <Send size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
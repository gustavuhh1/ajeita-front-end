
"use client";

import React, { FormEvent, useMemo, useRef, useState } from "react";
import {
  Search,
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Info,
  LockKeyhole,
  MapPin,
  MoreVertical,
  Paperclip,
  SendHorizontal,
  ShieldCheck,
  Sofa,
  Sparkles,
  X,
} from "lucide-react";

import { MainHeader } from "../components/MainHeader";
import { ProviderAvatar } from "../components/ProviderAvatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ChatMessage {
  id: number;
  author: "cliente" | "prestador";
  text?: string;
  image?: string;
  time: string;
  proposal?: {
    title: string;
    value: number;
  };
}

const conversas = [
  {
    id: 1,
    nome: "Carlos Silva",
    msg: "Entendi. Consigo remover essas manchas...",
    hora: "08:50",
    active: true,
  
    messages: [
      {
        id: 1,
        author: "prestador",
        text: "Olá, Lavor! Vi seu pedido para higienização do sofá. O tecido suede precisa de um cuidado especial. Você teria fotos das manchas?",
        time: "08:42",
      },

      {
        id: 2,
        author: "cliente",
        text: "Oi Carlos! Sim, acabei de tirar. Segue em anexo.",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
        time: "08:45",
      },

      {
        id: 3,
        author: "prestador",
        text: "Entendi. Consigo remover essas manchas com a extratora. Como é um sofá retrátil de 3 lugares, o serviço leva cerca de 2 horas.",
        proposal: {
          title: "Proposta de Valor",
          value: 250,
        },
        time: "08:50",
      },
    ] as ChatMessage[],
  },

  {
    id: 2,
    nome: "Maria Oliveira",
    msg: "Você tem disponibilidade amanhã?",
    hora: "07:30",
    active: false,

    messages: [
      {
        id: 1,
        author: "prestador",
        text: "Olá! Tenho disponibilidade amanhã 😊",
        time: "07:10",
      },

      {
        id: 2,
        author: "cliente",
        text: "Perfeito. Qual horário?",
        time: "07:15",
      },

      {
        id: 3,
        author: "prestador",
        text: "Posso às 14h.",
        time: "07:30",
      },
    ] as ChatMessage[],
  },
];

export default function ClienteOrcamentoPage() {
  const [message, setMessage] = useState("");
  const [isProposalAccepted, setIsProposalAccepted] = useState(false);

  const [attachedImage, setAttachedImage] = useState<string | null>(
    null
  );

  const [selectedConversation, setSelectedConversation] = useState(
    conversas[0]
  );

  const [messages, setMessages] = useState<ChatMessage[]>(
    conversas[0].messages
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const finalValue = useMemo(() => {
    const proposalMessage = messages.find(
      (item) => item.proposal
    );

    return proposalMessage?.proposal?.value ?? 250;
  }, [messages]);

  const getCurrentTime = () => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  };

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (!message.trim() && !attachedImage) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      author: "cliente",
      text: message.trim() || undefined,
      image: attachedImage || undefined,
      time: getCurrentTime(),
    };

    setMessages((previous) => [...previous, newMessage]);

    setMessage("");
    setAttachedImage(null);

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,

        {
          id: Date.now() + 1,
          author: "prestador",
          text: "Perfeito! Consigo realizar esse serviço no horário combinado. Qualquer dúvida, pode me chamar por aqui.",
          time: getCurrentTime(),
        },
      ]);
    }, 900);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setAttachedImage(preview);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      <MainHeader activePage="mensagens" />

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[300px_1fr_300px]">
        <aside className="space-y-5">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-gray-700">
            <ArrowLeft size={18} />
            Voltar
          </button>

          <section className="rounded-[28px] border border-yellow-100 bg-white p-6 shadow-sm">
            <span className="mb-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-yellow-700">
              Em negociação
            </span>

            <h1 className="text-2xl font-black leading-tight text-gray-950">
              Higienização de Sofá
            </h1>

            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              ID: #849201
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Localização
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    Rua dos Flares, 123 - Meireles, Fortaleza
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Data sugerida
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    11 de Junho, 14:00
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <Sofa size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Descrição
                  </p>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
                    Sofá de 3 lugares retrátil, tecido suede. Tem
                    manchas de café.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-black text-gray-950">
              Mensagens
            </h2>

            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={16}
              />

              <input
                placeholder="Buscar conversa..."
                className="w-full rounded-2xl bg-gray-50 py-2.5 pl-10 pr-4 text-xs font-medium outline-none"
              />
            </div>

            <div className="space-y-2">
              {conversas.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedConversation(c);
                    setMessages(c.messages);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 transition-all ${
                    selectedConversation.id === c.id
                      ? "bg-[#FFFCF5] border border-yellow-100"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-black text-sm text-gray-950">
                      {c.nome}
                    </span>

                    <span className="text-[10px] font-bold text-gray-400">
                      {c.hora}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-gray-500 truncate">
                    {c.msg}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="flex min-h-180 flex-col overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-gray-100 bg-yellow-50/50 px-6 py-4">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Conversando com{" "}
                <span className="font-black text-gray-900">
                  {selectedConversation.nome}
                </span>
              </p>
            </div>

            <button className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white hover:text-gray-700">
              <MoreVertical size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <div className="flex justify-center">
              <span className="rounded-full bg-gray-50 px-4 py-1.5 text-[11px] font-bold text-gray-400">
                Hoje
              </span>
            </div>

            {messages.map((chat) => {
              const isClient = chat.author === "cliente";

              return (
                <div
                  key={chat.id}
                  className={`flex items-end gap-3 ${
                    isClient
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {!isClient && (
                    <ProviderAvatar
                      name={selectedConversation.nome}
                      src={null}
                      size="sm"
                    />
                  )}

                  <div
                    className={`max-w-[75%] rounded-[24px] px-5 py-4 shadow-sm ${
                      isClient
                        ? "rounded-br-md bg-yellow-50 text-gray-800"
                        : "rounded-bl-md bg-gray-50 text-gray-700"
                    }`}
                  >
                    {chat.text && (
                      <p className="text-sm font-medium leading-relaxed">
                        {chat.text}
                      </p>
                    )}

                    {chat.image && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-white bg-white">
                        <img
                          src={chat.image}
                          alt="Imagem enviada no chat"
                          className="h-36 w-full object-cover"
                        />
                      </div>
                    )}

                    {chat.proposal && (
                      <div className="mt-4 rounded-2xl border border-yellow-200 bg-white p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                              {chat.proposal.title}
                            </p>

                            <p className="mt-1 text-xl font-black text-yellow-600">
                              R${" "}
                              {chat.proposal.value.toLocaleString(
                                "pt-BR",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </p>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                            <Check
                              size={17}
                              strokeWidth={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-2 flex justify-end">
                      <span className="text-[10px] font-bold text-gray-400">
                        {chat.time}
                      </span>
                    </div>
                  </div>

                  {isClient && (
                    <ProviderAvatar
                      name="Lavor Argento"
                      src={null}
                      size="sm"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {attachedImage && (
            <div className="border-t border-gray-100 bg-yellow-50/40 px-6 py-3">
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-yellow-100 bg-white p-2 shadow-sm">
                <img
                  src={attachedImage}
                  alt="Prévia do anexo"
                  className="h-12 w-16 rounded-xl object-cover"
                />

                <span className="text-xs font-bold text-gray-500">
                  Imagem anexada
                </span>

                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 border-t border-gray-100 bg-white px-6 py-5"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-500"
            >
              <Paperclip size={20} />
            </button>

            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Digite sua mensagem..."
              className="h-12 flex-1 rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
            />

            <button
              type="submit"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
            >
              <SendHorizontal
                size={20}
                fill="currentColor"
              />
            </button>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[28px] border-2 border-yellow-300 bg-yellow-50/50 p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-black text-gray-950">
                  Proposta Final
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-yellow-500">
                <FileText size={20} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                Valor total
              </p>

              <p className="mt-2 text-4xl font-black text-gray-950">
                R${" "}
                {finalValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            {isProposalAccepted ? (
              <div className="mt-4 rounded-2xl bg-green-50 p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 text-green-500" />

                <p className="text-sm font-black text-green-700">
                  Proposta aceita!
                </p>

                <p className="mt-1 text-xs font-medium text-green-600">
                  Agora você pode seguir para o pagamento seguro.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 text-sm font-black text-gray-950 shadow-md shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
                    >
                      Aceitar e Pagar
                      <Sparkles size={17} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-3xl border-0">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-black">
                        Confirmar proposta?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-sm text-gray-500">
                        Você está prestes a aceitar a proposta e seguir para o pagamento seguro da plataforma.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-2xl">
                        Cancelar
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() =>
                          setIsProposalAccepted(true)
                        }
                        className="rounded-2xl bg-yellow-400 text-gray-950 hover:bg-yellow-500"
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-3 text-sm font-black text-gray-600 transition-colors hover:border-yellow-200 hover:bg-yellow-50"
                    >
                      Contraproposta
                    </button>
                  </DialogTrigger>

                  <DialogContent className="rounded-3xl border-0 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-black">
                        Enviar contraproposta
                      </DialogTitle>

                      <DialogDescription>
                        Negocie um novo valor diretamente com o prestador.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                      <textarea
                        defaultValue="Carlos, gostei da proposta, mas você consegue fazer por um valor menor?"
                        className="min-h-[120px] w-full rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                      />

                      <input
                        type="number"
                        placeholder="Digite um valor"
                        className="h-12 w-full rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-100"
                      />
                    </div>

                    <DialogFooter>
                      <button
                        onClick={() =>
                          setMessage(
                            "Carlos, gostei da proposta, mas você consegue fazer por um valor menor?"
                          )
                        }
                        className="w-full rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-black text-gray-950 transition-all hover:bg-yellow-500"
                      >
                        Enviar contraproposta
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </div>
            )}
          </section>
        </aside>
      </main>
    </div>
  );
}


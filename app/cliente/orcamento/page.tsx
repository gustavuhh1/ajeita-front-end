"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
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
  Star,
  X,
} from "lucide-react";

import Header from "../components/header";
import { ProviderAvatar } from "../components/ProviderAvatar";

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

export default function ClienteOrcamentoPage() {
  const [message, setMessage] = useState("");

  const [isProposalAccepted, setIsProposalAccepted] =
    useState(false);

  const [attachedImage, setAttachedImage] =
    useState<string | null>(null);

  const [isSending, setIsSending] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>([
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
    ]);

  const finalValue = useMemo(() => {
    const proposalMessage =
      messages.find(
        (item) => item.proposal,
      );

    return (
      proposalMessage?.proposal
        ?.value ?? 250
    );
  }, [messages]);

  const getCurrentTime = () => {
    return new Intl.DateTimeFormat(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      },
    ).format(new Date());
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      },
    );
  }, [messages]);

  useEffect(() => {
    return () => {
      if (attachedImage) {
        URL.revokeObjectURL(
          attachedImage,
        );
      }
    };
  }, [attachedImage]);

  const handleSendMessage = async (
    event: FormEvent,
  ) => {
    event.preventDefault();

    if (
      (!message.trim() &&
        !attachedImage) ||
      isSending
    )
      return;

    setIsSending(true);

    const newMessage: ChatMessage = {
      id: Date.now(),
      author: "cliente",
      text:
        message.trim() || undefined,
      image:
        attachedImage || undefined,
      time: getCurrentTime(),
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);

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

      setIsSending(false);
    }, 1000);
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const preview =
      URL.createObjectURL(file);

    setAttachedImage(preview);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 md:px-6 lg:grid lg:grid-cols-[280px_1fr_320px] lg:px-8 lg:py-8">
        {/* SIDEBAR ESQUERDA */}
        <aside className="space-y-5">
          <Link
            href="/cliente/meus-pedidos"
            className="flex items-center gap-2 text-sm font-black text-gray-400 transition-colors hover:text-gray-700"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>

          {/* DETALHES */}
          <section className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <span className="mb-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-yellow-700">
              Em negociação
            </span>

            <h1 className="text-2xl font-black leading-tight text-gray-950">
              Higienização de Sofá
            </h1>

            <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
              ID: #849201
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Localização
                  </p>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
                    Rua dos Flares, 123 -
                    Meireles, Fortaleza
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-500">
                  <Sofa size={18} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Descrição
                  </p>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-gray-700">
                    Sofá de 3 lugares
                    retrátil, tecido suede.
                    Tem manchas de café.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PRESTADOR */}
          <section className="rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <ProviderAvatar
                name="Carlos Silva"
                src={null}
                size="sm"
              />

              <div>
                <h3 className="text-base font-black text-gray-950">
                  Carlos Silva
                </h3>

                <div className="mt-1 flex items-center gap-1">
                  <Star
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-bold text-yellow-500">
                    4.9
                  </span>

                  <span className="text-sm font-medium text-gray-400">
                    (120)
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>

        {/* CHAT */}
        <section className="flex min-h-[650px] flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-gray-100 bg-yellow-50/40 px-5 py-4">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Conversando com{" "}
                <span className="font-black text-gray-900">
                  Carlos Silva
                </span>
              </p>
            </div>

            <button className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-white hover:text-gray-700">
              <MoreVertical size={18} />
            </button>
          </header>

          {/* MENSAGENS */}
          <div className="flex-1 space-y-6 overflow-y-auto bg-[#FFFDF8] px-4 py-6 sm:px-6">
            <div className="flex justify-center">
              <span className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-gray-400 shadow-sm">
                Hoje
              </span>
            </div>

            {messages.map((chat) => {
              const isClient =
                chat.author ===
                "cliente";

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
                      name="Carlos Silva"
                      src={null}
                      size="sm"
                    />
                  )}

                  <div
                    className={`max-w-[85%] rounded-[24px] px-5 py-4 shadow-sm sm:max-w-[75%] ${
                      isClient
                        ? "rounded-br-md bg-yellow-100 text-gray-800"
                        : "rounded-bl-md border border-gray-100 bg-white text-gray-700"
                    }`}
                  >
                    {chat.text && (
                      <p className="text-sm font-medium leading-relaxed">
                        {chat.text}
                      </p>
                    )}

                    {chat.image && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-white bg-white">
                        <Image
                          src={
                            chat.image
                          }
                          alt="Imagem enviada"
                          width={500}
                          height={300}
                          className="h-44 w-full object-cover"
                        />
                      </div>
                    )}

                    {chat.proposal && (
                      <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                              {
                                chat
                                  .proposal
                                  .title
                              }
                            </p>

                            <p className="mt-1 text-xl font-black text-gray-950">
                              R${" "}
                              {chat.proposal.value.toLocaleString(
                                "pt-BR",
                                {
                                  minimumFractionDigits: 2,
                                },
                              )}
                            </p>
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                            <Check
                              size={17}
                              strokeWidth={
                                3
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-2 flex items-center justify-end gap-1">
                      <span className="text-[10px] font-bold text-gray-400">
                        {chat.time}
                      </span>

                      {isClient && (
                        <CheckCheckIcon />
                      )}
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

            <div ref={messagesEndRef} />
          </div>

          {/* PREVIEW */}
          {attachedImage && (
            <div className="border-t border-gray-100 bg-yellow-50/40 px-6 py-3">
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-yellow-100 bg-white p-2 shadow-sm">
                <Image
                  src={attachedImage}
                  alt="Prévia"
                  width={100}
                  height={100}
                  className="h-12 w-16 rounded-xl object-cover"
                />

                <span className="text-xs font-bold text-gray-500">
                  Imagem anexada
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setAttachedImage(
                      null,
                    )
                  }
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* INPUT */}
          <form
            onSubmit={
              handleSendMessage
            }
            className="flex items-center gap-3 border-t border-gray-100 bg-white px-4 py-4 sm:px-6"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={
                handleImageChange
              }
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
              onChange={(
                event,
              ) =>
                setMessage(
                  event.target
                    .value,
                )
              }
              placeholder="Digite sua mensagem..."
              className="h-12 flex-1 rounded-2xl border border-gray-100 bg-gray-50 px-5 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
            />

            <button
              type="submit"
              disabled={
                isSending
              }
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendHorizontal
                size={20}
              />
            </button>
          </form>
        </section>

        {/* SIDEBAR DIREITA */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          {/* PROPOSTA */}
          <section className="rounded-[32px] border-2 border-yellow-200 bg-yellow-50 p-6 shadow-sm">
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
                {finalValue.toLocaleString(
                  "pt-BR",
                  {
                    minimumFractionDigits: 2,
                  },
                )}
              </p>
            </div>

            {isProposalAccepted ? (
              <div className="mt-4 rounded-2xl bg-green-50 p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 text-green-500" />

                <p className="text-sm font-black text-green-700">
                  Proposta aceita!
                </p>

                <p className="mt-1 text-xs font-medium text-green-600">
                  Agora você pode seguir
                  para o pagamento
                  seguro.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <button
                  onClick={() =>
                    setIsProposalAccepted(
                      true,
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-4 text-sm font-black text-gray-950 shadow-md transition-all hover:bg-yellow-500 active:scale-95"
                >
                  Aceitar e Pagar

                  <Sparkles size={17} />
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "Carlos, gostei da proposta, mas você consegue fazer por um valor menor?",
                    )
                  }
                  className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-3 text-sm font-black text-gray-600 transition-colors hover:border-yellow-200 hover:bg-yellow-50"
                >
                  Contraproposta
                </button>
              </div>
            )}
          </section>

          {/* PAGAMENTO */}
          <section className="rounded-[32px] border border-green-100 bg-green-50 p-5 shadow-sm">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <LockKeyhole size={18} />
              </div>

              <div>
                <h3 className="text-sm font-black text-green-900">
                  Pagamento Seguro
                </h3>

                <p className="mt-1 text-xs font-medium leading-relaxed text-green-700">
                  Gere um link de
                  pagamento seguro
                  através da nossa
                  integração.
                </p>

                <button className="mt-3 text-xs font-black text-green-600 hover:underline">
                  Gerar Link
                  AjeitaiPay
                </button>
              </div>
            </div>
          </section>

          {/* DICAS */}
          <section className="rounded-[32px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-yellow-500"
              />

              <h3 className="text-sm font-black text-gray-950">
                Dicas de Segurança
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex gap-3 text-xs font-medium leading-relaxed text-gray-500">
                <Info
                  size={15}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />

                Mantenha toda a
                negociação dentro do
                chat.
              </li>

              <li className="flex gap-3 text-xs font-medium leading-relaxed text-gray-500">
                <Clock3
                  size={15}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />

                Nunca faça pagamentos
                fora da plataforma.
              </li>

              <li className="flex gap-3 text-xs font-medium leading-relaxed text-gray-500">
                <BadgeCheck
                  size={15}
                  className="mt-0.5 shrink-0 text-yellow-500"
                />

                Verifique as
                avaliações do
                prestador.
              </li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}

function CheckCheckIcon() {
  return (
    <div className="flex">
      <Check
        size={12}
        className="-mr-1 text-yellow-500"
      />
      <Check
        size={12}
        className="text-yellow-500"
      />
    </div>
  );
}
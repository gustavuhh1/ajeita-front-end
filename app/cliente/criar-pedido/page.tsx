"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Home,
  Info,
  ListChecks,
  Plus,
  X,
} from "lucide-react";

import Header from "../components/header";

interface ImageObject {
  file: File;
  preview: string;
}

const categories = [
  {
    id: "eletricista",
    name: "Eletricista",
  },
  {
    id: "pintura",
    name: "Pintura",
  },
  {
    id: "encanamento",
    name: "Encanamento",
  },
  {
    id: "limpeza",
    name: "Limpeza",
  },
];

export default function CreateOrderPage() {
  const [isSuccess, setIsSuccess] =
    useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [images, setImages] =
    useState<ImageObject[]>([]);

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles =
      event.target.files;

    if (!selectedFiles) return;

    const filesArray =
      Array.from(selectedFiles);

    if (
      images.length +
        filesArray.length >
      5
    ) {
      alert(
        "Você pode enviar no máximo 5 fotos.",
      );

      return;
    }

    const newImages =
      filesArray.map((file) => ({
        file,
        preview:
          window.URL.createObjectURL(
            file,
          ),
      }));

    setImages((previous) => [
      ...previous,
      ...newImages,
    ]);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  const removeImage = (
    index: number,
  ) => {
    const imageToRemove =
      images[index];

    if (!imageToRemove) return;

    window.URL.revokeObjectURL(
      imageToRemove.preview,
    );

    setImages((previous) =>
      previous.filter(
        (_, currentIndex) =>
          currentIndex !== index,
      ),
    );
  };

  const handleSubmit = (
    event: FormEvent,
  ) => {
    event.preventDefault();

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FFFCF5]">
        <Header />

        <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-6 py-10">
          <div className="w-full max-w-xl rounded-[40px] border border-gray-100 bg-white p-10 shadow-sm sm:p-14">
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-500">
                <CheckCircle2
                  size={46}
                  strokeWidth={2.3}
                />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-gray-950">
                Pedido criado com
                sucesso!
              </h1>

              <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-gray-500">
                Seu pedido agora está
                visível para os
                profissionais da sua
                região. Você será
                notificado assim que
                receber novas
                propostas.
              </p>

              <div className="mt-10 flex w-full flex-col gap-4">
                <Link
                  href="/cliente/meus-pedidos"
                  className="flex h-14 items-center justify-center gap-3 rounded-[22px] bg-yellow-400 px-6 text-sm font-black text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
                >
                  <ListChecks
                    size={20}
                  />
                  Ver Meus Pedidos
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setIsSuccess(
                      false,
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-[22px] border border-gray-100 bg-white px-6 py-4 text-sm font-black text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
                >
                  <Home size={18} />
                  Criar Outro Pedido
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Header />

      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-10">
        <Link
          href="/cliente/home"
          className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-700"
        >
          <ChevronLeft size={16} />
          Voltar para o início
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Criar Novo Pedido
          </h1>

          <p className="mt-2 text-sm font-medium text-gray-500">
            Preencha os detalhes do
            problema para encontrar
            os melhores profissionais.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <section className="rounded-[36px] border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm">
                <Info size={18} />
              </div>

              <div>
                <h2 className="text-sm font-black text-blue-950">
                  Como funciona?
                </h2>

                <p className="mt-1 text-sm font-medium leading-relaxed text-blue-700">
                  Seu pedido ficará
                  visível para
                  profissionais da sua
                  região, que poderão
                  enviar propostas em
                  poucos minutos.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[36px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">
                  Título do Problema
                </label>

                <input
                  required
                  type="text"
                  placeholder="Ex: Vazamento na pia da cozinha"
                  className="focus:border-primary focus:ring-primary/10 h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 px-5 text-sm font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:bg-white focus:ring-4"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">
                  Categoria do Serviço
                </label>

                <div className="relative">
                  <select
                    required
                    value={
                      selectedCategory
                    }
                    onChange={(
                      event,
                    ) =>
                      setSelectedCategory(
                        event.target
                          .value,
                      )
                    }
                    className="focus:border-primary focus:ring-primary/10 h-14 w-full appearance-none rounded-[22px] border border-gray-100 bg-gray-50 px-5 pr-14 text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4"
                  >
                    <option value="">
                      Selecione uma
                      categoria
                    </option>

                    {categories.map(
                      (
                        category,
                      ) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      ),
                    )}
                  </select>

                  <ChevronDown
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">
                  Descrição Detalhada
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Descreva o problema com o máximo de detalhes possível..."
                  className="focus:border-primary focus:ring-primary/10 w-full resize-none rounded-[24px] border border-gray-100 bg-gray-50 px-5 py-4 text-sm font-bold text-gray-700 outline-none transition-all placeholder:text-gray-300 focus:bg-white focus:ring-4"
                />
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Fotos do Problema
                  </label>

                  <span className="text-[11px] font-bold text-gray-300">
                    Máximo de 5 fotos
                  </span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      images.length <
                        5 &&
                      fileInputRef.current?.click()
                    }
                    className={`flex h-28 w-28 flex-col items-center justify-center rounded-[28px] border-2 border-dashed transition-all ${
                      images.length <
                      5
                        ? "border-gray-200 bg-gray-50 text-gray-400 hover:border-yellow-400 hover:bg-yellow-50"
                        : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-200 opacity-60"
                    }`}
                  >
                    <Camera
                      size={24}
                    />

                    <span className="mt-2 text-[10px] font-black uppercase tracking-widest">
                      Adicionar
                    </span>

                    <input
                      ref={
                        fileInputRef
                      }
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                      className="hidden"
                    />
                  </button>

                  {[...Array(4)].map(
                    (_, index) => {
                      const image =
                        images[
                          index
                        ];

                      return (
                        <div
                          key={
                            index
                          }
                          className="relative h-28 w-28 overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50"
                        >
                          {image ? (
                            <>
                              <Image
                                src={
                                  image.preview
                                }
                                alt="Preview"
                                fill
                                className="object-cover"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeImage(
                                    index,
                                  )
                                }
                                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-rose-500 shadow-md transition-all hover:bg-white"
                              >
                                <X
                                  size={
                                    14
                                  }
                                />
                              </button>
                            </>
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-200">
                              <Plus
                                size={
                                  24
                                }
                              />
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-50 pt-8">
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-[24px] bg-yellow-400 px-6 text-sm font-black text-gray-950 shadow-xl shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95 sm:w-auto sm:px-10"
              >
                <CheckCircle2
                  size={20}
                />
                Publicar Pedido
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
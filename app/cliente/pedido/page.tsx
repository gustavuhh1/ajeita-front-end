"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Camera,
  X,
  CheckCircle2,
  ChevronLeft,
  Info,
  ChevronDown,
  ListChecks,
  Home,
  Plus,
  Loader2,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MainHeader } from "../components/MainHeader";
import { criarServico } from "@/app/api/servicos";
import { EnderecoApi, getEnderecos } from "@/app/api/enderecos";

interface ImageObject {
  file: File;
  preview: string;
}

/**
 * IMPORTANTE:
 * O Swagger do POST /servicos pede categoryIds: string[].
 * Então esses IDs precisam ser IDs reais cadastrados no banco/API.
 *
 * Como ainda não apareceu endpoint de listar categorias no Swagger,
 * deixei valores temporários para não travar a tela.
 *
 * Quando você tiver os IDs reais das categorias, substitua abaixo.
 */
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
  {
    id: "montagem",
    name: "Montagem de Móveis",
  },
  {
    id: "ar-condicionado",
    name: "Ar-condicionado",
  },
];

export default function CreateOrderPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [images, setImages] = useState<ImageObject[]>([]);

  const [addresses, setAddresses] = useState<EnderecoApi[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadAddresses() {
    try {
      setIsLoadingAddresses(true);

      const data = await getEnderecos();

      setAddresses(data);

      const mainAddress = data.find(
        (address) => address.principal || address.isMain,
      );

      setSelectedAddressId(mainAddress?.id ?? data[0]?.id ?? "");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar seus endereços.",
      );
    } finally {
      setIsLoadingAddresses(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const filesArray = Array.from(selectedFiles);

    if (images.length + filesArray.length > 5) {
      alert("Você pode enviar no máximo 5 fotos.");
      return;
    }

    const newImages: ImageObject[] = filesArray.map((file) => ({
      file,
      preview: window.URL.createObjectURL(file),
    }));

    setImages((previous) => [...previous, ...newImages]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const imageToRemove = images[index];

    if (imageToRemove) {
      window.URL.revokeObjectURL(imageToRemove.preview);

      setImages((previous) => previous.filter((_, imageIndex) => imageIndex !== index));
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Informe o título do problema.");
      return;
    }

    if (!selectedCategory) {
      alert("Selecione uma categoria.");
      return;
    }

    if (!description.trim()) {
      alert("Descreva o problema.");
      return;
    }

    if (!selectedAddressId) {
      alert("Selecione um endereço para o serviço.");
      return;
    }

    try {
      setIsSubmitting(true);

      const createdService = await criarServico({
        title: title.trim(),
        description: description.trim(),
        images_url: images.map((image) => image.preview),
        categoryIds: [selectedCategory],
        address_id: selectedAddressId,
      });

      setCreatedServiceId(createdService.id);
      setIsSuccess(true);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível publicar o pedido.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800">
        <MainHeader activePage="pedidos" />

        <main className="flex grow items-center justify-center p-8">
          <div className="w-full max-w-md rounded-[40px] border border-gray-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-500">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>

            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Pedido Criado com Sucesso!
            </h2>

            <p className="mb-4 px-4 font-medium leading-relaxed text-gray-500">
              Seu pedido agora está visível para os profissionais. Você será
              notificado assim que receber novas propostas.
            </p>

            {createdServiceId && (
              <p className="mb-8 rounded-2xl bg-gray-50 px-4 py-3 text-xs font-bold text-gray-500">
                ID do serviço: {createdServiceId}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <Link
                href="/meus-pedidos"
                className="flex w-full items-center justify-center gap-2.5 rounded-3xl bg-yellow-400 px-8 py-4 font-bold text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
              >
                <ListChecks size={20} strokeWidth={2.5} />
                Ver Meus Pedidos
              </Link>

              <Link
                href="/cliente/home"
                className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600"
              >
                <Home size={16} />
                Voltar para a Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800">
      <MainHeader activePage="pedidos" />

      <main className="mx-auto w-full max-w-3xl grow p-8">
        <Link
          href="/cliente/home"
          className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-600"
        >
          <ChevronLeft size={16} />
          Voltar para o início
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Criar Novo Pedido
          </h1>

          <p className="mt-1 text-sm font-medium text-gray-500">
            Preencha os detalhes do problema para encontrar os melhores
            profissionais.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-[40px] border border-gray-100 bg-white p-10 shadow-sm"
        >
          <div className="flex gap-4 rounded-[30px] border border-blue-100 bg-blue-50/50 p-6">
            <div className="h-fit rounded-full bg-blue-500 p-1.5 text-white shadow-sm">
              <Info size={16} />
            </div>

            <div>
              <h4 className="text-sm font-bold text-blue-900">
                Como funciona?
              </h4>

              <p className="mt-0.5 text-sm leading-relaxed text-blue-700/70">
                Seu pedido ficará visível para profissionais da região que
                poderão enviar propostas.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Título do Problema <span className="text-rose-500">*</span>
              </label>

              <input
                required
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex: Vazamento na pia da cozinha"
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium transition-all focus:border-yellow-400 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Categoria do Serviço <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <select
                  required
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className={`w-full cursor-pointer appearance-none rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium transition-all focus:border-yellow-400 focus:bg-white focus:outline-none ${
                    selectedCategory ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  <option value="">Selecione uma categoria...</option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="text-gray-800"
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-gray-400"
                />
              </div>

              <p className="mt-2 text-xs font-medium text-orange-500">
                Se a API recusar a criação, provavelmente será necessário trocar
                os valores das categorias pelos IDs reais do banco.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Descrição Detalhada <span className="text-rose-500">*</span>
              </label>

              <textarea
                required
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva o problema com o máximo de detalhes possível..."
                className="w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium transition-all focus:border-yellow-400 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Endereço do Serviço <span className="text-rose-500">*</span>
              </label>

              {isLoadingAddresses ? (
                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 text-sm font-bold text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
                  Carregando endereços...
                </div>
              ) : addresses.length === 0 ? (
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-orange-500" />

                    <div>
                      <h3 className="text-sm font-black text-orange-800">
                        Nenhum endereço cadastrado
                      </h3>

                      <p className="mt-1 text-sm font-medium text-orange-700">
                        Cadastre um endereço antes de criar o pedido.
                      </p>

                      <Link
                        href="/cliente/perfil/enderecos"
                        className="mt-4 inline-flex rounded-xl bg-orange-500 px-4 py-2 text-xs font-black text-white hover:bg-orange-600"
                      >
                        Cadastrar endereço
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <select
                    required
                    value={selectedAddressId}
                    onChange={(event) =>
                      setSelectedAddressId(event.target.value)
                    }
                    className="w-full cursor-pointer appearance-none rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium text-gray-800 transition-all focus:border-yellow-400 focus:bg-white focus:outline-none"
                  >
                    {addresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.rua}, {address.numero} - {address.cidade}/
                        {address.estado}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-gray-400"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold text-gray-700">
                Fotos do Problema{" "}
                <span className="text-xs font-medium text-gray-400">
                  (Máximo 5 fotos)
                </span>
              </label>

              <div className="flex flex-wrap gap-4">
                <div
                  onClick={() =>
                    images.length < 5 && fileInputRef.current?.click()
                  }
                  className={`flex h-28 w-28 flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all ${
                    images.length < 5
                      ? "cursor-pointer border-gray-200 bg-gray-50 text-gray-400 hover:border-yellow-400 hover:bg-yellow-50"
                      : "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-200 opacity-50"
                  }`}
                >
                  <Camera size={24} />

                  <span className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                    Adicionar
                  </span>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {[...Array(4)].map((_, index) => {
                  const image = images[index];

                  return (
                    <div
                      key={index}
                      className="group relative h-28 w-28 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50"
                    >
                      {image ? (
                        <>
                          <Image
                            src={image.preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 z-10 rounded-lg bg-white/90 p-1 text-rose-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center opacity-20">
                          <Plus size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="mt-2 text-xs font-medium text-gray-400">
                Por enquanto, as imagens são enviadas como URL local de prévia.
                Para upload real, será necessário um storage ou endpoint de
                upload.
              </p>
            </div>
          </div>

          <div className="flex justify-center border-t border-gray-50 pt-6">
            <button
              type="submit"
              disabled={isSubmitting || addresses.length === 0}
              className="flex items-center gap-3 rounded-[24px] bg-yellow-400 px-12 py-5 font-bold text-gray-950 shadow-xl shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <CheckCircle2 size={22} />
                  Publicar Pedido
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-auto w-full border-t border-gray-100 bg-white py-8 text-center">
        <p className="px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          © 2026 Ajeitai - Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
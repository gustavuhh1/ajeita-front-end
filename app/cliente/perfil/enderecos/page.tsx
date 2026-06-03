"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  Briefcase,
  Home,
  Info,
  Loader2,
  MapPin,
  Plus,
  Search,
  Trash2,
  Umbrella,
  X,
  Star,
} from "lucide-react";

import { PerfilPageLayout } from "../components/PerfilPageLayout";
import {
  criarEndereco,
  definirEnderecoPrincipal,
  deletarEndereco,
  EnderecoApi,
  getEnderecos,
} from "@/app/api/enderecos";

type AddressIcon = "home" | "work" | "beach" | "map";

interface AddressFormData {
  apelido: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  ponto_de_referencia: string;
  cidade: string;
  estado: string;
}

const initialFormData: AddressFormData = {
  apelido: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  ponto_de_referencia: "",
  cidade: "",
  estado: "",
};

const getAddressIcon = (icon: AddressIcon) => {
  const iconProps = {
    size: 20,
  };

  const icons = {
    home: <Home {...iconProps} />,
    work: <Briefcase {...iconProps} />,
    beach: <Umbrella {...iconProps} />,
    map: <MapPin {...iconProps} />,
  };

  return icons[icon];
};

function getIconByIndex(index: number): AddressIcon {
  if (index === 0) return "home";
  if (index === 1) return "work";
  if (index === 2) return "beach";
  return "map";
}

function isAddressPrimary(address: EnderecoApi) {
  return Boolean(address.principal || address.isMain);
}

export default function EnderecosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<EnderecoApi[]>([]);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadAddresses() {
    try {
      setError("");
      setIsLoading(true);

      const data = await getEnderecos();
      setAddresses(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar seus endereços.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  async function handleDeleteAddress(id: string) {
    const confirmed = window.confirm("Deseja excluir este endereço?");

    if (!confirmed) return;

    try {
      await deletarEndereco(id);
      setAddresses((previous) =>
        previous.filter((address) => address.id !== id),
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o endereço.",
      );
    }
  }

  async function handleSetMainAddress(id: string) {
    try {
      await definirEnderecoPrincipal(id);
      await loadAddresses();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível definir o endereço como principal.",
      );
    }
  }

  async function handleSaveAddress(event: FormEvent) {
    event.preventDefault();

    try {
      setIsSaving(true);

      await criarEndereco({
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento,
        ponto_de_referencia:
          formData.ponto_de_referencia || formData.apelido || "",
        cep: formData.cep,
        cidade: formData.cidade,
        estado: formData.estado,
        latitude: 0,
        longitude: 0,
      });

      setFormData(initialFormData);
      setIsModalOpen(false);
      await loadAddresses();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o endereço.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <PerfilPageLayout
      title="Meus Endereços"
      description="Gerencie seus locais de atendimento para pedidos rápidos."
    >
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-3 rounded-[24px] bg-yellow-400 px-6 py-4 text-sm font-black text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            Adicionar Novo
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 rounded-[30px] border border-gray-100 bg-white p-8 text-sm font-bold text-gray-500 shadow-sm">
            <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
            Carregando endereços...
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-[30px] border border-red-100 bg-red-50 p-6 text-center">
            <h3 className="text-lg font-black text-red-800">
              Erro ao carregar endereços
            </h3>

            <p className="mt-2 text-sm font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={loadAddresses}
              className="mt-5 rounded-2xl bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!isLoading && !error && addresses.length === 0 && (
          <div className="rounded-[35px] border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-50 text-yellow-500">
              <MapPin size={30} />
            </div>

            <h3 className="text-xl font-black text-gray-950">
              Nenhum endereço cadastrado
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-gray-500">
              Cadastre um endereço para conseguir criar pedidos de serviço.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-black text-gray-950 hover:bg-yellow-500"
            >
              Adicionar endereço
            </button>
          </div>
        )}

        {!isLoading && !error && addresses.length > 0 && (
          <div className="space-y-4">
            {addresses.map((address, index) => {
              const isPrimary = isAddressPrimary(address);

              const street = address.complemento
                ? `${address.rua}, ${address.numero}, ${address.complemento}`
                : `${address.rua}, ${address.numero}`;

              const neighborhood = `${address.cidade} - ${address.estado}`;

              return (
                <div
                  key={address.id}
                  className="group flex flex-col justify-between gap-4 rounded-[35px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-yellow-200 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                        isPrimary
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-50 text-gray-300"
                      }`}
                    >
                      {getAddressIcon(getIconByIndex(index))}
                    </div>

                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-black text-gray-950">
                          {address.ponto_de_referencia || `Endereço ${index + 1}`}
                        </h4>

                        {isPrimary && (
                          <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-[10px] font-black uppercase text-yellow-700">
                            Principal
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-bold text-gray-500">
                        {street}
                      </p>

                      <p className="mt-1 text-xs font-medium text-gray-400">
                        {neighborhood} • CEP: {address.cep}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!isPrimary && (
                      <button
                        type="button"
                        onClick={() => handleSetMainAddress(address.id)}
                        className="flex items-center gap-1.5 rounded-2xl border border-yellow-100 px-5 py-2.5 text-xs font-black text-yellow-600 transition-colors hover:bg-yellow-50"
                      >
                        <Star size={14} />
                        Principal
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="flex items-center gap-1.5 rounded-2xl border border-rose-50 px-5 py-2.5 text-xs font-black text-rose-500 transition-colors hover:bg-rose-50"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4 rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="shrink-0 rounded-full bg-yellow-400 p-1.5 text-white">
            <Info size={14} />
          </div>

          <p className="text-sm leading-relaxed text-gray-500">
            O endereço marcado como{" "}
            <span className="font-black text-gray-700">Principal</span> será
            sugerido automaticamente na criação de pedidos.
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-[40px] bg-white shadow-2xl">
            <div className="flex items-center justify-between px-10 pb-4 pt-10">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-yellow-50 p-2.5 text-yellow-500">
                  <MapPin size={22} />
                </div>

                <h2 className="text-2xl font-black text-gray-950">
                  Novo Endereço
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 transition-colors hover:text-gray-500"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-6 p-10 pt-2">
              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                  Apelido / Referência
                </label>

                <input
                  value={formData.apelido}
                  onChange={(event) =>
                    handleInputChange("apelido", event.target.value)
                  }
                  type="text"
                  placeholder="Ex: Minha Casa"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
                <div className="grow">
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    CEP
                  </label>

                  <input
                    required
                    value={formData.cep}
                    onChange={(event) =>
                      handleInputChange("cep", event.target.value)
                    }
                    type="text"
                    placeholder="00000-000"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-yellow-400 px-8 py-4 font-black text-yellow-600 transition-colors hover:bg-yellow-50"
                >
                  <Search size={18} />
                  Buscar
                </button>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                  Logradouro
                </label>

                <input
                  required
                  value={formData.rua}
                  onChange={(event) =>
                    handleInputChange("rua", event.target.value)
                  }
                  type="text"
                  placeholder="Rua..."
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Número
                  </label>

                  <input
                    required
                    value={formData.numero}
                    onChange={(event) =>
                      handleInputChange("numero", event.target.value)
                    }
                    type="text"
                    placeholder="123"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Complemento
                  </label>

                  <input
                    value={formData.complemento}
                    onChange={(event) =>
                      handleInputChange("complemento", event.target.value)
                    }
                    type="text"
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                  Ponto de referência
                </label>

                <input
                  value={formData.ponto_de_referencia}
                  onChange={(event) =>
                    handleInputChange("ponto_de_referencia", event.target.value)
                  }
                  type="text"
                  placeholder="Ex: Próximo ao mercadinho"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Cidade
                  </label>

                  <input
                    required
                    value={formData.cidade}
                    onChange={(event) =>
                      handleInputChange("cidade", event.target.value)
                    }
                    type="text"
                    placeholder="Fortaleza"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Estado
                  </label>

                  <input
                    required
                    value={formData.estado}
                    onChange={(event) =>
                      handleInputChange("estado", event.target.value)
                    }
                    type="text"
                    placeholder="CE"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="grow rounded-2xl py-5 font-black text-gray-400 transition-colors hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="grow rounded-[22px] bg-yellow-400 py-5 font-black text-gray-950 shadow-xl shadow-yellow-100 transition-all hover:bg-yellow-500 disabled:opacity-60"
                >
                  {isSaving ? "Salvando..." : "Salvar Endereço"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PerfilPageLayout>
  );
}
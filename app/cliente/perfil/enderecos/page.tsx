"use client";

import React, { FormEvent, useState } from "react";
import {
  Briefcase,
  Edit2,
  Home,
  Info,
  MapPin,
  Plus,
  Search,
  Trash2,
  Umbrella,
  X,
} from "lucide-react";
import { PerfilPageLayout } from "@/app/cliente/perfil/components/PerfilPageLayout";

type AddressIcon = "home" | "work" | "beach" | "map";

interface Address {
  id: number;
  type: string;
  isPrimary: boolean;
  street: string;
  neighborhood: string;
  cep: string;
  icon: AddressIcon;
}

interface AddressFormData {
  apelido: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const initialFormData: AddressFormData = {
  apelido: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const getAddressIcon = (icon: AddressIcon) => {
  const iconProps = { size: 20 };
  const icons = {
    home: <Home {...iconProps} />,
    work: <Briefcase {...iconProps} />,
    beach: <Umbrella {...iconProps} />,
    map: <MapPin {...iconProps} />,
  };
  return icons[icon];
};

export default function EnderecosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Casa",
      isPrimary: true,
      street: "Rua dos Pinheiros, 450, Ap 12",
      neighborhood: "Pinheiros, São Paulo - SP",
      cep: "05422-000",
      icon: "home",
    },
    {
      id: 2,
      type: "Trabalho",
      isPrimary: false,
      street: "Avenida Paulista, 1000, 15º Andar",
      neighborhood: "Bela Vista, São Paulo - SP",
      cep: "01310-100",
      icon: "work",
    },
    {
      id: 3,
      type: "Casa de Praia",
      isPrimary: false,
      street: "Rua das Conchas, 15",
      neighborhood: "Enseada, Guarujá - SP",
      cep: "11440-100",
      icon: "beach",
    },
  ]);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses((previous) => previous.filter((address) => address.id !== id));
  };

  const handleSaveAddress = (event: FormEvent) => {
    event.preventDefault();
    const addressStreet = formData.complemento
      ? `${formData.rua}, ${formData.numero}, ${formData.complemento}`
      : `${formData.rua}, ${formData.numero}`;

    const newAddress: Address = {
      id: Date.now(),
      type: formData.apelido || "Novo Endereço",
      isPrimary: false,
      street: addressStreet,
      neighborhood: `${formData.bairro}, ${formData.cidade} - ${formData.estado}`,
      cep: formData.cep,
      icon: "map",
    };

    setAddresses((previous) => [...previous, newAddress]);
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

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
            onClick={() => {
              if (addresses.length >= 5) return;
              setIsModalOpen(true);
            }}
            disabled={addresses.length >= 5}
            className="flex items-center justify-center gap-3 rounded-[24px] bg-yellow-400 px-6 py-4 text-sm font-black text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={20} strokeWidth={3} />
            Adicionar Novo
          </button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="group flex flex-col justify-between gap-4 rounded-[35px] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-yellow-200 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-6">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    address.isPrimary
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-50 text-gray-300"
                  }`}
                >
                  {getAddressIcon(address.icon)}
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-black text-gray-950">
                      {address.type}
                    </h4>
                    {address.isPrimary && (
                      <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-[10px] font-black uppercase text-yellow-700">
                        Principal
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    {address.street}
                  </p>
                  <p className="mt-1 text-xs font-medium text-gray-400">
                    {address.neighborhood} • CEP: {address.cep}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-2xl border border-gray-100 px-5 py-2.5 text-xs font-black text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <Edit2 size={14} />
                  Editar
                </button>
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
          ))}
        </div>

        <div className="flex items-center gap-4 rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="shrink-0 rounded-full bg-yellow-400 p-1.5 text-white">
            <Info size={14} />
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            Você pode cadastrar até 5 endereços. O marcado como{" "}
            <span className="font-black text-gray-700">Principal</span> será
            sugerido automaticamente.
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
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
                  Apelido
                </label>
                <input
                  value={formData.apelido}
                  onChange={(e) => handleInputChange("apelido", e.target.value)}
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
                    onChange={(e) => handleInputChange("cep", e.target.value)}
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
                  onChange={(e) => handleInputChange("rua", e.target.value)}
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
                    onChange={(e) => handleInputChange("numero", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("complemento", e.target.value)
                    }
                    type="text"
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Bairro
                  </label>
                  <input
                    required
                    value={formData.bairro}
                    onChange={(e) => handleInputChange("bairro", e.target.value)}
                    type="text"
                    placeholder="Centro"
                    className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 font-medium outline-none transition-all focus:border-yellow-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">
                    Cidade
                  </label>
                  <input
                    required
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                    type="text"
                    placeholder="São Paulo"
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
                    onChange={(e) => handleInputChange("estado", e.target.value)}
                    type="text"
                    placeholder="SP"
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
                  className="grow rounded-[22px] bg-yellow-400 py-5 font-black text-gray-950 shadow-xl shadow-yellow-100 transition-all hover:bg-yellow-500"
                >
                  Salvar Endereço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PerfilPageLayout>
  );
}
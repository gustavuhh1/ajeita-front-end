"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  Camera,
  Check,
  Edit2,
  Home,
  Lock,
  Mail,
  Phone,
  UserCircle,
  MapPin,
  Save,
  X,
} from "lucide-react";

import { ProviderAvatar } from "../../components/ProviderAvatar";
import { PerfilPageLayout } from "../components/PerfilPageLayout";

interface ProfileFormData {
  nomeCompleto: string;
  email: string;
  cpf: string;
  celular: string;
}

interface AddressData {
  titulo: string;
  endereco: string;
}

export default function DadosPessoaisPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialProfileData: ProfileFormData = {
    nomeCompleto: "Ricardo Silva dos Santos",
    email: "ricardo.silva@email.com",
    cpf: "453.***.***-09",
    celular: "(11) 98765-4321",
  };

  const initialAddressData: AddressData = {
    titulo: "Minha Casa",
    endereco: "Pinheiros, São Paulo - SP",
  };

  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("userProfileImage");
  });

  const [isSaved, setIsSaved] = useState(false);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [formData, setFormData] =
    useState<ProfileFormData>(initialProfileData);

  const [addressData, setAddressData] =
    useState<AddressData>(initialAddressData);

  const handleInputChange = (
    field: keyof ProfileFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setIsSaved(false);
  };

  const handleAddressChange = (
    field: keyof AddressData,
    value: string
  ) => {
    setAddressData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setIsSaved(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imageBase64 = String(reader.result);

      setProfileImage(imageBase64);
      localStorage.setItem("userProfileImage", imageBase64);
      window.dispatchEvent(new Event("profileImageUpdated"));

      setIsSaved(false);
    };

    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem("userProfileImage");
    window.dispatchEvent(new Event("profileImageUpdated"));
    setIsSaved(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsSaved(true);
    setIsEditingProfile(false);
    setIsEditingAddress(false);
  };

  const handleDiscard = () => {
    setFormData(initialProfileData);
    setAddressData(initialAddressData);

    setIsEditingProfile(false);
    setIsEditingAddress(false);

    setIsSaved(false);
  };

  return (
    <PerfilPageLayout
      title="Dados Pessoais"
      description="Gerencie suas informações de contato e mantenha seu perfil atualizado."
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* FOTO */}
        <section className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <ProviderAvatar
                  name="Ricardo Silva"
                  src={profileImage}
                  size="lg"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-yellow-400 text-white shadow-md transition-all hover:bg-yellow-500 active:scale-95"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h2 className="text-lg font-black text-gray-950">
                  Foto de Perfil
                </h2>

                <p className="mt-1 max-w-xs text-xs font-medium leading-relaxed text-gray-400">
                  PNG, JPG ou GIF. Máximo de 2MB.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-2xl bg-gray-50 px-6 py-4 text-sm font-black text-gray-600 transition-colors hover:bg-gray-100"
              >
                Remover
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border border-yellow-200 bg-yellow-50 px-6 py-4 text-sm font-black text-gray-950 transition-colors hover:bg-yellow-100"
              >
                Alterar Foto
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </section>

        {/* DADOS PESSOAIS */}
        <section className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-950">
                Informações Pessoais
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-400">
                Atualize seus dados cadastrais.
              </p>
            </div>

            {!isEditingProfile ? (
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-3 text-sm font-black text-yellow-700 transition-all hover:bg-yellow-100"
              >
                <Edit2 size={16} />
                Editar Perfil
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gray-100 px-5 py-3 text-sm font-black text-gray-600 transition-all hover:bg-gray-200"
              >
                <X size={16} />
                Cancelar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">
                Nome Completo
              </span>

              <div className="relative">
                <UserCircle
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  disabled={!isEditingProfile}
                  value={formData.nomeCompleto}
                  onChange={(event) =>
                    handleInputChange("nomeCompleto", event.target.value)
                  }
                  className={`h-14 w-full rounded-[22px] border pl-12 pr-5 text-sm font-bold outline-none transition-all ${
                    isEditingProfile
                      ? "border-gray-100 bg-gray-50 text-gray-700 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                      : "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"
                  }`}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">
                E-mail
              </span>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  type="email"
                  disabled={!isEditingProfile}
                  value={formData.email}
                  onChange={(event) =>
                    handleInputChange("email", event.target.value)
                  }
                  className={`h-14 w-full rounded-[22px] border pl-12 pr-5 text-sm font-bold outline-none transition-all ${
                    isEditingProfile
                      ? "border-gray-100 bg-gray-50 text-gray-700 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                      : "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"
                  }`}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">
                CPF{" "}
                <span className="font-bold text-gray-400">
                  Não editável
                </span>
              </span>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  value={formData.cpf}
                  disabled
                  className="h-14 w-full cursor-not-allowed rounded-[22px] border border-gray-100 bg-gray-100 px-5 pr-12 text-sm font-bold text-gray-400 outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">
                Celular
              </span>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                />

                <input
                  disabled={!isEditingProfile}
                  value={formData.celular}
                  onChange={(event) =>
                    handleInputChange("celular", event.target.value)
                  }
                  className={`h-14 w-full rounded-[22px] border pl-12 pr-5 text-sm font-bold outline-none transition-all ${
                    isEditingProfile
                      ? "border-gray-100 bg-gray-50 text-gray-700 focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                      : "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"
                  }`}
                />
              </div>
            </label>
          </div>
        </section>

        {/* ENDEREÇO */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-950">
              Endereço Principal
            </h2>

            {!isEditingAddress ? (
              <button
                type="button"
                onClick={() => setIsEditingAddress(true)}
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-yellow-600 transition-all hover:bg-yellow-50"
              >
                <Edit2 size={15} />
                Editar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-gray-500 transition-all hover:bg-gray-100"
              >
                <X size={15} />
                Cancelar
              </button>
            )}
          </div>

          <div className="rounded-[32px] border border-yellow-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-white">
                  <Home size={22} />
                </div>

                <div className="flex-1">
                  {isEditingAddress ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <Home
                          size={18}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                        />

                        <input
                          value={addressData.titulo}
                          onChange={(event) =>
                            handleAddressChange(
                              "titulo",
                              event.target.value
                            )
                          }
                          className="h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-5 text-sm font-bold text-gray-700 outline-none transition-all focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                        />
                      </div>

                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                        />

                        <input
                          value={addressData.endereco}
                          onChange={(event) =>
                            handleAddressChange(
                              "endereco",
                              event.target.value
                            )
                          }
                          className="h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-5 text-sm font-bold text-gray-700 outline-none transition-all focus:border-yellow-300 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-black text-gray-950">
                        {addressData.titulo}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-gray-400">
                        {addressData.endereco}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ALERTA */}
        {isSaved && (
          <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-sm font-black text-green-700">
            <Check size={18} />
            Alterações salvas com sucesso.
          </div>
        )}

        {/* BOTÕES */}
        <div className="flex flex-col gap-4 pt-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-2xl border border-gray-100 bg-white px-8 py-4 text-sm font-black text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
          >
            Descartar
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-9 py-4 text-sm font-black text-gray-950 shadow-lg shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-95"
          >
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>
      </form>
    </PerfilPageLayout>
  );
}
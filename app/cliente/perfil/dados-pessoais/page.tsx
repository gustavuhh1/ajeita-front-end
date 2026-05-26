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
  Check,
  Edit2,
  Home,
  Lock,
  Mail,
  Phone,
  UserCircle,
} from "lucide-react";

import { ProviderAvatar } from "@/app/cliente/components/ProviderAvatar";
import { PerfilPageLayout } from "../components/PerfilPageLayout";

interface ProfileFormData {
  nomeCompleto: string;
  email: string;
  cpf: string;
  celular: string;
}

export default function DadosPessoaisPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState<ProfileFormData>({
    nomeCompleto: "Ricardo Silva dos Santos",
    email: "ricardo.silva@email.com",
    cpf: "453.***.***-09",
    celular: "(11) 98765-4321",
  });

  useEffect(() => {
    const image = localStorage.getItem("userProfileImage");
    if (image) setProfileImage(image);

    const savedData = localStorage.getItem("userProfileData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    if (!isSaved) return;
    const timer = setTimeout(() => setIsSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [isSaved]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    if (field === "celular") {
      value = value.replace(/\D/g, "").slice(0, 11);
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
    setIsSaved(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = String(reader.result);
      setProfileImage(imageBase64);
      localStorage.setItem("userProfileImage", imageBase64);
      window.dispatchEvent(new Event("profileImageUpdated"));
      setIsSaved(false);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem("userProfileImage");
    window.dispatchEvent(new Event("profileImageUpdated"));
    setIsSaved(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem("userProfileData", JSON.stringify(formData));
    setIsSaved(true);
  };

  const handleDiscard = () => {
    setFormData({
      nomeCompleto: "Ricardo Silva dos Santos",
      email: "ricardo.silva@email.com",
      cpf: "453.***.***-09",
      celular: "(11) 98765-4321",
    });
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
                <ProviderAvatar name="Ricardo Silva" src={profileImage} size="lg" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary hover:bg-primary/90 absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white text-white shadow-md transition-all active:scale-95"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h2 className="text-lg font-black text-gray-950">Foto de Perfil</h2>
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
                className="border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-2xl border px-6 py-4 text-sm font-black text-gray-950 transition-colors"
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

        {/* FORM */}
        <section className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">Nome Completo</span>
              <div className="relative">
                <UserCircle size={18} className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-300" />
                <input
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                  className="focus:border-primary focus:ring-primary/10 h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-5 text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">E-mail</span>
              <div className="relative">
                <Mail size={18} className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="focus:border-primary focus:ring-primary/10 h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-5 text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">
                CPF <span className="font-bold text-gray-400">Não editável</span>
              </span>
              <div className="relative">
                <Lock size={16} className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-300" />
                <input
                  value={formData.cpf}
                  disabled
                  className="h-14 w-full cursor-not-allowed rounded-[22px] border border-gray-100 bg-gray-50 px-5 pr-12 text-sm font-bold text-gray-400 outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-gray-950">Celular</span>
              <div className="relative">
                <Phone size={18} className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-300" />
                <input
                  value={formData.celular}
                  onChange={(e) => handleInputChange("celular", e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="focus:border-primary focus:ring-primary/10 h-14 w-full rounded-[22px] border border-gray-100 bg-gray-50 pl-12 pr-5 text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4"
                />
              </div>
            </label>
          </div>
        </section>

        {/* ENDEREÇO */}
        <section>
          <h2 className="mb-4 text-lg font-black text-gray-950">Endereço Principal</h2>
          <div className="border-primary/20 flex flex-col gap-4 rounded-[32px] border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white">
                <Home size={22} />
              </div>
              <div>
                <h3 className="font-black text-gray-950">Minha Casa</h3>
                <p className="mt-1 text-sm font-medium text-gray-400">Pinheiros, São Paulo - SP</p>
              </div>
            </div>
            <button
              type="button"
              className="text-primary hover:bg-primary/5 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition-all"
            >
              <Edit2 size={15} />
              Editar
            </button>
          </div>
        </section>

        {/* ALERTA */}
        {isSaved && (
          <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-sm font-black text-green-700">
            <Check size={18} />
            Alterações salvas com sucesso.
          </div>
        )}

        {/* AÇÕES */}
        <div className="flex justify-end gap-4 pt-3">
          <button
            type="button"
            onClick={handleDiscard}
            className="rounded-2xl border border-gray-100 bg-white px-8 py-4 text-sm font-black text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
          >
            Descartar
          </button>

          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 shadow-primary/20 rounded-2xl px-9 py-4 text-sm font-black text-gray-950 shadow-lg transition-all active:scale-95"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </PerfilPageLayout>
  );
}
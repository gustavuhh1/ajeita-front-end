import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowCounterClockwiseIcon,
  CameraIcon,
  EnvelopeIcon,
  IdentificationCardIcon,
  LockIcon,
  PencilSimpleIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormData } from "../page";

interface Step01Props {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  preview: string | null;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}

const Step01 = ({
  control,
  errors,
  preview,
  handleAvatarChange,
  handleNextStep,
}: Step01Props) => {
  return (
    <>
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Informações Pessoais</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Preencha seus dados para criar sua conta profissional.
        </p>
      </div>

      {/* Avatar Upload */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <label htmlFor="avatar-upload" className="relative cursor-pointer">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {preview ? (
              <Image
                src={preview}
                alt="Foto de perfil"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <CameraIcon size={32} className="text-gray-400" />
            )}
          </div>
          <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 shadow">
            <PencilSimpleIcon size={12} className="text-black" />
          </span>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <Input
                id="avatar-upload"
                type="file"
                name={name}
                ref={ref}
                onBlur={onBlur}
                className="sr-only"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onChange(file);
                  handleAvatarChange(e);
                }}
              />
            )}
          />
        </label>
        <span className="text-muted-foreground text-sm">
          Foto de Perfil (Opcional)
        </span>
        {errors.image && (
          <span className="text-sm text-red-500">
            {errors.image.message as string}
          </span>
        )}
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4">
        {/* Nome Completo */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Nome Completo</Label>
          <div className="relative">
            <UserIcon
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Ex: Maria Silva"
                  className="pl-9"
                  autoComplete="name"
                />
              )}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <EnvelopeIcon
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className="pl-9"
                  autoComplete="email"
                />
              )}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* CPF */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cpf">
            CPF{" "}
            <span className="text-xs font-normal text-red-500">
              *Obrigatório
            </span>
          </Label>
          <div className="relative">
            <IdentificationCardIcon
              size={16}
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  className="pl-9"
                  maxLength={14}
                  onChange={(e) => {
                    const masked = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                    field.onChange(masked);
                  }}
                />
              )}
            />
          </div>
          {errors.cpf && (
            <p className="text-xs text-red-500">{errors.cpf.message}</p>
          )}
        </div>

        {/* Senha + Confirmar Senha */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <LockIcon
                size={16}
                className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    autoComplete="new-password"
                  />
                )}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-password">Confirme a Senha</Label>
            <div className="relative">
              <ArrowCounterClockwiseIcon
                size={16}
                className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    autoComplete="new-password"
                  />
                )}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          size="xl"
          type="button"
          className="mt-2 w-full bg-yellow-400 font-semibold text-black hover:bg-yellow-500"
          onClick={handleNextStep}
        >
          Próximo Passo →
        </Button>
      </form>
    </>
  );
};

export default Step01;

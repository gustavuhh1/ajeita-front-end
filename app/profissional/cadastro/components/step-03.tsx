"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  BroomIcon,
  CheckIcon,
  CircleDashedIcon,
  DotsThreeIcon,
  HammerIcon,
  InfoIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PaintBrushIcon,
  UsersThreeIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormRegisterData } from "../page";
import { Input } from "@/components/ui/input";

interface Step03Props {
  control: Control<FormRegisterData>;
  errors: FieldErrors<FormRegisterData>;
  onSubmit: () => void;
  setStep: (step: number) => void;
}

const Step03 = ({ control, errors, onSubmit, setStep }: Step03Props) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Configuração de Atendimento</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Conte para a gente o que você faz e onde você trabalha.
        </p>
      </div>

      {/* Categorias */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 font-semibold">
            <UsersThreeIcon size={16} className="text-primary" />
            Categorias de Serviço
          </Label>
          <span className="text-muted-foreground text-xs">Selecione até 3</span>
        </div>

        <Controller
          name="categories"
          control={control}
          render={({ field }) => {
            const selected: string[] = field.value ?? [];

            const toggle = (value: string) => {
              if (selected.includes(value)) {
                field.onChange(selected.filter((v) => v !== value));
              } else if (selected.length < 3) {
                field.onChange([...selected, value]);
              }
            };

            return (
              <div className="grid grid-cols-3 gap-3">
                {/* TODO: Implementar input outras categorias */}
                {[
                  {
                    value: "encanador",
                    label: "Encanador",
                    icon: <WrenchIcon size={22} />,
                  },
                  {
                    value: "eletricista",
                    label: "Eletricista",
                    icon: <LightningIcon size={22} />,
                  },
                  {
                    value: "reparos",
                    label: "Reparos",
                    icon: <HammerIcon size={22} />,
                  },
                  {
                    value: "pintura",
                    label: "Pintura",
                    icon: <PaintBrushIcon size={22} />,
                  },
                  {
                    value: "limpeza",
                    label: "Limpeza",
                    icon: <BroomIcon size={22} />,
                  },
                  {
                    value: "outros",
                    label: "Outros",
                    icon: <DotsThreeIcon size={22} />,
                  },
                ].map(({ value, label, icon }) => {
                  const isSelected = selected.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggle(value)}
                      className={`relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 py-4 text-sm font-medium transition-all ${
                        isSelected
                          ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                          : "border-muted text-muted-foreground bg-white hover:border-yellow-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400">
                          <CheckIcon
                            size={10}
                            className="text-black"
                            weight="bold"
                          />
                        </span>
                      )}
                      <span
                        className={
                          isSelected
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                        }
                      >
                        {icon}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
            );
          }}
        />
        {errors.categories && (
          <p className="text-xs text-red-500">{errors.categories.message}</p>
        )}
      </div>

      {/* Bairro de Referência */}
      <div className="flex flex-col gap-1.5">
        <Label className="flex items-center gap-2 font-semibold">
          <MapPinIcon size={16} className="text-primary" />
          Seu Bairro de Referência
        </Label>
        <div className="relative flex items-center">
          <MagnifyingGlassIcon
            size={16}
            className="text-muted-foreground absolute left-3"
          />
          {/* TODO: Utilizar Google Maps API para buscar endereços */}
          <Controller
            name="neighborhood"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Vila Mariana, São Paulo"
                className="pr-36 pl-9"
              />
            )}
          />
          <button
            type="button"
            className="absolute right-3 text-xs font-medium text-yellow-500 hover:text-yellow-600"
            onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                console.log("Latitude:", latitude, "Longitude:", longitude);
                //TODO: Aqui você pode usar uma API de geocodificação reversa para obter o bairro a partir das coordenadas
              });
            }}
          >
            Usar minha localização
          </button>
        </div>
        <p className="text-muted-foreground text-xs">
          Usaremos este endereço como centro do seu raio de atendimento.
        </p>
        {errors.neighborhood && (
          <p className="text-xs text-red-500">{errors.neighborhood.message}</p>
        )}
      </div>

      {/* Raio de Atendimento */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 font-semibold">
            <CircleDashedIcon size={16} className="text-primary" />
            Raio de Atendimento
          </Label>
          <Controller
            name="radius"
            control={control}
            render={({ field }) => (
              <span className="text-sm font-bold text-yellow-500">
                {field.value} km
              </span>
            )}
          />
        </div>

        <Controller
          name="radius"
          control={control}
          render={({ field }) => (
            <Slider
              defaultValue={[10]}
              min={1}
              max={95}
              step={1}
              value={[field.value]}
              onValueChange={(value) => field.onChange(value[0])}
              className={cn(
                "h-2 rounded-full bg-yellow-100! accent-yellow-500",
              )}
            />
          )}
        />

        <div className="text-muted-foreground flex justify-between text-xs">
          <span>1 km</span>
          <span>45 km</span>
          <span>95 km</span>
        </div>

        {/* Info dinâmica */}
        <Controller
          name="radius"
          control={control}
          render={({ field }) => (
            <div className="flex min-h-17 gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
              <InfoIcon size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <p className="text-xs leading-relaxed text-blue-700">
                Com um raio de {field.value}km, você poderá atender bairros
                próximos à sua região de referência.
              </p>
            </div>
          )}
        />
      </div>

      {/* Navegação */}
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="flex-1"
          onClick={() => setStep(2)}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          size="xl"
          onClick={() => {
            console.log("Submitting form...");
          }}
          className="flex-1 bg-yellow-400 font-semibold text-black hover:bg-yellow-500"
        >
          Concluir Cadastro ✓
        </Button>
      </div>
    </form>
  );
};

export default Step03;

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileTextIcon, MapPinIcon } from "@phosphor-icons/react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { FormData } from "../page";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step02Props {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  handleNextStep: () => void;
  setStep: (step: number) => void;
}

const Step02 = ({ control, errors, handleNextStep, setStep }: Step02Props) => {
  const bioValue = useWatch({ control, name: "bio" });
  return (
    <form className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Seu Perfil Profissional</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Conte um pouco sobre sua experiência e por que os clientes devem
          escolher você.
        </p>
      </div>

      {/* Biografia */}
      <div className="flex flex-col gap-1.5">
        <Label className="flex items-center gap-2 font-semibold">
          <FileTextIcon size={16} className="text-primary" />
          Biografia Profissional
        </Label>

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Olá! Tenho mais de 5 anos de experiência na área..."
              className="min-h-40 resize-none"
              maxLength={600}
            />
          )}
        />

        {/* Contador + descrição */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            Descreva sua história profissional, competências e motivação.
          </p>
          <p className="text-muted-foreground text-xs">
            {bioValue?.length ?? 0} / min 100 caracteres
          </p>
        </div>

        {errors.bio && (
          <p className="text-xs text-red-500">{errors.bio.message}</p>
        )}
      </div>

      {/* Dica */}
      <div className="flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
        <MapPinIcon size={16} className="mt-0.5 shrink-0 text-yellow-500" />
        <div>
          <p className="text-sm font-semibold text-yellow-800">
            Dica para um bom perfil
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-yellow-700">
            Clientes confiam mais em perfis detalhados. Mencione certificações,
            cursos e especializações. Seja cordial e mostre profissionalismo
            desde o primeiro contato.
          </p>
        </div>
      </div>
      <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
        <AlertCircleIcon size={16} className="mt-0.5 shrink-0 text-red-500" />
        <div>
          <p className="text-sm font-semibold text-red-800">AVISO</p>
          <p className="mt-0.5 text-xs leading-relaxed text-red-700">
            Esse texto será usado para analisar seu perfil. Evite informações
            falsas ou enganosas, pois isso pode resultar em suspensão da conta
            ou até mesmo banimento permanente.
          </p>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex w-full items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="flex-1"
          onClick={() => setStep(1)}
        >
          Voltar
        </Button>
        <Button
          type="button"
          size="xl"
          className="flex-1 bg-yellow-400 font-semibold text-black hover:bg-yellow-500"
          onClick={handleNextStep}
        >
          Próximo Passo →
        </Button>
      </div>
    </form>
  );
};

export default Step02;

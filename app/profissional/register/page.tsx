"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Footer from "../components/footer";
import Link from "next/link";
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Step00 from "./components/step-00";
import Step01 from "./components/step-01";
import Step02 from "./components/step-02";
import Step03 from "./components/step-03";
import api from "@/lib/api";
import Step04 from "./components/step-04";
import { cn } from "@/lib/utils";

const step1Schema = z
  .object({
    image: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Máximo de 5MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Formato inválido. Use JPG, PNG ou WEBP",
      )
      .optional()
      .nullable(),
    name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    cpf: z
      .string()
      .min(14, "CPF inválido")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato: 000.000.000-00"),
    password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    },
  );

const step2Schema = z.object({
  bio: z
    .string()
    .min(100, "A biografia deve ter ao menos 100 caracteres")
    .max(600, "Máximo de 600 caracteres"),
});

const step3Schema = z.object({
  categories: z
    .array(z.string())
    .min(1, "Selecione ao menos 1 categoria")
    .max(3, "Selecione até 3 categorias"),
  otherCategory: z.string().optional(),
  neighborhood: z.string().min(3, "Informe seu bairro de referência"),
  radius: z.number().min(1).max(95, "O raio máximo é de 95km"),
});

const fullSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape);

export type FormData = z.infer<typeof fullSchema>;

const stepFields: Record<number, (keyof FormData)[]> = {
  1: ["image", "name", "email", "cpf", "password", "confirmPassword"],
  2: ["bio"],
  3: ["categories", "otherCategory", "neighborhood", "radius"],
};

const TOTAL_STEPS = 4;

export default function RegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      image: null,
      name: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      bio: "",
      categories: [],
      neighborhood: "",
      radius: 10,
    },
    mode: "onChange",
  });

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  async function handleNextStep() {
    const fields = stepFields[step];
    const isValid = fields ? await trigger(fields) : true;
    if (step < TOTAL_STEPS && isValid) {
      setStep((prev) => prev + 1);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  const onSubmit = handleSubmit(
    async (data) => {
      const res = await api.post("/prestadores", data);
      if (res.status === 201) setStep(4);
      if (res.status !== 201) {
        alert("Ocorreu um erro ao criar sua conta. Tente novamente.");
        setStep(1);
      }
    },
    (errors) => {
      console.log("Erros de validação:", errors);
    },
  );

  return (
    <div>
      <div className="bg-secondary relative flex flex-col items-center justify-center gap-10 px-6 py-8 md:px-12">
        <div className="absolute top-3 left-5 h-12 w-12">
          <Link
            href="/profissional"
            className="flex h-full w-full transform items-center justify-center rounded-full border transition-colors duration-200 hover:bg-white"
          >
            <ArrowUUpLeftIcon size={24} className="text-black" />
          </Link>
        </div>
        {/* Step indicator */}
        <div className="mb-3 w-full max-w-lg">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              Passo {step} de {TOTAL_STEPS}
            </span>
            <span className="font-semibold text-yellow-500">
              {progress}% Completo
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-yellow-100 [&>div]:bg-yellow-400"
          />
        </div>

        {/* Card */}
        <div
          className={cn(
            "w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm",
            step === 4 && "hidden",
          )}
        >
          {step === 0 && <Step00 setStep={setStep} />}

          {step === 1 && (
            <Step01
              control={control}
              errors={errors}
              preview={preview}
              handleAvatarChange={handleAvatarChange}
              handleNextStep={handleNextStep}
            />
          )}

          {step === 2 && (
            <Step02
              control={control}
              errors={errors}
              handleNextStep={handleNextStep}
            />
          )}

          {step === 3 && (
            <Step03
              control={control}
              errors={errors}
              onSubmit={onSubmit}
              setStep={setStep}
            />
          )}
        </div>
        {step === 4 && <Step04 />}
      </div>
      <Footer className="bg-secondary" />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { BriefcaseIcon, CalendarCheckIcon, UsersIcon } from "@phosphor-icons/react";
import { BarChart2, Sparkles } from "lucide-react";
import Link from "next/link";

interface Step00Props {
  setStep: (step: number) => void;
}

const Step00 = ({ setStep }: Step00Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <div className="mb-3 flex justify-center">
          <div className="bg-primary/10 rounded-full p-3">
            <BriefcaseIcon className="text-primary h-8 w-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Bem-vindo ao Ajeitaí para Profissionais!
        </h1>
        <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
          Crie sua conta profissional e comece a receber clientes hoje mesmo.
        </p>
      </div>

      {/* Descrição principal */}
      <p className="text-muted-foreground text-center text-sm leading-relaxed">
        O <span className="text-foreground font-medium">Ajeitaí</span> é a
        plataforma ideal para profissionais autônomos que desejam expandir seus
        negócios e alcançar mais clientes — com agendamento, gestão de serviços
        e comunicação integrados em um só lugar.
      </p>

      {/* Benefícios em cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="bg-muted/40 flex flex-col items-center gap-2 rounded-xl border p-4 text-center">
          <CalendarCheckIcon className="text-primary h-6 w-6" />
          <h3 className="text-sm font-semibold">Agendamento Fácil</h3>
          <p className="text-muted-foreground text-xs">
            Seus clientes marcam compromissos diretamente no seu perfil, sem
            ligações ou mensagens.
          </p>
        </div>

        <div className="bg-muted/40 flex flex-col items-center gap-2 rounded-xl border p-4 text-center">
          <UsersIcon className="text-primary h-6 w-6" />
          <h3 className="text-sm font-semibold">Mais Visibilidade</h3>
          <p className="text-muted-foreground text-xs">
            Apareça para milhares de clientes que buscam profissionais como você
            na sua região.
          </p>
        </div>

        <div className="bg-muted/40 flex flex-col items-center gap-2 rounded-xl border p-4 text-center">
          <BarChart2 className="text-primary h-6 w-6" />
          <h3 className="text-sm font-semibold">Gestão Completa</h3>
          <p className="text-muted-foreground text-xs">
            Acompanhe seus agendamentos, histórico de clientes e avaliações em
            um painel simples.
          </p>
        </div>
      </div>

      {/* Como funciona */}
      <div className="bg-muted/20 rounded-xl border p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="text-primary h-4 w-4" />
          Como funciona
        </h2>
        <ol className="flex flex-col gap-2">
          {[
            {
              step: "1",
              label: "Crie seu perfil",
              desc: "Informe seus dados, especialidades e horários disponíveis.",
            },
            {
              step: "2",
              label: "Receba solicitações",
              desc: "Clientes encontram você e pedem um compromisso pelo app.",
            },
            {
              step: "3",
              label: "Confirme e atenda",
              desc: "Aprove o agendamento e concentre-se em entregar um ótimo serviço.",
            },
          ].map(({ step, label, desc }) => (
            <li key={step} className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                {step}
              </span>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-muted-foreground text-xs">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Social proof */}
      <p className="text-muted-foreground text-center text-xs">
        🚀 Junte-se a milhares de profissionais que já estão crescendo com o
        Ajeitaí.
      </p>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xl" asChild className="w-25">
          <Link href="/">Voltar</Link>
        </Button>
        <Button onClick={() => setStep(1)} size="xl" className="w-25">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Step00;

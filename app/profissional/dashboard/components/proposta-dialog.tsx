"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  mensagem: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  preco: z.string().min(2, {
    message: "Informe um preço estimado (ex: R$ 200).",
  }),
});

export function PropostaDialog() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: implementar envio da proposta para a API
    setOpen(false);
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-gray-900 font-semibold text-gray-900 hover:bg-gray-100"
          >
            Enviar Proposta
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Enviar Proposta</DrawerTitle>
            <DrawerDescription>
              Descreva sua proposta e defina um preço estimado para este
              serviço.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <PropostaForm onSubmit={onSubmit} />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="xl"
          className="w-full border-gray-900 font-semibold text-gray-900"
        >
          Enviar Proposta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Enviar Proposta</DialogTitle>
          <DialogDescription>
            Descreva sua proposta e defina um preço estimado para este serviço.
          </DialogDescription>
        </DialogHeader>
        <PropostaForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

function PropostaForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mensagem: "",
      preco: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="mensagem">Mensagem</FieldLabel>
        <Textarea
          id="mensagem"
          placeholder="Olá! Tenho interesse em realizar este serviço..."
          className="resize-none"
          rows={4}
          {...register("mensagem")}
          aria-invalid={!!errors.mensagem}
        />
        <FieldError errors={[errors.mensagem]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="preco">Preço estimado</FieldLabel>
        <Input
          id="preco"
          placeholder="ex: R$ 200"
          {...register("preco")}
          aria-invalid={!!errors.preco}
          type="number"
        />
        <FieldError errors={[errors.preco]} />
      </Field>

      <Button
        type="submit"
        className="w-full bg-gray-900 text-white hover:bg-gray-800"
      >
        Enviar
      </Button>
    </form>
  );
}

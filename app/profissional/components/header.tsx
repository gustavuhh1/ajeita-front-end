"use client";

import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "@phosphor-icons/react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-20 w-full items-center justify-center">
      <div className="flex w-full items-center justify-between border-b border-primary-foreground/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-11 w-11 items-center justify-center rounded-full p-1">
            <BriefcaseIcon size={32} weight="duotone" />
          </div>
          <h2 className="font-semibold!">Ajeitaí</h2>
          <p className="text-primary-foreground text-sm">para Profissionais</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="link"
            type="button"
            className="px-4 py-2"
            size="xl"
          >
            <Link href="/login">Central de Ajuda</Link>
          </Button>
          <Button
            asChild
            variant="link"
            type="button"
            className="px-4 py-2"
            size="xl"
          >
            <Link href="/login">Sou Cliente</Link>
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            className="rounded-4xl px-4 py-2"
            size="xl"
          >
            <Link href="/auth">Baixar App</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

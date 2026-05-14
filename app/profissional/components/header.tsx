"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BriefcaseIcon } from "@phosphor-icons/react";
import Link from "next/link";

interface HeaderProps {
  variant?: "auth" | "default";
}

const Header = ({ variant = "default" }: HeaderProps) => {
  return (
    <header
      className={cn("flex h-20 w-full items-center justify-center", {
        "bg-background": variant === "auth",
        "bg-secondary": variant === "default",
      })}
    >
      <div className="border-primary-foreground/15 flex w-full items-center justify-between border-b px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-11 w-11 items-center justify-center rounded-full p-1">
            <BriefcaseIcon size={32} weight="duotone" />
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <h2 className="font-semibold!">Ajeitaí</h2>
            <p className="text-primary-foreground text-sm">
              para Profissionais
            </p>
          </Link>
        </div>

        {variant === "auth" && (
          <div className="flex items-center gap-5">
            <Link className="text-sm" href="/">
              Central de Ajuda
            </Link>
            <Link className="text-sm" href="/auth?mode=login">
              Sou Cliente
            </Link>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-4xl px-4 py-2"
              size="xl"
            >
              <Link href="#">Baixar App</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

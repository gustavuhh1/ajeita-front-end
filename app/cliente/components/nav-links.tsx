"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Início",
    path: "/cliente/home",
  },
  {
    label:
      "Buscar Profissional",
    path:
      "/cliente/buscar-profissional",
  },
  {
    label: "Meus Pedidos",
    path: "/pedidos",
  },
  {
    label: "Mensagens",
    path: "/mensagens",
  },
];

const NavLinks = () => {
  const pathname =
    usePathname();

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-3">
        {navLinks.map((link) => {
          const isActive =
            pathname ===
              link.path ||
            pathname.startsWith(
              `${link.path}/`,
            );

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-zinc-200 font-semibold text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
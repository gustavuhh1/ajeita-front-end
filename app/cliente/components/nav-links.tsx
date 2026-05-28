"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Início", path: "/cliente/home" },
  { label: "Meus Pedidos", path: "/meus-pedidos" },
  { label: "Mensagens", path: "/cliente/mensagens" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={cn(
                "rounded-xl p-2 transition-colors duration-200 hover:bg-zinc-200 hover:text-zinc-900",
                pathname === link.path
                  ? "bg-zinc-200 font-semibold text-zinc-900"
                  : "text-zinc-600",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;

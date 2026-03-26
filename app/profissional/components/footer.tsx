import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterProps {
  variant?: "default" | "auth";
}

const Footer = ({ variant }: FooterProps) => {
  return (
    <footer
      className={cn(
        "py-4 text-center",
        variant === "auth"
          ? "bg-transparent"
          : "bg-secondary border-foreground/5 border-t",
      )}
    >
      {variant === "auth" ? (
        <p className="text-muted-foreground text-xs">
          © 2023 Ajeitai. Todos os direitos reservados.
        </p>
      ) : (
        <div className="flex items-baseline justify-between gap-2 px-8">
          <div></div>
          <ul className="flex gap-5">
            <li>
              <Link
                href="#"
                className="text-muted-foreground text-sm hover:underline"
              >
                Termos de Serviço
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground text-sm hover:underline"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground text-sm hover:underline"
              >
                Central de Ajuda
              </Link>
            </li>
          </ul>
          <p className="text-muted-foreground text-xs">
            © 2023 Ajeitai. Todos os direitos reservados.
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;

import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("py-4 text-center", className)}>
      <p className="text-muted-foreground text-xs">
        © 2023 Ajeitai. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
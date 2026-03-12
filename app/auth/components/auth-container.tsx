import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function AuthContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const mode = searchParams.get("mode") === "register" ? "register" : "login";

  const toggleMode = () => {
    const next = mode === "login" ? "register" : "login";
    router.push(`${pathname}?mode=${next}`);
  };

  return (
    <div className="relative flex flex-1 px-4 py-20 md:px-8 lg:px-12">
      {/* LOGO */}
      <Link href="/" className="flex">
        <div className="absolute top-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
            {/* TODO: Mudar logo para a oficial */}
            🔧
          </div>
          <h1 className="text-2xl font-semibold">Ajeitai</h1>
          <p className="text-sm text-gray-500">- Para Clientes</p>
        </div>
      </Link>

      <div className="absolute top-8 right-10">
        <Button
          variant="link"
          className="font-semibold text-gray-700"
          onClick={toggleMode}
        >
          {mode === "login" ? "Criar conta" : "Já tem uma conta?"}
        </Button>
      </div>

      <div className="flex h-full w-full items-center justify-center">
        {mode == "login" ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <p className="text-center text-xs text-gray-400">
          © 2024 Ajeitai. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

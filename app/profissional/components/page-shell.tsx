import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({
  eyebrow = "Área do Prestador",
  title,
  description,
  actions,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              {eyebrow}
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              {title}
            </h1>

            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </header>

        {children}
      </div>
    </div>
  );
}
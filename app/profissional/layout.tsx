interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#faf8f5]">
      <main className="flex flex-1">
        {children}
      </main>
    </div>
  );
}
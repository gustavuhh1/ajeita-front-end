
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}

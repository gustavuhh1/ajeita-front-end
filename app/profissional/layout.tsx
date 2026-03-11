import Header from "./components/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}

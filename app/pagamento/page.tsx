"use client";

import { ShieldCheck, CreditCard, QrCode, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MainHeader } from "../cliente/components/MainHeader";

export default function PagamentoPage() {
  const router = useRouter();

  const [metodo, setMetodo] = useState<"pix" | "cartao">("pix");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", documento: "" });
  const [errors, setErrors] = useState<any>({});

  function validar() {
    const newErrors: any = {};
    if (!form.nome) newErrors.nome = "Nome obrigatório";
    if (!form.email.includes("@")) newErrors.email = "Email inválido";
    if (form.documento.length < 11) newErrors.documento = "CPF/CNPJ inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validar()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/pagamento/status?status=sucesso");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <MainHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <h1 className="mb-8 text-3xl font-black text-gray-950">Pagamento</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Resumo do Pedido */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-black text-gray-950">Resumo do Pedido</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-gray-50" />
              <div>
                <p className="font-black text-gray-950">Higienização de Sofá</p>
                <p className="text-xs font-medium text-gray-400">ID: #849201</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between font-medium text-gray-500">
                <span>Profissional</span>
                <span className="font-bold text-gray-950">Carlos Silva</span>
              </div>
              <div className="flex justify-between font-medium text-gray-500">
                <span>Data</span>
                <span className="font-bold text-gray-950">11 Jun, 14:00</span>
              </div>
              <div className="flex justify-between font-medium text-gray-500">
                <span>Taxa</span>
                <span className="font-bold text-gray-950">R$ 0,00</span>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6 flex justify-between items-center">
              <span className="font-black text-gray-950">Total</span>
              <span className="text-2xl font-black text-yellow-600">R$ 250,00</span>
            </div>

            <div className="mt-6 flex gap-3 rounded-2xl bg-blue-50 p-4 text-xs font-bold text-blue-700">
              <ShieldCheck size={18} className="shrink-0" />
              Seu pagamento está protegido. O valor só será liberado após o serviço.
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-black text-gray-950">Escolha o Método</h2>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setMetodo("pix")}
                className={`flex-1 py-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-black transition-all ${
                  metodo === "pix" ? "border-yellow-400 bg-yellow-50 text-yellow-700" : "border-gray-100 text-gray-400 hover:border-gray-200"
                }`}
              >
                <QrCode size={16} /> Pix
              </button>
              <button
                onClick={() => setMetodo("cartao")}
                className={`flex-1 py-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-sm font-black transition-all ${
                  metodo === "cartao" ? "border-yellow-400 bg-yellow-50 text-yellow-700" : "border-gray-100 text-gray-400 hover:border-gray-200"
                }`}
              >
                <CreditCard size={16} /> Cartão
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <input
                placeholder="Nome completo / Razão social"
                className="w-full rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium focus:border-yellow-400 outline-none"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
              {errors.nome && <p className="text-[10px] font-bold text-red-500">{errors.nome}</p>}

              <input
                placeholder="Email"
                className="w-full rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium focus:border-yellow-400 outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-[10px] font-bold text-red-500">{errors.email}</p>}

              <input
                placeholder="CPF ou CNPJ"
                className="w-full rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium focus:border-yellow-400 outline-none"
                value={form.documento}
                onChange={(e) => setForm({ ...form, documento: e.target.value })}
              />
              {errors.documento && <p className="text-[10px] font-bold text-red-500">{errors.documento}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-yellow-400 py-4 font-black text-gray-950 transition-all hover:bg-yellow-500 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Processando...
                </>
              ) : (
                "Confirmar e Pagar"
              )}
            </button>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs font-medium text-gray-400">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  );
}
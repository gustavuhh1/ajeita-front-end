"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Loader2,
  QrCode,
  ShieldCheck,
} from "lucide-react"

import Header from "@/app/cliente/components/header"

export default function PagamentoPage() {
  const router = useRouter()

  const [metodo, setMetodo] = useState<"pix" | "cartao">("pix")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    nome: "",
    email: "",
    documento: "",
  })

  const [errors, setErrors] = useState<any>({})

  function validar() {
    const newErrors: any = {}

    if (!form.nome) {
      newErrors.nome = "Nome obrigatório"
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Email inválido"
    }

    if (form.documento.length < 11) {
      newErrors.documento = "CPF/CNPJ inválido"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validar()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      router.push("/pagamento/status?status=sucesso")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Header />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            Resumo do Pedido
          </h2>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-gray-100" />

            <div>
              <p className="font-medium text-gray-700">
                Higienização de Sofá
              </p>

              <p className="text-sm text-gray-400">
                ID: #849201
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Profissional</span>

              <span className="text-gray-800">
                Carlos Silva
              </span>
            </div>

            <div className="flex justify-between">
              <span>Data</span>

              <span className="text-gray-800">
                11 Jun, 14:00
              </span>
            </div>

            <div className="flex justify-between">
              <span>Taxa</span>

              <span className="text-gray-800">
                R$ 0,00
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="font-medium text-gray-700">
              Total
            </span>

            <span className="text-xl font-semibold text-yellow-600">
              R$ 250,00
            </span>
          </div>

          <div className="mt-6 flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            <ShieldCheck size={18} />

            <span>
              Seu pagamento está protegido. O valor só será liberado após o
              serviço.
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Pagamento
          </h2>

          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setMetodo("pix")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-sm transition-all ${
                metodo === "pix"
                  ? "border-yellow-400 bg-yellow-50 font-medium"
                  : "border-gray-200"
              }`}
            >
              <QrCode size={16} />
              Pix
            </button>

            <button
              onClick={() => setMetodo("cartao")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-sm transition-all ${
                metodo === "cartao"
                  ? "border-yellow-400 bg-yellow-50 font-medium"
                  : "border-gray-200"
              }`}
            >
              <CreditCard size={16} />
              Cartão
            </button>
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <input
                placeholder="Nome completo / Razão social"
                className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:border-yellow-400"
                value={form.nome}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome: e.target.value,
                  })
                }
              />

              {errors.nome && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.nome}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="Email"
                className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:border-yellow-400"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="CPF ou CNPJ"
                className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:border-yellow-400"
                value={form.documento}
                onChange={(e) =>
                  setForm({
                    ...form,
                    documento: e.target.value,
                  })
                }
              />

              {errors.documento && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.documento}
                </p>
              )}
            </div>
          </div>

          {metodo === "pix" && (
            <div className="mb-6 text-sm text-gray-500">
              Após confirmar, você receberá o QR Code para pagamento.
            </div>
          )}

          {metodo === "cartao" && (
            <div className="mb-6 text-sm text-gray-500">
              Integração com cartão será feita no backend.
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 py-3 font-medium transition-colors hover:bg-yellow-500 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Processando...
              </>
            ) : (
              "Confirmar e Pagar"
            )}
          </button>
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-gray-400">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  )
}
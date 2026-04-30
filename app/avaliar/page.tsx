"use client"

import {
  Bell,
  ShoppingCart,
  Star,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AvaliarPrestadorPage() {
  const router = useRouter()

  const [nota, setNota] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState("")
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const pedidoId = "AJ-88291"

  // 🔒 bloqueio de avaliação duplicada
  useEffect(() => {
    const jaAvaliou = localStorage.getItem(`avaliado-${pedidoId}`)
    if (jaAvaliou) {
      setEnviado(true)
    }
  }, [])

  function handleSubmit() {
    if (nota === 0) return alert("Selecione uma nota")

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setEnviado(true)

      // salva como avaliado
      localStorage.setItem(`avaliado-${pedidoId}`, "true")

      // redireciona após 2s
      setTimeout(() => {
        router.push("/pedidos")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb]">

      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
            🔧
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Ajeitai
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <Bell size={16} />
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <ShoppingCart size={16} />
          </div>
          <div className="h-9 w-9 rounded-full bg-yellow-300" />
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center">

          {!enviado ? (
            <>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Avaliar prestador
              </h1>

              <p className="text-sm text-gray-500 mb-6">
                Como foi sua experiência com o serviço?
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    className={`cursor-pointer transition
                      ${
                        (hover || nota) >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    `}
                    onClick={() => setNota(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                ))}
              </div>

              <textarea
                placeholder="Deixe um comentário (opcional)"
                className="w-full border rounded-2xl px-4 py-3 text-sm mb-6 resize-none"
                rows={4}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-full bg-yellow-400 py-3 font-medium hover:bg-yellow-500 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Enviando...
                  </>
                ) : (
                  "Enviar avaliação"
                )}
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Avaliação enviada!
              </h1>

              <p className="text-sm text-gray-500">
                Obrigado pelo seu feedback 🙌
              </p>

              <p className="text-xs text-gray-400 mt-4">
                Redirecionando para seus pedidos...
              </p>
            </>
          )}
        </div>
      </div>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai
      </footer>
    </div>
  )
}


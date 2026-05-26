"use client";

import {
  Star,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/header";

export default function AvaliarPrestadorPage() {
  const router = useRouter();

  const [nota, setNota] = useState(0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const pedidoId = "AJ-88291";

  useEffect(() => {
    const jaAvaliou = localStorage.getItem(
      `avaliado-${pedidoId}`,
    );

    if (jaAvaliou) {
      setEnviado(true);
    }
  }, []);

  function handleSubmit() {
    if (nota === 0) {
      return alert("Selecione uma nota");
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEnviado(true);

      localStorage.setItem(
        `avaliado-${pedidoId}`,
        "true",
      );

      setTimeout(() => {
        router.push("/cliente/meus-pedidos");
      }, 2200);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-gray-800">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-12">
        <button
          onClick={() => router.back()}
          className="mb-6 flex w-fit items-center gap-2 rounded-2xl px-2 py-1 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[36px] border border-gray-100 bg-white shadow-sm">
          {/* HERO */}
          <div className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-yellow-50 via-white to-yellow-100/60 px-6 py-10 text-center sm:px-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-yellow-200/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 shadow-inner">
                <Star
                  className="fill-yellow-400 text-yellow-400"
                  size={34}
                />
              </div>

              <span className="rounded-full bg-yellow-100 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-yellow-700">
                Avaliação do Serviço
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                Como foi sua experiência?
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
                Sua avaliação ajuda outros clientes a encontrarem
                profissionais confiáveis e melhora ainda mais a
                qualidade da plataforma.
              </p>
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="p-6 sm:p-10">
            {!enviado ? (
              <div className="space-y-8">
                {/* CARD PEDIDO */}
                <div className="rounded-[28px] border border-gray-100 bg-gray-50/80 p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Pedido
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-gray-950">
                        #{pedidoId}
                      </h2>

                      <p className="mt-2 text-sm font-medium text-gray-500">
                        Higienização de sofá • Finalizado com sucesso
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl bg-green-100 px-5 py-3 text-sm font-black text-green-700">
                      <CheckCircle2 size={18} />
                      Serviço concluído
                    </div>
                  </div>
                </div>

                {/* ESTRELAS */}
                <div className="rounded-[32px] border border-yellow-100 bg-yellow-50/40 px-6 py-10 text-center">
                  <h3 className="text-2xl font-black text-gray-950">
                    Avalie o prestador
                  </h3>

                  <p className="mt-2 text-sm font-medium text-gray-500">
                    Clique nas estrelas para definir sua nota
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-all duration-200 hover:scale-110 active:scale-95"
                        onClick={() => setNota(star)}
                        onMouseEnter={() =>
                          setHover(star)
                        }
                        onMouseLeave={() =>
                          setHover(0)
                        }
                      >
                        <Star
                          size={48}
                          className={`transition-all duration-200 ${
                            (hover || nota) >= star
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {nota > 0 && (
                    <div className="mt-6">
                      <span className="rounded-full bg-white px-5 py-2 text-sm font-black text-yellow-600 shadow-sm">
                        {nota === 1 &&
                          "Muito ruim"}
                        {nota === 2 &&
                          "Ruim"}
                        {nota === 3 &&
                          "Regular"}
                        {nota === 4 &&
                          "Muito bom"}
                        {nota === 5 &&
                          "Excelente"}
                      </span>
                    </div>
                  )}
                </div>

                {/* COMENTÁRIO */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-black text-gray-800">
                      Comentário
                    </label>

                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                      Opcional
                    </span>
                  </div>

                  <textarea
                    placeholder="Conte como foi sua experiência com o profissional..."
                    className="min-h-[180px] w-full resize-none rounded-[28px] border border-gray-100 bg-gray-50 px-6 py-5 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100"
                    value={comentario}
                    onChange={(e) =>
                      setComentario(
                        e.target.value,
                      )
                    }
                  />
                </div>

                {/* DICA */}
                <div className="flex gap-4 rounded-[28px] border border-blue-100 bg-blue-50/60 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-blue-900">
                      Feedback transparente
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-blue-700">
                      Avaliações honestas ajudam a manter a qualidade
                      dos serviços e fortalecem a confiança entre
                      clientes e profissionais.
                    </p>
                  </div>
                </div>

                {/* BOTÕES */}
                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <button
                    onClick={() =>
                      router.back()
                    }
                    className="flex-1 rounded-[22px] border border-gray-200 bg-white py-4 text-sm font-black text-gray-700 transition-all hover:bg-gray-50"
                  >
                    Voltar
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[22px] bg-yellow-400 py-4 text-sm font-black text-gray-950 shadow-xl shadow-yellow-100 transition-all hover:bg-yellow-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          className="animate-spin"
                          size={18}
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Star
                          size={18}
                          className="fill-gray-950"
                        />
                        Enviar avaliação
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-2 py-14 text-center">
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
                  <CheckCircle2
                    size={48}
                    className="text-green-600"
                  />
                </div>

                <span className="rounded-full bg-green-100 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-green-700">
                  Avaliação concluída
                </span>

                <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-950">
                  Obrigado pelo feedback!
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base">
                  Sua avaliação foi enviada com sucesso 🙌
                  Ela ajuda outros usuários a encontrarem
                  profissionais confiáveis e melhora ainda mais
                  nossa comunidade.
                </p>

                <div className="mt-10 flex items-center gap-3 rounded-full bg-gray-50 px-5 py-3 text-sm font-bold text-gray-500">
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Redirecionando para seus pedidos...
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-10 border-t border-gray-100 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 sm:flex-row sm:text-left">
          <p>
            © 2026 Ajeitai - Todos os direitos reservados.
          </p>

          <div className="flex gap-8">
            <a
              href="#"
              className="transition-colors hover:text-gray-700"
            >
              Termos
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-700"
            >
              Privacidade
            </a>

            <a
              href="#"
              className="transition-colors hover:text-gray-700"
            >
              Ajuda
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client"

export default function PedidosPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      
      <header className="flex items-center justify-between border-b bg-white px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
            🔧
          </div>
          <span className="text-lg font-semibold">Ajeitai</span>
        </div>

        <input
          placeholder="Buscar serviços..."
          className="w-96 rounded-full bg-gray-100 px-5 py-2 text-sm outline-none"
        />

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <span>Início</span>
          <span>Explorar</span>
          <span>Serviços</span>
          <div className="h-9 w-9 rounded-full bg-gray-200" />
        </nav>
      </header>

      
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">

        
        <aside className="w-80 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gray-200" />
            <div>
              <h3 className="font-semibold">Ricardo Silva</h3>
              <span className="text-xs text-gray-400">
                CLIENTE PRIME
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-sm">

            <div className="flex items-center gap-3 text-gray-500">
              👤 Dados Pessoais
            </div>

            <div className="flex items-center gap-3 rounded-full bg-yellow-100 px-4 py-2 font-medium text-yellow-700">
              📄 Meus Pedidos
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              📍 Endereços
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              🔒 Segurança
            </div>

          </div>

          <button className="mt-10 text-sm text-red-500">
            Sair da Conta
          </button>
        </aside>

      </div>


      <footer className="text-center text-xs text-gray-400 py-6">
        © 2026 Ajeitai - Todos os direitos reservados.
      </footer>
    </div>
  )
}
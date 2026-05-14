import React from 'react';
import { 
  Search, Plus, Bell, User, Star, CheckCircle, 
  MapPin, Clock, FileText, MessageSquare 
} from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
      
      {/* 1. HEADER (Início sem fundo) */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-350 mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
              <div className="bg-yellow-400 p-3 rounded-full flex items-center justify-center text-white text-lg font-bold">
                ⚒
              </div>
              <span className="font-bold text-gray-900 text-2xl tracking-tight">Ajeitai</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-medium">
              {/* Início sem fundo azul conforme solicitado */}
              <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors">
                Início
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
                <Search size={16} className="text-gray-400" />
                Buscar Profissionais
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors">
                Meus Pedidos
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl transition-colors">
                Mensagens
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-6 py-3 rounded-2xl flex items-center gap-2.5 transition-colors">
              <div className="bg-gray-950 p-1.5 rounded-full flex items-center justify-center text-white text-xs">
                  <Plus size={14} strokeWidth={3} />
              </div>
              Criar Pedido
            </button>
            <div className="h-8 w-px bg-gray-100"></div>
            <div className="flex items-center gap-4">
              <div className="relative p-1">
                <Bell className="text-gray-400" size={24} />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 bg-green-50 flex items-center justify-center text-green-700/60 overflow-hidden">
                <User size={24} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-6 px-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 mb-4 flex gap-2 ml-2">
          <span>Home</span> / <span>Eletricistas</span> / <span className="text-gray-600">Carlos Silva</span>
        </div>

        {/* 2. BANNER UNIFICADO EM UMA CAIXA */}
        <div className="rounded-3xl shadow-sm border border-gray-100 overflow-hidden bg-white mb-8">
          <div className="relative p-6">
            {/* Degradê de fundo integrado */}
            <div className="absolute inset-x-0 top-0 h-48 w-full bg-linear-to-r from-[#d68a8a] via-[#915c5c] to-[#6b4242] z-0"></div>
            
            <div className="relative flex items-end justify-between mt-32 px-4">
              <div className="flex items-end gap-6">
                <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-linear-to-br from-orange-100 to-rose-200 shadow-md"></div>
                <div className="pb-4">
                  <h1 className="text-2xl font-bold text-gray-900">Carlos Silva</h1>
                  <p className="text-gray-500 flex items-center gap-2 text-sm mt-1">
                    <span className="text-blue-500 font-bold">⚡</span> Eletricista Residencial e Predial
                  </p>
                </div>
              </div>

              {/* Estatísticas com apenas divisores verticais */}
              <div className="flex items-center gap-8 pb-4 pr-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 font-bold text-xl text-gray-800">
                    4,9 <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mt-1">Avaliação</div>
                </div>
                <div className="h-10 w-px bg-gray-100"></div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-800">152</div>
                  <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mt-1">Serviços</div>
                </div>
                <div className="h-10 w-px bg-gray-100"></div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-800">3</div>
                  <div className="text-[10px] uppercase text-gray-400 font-bold tracking-widest mt-1">Anos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. GRID DE CONTEÚDO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Lado Esquerdo: Ações e Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
              <h3 className="font-bold mb-3 text-gray-800">Interessado no serviço?</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Solicite um orçamento sem compromisso. O profissional responderá em até 24h.
              </p>
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 mb-3 transition-all">
                <FileText size={18} /> Solicitar Orçamento
              </button>
              <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all">
                <MessageSquare size={18} /> Enviar Mensagem
              </button>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Identidade Verificada</p>
                    <p className="text-[11px] text-gray-400">Documentação validada pelo Ajeitai.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Localização</p>
                    <p className="text-[11px] text-gray-400">Atende em São Paulo e Região.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-bold text-gray-700">Disponibilidade</p>
                    <p className="text-[11px] text-gray-400">Seg - Sex: 08:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Sobre, Portfólio e AVALIAÇÕES */}
          <div className="md:col-span-8 space-y-6">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex items-center gap-2 mb-4 font-bold text-gray-800">
                <span className="text-yellow-500 text-xl font-bold">👤</span> Sobre mim
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Olá! Sou o Carlos, eletricista credenciado com mais de 10 anos de experiência em instalações elétricas residenciais e comerciais. Especializado em modernização de quadros de distribuição, instalação de iluminação LED e resolução de curto-circuitos.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Instalação Elétrica', 'Manutenção', 'Iluminação', 'Quadros de Luz'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-xs font-medium border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <span className="text-yellow-500 text-xl font-bold">📁</span> Portfólio
                </div>
                <button className="text-xs text-yellow-500 font-bold hover:underline">Ver tudo</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-4/3 rounded-2xl bg-linear-to-br from-orange-200 to-orange-300"></div>
                <div className="aspect-4/3 rounded-2xl bg-linear-to-br from-pink-100 to-pink-200"></div>
                <div className="aspect-4/3 rounded-2xl bg-linear-to-br from-rose-300 to-rose-400"></div>
              </div>
            </section>

            {/* SEÇÃO DE AVALIAÇÕES RESTAURADA */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex items-center gap-2 mb-8 font-bold text-gray-800">
                <span className="text-yellow-500 text-xl font-bold">💬</span> Avaliações de Clientes
              </div>
              
              <div className="space-y-8">
                {/* Mariana Souza */}
                <div className="border-b border-gray-50 pb-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-200"></div>
                      <div>
                        <p className="text-sm font-bold text-gray-700">Mariana Souza</p>
                        <p className="text-[10px] text-gray-400 font-medium">2 dias atrás</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    O Carlos foi super atencioso e resolveu o problema da minha tomada rapidinho. Muito educado e deixou tudo limpo. Recomendo demais!
                  </p>
                </div>

                {/* Roberto Almeida */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100"></div>
                      <div>
                        <p className="text-sm font-bold text-gray-700">Roberto Almeida</p>
                        <p className="text-[10px] text-gray-400 font-medium">1 semana atrás</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Serviço excelente, mas chegou um pouquinho atrasado devido ao trânsito. Mesmo assim, o trabalho técnico foi impecável.
                  </p>
                </div>

                <button className="w-full py-3.5 border border-gray-100 rounded-2xl text-[11px] font-bold text-gray-400 hover:bg-gray-50 transition-all mt-4">
                  Ver mais 48 avaliações
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 border-t pt-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
        <p>© 2024 Ajeitai. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-600">Termos</a>
          <a href="#" className="hover:text-gray-600">Privacidade</a>
          <a href="#" className="hover:text-gray-600">Ajuda</a>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
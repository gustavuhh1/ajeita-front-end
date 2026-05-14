"use client";

import React, { useState, FormEvent } from 'react';
import { 
  Plus, MapPin, Edit2, Trash2, Home, Briefcase, 
  Umbrella, Info, LogOut, Settings, 
  ClipboardList, UserCircle, X, Search 
} from 'lucide-react';

// Importação dos componentes globais
import { MainHeader } from '../components/MainHeader';
import { ProviderAvatar } from '../components/ProviderAvatar';

interface Address {
  id: number;
  type: string;
  isPrimary: boolean;
  street: string;
  neighborhood: string;
  cep: string;
  icon: React.ReactNode;
}

const ProfileAddressesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, type: 'Casa', isPrimary: true, street: 'Rua dos Pinheiros, 450, Ap 12', neighborhood: 'Pinheiros, São Paulo - SP', cep: '05422-000', icon: <Home size={20} /> },
    { id: 2, type: 'Trabalho', isPrimary: false, street: 'Avenida Paulista, 1000, 15º Andar', neighborhood: 'Bela Vista, São Paulo - SP', cep: '01310-100', icon: <Briefcase size={20} /> },
    { id: 3, type: 'Casa de Praia', isPrimary: false, street: 'Rua das Conchas, 15', neighborhood: 'Enseada, Guarujá - SP', cep: '11440-100', icon: <Umbrella size={20} /> }
  ]);

  const [formData, setFormData] = useState({ apelido: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' });

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSaveAddress = (e: FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now(),
      type: formData.apelido || 'Novo Endereço',
      isPrimary: false,
      street: `${formData.rua}, ${formData.numero}`,
      neighborhood: `${formData.bairro}, ${formData.cidade} - ${formData.estado}`,
      cep: formData.cep,
      icon: <MapPin size={20} />
    };
    setAddresses([...addresses, newAddress]);
    setIsModalOpen(false);
    setFormData({ apelido: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* Componente Header Centralizado */}
      <MainHeader />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 p-10 grow w-full">
        
        {/* ASIDE - Usando o ProviderAvatar */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm flex flex-col h-fit sticky top-24">
            <div className="flex items-center gap-4 mb-10">
              <ProviderAvatar name="Ricardo Silva" size="lg" />
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">Ricardo Silva</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Cliente Prime</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {[
                { name: 'Dados Pessoais', icon: <UserCircle size={20} /> },
                { name: 'Meus Pedidos', icon: <ClipboardList size={20} /> },
                { name: 'Endereços', icon: <MapPin size={20} />, active: true },
                { name: 'Segurança', icon: <Settings size={20} /> }
              ].map((item) => (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-3xl font-bold text-sm transition-all relative ${
                    item.active ? 'bg-yellow-50 text-gray-800' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={item.active ? 'text-yellow-500' : ''}>{item.icon}</span>
                  {item.name}
                  {item.active && <div className="absolute left-0 w-1.5 h-6 bg-yellow-400 rounded-r-full" />}
                </button>
              ))}
            </nav>
            
            <div className="mt-10 pt-6 border-t border-gray-50">
              <button className="w-full flex items-center gap-4 px-5 py-3 rounded-2xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all">
                <LogOut size={18} /> Sair da Conta
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Meus Endereços</h2>
              <p className="text-gray-500 text-sm mt-1">Gerencie seus locais de atendimento para pedidos rápidos.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-4 rounded-[24px] flex items-center gap-3 shadow-lg shadow-yellow-100 transition-all active:scale-95">
              <Plus size={20} strokeWidth={3} /> Adicionar Novo
            </button>
          </div>

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-[35px] p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-yellow-200 transition-all">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center ${addr.isPrimary ? 'bg-yellow-400 text-white' : 'bg-gray-50 text-gray-300'}`}>
                    {addr.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-gray-900 text-lg">{addr.type}</h4>
                      {addr.isPrimary && <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Principal</span>}
                    </div>
                    <p className="text-gray-500 text-sm font-medium">{addr.street}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{addr.neighborhood} • CEP: {addr.cep}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-5 py-2.5 border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    <Edit2 size={14} /> Editar
                  </button>
                  <button onClick={() => handleDeleteAddress(addr.id)} className="flex items-center gap-1.5 px-5 py-2.5 border border-rose-50 rounded-2xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors">
                    <Trash2 size={14} /> Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-[30px] p-6 border border-gray-100 flex gap-4 items-center">
            <div className="bg-yellow-400 p-1.5 rounded-full text-white shrink-0"><Info size={14} /></div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Você pode cadastrar até 5 endereços. O marcado como <span className="font-bold text-gray-700">Principal</span> será sugerido automaticamente.
            </p>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-gray-100 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
          <p>© 2026 Ajeitai - Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-800 transition-colors">Termos</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Ajuda</a>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl">
            <div className="px-10 pt-10 pb-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-50 p-2.5 rounded-2xl text-yellow-500"><MapPin size={22} /></div>
                <h2 className="text-2xl font-bold text-gray-900">Novo Endereço</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-gray-500 transition-colors"><X size={28} /></button>
            </div>
            <form onSubmit={handleSaveAddress} className="p-10 pt-2 space-y-6">
              <div className="flex gap-4 items-end">
                <div className="grow">
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">CEP</label>
                  <input required value={formData.cep} onChange={(e) => setFormData({...formData, cep: e.target.value})} type="text" placeholder="00000-000" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium" />
                </div>
                <button type="button" className="px-8 py-4 border-2 border-yellow-400 text-yellow-600 font-bold rounded-2xl flex items-center gap-2 hover:bg-yellow-50 transition-colors">
                  <Search size={18} /> Buscar
                </button>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Logradouro</label>
                <input required value={formData.rua} onChange={(e) => setFormData({...formData, rua: e.target.value})} type="text" placeholder="Rua..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Número</label>
                  <input required value={formData.numero} onChange={(e) => setFormData({...formData, numero: e.target.value})} type="text" placeholder="123" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Complemento</label>
                  <input type="text" placeholder="Opcional" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="grow py-5 text-gray-400 font-bold rounded-2xl hover:bg-gray-50 transition-colors">Cancelar</button>
                <button type="submit" className="grow py-5 bg-yellow-400 text-gray-900 font-bold rounded-[22px] hover:bg-yellow-500 shadow-xl shadow-yellow-100 transition-all">Salvar Endereço</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAddressesPage;
"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Camera, X, CheckCircle2, ChevronLeft, Info, ChevronDown, ListChecks, Home, Plus } from 'lucide-react';
import Image from 'next/image';

// Importação dos componentes globais
import { MainHeader } from '../components/MainHeader';

interface ImageObject {
  file: File;
  preview: string;
}

const CreateOrderPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [images, setImages] = useState<ImageObject[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'eletricista', name: 'Eletricista' },
    { id: 'pintura', name: 'Pintura' },
    { id: 'encanamento', name: 'Encanamento' },
    { id: 'limpeza', name: 'Limpeza' }
  ];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const filesArray = Array.from(selectedFiles);
    
    if (images.length + filesArray.length > 5) {
      alert("Você pode enviar no máximo 5 fotos.");
      return;
    }

    const newImages: ImageObject[] = filesArray.map(file => ({
      file: file,
      preview: window.URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const imageToRemove = images[index];
    if (imageToRemove) {
      window.URL.revokeObjectURL(imageToRemove.preview);
      setImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
        {/* Componente Header Centralizado */}
        <MainHeader activePage="pedidos" />

        <main className="grow flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white rounded-[40px] shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Pedido Criado com Sucesso!</h2>
            
            <p className="text-gray-500 font-medium leading-relaxed mb-10 px-4">
              Seu pedido agora está visível para os profissionais. Você será notificado assim que receber novas propostas.
            </p>

            <div className="flex flex-col gap-4 items-center">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-8 py-4 rounded-3xl flex items-center justify-center gap-2.5 shadow-lg shadow-yellow-100 transition-all active:scale-95">
                <ListChecks size={20} strokeWidth={2.5} />
                Ver Meus Pedidos
              </button>
              
              <button 
                onClick={() => setIsSuccess(false)}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest mt-4"
              >
                <Home size={16} /> Voltar para a Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      {/* Componente Header Centralizado */}
      <MainHeader />

      <main className="max-w-3xl mx-auto w-full p-8 grow">
        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest mb-6 transition-colors">
          <ChevronLeft size={16} /> Voltar para o início
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Criar Novo Pedido</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Preencha os detalhes do problema para encontrar os melhores profissionais.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-10 space-y-8">
          <div className="bg-blue-50/50 border border-blue-100 rounded-[30px] p-6 flex gap-4">
            <div className="bg-blue-500 text-white p-1.5 h-fit rounded-full shadow-sm">
              <Info size={16} />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Como funciona?</h4>
              <p className="text-blue-700/70 text-sm mt-0.5 leading-relaxed">Seu pedido ficará visível para profissionais da região que poderão enviar propostas.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Título do Problema <span className="text-rose-500">*</span></label>
              <input required type="text" placeholder="Ex: Vazamento na pia da cozinha" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Categoria do Serviço <span className="text-rose-500">*</span></label>
              <div className="relative">
                <select 
                  required
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="">Selecione uma categoria...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Descrição Detalhada <span className="text-rose-500">*</span></label>
              <textarea required rows={4} placeholder="Descreva o problema com o máximo de detalhes possível..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:bg-white transition-all font-medium resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Fotos do Problema <span className="text-gray-400 font-medium text-xs">(Máximo 5 fotos)</span></label>
              <div className="flex gap-4">
                <div 
                  onClick={() => images.length < 5 && fileInputRef.current?.click()}
                  className={`w-28 h-28 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${images.length < 5 ? 'border-gray-200 bg-gray-50 cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 text-gray-400' : 'border-gray-100 bg-gray-50 text-gray-200 opacity-50 cursor-not-allowed'}`}
                >
                  <Camera size={24} />
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Adicionar</span>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
                </div>

                {[...Array(4)].map((_, i) => {
                  const img = images[i];
                  return (
                    <div key={i} className="w-28 h-28 rounded-3xl bg-gray-50 border border-gray-100 relative overflow-hidden group">
                      {img ? (
                        <>
                          <Image src={img.preview} alt="Preview" fill className="object-cover" />
                          <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white/90 p-1 rounded-lg text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                            <Plus size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex justify-center">
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold px-12 py-5 rounded-[24px] flex items-center gap-3 shadow-xl shadow-yellow-100 transition-all active:scale-95">
              <CheckCircle2 size={22} /> Publicar Pedido
            </button>
          </div>
        </form>
      </main>

      <footer className="w-full py-8 border-t border-gray-100 bg-white mt-auto text-center">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">
          © 2026 Ajeitai - Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default CreateOrderPage;
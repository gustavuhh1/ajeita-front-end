import React from "react";
import {
  Wrench,
  Paintbrush,
  Sparkles,
  Zap,
  Search,
  FilePlus,
} from "lucide-react";

import "./HomeHero.css";

export default function HomeHero() {
  return (
    <div className="container">

      {/* CARD ESQUERDO */}
      <div className="card-left">

        <div>
          <h1>Olá, Ricardo!</h1>
          <p>
            Encontre o profissional ideal para resolver seu problema hoje mesmo.
          </p>
        </div>

        {/* BUSCA */}
        <div className="search-box">
          <Search size={18} className="icon" />

          <input
            type="text"
            placeholder="Qual serviço você precisa? (ex: Eletricista, Faxina)"
          />

          <button className="btn-yellow">Buscar</button>
        </div>

        {/* CATEGORIAS */}
        <div className="categories">

          <div className="category">
            <div className="circle"><Wrench size={18} /></div>
            Encanador
          </div>

          <div className="category">
            <div className="circle"><Zap size={18} /></div>
            Eletricista
          </div>

          <div className="category">
            <div className="circle"><Paintbrush size={18} /></div>
            Pintor
          </div>

          <div className="category">
            <div className="circle"><Sparkles size={18} /></div>
            Limpeza
          </div>

        </div>

      </div>

      {/* CARD DIREITO */}
      <div className="card-right">

        <div className="right-content">

          <div className="icon-box">
            <FilePlus size={18} />
          </div>

          <div>
            <h2>Não encontrou o que procura?</h2>
            <p>
              Crie um pedido personalizado agora e receba propostas de
              profissionais qualificados em minutos.
            </p>
          </div>

        </div>

        <button className="btn-dark">
          Criar Pedido Agora →
        </button>

      </div>

    </div>
  );
}
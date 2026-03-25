import React from "react";
import {
  Wrench,
  Paintbrush,
  Sparkles,
  Zap,
  Search,
  FilePlus,
  Bell,
  User,
  Plus
} from "lucide-react";

import "./HomeHero.css";

export default function Home() {

  const profissionais = [
    {
      nome: "João Silva",
      servico: "Eletricista Residencial",
      nota: 4.8,
      preco: "R$ 80/h",
      tags: ["Instalação", "Reparos"],
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      nome: "Maria Oliveira",
      servico: "Pintura e Acabamentos",
      nota: 5.0,
      preco: "R$ 150/dia",
      tags: ["Pintura", "Textura"],
      img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      nome: "Ana Costa",
      servico: "Limpeza Profissional",
      nota: 5.0,
      preco: "R$ 180/dia",
      tags: ["Faxina", "Pós-obra"],
      img: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      nome: "Pedro Santos",
      servico: "Marido de Aluguel",
      nota: 4.9,
      preco: "R$ 60/h",
      tags: ["Montagem", "Reparos"],
      img: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      nome: "Carlos Pereira",
      servico: "Encanador",
      nota: 4.7,
      preco: "R$ 120/visita",
      tags: ["Vazamento", "Instalação"],
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <div>
      <div className="header-container">

        <div className="header-left">
          <div className="logo">
            <Wrench size={18} />
          </div>

          <h2>Ajeitai</h2>

          <nav className="menu">
            <span className="active">Início</span>
            <span>Buscar Profissionais</span>
            <span>Meus Pedidos</span>
            <span>Mensagens</span>
          </nav>
        </div>

        <div className="header-right">
          <button className="btn-create">
            <Plus size={16} />
            Criar Pedido
          </button>

          <Bell size={20} className="icon" />

          <div className="avatar">
            <User size={16} />
          </div>
        </div>

      </div>
      <div className="container">

        <div className="card-left">
          <div>
            <h1>Olá, Carlos!</h1>
            <p>
              Encontre o profissional ideal para resolver seu problema hoje mesmo.
            </p>
          </div>

          <div className="search-box">
            <Search size={18} className="icon" />
            <input placeholder="Qual serviço você precisa?" />
            <button className="btn-yellow">Buscar</button>
          </div>

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

        <div className="card-right">
          <div className="right-content">
            <div className="icon-box">
              <FilePlus size={18} />
            </div>

            <div>
              <h2>Não encontrou o que procura?</h2>
              <p>
                Crie um pedido personalizado agora e receba propostas.
              </p>
            </div>
          </div>

          <button className="btn-dark">
            Criar Pedido Agora →
          </button>
        </div>
      </div>
      <div className="profissionais-container">

        <div className="header">
          <div>
            <h2>Profissionais em Destaque</h2>
            <p>Os melhores avaliados na sua região esta semana</p>
          </div>

          <span className="ver-todos">Ver todos →</span>
        </div>

        <div className="cards">
          {profissionais.map((p, index) => (
            <div className="card" key={index}>

              <div className="top">
                <img src={p.img} alt={p.nome} />
                <div>
                  <h3>{p.nome}</h3>
                  <p className="servico">{p.servico}</p>
                  <span>⭐ {p.nota}</span>
                </div>
              </div>

              <div className="tags">
                {p.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <div className="bottom">
                <div>
                  <p className="a-partir">A PARTIR DE</p>
                  <h4>{p.preco}</h4>
                </div>

                <button className="btn-arrow">→</button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
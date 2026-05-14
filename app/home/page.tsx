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
    <>
      <style>{`
        body {
          background: #f4f4f5;
          font-family: Arial, sans-serif;
        }

        .container {
          display: flex;
          gap: 24px;
          padding: 40px;
        }

        .card-left {
          flex: 1;
          background: linear-gradient(to right, #f4f4f5, #fef3c7);
          border-radius: 20px;
          padding: 32px;
        }

        .card-right {
          width: 320px;
          background: #facc15;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 999px;
          padding: 6px 10px;
          margin-top: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px;
        }

        .btn-yellow {
          background: #facc15;
          border: none;
          padding: 10px 18px;
          border-radius: 999px;
          cursor: pointer;
        }

        .categories {
          display: flex;
          gap: 20px;
          margin-top: 24px;
        }

        .category {
          text-align: center;
          font-size: 13px;
          color: #555;
        }

        .circle {
          background: white;
          padding: 12px;
          border-radius: 50%;
          margin-bottom: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }

        .profissionais-container {
          padding: 0 40px 40px 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .cards {
          display: flex;
          gap: 20px;
        }

        .card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          width: 260px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .top img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
        }

        .tags span {
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 10px;
          font-size: 12px;
          margin-right: 6px;
        }

        .bottom {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
        }

        .btn-arrow {
          background: #fde68a;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
        }

        .btn-dark {
          margin-top: 20px;
          background: #0f172a;
          color: white;
          padding: 14px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
        }

        .header-container {
          height: 70px;
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 40px;
          border-bottom: 1px solid #eee;
        }

        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu {
          display: flex;
          gap: 20px;
        }

        .menu span {
          font-size: 14px;
        }

        .menu .active {
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 999px;
        }

        .btn-create {
          background: #facc15;
          border: none;
          padding: 10px 16px;
          border-radius: 999px;
          display: flex;
          gap: 6px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #facc15;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo {
          background: #facc15;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div>
        <div className="header-container">
          <div className="header-left">
            <div className="logo"><Wrench size={18} /></div>
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

            <Bell size={20} />
            <div className="avatar"><User size={16} /></div>
          </div>
        </div>

        <div className="container">
          <div className="card-left">
            <h1>Olá, Carlos!</h1>
            <p>Encontre o profissional ideal para resolver seu problema hoje mesmo.</p>

            <div className="search-box">
              <Search size={18} />
              <input placeholder="Qual serviço você precisa?" />
              <button className="btn-yellow">Buscar</button>
            </div>

            <div className="categories">
              <div className="category"><div className="circle"><Wrench /></div>Encanador</div>
              <div className="category"><div className="circle"><Zap /></div>Eletricista</div>
              <div className="category"><div className="circle"><Paintbrush /></div>Pintor</div>
              <div className="category"><div className="circle"><Sparkles /></div>Limpeza</div>
            </div>
          </div>

          <div className="card-right">
            <div>
              <FilePlus />
              <h3>Não encontrou o que procura?</h3>
              <p>Crie um pedido personalizado.</p>
            </div>

            <button className="btn-dark">Criar Pedido Agora →</button>
          </div>
        </div>

        <div className="profissionais-container">
          <div className="header">
            <h2>Profissionais em Destaque</h2>
          </div>

          <div className="cards">
            {profissionais.map((p, i) => (
              <div className="card" key={i}>
                <div className="top">
                  <img src={p.img} />
                  <div>
                    <h3>{p.nome}</h3>
                    <p>{p.servico}</p>
                    <span>⭐ {p.nota}</span>
                  </div>
                </div>

                <div className="tags">
                  {p.tags.map((t, i) => <span key={i}>{t}</span>)}
                </div>

                <div className="bottom">
                  <h4>{p.preco}</h4>
                  <button className="btn-arrow">→</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useState, useEffect } from "react";
// 1. Importação necessária para navegação
import { useNavigate } from "react-router-dom";
// 2. Importação do SweetAlert2 (Essencial para o popup funcionar)
import Swal from 'sweetalert2';

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import "./Dashboard.css";

// --- Componentes Visuais (Cards) ---

const FigmaCard = ({ title, children, onAccess, className }) => (
  <div className={`figma-card ${className || ''}`}>
    <div className="figma-card-header">
      <h3>{title}</h3>
      {onAccess && <button className="btn-acessar" onClick={onAccess}>ACESSAR</button>}
    </div>
    <div className="figma-card-content">
      {children}
    </div>
  </div>
);

const StatCard = ({ title, value, percentage, type }) => (
  <div className="figma-card stat-card">
    <div className="figma-card-content column-flex">
      <h3>{title}</h3>
      <div className="stat-body">
        <h2 className="stat-value">{value}</h2>
        <div className={`stat-change ${type}`}>
          {type === 'positive' ?
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg> :
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20L12 4M12 20L18 14M12 20L6 14" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          }
        </div>
      </div>
    </div>
  </div>
);

const CommentCarousel = ({ comments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextComment = () => {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
  };

  const prevComment = () => {
    setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  if (!comments || comments.length === 0) return <p className="no-data">Sem comentários ainda.</p>;

  return (
    <div className="comment-carousel">
      <button className="carousel-btn" onClick={prevComment}>‹</button>
      <div className="comment-box">
        <div className="comment-stars">★★★★★★★★★★</div>
        <p>"{comments[currentIndex]}"</p>
      </div>
      <button className="carousel-btn" onClick={nextComment}>›</button>
    </div>
  );
};

// --- Componente Principal ---

export default function Dashboard() {
  const [resumoFeedback, setResumoFeedback] = useState([]);
  const [totalChamados, setTotalChamados] = useState(0);
  const [classificacaoResumo, setClassificacaoResumo] = useState([]);
  const [comentariosList, setComentariosList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook de navegação
  const navigate = useNavigate();

  const COLORS_SENTIMENT = ["#2ecc71", "#95a5a6", "#e74c3c"]; // Verde, Cinza, Vermelho
  const COLORS_FEEDBACK = ["#e74c3c", "#2c3e50"]; // Vermelho, Azul Escuro

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Feedbacks
        const feedbackRes = await fetch("https://localhost:7162/api/Feedback/dashboard");
        const feedbackData = await feedbackRes.json();
        setResumoFeedback([
          { name: "Não Respondidos", value: feedbackData.naoRespondidos || 0 },
          { name: "Respondidos", value: feedbackData.respondidos || 0 },
        ]);

        // 2. Chamados
        const chamadoRes = await fetch("https://localhost:7162/api/Chamado");
        const chamadoData = await chamadoRes.json();
        setTotalChamados(chamadoData.length);

        // 3. Classificação
        const classificacaoRes = await fetch("https://localhost:7162/api/Classificacao");
        const classificacaoData = await classificacaoRes.json();

        let positivos = 0, neutros = 0, negativos = 0;
        const comentarios = [];

        classificacaoData.forEach((c) => {
          const texto = c?.comentario || "";
          if (texto) comentarios.push(texto);

          const textoLower = texto.toLowerCase();
          if (textoLower.includes("positivo")) positivos++;
          else if (textoLower.includes("neutro")) neutros++;
          else if (textoLower.includes("negativo")) negativos++;
        });

        setClassificacaoResumo([
          { name: "Positivos", value: positivos },
          { name: "Neutros", value: neutros },
          { name: "Negativos", value: negativos },
        ]);
        setComentariosList(comentarios.slice(0, 10));

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setResumoFeedback([{ name: "Não Resp.", value: 30 }, { name: "Resp.", value: 70 }]);
        setClassificacaoResumo([{ name: "Pos", value: 10 }, { name: "Neu", value: 5 }, { name: "Neg", value: 2 }]);
        setComentariosList(["O atendimento foi ótimo!", "Demorou um pouco.", "Resolvido."]);
        setTotalChamados(25);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FUNÇÃO CORRIGIDA ---
  const handleNavigate = (filterType, filterValue = null) => {
    let timerInterval;
    
    Swal.fire({
      title: "Listando Chamados!",
      html: "Redirecionando para chamados... <b></b> ms",
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick: false, // Impede clicar fora
      allowEscapeKey: false,    // Impede usar ESC
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          if(timer) timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      // Navega independente do motivo do fechamento (timer ou sistema)
      navigate("/DashListagem", {
        state: { filterType, filterValue }
      });
    });
  };

  const renderLineChart = () => {
    const data = [
      { name: 'Jan', bom: 40, ruim: 24 }, { name: 'Feb', bom: 55, ruim: 35 },
      { name: 'Mar', bom: 60, ruim: 38 }, { name: 'Abr', bom: 80, ruim: 65 },
      { name: 'May', bom: 70, ruim: 98 }, { name: 'Jun', bom: 90, ruim: 85 },
    ];
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
          <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ bottom: 0 }} />
          <Line type="monotone" dataKey="bom" name="Bom" stroke="#2c3e50" strokeWidth={3} dot={{ r: 5, fill: '#2c3e50' }} activeDot={{ r: 7 }} />
          <Line type="monotone" dataKey="ruim" name="Ruim" stroke="#2c3e50" strokeWidth={3} dot={{ r: 5, fill: '#2c3e50' }} activeDot={{ r: 7 }} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderHorizontalBar = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={classificacaoResumo} margin={{ left: 0, right: 30, bottom: 20 }}>
        <CartesianGrid horizontal={false} stroke="#eee" />
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ bottom: 0 }} />
        <Bar dataKey="value" barSize={25} radius={[0, 4, 4, 0]}>
          {classificacaoResumo.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS_SENTIMENT[index % COLORS_SENTIMENT.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderVerticalBar = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={classificacaoResumo} margin={{ top: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: '#f5f5f5' }} />
        <Legend align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ bottom: 0 }} />
        <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={45}>
          {classificacaoResumo.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS_SENTIMENT[index % COLORS_SENTIMENT.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderDonut = () => {
    const total = resumoFeedback.reduce((a, b) => a + b.value, 0);
    const resp = resumoFeedback.find(i => i.name === "Respondidos")?.value || 0;
    const percent = total > 0 ? Math.round((resp / total) * 100) : 0;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={resumoFeedback}
            innerRadius={70} outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {resumoFeedback.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS_FEEDBACK[index % COLORS_FEEDBACK.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
          <text x="46%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="46%" dy="-0.4em" fontSize="28" fontWeight="bold" fill="white">{percent}%</tspan>
            <tspan x="46%" dy="1.5em" fontSize="14" fill="#ccc">Respondidos</tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <Header />

      <div className="dashboard-container">
        {loading ? (
          <div className="loading-container"><p>Carregando dados...</p></div>
        ) : (
          <main className="main-content">
            <div className="dashboard-top-grid">

              <FigmaCard
                title="FEEDBACKS MENSAL"
                onAccess={() => handleNavigate('geral', 'mesAtual')}
              >
                <div className="chart-wrapper">{renderLineChart()}</div>
              </FigmaCard>

              <FigmaCard
                title="AVALIAÇÃO FEEDBACK"
                onAccess={() => handleNavigate('classificacao')}
              >
                <div className="chart-wrapper">{renderHorizontalBar()}</div>
              </FigmaCard>

              <FigmaCard
                title="AVALIAÇÃO FEEDBACK (Histórico)"
                onAccess={() => handleNavigate('classificacao')}
              >
                <div className="chart-wrapper">{renderVerticalBar()}</div>
              </FigmaCard>

              <FigmaCard
                title="FEEDBACK RESPONDIDO"
                onAccess={() => handleNavigate('status', 'respondido')}
              >
                <div className="chart-wrapper donut-wrapper">
                  {renderDonut()}
                  <div className="donut-center-text"><strong>70%</strong></div>
                </div>
              </FigmaCard>
            </div>

            <div className="bottom-section-grid">
              <FigmaCard
                title="ALGUNS COMENTÁRIOS"
                onAccess={() => handleNavigate('todos')}
                className="carousel-card"
              >
                <CommentCarousel comments={comentariosList} />
              </FigmaCard>

              <div className="stats-column">
                <StatCard title="CHAMADOS" value="20%" type="positive" />
                <StatCard title="NÚMERO DE FEEDBACKS" value="20%" type="positive" />
              </div>
            </div>

          </main>
        )}
      </div>
      <Footer />
    </div>
  );
}
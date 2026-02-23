import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../../Components/ConteudoCurso/video";
import "../cursoVideo/Curso.css";

export default function CursoVideo() {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7079/api/Cursos/${idCurso}`)
      .then((response) => {
        console.log("Curso carregado:", response.data);
        setCurso(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar curso:", error);
      });
  }, [idCurso]);

  if (!curso)
    return <p style={{ color: "#fff", textAlign: "center" }}>Carregando...</p>;

  return (
    <main className="backgroundImagem">
      <div className="Janela_CursoInfo">
        <div className="InformaçõeS">
          <div className="Info">
            <h1 className="Cor">{curso.titulo}</h1>
          </div>

          {/* ✅ Usa o campo certo vindo da API */}
          <VideoPlayer videoId={curso.url} />

          <div className="informa">
            <div className="HH4">
              <h4>Sobre esta aula</h4>
            </div>

            <div className="PP">
              <p>{curso.descricao}</p>
            </div>
          </div>

          {/* 🔹 Botão Voltar */}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={() => navigate("/Curso")}
              style={{
                backgroundColor: "#6a0dad",
                color: "white",
                border: "none",
                padding: "10px 25px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#8b26e3")
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6a0dad")}
            >
              ← Voltar para os cursos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

import "./feedbacksclientes.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import logo from "../../assets/ChatGPT Image 23_09_2025, 11_25_31 1.png";
import Bravo from "../../assets/Bravo.png";
import Feliz from "../../assets/Feliz.png";
import Medio from "../../assets/Medio.png";
import api from "../../services/Services.js";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// 🎨 CONFIGURA O TEMA SWEETALERT
const swalTheme = Swal.mixin({
  background: "#EAF0FF",       // azul claro
  color: "#0C1B3A",            // azul escuro
  confirmButtonColor: "#FF7A00", // laranja
  denyButtonColor: "#0C1B3A",
  cancelButtonColor: "#0C1B3A",
  buttonsStyling: true,
  customClass: {
    popup: "swal-custom-popup",
    title: "swal-custom-title",
    htmlContainer: "swal-custom-text",
  },
});

export const FeedbacksClientes = () => {
  const [dashboard, setDashboard] = useState({ satisfeito: 0, neutro: 0, insatisfeito: 0 });
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [searchParams] = useSearchParams();

  const idFromUrl = searchParams.get("idFuncionario");

  const getFuncionarioIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const decoded = jwtDecode(token);
      console.log("Claims do token:", decoded);

      return (
        decoded.IdUsuario ||
        decoded.idUsuario ||
        decoded.Id ||
        decoded.sub ||
        decoded.jti ||
        decoded.Jti ||
        null
      );
    } catch (err) {
      console.warn("Erro ao decodificar token:", err);
      return null;
    }
  };

  const resolveFuncionarioId = () => {
    if (idFromUrl) return idFromUrl;
    const fromToken = getFuncionarioIdFromToken();
    if (fromToken) return fromToken;
    const stored1 = localStorage.getItem("idUsuario");
    if (stored1) return stored1;
    const stored2 = localStorage.getItem("idFuncionario");
    if (stored2) return stored2;
    return null;
  };

  const funcionarioID = resolveFuncionarioId();

  const feedbackMap = {
    Feliz: "satisfeito",
    Medio: "neutro",
    Bravo: "insatisfeito",
  };

  const atualizarDashboard = (feedback) => {
    setDashboard((prev) => ({
      ...prev,
      [feedback]: (prev[feedback] || 0) + 1,
    }));
  };

  const carregarFeedbacks = async () => {
    try {
      const response = await api.get("/Feedback");
      const data = response.data;

      const contagem = { satisfeito: 0, neutro: 0, insatisfeito: 0 };
      data.forEach((f) => {
        if (!f) return;
        const nota = (f.nota || f.Nota || "").toLowerCase();
        if (contagem.hasOwnProperty(nota)) contagem[nota]++;
      });

      setDashboard(contagem);
    } catch (error) {
      console.error("Erro ao carregar feedbacks:", error);
    }
  };

  useEffect(() => {
    carregarFeedbacks();
  }, []);

  const confirmarFeedback = async () => {
    if (!selectedEmoji) {
      swalTheme.fire({
        title: "Selecione um emoji primeiro!",
        icon: "warning",
      });
      return;
    }

    const nota = feedbackMap[selectedEmoji];
    const dataFeedback = new Date().toISOString();
    const resolvedFuncionarioId = resolveFuncionarioId();

    if (!resolvedFuncionarioId) {
      swalTheme.fire({
        title: "Erro: funcionário não identificado",
        text: "Faça login novamente.",
        icon: "error",
      });
      return;
    }

    const payload = {
      Nota: nota,
      FuncionarioID: resolvedFuncionarioId,
      DataFeedback: dataFeedback,
    };

    try {
      const response = await api.post("/Feedback", payload);

      if (response.status === 201 || response.status === 200) {
        swalTheme.fire({
          title: "Obrigado pelo feedback!",
          icon: "success",
        });

        setSelectedEmoji(null);
        atualizarDashboard(nota);
        await carregarFeedbacks();
      } else {
        throw new Error("Resposta inesperada: " + response.status);
      }
    } catch (error) {
      const backendMessage = error?.response?.data || error?.message || "Erro desconhecido";
      swalTheme.fire({
        title: "Erro ao enviar feedback",
        text: String(backendMessage),
        icon: "error",
      });
    }
  };

  return (
    <div className="feedbacks-container">
      <div className="logo-feedbacks-geral"></div>
      <div className="feedbacks-box">
        <img className="Logo-feedbacks" src={logo} alt="Logo" />

        <div className="feedback-area">
          <h3>Deixe Seu Feedback!</h3>

          <div className="emojis">
            <button
              className={`botao-feedback ${selectedEmoji === "Feliz" ? "selecionado" : ""}`}
              onClick={() => setSelectedEmoji("Feliz")}
            >
              <img className="fedcaras" src={Feliz} alt="Feliz" />
            </button>

            <button
              className={`botao-feedback ${selectedEmoji === "Medio" ? "selecionado" : ""}`}
              onClick={() => setSelectedEmoji("Medio")}
            >
              <img className="fedcaras" src={Medio} alt="Médio" />
            </button>

            <button
              className={`botao-feedback ${selectedEmoji === "Bravo" ? "selecionado" : ""}`}
              onClick={() => setSelectedEmoji("Bravo")}
            >
              <img className="fedcaras" src={Bravo} alt="Bravo" />
            </button>
          </div>

          <button className="botao-confirmar" onClick={confirmarFeedback}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

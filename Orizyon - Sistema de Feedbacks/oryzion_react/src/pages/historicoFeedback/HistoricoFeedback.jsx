import React, { useEffect, useState } from "react";
import "./HistoricoFeedback.css";
import Header from "../../components/header/Header";
import BarraPesquisa from "../../components/barraPesquisa/BarraPesquisa";
import CardHistorico from "../../components/cardHistorico/CardHistorico";
import Footer from "../../components/footer/Footer";
import api from "../../Services/services";
import { useNavigate } from "react-router";

const HistoricoFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const naviGate = useNavigate();

  useEffect(() => {
    const carregarFeedbacks = async () => {
      try {
        const resposta = await api.get("/Feedback");
        console.log("Feedbacks recebidos:", resposta.data);
        setFeedbacks(resposta.data || []);
      } catch (erro) {
        console.error("Erro ao buscar feedbacks:", erro);
      }
    };

    carregarFeedbacks();
  }, []);

  return (
    <>
      <Header />
      <BarraPesquisa botaoVoltar="none" />
      <main className="layout_grid HistoricoFeedback">
        <div className="listagens_historico">
          {feedbacks.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Nenhum feedback encontrado
            </p>
          ) : (
            feedbacks.map((f) => (
              <CardHistorico key={f.idFeedback} dados={f} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HistoricoFeedback;

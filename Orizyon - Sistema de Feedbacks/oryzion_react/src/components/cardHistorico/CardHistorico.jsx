import React from "react";
import "./CardHistorico.css";
import imgUsuario from "../../assets/img/Usuario.svg";
import Botao from "../../components/botao/Botao";

const CardHistorico = ({ dados }) => {
  return (
    <div className="listagem_historico">
      <div className="coluna_esquerda">
        <div className="usuario_caracteristicas">
          <img src={imgUsuario} alt="Usuario" />
          <div className="icone_usuario">
            <p>{dados.nomeUsuario || "Nome não informado"}</p>
            <p>{dados.comportamento || "Sem comportamento"}</p>
          </div>
        </div>
      </div>

      <div className="coluna_central">
        <div className="info_bloco">
          <p>Total de feedbacks: {dados.totalFeedbacks || 0}</p>
          <p>Resolvidos: {dados.percentualResolvidos || 0}%</p>
          <p>Pendentes: {dados.percentualPendentes || 0}%</p>
        </div>

        <div className="info_bloco">
          <p>Feedbacks negativos: {dados.negativos || 0}</p>
          <p>Feedbacks positivos: {dados.positivos || 0}</p>
          <p>Feedbacks neutros: {dados.neutros || 0}</p>
        </div>
      </div>

      <div className="comportamento">
        <h4>Últimos comportamentos</h4>
        {dados.ultimosComportamentos && dados.ultimosComportamentos.length > 0 ? (
          dados.ultimosComportamentos.map((c, i) => (
            <p key={i}>
              <b>{c}</b>
            </p>
          ))
        ) : (
          <p>Nenhum comportamento recente</p>
        )}
      </div>

    </div>
  );
};

export default CardHistorico;

import React from 'react'
import voltar_preto from '../../assets/img/voltar_preto.svg'
import './Voltar.css'
import { useNavigate } from "react-router-dom";

function BotaoVoltar() {
  const navigate = useNavigate();

  return (
    <div className="voltar">
        <a onClick={() => navigate(-1)}>
            <img src={voltar_preto}></img>
        </a>
    </div>
  );
}

export default BotaoVoltar;
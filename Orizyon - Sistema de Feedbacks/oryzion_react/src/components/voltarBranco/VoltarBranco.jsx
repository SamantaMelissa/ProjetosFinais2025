import React from 'react'
import voltar_branco from '../../assets/img/voltar.svg'
import { useNavigate } from "react-router-dom";
import './VoltarBranco.css'

const VoltarBranco = () => {
    const navigate = useNavigate();
    return (
        <div className="voltar">
            <a onClick={() => navigate(-1)}>
                <img src={voltar_branco}></img>
            </a>
        </div>
    )
}

export default VoltarBranco
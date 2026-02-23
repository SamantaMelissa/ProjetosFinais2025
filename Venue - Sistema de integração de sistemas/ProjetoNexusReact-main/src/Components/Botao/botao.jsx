import React from 'react';
import "./botao.css";

export const Botao = ({ nomeBotao, onClick }) => {
  return (
    <button className='botao' onClick={onClick}>
      {nomeBotao}
    </button>
  );
};

import "./Botao.css";

export const Botao = ({ nomeBotao }) => {
  return (
    <button className="botao" >
      {nomeBotao}
    </button>
  )
}
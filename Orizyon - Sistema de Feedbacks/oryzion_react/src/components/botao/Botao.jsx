import './Botao.css'

const Botao = (props) => {
  return (
    <button 
      className='botaoGeral' 
      type={props.type || "submit"} // <-- garante que submit é o default
      onClick={props.onClick}       // ainda permite passar onClick se necessário
    >
      {props.nomeBotao}
    </button>
  )
}

export default Botao

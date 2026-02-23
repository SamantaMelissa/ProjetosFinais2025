import "./Botao.css"

const Botao = (props) => {
    return(
        <>
            <button className="botao" type="submit">{props.nomeBotao}</button>
        </>
    )
}

export default Botao;
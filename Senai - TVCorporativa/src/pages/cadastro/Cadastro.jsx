import logo from "../../assets/img/logo.svg"
import Botao from "../../components/botao/Botao";
import Header from "../../components/header/Header";
import "./Cadastro.css"

const Cadastro = () => {
    return (
        <>
            {/* <header className="header_cadastro">
                <img className="logo_cadastro" src={logo} />
            </header> */}
            <Header/>
            <main className="main_cadastro">
                <h1>Cadastro do usuário</h1>
                <form action="">
                    <div className="campo_cadastro">
                        <label htmlFor="">Nome Completo:</label>
                        <input type="text" />
                    </div>
                    <div className="campo_cadastro">
                        <label htmlFor="">Email:</label>
                        <input type="email" />
                    </div>
                    <div className="campo_cadastro">
                        <label htmlFor="">Senha:</label>
                        <input type="password" />
                    </div>
                    <Botao nomeBotao="Cadastrar"/>
                </form>
            </main>


        </>
    )
}

export default Cadastro;
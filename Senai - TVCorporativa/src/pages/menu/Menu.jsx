import Header from "../../components/header/Header"
import "./Menu.css"

import { Link } from "react-router-dom"

const Menu = () => {
    return (
        <>
            <Header />
            <main className="main_menu">
                <Link className="botao_menu" to="/anuncio">Criar anúncio</Link>
                <Link className="botao_menu" to="/cadastroTV">Cadastrar TV</Link>
                <Link className="botao_menu" to="/listagemTV">Visualizar TVs</Link>
                <Link className="botao_menu" to="/">Sair da conta</Link>
            </main>
        </>
    )
}

export default Menu;
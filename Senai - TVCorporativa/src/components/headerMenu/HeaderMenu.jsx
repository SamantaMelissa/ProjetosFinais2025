import "./HeaderMenu.css"

import { Link } from "react-router-dom"


import logo from "../../assets/img/logo.svg"

const HeaderMenu = () => {

    return (
        <>
            <header className="header_menu">
                <img className="logo_header_menu" src={logo} />

                <nav className="nav_header_menu">
                    <Link to="/anuncio"> Criar anúncio</Link>
                    <Link to="/cadastroTV"> Cadastrar TV</Link>
                    <Link to="/listagemTV"> Visualizar TVs</Link>
                </nav>
            </header>

        </>
    )
}

export default HeaderMenu;
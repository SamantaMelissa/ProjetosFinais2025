import React from "react";
import Logo from "../../assets/img/Logo.svg";
import Perfil from "../../assets/img/IconUsuario.png";
import Lupa from "../../assets/img/Lupa.svg";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-nav">
        {/* Logo */}
        <div className="div-img">
          <img src={Logo} alt="Logo do ValueWork" />
        </div>

        {/* Barra de pesquisa */}
        <div className="barradepesquisa">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="pesquisar"
          />
        </div>

        {/* Menu desktop */}
        <nav className="menu-desktop">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Ferramentas</a></li>
            <li><a href="#">Cursos</a></li>
            <li className="Usuario"><a href="#">Usuário</a></li>
          </ul>

          <img src={Perfil} alt="Foto do usuário" />
        </nav>
      </div>
    </header>
  );
};

export default Header;

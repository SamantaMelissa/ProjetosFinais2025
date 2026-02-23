import React, { useState } from 'react';
import './Header.css';
import Logo from '../../assets/img/loguinho.png'
import Suporte from '../../assets/img/IconSuporte.svg';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

const Header = (props) => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("PATH ATUAL:", location.pathname);
  const toggleMenu = () => setMenuAtivo(!menuAtivo);

  // Variáveis de Checagem de Rota (Retornando o Dashboard)
  const estaNoDashboard = location.pathname === "/dashboard";
  const estaNoCadastroEquipe = location.pathname === "/cadastroequipe";
  const estaNaListaChamados = location.pathname === "/listagemchamado";
  const estaNaListaFeedbacks = location.pathname === "/listagemfeedback";
  const estaNaTelaInicial = location.pathname === "/";
  const path = location.pathname.toLowerCase();
  const estaNaTelaInicialEspecifica = path === "/telainicial";
  // NOVO: Variável de checagem para a página de chat
  const estaNoChat = location.pathname === "/chat";

  // 1. Ocultar todos os links nas telas: /, /telainicial E /chat
  if (path === "/" || path === "/telainicial" || path === "/chat") {
    return (
      <header>
        <nav className='layout_grid header_header'>
          <div className='logo_header'>
            <img src={Logo} alt="Logo Oryzion" />
          </div>

          <div className='header_pefil'>
            <h3 className='usuario'>
              {usuario?.nome ? usuario.nome : "Clara"}
            </h3>
            <img src={Suporte} alt="Ícone de perfil" />
          </div>
        </nav>
      </header>
    );
  }


  return (
    <header>
      <nav className='layout_grid header_header'>
        <div className='logo_header'>
          <img src={Logo} alt="Logo Oryzion" />
          
                  <div className={`mobile_menu ${menuAtivo ? 'active' : ''}`} onClick={toggleMenu}>
          <div className='line1'></div>
          <div className='line2'></div>
          <div className='line3'></div>
        </div>

        <ul className={`nav_list ${menuAtivo ? 'active' : ''}`} style={props.link_header}>
          {estaNoDashboard ? (
            <>
              {!estaNoCadastroEquipe && (
                <li>
                  <Link className='link_header' to="/cadastroequipe">
                    Cadastro Equipe
                  </Link>
                </li>
              )}
            </>
          ) : (
            <>
              {!estaNaListaChamados && (
                <li>
                  <Link className='link_header' to="/listagemchamado">
                    Listagem Chamado
                  </Link>
                </li>
              )}
              {!estaNaListaFeedbacks && (
                <li>
                  <Link className='link_header' to="/listagemfeedback">
                    Listagem Feedback
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
        
        </div>

        <div className='header_pefil'>
          <h3 className='usuario'>
            {usuario?.nome ? usuario.nome : "Clara"}
          </h3>
          <img src={Suporte} alt="Ícone de perfil" />
        </div>

        
      </nav>
    </header>
  );
};

export default Header;
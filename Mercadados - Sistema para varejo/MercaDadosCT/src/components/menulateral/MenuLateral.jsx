import "./MenuLateral.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import iconeCasa from "../../assets/casa.png";
import iconeSair from "../../assets/Vector.png";
import { useAuth } from "../../pages/contexts/authContexts";
import { useState } from "react";

export const MenuLateral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    fecharMenu();
  };

  return (
    <>
      {!menuAberto && (
        <div className="icone-hamburguer" onClick={alternarMenu}>
          <div className="linha"></div>
          <div className="linha"></div>
          <div className="linha"></div>
        </div>
      )}

      {menuAberto && <div className="overlay" onClick={fecharMenu}></div>}

      <aside className={`menu-lateral ${menuAberto ? "ativo" : ""}`}>
        <Link to="/Home" onClick={fecharMenu}>
          <img className="CASA" src={iconeCasa} alt="Início" />
        </Link>

        <nav>
          <ul>
            <li>
              <Link
                to="/Home"
                className={location.pathname === "/Home" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Gerenciamento
              </Link>
            </li>

            <li>
              <Link
                to="/Fornecedores"
                className={location.pathname === "/Fornecedores" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Fornecedor
              </Link>
            </li>

            <li>
              <Link
                to="/GestaoEstoque"
                className={location.pathname === "/GestaoEstoque" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Estoque
              </Link>
            </li>

            <li>
              <Link
                to="/LucrosGastos"
                className={location.pathname === "/LucrosGastos" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Lucro e Gastos
              </Link>
            </li>

            <li>
              <Link
                to="/AdmFuncionario"
                className={location.pathname === "/AdmFuncionario" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Administração
              </Link>
            </li>

            <li>
              <Link
                to="/CadastroUsuario"
                className={location.pathname === "/CadastroUsuario" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Cadastro novo
              </Link>
            </li>

            <li>
              <Link
                to="/CadastroProduto"
                className={location.pathname === "/CadastroProduto" ? "ativo" : ""}
                onClick={fecharMenu}
              >
                Produto
              </Link>
            </li>
          </ul>
        </nav>

        <button className="sair" onClick={handleLogout}>
          <img src={iconeSair} alt="Sair" />
          <span>Sair da conta</span>
        </button>
      </aside>
    </>
  );
};

import "./menunormal.css";
import iconeUsuario from "../../assets/perfil.png";
import { Link } from "react-router-dom";

export const MenuNormal = () => {
  return (
    <header className="top-header">
      <div className="icons-header">
        <Link to="/Perfil">
          <img src={iconeUsuario} className="Usuario-perfil" alt="Usuário" />
        </Link>
      </div>
    </header>
  );
};

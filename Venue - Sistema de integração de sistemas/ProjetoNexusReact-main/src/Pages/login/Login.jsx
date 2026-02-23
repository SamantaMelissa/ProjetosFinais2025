import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import api from "../../Services/services";
import ".././login/Login.css";
import loginImage from "../../assets/img/ImgLogin.png";
import logoo from "../../assets/img/ChatGPT_logo.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function realizarAutenticacao(e) {
    e.preventDefault();

    if (!email || !senha) {
      return Swal.fire("Erro!", "Preencha email e senha.", "warning");
    }

    try {
      const resposta = await api.post("/Login", {
        email: email,
        password: senha,
      });

      
      secureLocalStorage.setItem("tokenLogin", resposta.data.token);

      Swal.fire({
        icon: "success",
        title: "Login realizado!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/Perfil"); 
    } catch (error) {
      Swal.fire("Erro!", "Email ou senha incorretos.", "error");
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-box">
          <img src={logoo} alt="Logo" className="logo-img" />
          <p className="subtitle">Acesse sua conta!</p>
          <hr className="divider" />
        </div>

        <form className="login-form" onSubmit={realizarAutenticacao}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="fulano@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>

      <div className="login-right">
        <img src={loginImage} alt="Login visual" className="side-image" />
      </div>
    </div>
  );
};

export default Login;

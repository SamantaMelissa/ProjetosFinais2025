import "./cadastroAdmin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Botao } from "../../components/botao/Botao.jsx";
import Swal from "sweetalert2";
import api from "../../services/Services.js";
import iconeCasa from "../../assets/casa.png";

export const CadastroAdmin = () => {
  const [usuario, setUsuario] = useState({
    nomeUsuario: "",
    email: "",
    senha: "",
    numero: "",
    cpf: "",
  });

  const apenasDigitos = (str = "") => (str ? str.replace(/\D/g, "") : "");

  const formatPhone = (digits) => {
    if (!digits) return "";
    const d = digits.replace(/\D/g, "");
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6, 10)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
  };

  const formatCpfCnpj = (digits) => {
    if (!digits) return "";
    const d = digits.replace(/\D/g, "");

    if (d.length <= 11) {
      const p1 = d.slice(0, 3);
      const p2 = d.slice(3, 6);
      const p3 = d.slice(6, 9);
      const p4 = d.slice(9, 11);
      let out = "";
      if (p1) out += p1;
      if (p2) out += "." + p2;
      if (p3) out += "." + p3;
      if (p4) out += "-" + p4;
      return out;
    } else {
      const p1 = d.slice(0, 2);
      const p2 = d.slice(2, 5);
      const p3 = d.slice(5, 8);
      const p4 = d.slice(8, 12);
      const p5 = d.slice(12, 14);
      let out = "";
      if (p1) out += p1;
      if (p2) out += "." + p2;
      if (p3) out += "." + p3;
      if (p4) out += "/" + p4;
      if (p5) out += "-" + p5;
      return out;
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "numero") {
      const digits = apenasDigitos(value).slice(0, 11);
      setUsuario({ ...usuario, numero: formatPhone(digits) });
      return;
    }

    if (name === "cpf") {
      const digits = apenasDigitos(value).slice(0, 14);
      setUsuario({ ...usuario, cpf: formatCpfCnpj(digits) });
      return;
    }

    setUsuario({ ...usuario, [name]: value });
  }

  async function cadastrarAdmin(e) {
    e.preventDefault();

    try {
      const usuarioFormatado = {
        nomeUsuario: usuario.nomeUsuario,
        email: usuario.email,
        senha: usuario.senha,
        numero: apenasDigitos(usuario.numero),
        cpf: apenasDigitos(usuario.cpf),
        tipoUsuarioID: "3a36f691-f24a-4861-887f-e16aa3693a35",
      };

      const resposta = await api.post("Usuario", usuarioFormatado);

      Swal.fire({
        icon: "success",
        title: "Administrador cadastrado!",
        text: `Nome: ${resposta.data.nomeUsuario}`,
        confirmButtonColor: "#1b2d68", // azul escuro
        color: "#1b2d68",
      });

      setUsuario({
        nomeUsuario: "",
        email: "",
        senha: "",
        numero: "",
        cpf: "",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar!",
        text: error.response?.data?.message || "Não foi possível realizar o cadastro.",
        confirmButtonColor: "#bfcaf5", // azul claro
        color: "#1b2d68",
      });
    }
  }

  return (
    <div className="cadastro-admin-page">

      <div className="conteudo-principal">
        <div className="menu-lateral-retangulo">
          <Link to="/">
            <img src={iconeCasa} alt="Logo" />
          </Link>
        </div>

        <main className="formulario-box">
          <h2>Cadastro de Administrador</h2>

          <form className="formulario-grid" onSubmit={cadastrarAdmin}>
            <input
              type="text"
              name="nomeUsuario"
              placeholder="Nome completo"
              value={usuario.nomeUsuario}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={usuario.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={usuario.senha}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="numero"
              placeholder="(11) 92345-4744"
              value={usuario.numero}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="cpf"
              placeholder="123.123.123-45 ou CNPJ"
              value={usuario.cpf}
              onChange={handleChange}
              required
            />

            <div className="botao-container">
              <Botao nomeBotao="Cadastrar Administrador" tipo="submit" />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

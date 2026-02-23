import "./Perfil.css";
import { MenuLateral } from "../../components/menulateral/MenuLateral";
import { MenuNormal } from "../../components/menunormal/menunormal";
import iconeUsuario from "../../assets/perfil.png";
import { useAuth } from "../contexts/authContexts";
import { useEffect, useState } from "react";
import api from "../../services/Services";

export const Perfil = () => {
  const { usuario, token } = useAuth();
  const [dados, setDados] = useState(null);

useEffect(() => {
  const carregarUsuario = async () => {
    if (!usuario || !token) return;

    const id = usuario.usuarioId;

    if (!id) return;

    try {
      const resposta = await api.get(`/Usuario/BuscarPorId/${id}`);
      console.log("Resposta da API:", resposta.data);
      setDados(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  carregarUsuario();
}, [usuario, token]);



  // 👉 Função para formatar CPF ou CNPJ
  const formatarCpfCnpj = (valor) => {
    if (!valor) return "";
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return apenasNumeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  };

  // 👉 Função para formatar telefone
  const formatarTelefone = (valor) => {
    if (!valor) return "";
    const apenasNumeros = valor.replace(/\D/g, "");
    return apenasNumeros
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

  if (!dados) {
    return <p style={{ margin: "50px", fontSize: "18px" }}>Carregando perfil...</p>;
  }

  return (
    <div className="container-geral-admfuncionario">
      <MenuLateral />
      <div className="conteudo-principal-perfil">
        <MenuNormal />
        <main className="Perfil-Logo">
          <div className="perfil-header">
            <img className="Logo-perfil" src={iconeUsuario} alt="Usuário" />
            <div className="perfil-info">
              <h2>{dados.nomeUsuario}</h2>
              <p>{dados.tipoUsuario?.tituloTipoUsuario || "Usuário"}</p>
            </div>
          </div>

          <div className="perfil-dados">
            <div className="campo-perfil">
              <label>Nome completo</label>
              <input type="text" value={dados.nomeUsuario || ""} readOnly />
            </div>

            <div className="campo-perfil">
              <label>Email</label>
              <input type="email" value={dados.email || ""} readOnly />
            </div>

            <div className="campo-perfil">
              <label>Telefone</label>
              <input type="text" value={formatarTelefone(dados.numero)} readOnly />
            </div>

            <div className="campo-perfil">
              <label>CPF/CNPJ</label>
              <input type="text" value={formatarCpfCnpj(dados.cpf)} readOnly />
            </div>

            <div className="campo-perfil">
              <label>Função</label>
              <input
                type="text"
                value={dados.tipoUsuario?.tituloTipoUsuario || ""}
                readOnly
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

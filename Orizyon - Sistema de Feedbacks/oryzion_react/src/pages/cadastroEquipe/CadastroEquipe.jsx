import React, { useState } from "react";
import "./CadastroEquipe.css";
import Botao from "../../components/botao/Botao";
import VoltarBranco from "../../components/voltarBranco/VoltarBranco";
import api from "../../Services/services";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const CadastroEquipe = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [idTipoUsuario, setIdTipoUsuario] = useState(
    "2da48799-bc03-4314-a7a6-a872a20a8be1"
  );

  function alertar(icone, mensagem) {
    Swal.fire({
      icon: icone,
      text: mensagem,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  async function cadastroEquipe(e) {
    e.preventDefault();

    const usuario = { nome, email, senha, idTipoUsuario };

    try {
      const respostaUsuario = await api.post("Usuario", usuario);

      if (respostaUsuario.status === 201) {
        const usuarioCriado = respostaUsuario.data;
        const idUsuario = usuarioCriado.idUsuario || usuarioCriado.id;

        const suporte = { idUsuario };
        await api.post("Suporte", suporte);

        alertar("success", "Suporte cadastrado com sucesso!");

        setNome("");
        setEmail("");
        setSenha("");
        setIdTipoUsuario("2da48799-bc03-4314-a7a6-a872a20a8be1");
      } else {
        alertar("warning", "Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alertar("error", "Erro ao fazer o cadastro.");
    }
  }

  return (
    <div className="cadastro_container">
      <div className="cadastro_form_box">
        <div className="cadastro_voltar">
          <VoltarBranco />
        </div>

        <form className="cadastro_form" onSubmit={cadastroEquipe}>
          <h2 className="cadastro_titulo">
            <span>Cadastro</span>
            <strong>Equipe</strong>
          </h2>

          <div className="cadastro_campo">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="cadastro_campo">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite o e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="cadastro_campo">
            <label>Senha</label>

            <div className="cadastro_senha_container">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite a senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <span
                className="cadastro_icone_olho"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="cadastro_botao">
            <Botao className="botaoGeral" nomeBotao="Cadastrar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroEquipe;

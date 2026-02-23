import "./cadastrousuario.css";
import { useState } from "react";
import { MenuLateral } from "../../components/menulateral/MenuLateral.jsx";
import { MenuNormal } from "../../components/menunormal/menunormal.jsx";
import { Botao } from "../../components/botao/Botao.jsx";
import Swal from "sweetalert2";
import api from "../../services/Services.js";

// 🎨 SweetAlert com tema padrão do sistema
const swalTheme = Swal.mixin({
  background: "#EAF0FF",     
  color: "#0C1B3A",          
  confirmButtonColor: "#FF7A00",
  denyButtonColor: "#0C1B3A",
  cancelButtonColor: "#0C1B3A",
  buttonsStyling: true,
  customClass: {
    popup: "swal-custom-popup",
    title: "swal-custom-title",
    htmlContainer: "swal-custom-text",
  }
});

export const CadastroUsuario = () => {
  const [funcionario, setFuncionario] = useState({
    nome: "",
    dataNascimento: "",
    genero: "",
    cpfCnpj: "",
    email: "",
    endereco: "",
    senha: "",
    cidade: "",
    telefone: "",
    complemento: "",
  });

  const apenasDigitos = (str = "") => str.replace(/\D/g, "");

  // 📞 Máscara de Telefone
  const formatPhone = (digits) => {
    const d = apenasDigitos(digits).slice(0, 11);
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
  };

  // 🧾 Máscara CPF/CNPJ
  const formatCpfCnpj = (digits) => {
    const d = apenasDigitos(digits).slice(0, 14);

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
    }

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
  };

  // 📌 CEP + ViaCEP (Cidade/Estado/CEP)
  const handleCidadeComCep = async (value) => {
    let digits = apenasDigitos(value).slice(-8);

    let cepMask = digits;
    if (cepMask.length > 5) cepMask = cepMask.slice(0, 5) + "-" + cepMask.slice(5);

    setFuncionario((old) => ({
      ...old,
      cidade: value.replace(/\d{5}-?\d{0,3}$/, cepMask),
    }));

    if (digits.length !== 8) return;

    try {
      const r = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await r.json();

      if (data.erro) return;

      const final = `${data.localidade}, ${data.uf}, ${cepMask}`;

      setFuncionario((old) => ({
        ...old,
        cidade: final,
      }));
    } catch (e) {
      console.error("Erro ao buscar CEP:", e);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "telefone") {
      return setFuncionario({
        ...funcionario,
        telefone: formatPhone(value),
      });
    }

    if (name === "cpfCnpj") {
      return setFuncionario({
        ...funcionario,
        cpfCnpj: formatCpfCnpj(value),
      });
    }

    if (name === "cidade") {
      return handleCidadeComCep(value);
    }

    setFuncionario({ ...funcionario, [name]: value });
  }

  async function cadastrarFuncionario(e) {
    e.preventDefault();

    try {
      const funcionarioFormatado = {
        dataNascimento: funcionario.dataNascimento,
        nomeFuncionario: funcionario.nome,
        email: funcionario.email,
        senha: funcionario.senha,
        genero: funcionario.genero,
        ruaENumero: funcionario.endereco,
        CidadeEstadoCEP: funcionario.cidade,
        complemento: funcionario.complemento,
        numero: apenasDigitos(funcionario.telefone),
        cpf: apenasDigitos(funcionario.cpfCnpj),
        fotoPerfil: "",
        usuario: {
          usuarioID: "00000000-0000-0000-0000-000000000000",
          nomeUsuario: funcionario.nome,
          email: funcionario.email,
          senha: funcionario.senha,
          tipoUsuarioID: "00000000-0000-0000-0000-000000000000",
          tipoUsuario: {
            tipoUsuarioID: "00000000-0000-0000-0000-000000000000",
            tituloTipoUsuario: "Funcionario",
          },
          numero: apenasDigitos(funcionario.telefone),
          cpf: apenasDigitos(funcionario.cpfCnpj),
        },
      };

      const resposta = await api.post("Funcionario", funcionarioFormatado);

      swalTheme.fire({
        icon: "success",
        title: "Funcionário cadastrado com sucesso!",
        text: `Nome: ${resposta.data.nomeFuncionario}`,
      });

      setFuncionario({
        nome: "",
        dataNascimento: "",
        genero: "",
        cpfCnpj: "",
        email: "",
        endereco: "",
        senha: "",
        cidade: "",
        telefone: "",
        complemento: "",
      });
    } catch (error) {
      swalTheme.fire({
        icon: "error",
        title: "Erro ao cadastrar!",
        text:
          error.response?.data?.message ||
          "Não foi possível realizar o cadastro.",
      });
    }
  }

  return (
    <div className="container-geral">
      <MenuLateral />
      <div className="conteudo-principal">
        <MenuNormal />

        <main className="formulario-box">
          <h2>Cadastro de Funcionário</h2>

          <form className="formulario-grid" onSubmit={cadastrarFuncionario}>
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={funcionario.nome}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="dataNascimento"
              value={funcionario.dataNascimento}
              onChange={handleChange}
              required
            />

            <select
              name="genero"
              value={funcionario.genero}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecione o gênero
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Prefiro não dizer">Prefiro não dizer</option>
            </select>

            <input
              type="text"
              name="cpfCnpj"
              placeholder="CPF ou CNPJ"
              value={funcionario.cpfCnpj}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={funcionario.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="endereco"
              placeholder="Rua/Avenida, número"
              value={funcionario.endereco}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="cidade"
              placeholder="Cidade, Estado, CEP"
              value={funcionario.cidade}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="telefone"
              placeholder="(11) 91234-5678"
              value={funcionario.telefone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              value={funcionario.complemento}
              onChange={handleChange}
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={funcionario.senha}
              onChange={handleChange}
              required
            />

            <div className="botao-container">
              <Botao nomeBotao="Cadastrar Funcionário" tipo="submit" />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

import "./cadastroProduto.css";
import imagemCaixa from "../../assets/caixa.svg";
import Swal from "sweetalert2";
import api from "../../services/Services.js";
import { MenuLateral } from "../../components/menulateral/MenuLateral.jsx";
import { Botao } from "../../components/botao/Botao.jsx";
import { MenuNormal } from "../../components/menunormal/menunormal.jsx";
import { useState, useEffect } from "react";

// 🎨 Tema SweetAlert (azul escuro, azul claro e laranja)
const swalTheme = Swal.mixin({
  background: "#EAF0FF",
  color: "#0C1B3A",
  confirmButtonColor: "#FF7A00",
  cancelButtonColor: "#0C1B3A",
  denyButtonColor: "#0C1B3A",
  buttonsStyling: true,
  customClass: {
    popup: "swal-custom-popup",
    title: "swal-custom-title",
    htmlContainer: "swal-custom-text",
  },
});

export const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    Nome: "",
    Valor: "",
    Validade: "",
    Peso: "",
    Setor: "",
    Fornecedor: "",
    Imagem: null,
  });

  const [setoresDisponiveis, setSetoresDisponiveis] = useState([]);
  const [carregandoSetores, setCarregandoSetores] = useState(true);

  useEffect(() => {
    const buscarSetores = async () => {
      try {
        const resposta = await api.get("/Estoque");
        const setores = Array.isArray(resposta.data)
          ? resposta.data.map((item) => item.setor)
          : [];
        setSetoresDisponiveis(setores);
      } catch (erro) {
        console.error("❌ Erro ao buscar setores:", erro);
        swalTheme.fire({
          icon: "error",
          title: "Erro ao carregar setores",
          text: "Não foi possível listar os setores disponíveis.",
        });
      } finally {
        setCarregandoSetores(false);
      }
    };
    buscarSetores();
  }, []);

  // Atualizar formulário (campo de Valor agora normal)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "Imagem") {
      setProduto({ ...produto, Imagem: files[0] });
      return;
    }

    setProduto({ ...produto, [name]: value });
  };

  // Função de cadastro
  const cadastrarProduto = async (e) => {
    e.preventDefault();

    if (!produto.Imagem) {
      return swalTheme.fire({
        icon: "warning",
        title: "Imagem obrigatória",
        text: "Selecione uma imagem para o produto.",
      });
    }

    try {
      const formData = new FormData();
      formData.append("Nome", produto.Nome);
      formData.append("Valor", produto.Valor); // valor normal, sem máscara
      formData.append("NumeroProduto", Math.floor(Math.random() * 100000));
      formData.append("Validade", produto.Validade);
      formData.append("Peso", produto.Peso);
      formData.append("Setor", produto.Setor);
      formData.append("Fornecedor", produto.Fornecedor || "Fornecedor Padrão");
      formData.append("Imagem", produto.Imagem.name);
      formData.append("imagem", produto.Imagem);

      const resposta = await api.post("/Produtos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      swalTheme.fire({
        icon: "success",
        title: "Produto cadastrado com sucesso!",
        text: `Produto: ${resposta.data.nome}`,
      });

      setProduto({
        Nome: "",
        Valor: "",
        Validade: "",
        Peso: "",
        Setor: "",
        Fornecedor: "",
        Imagem: null,
      });
    } catch (erro) {
      console.error("❌ Erro ao cadastrar produto:", erro);
      swalTheme.fire({
        icon: "error",
        title: "Erro ao cadastrar produto",
        text: erro.response?.data?.message || "Não foi possível realizar o cadastro.",
      });
    }
  };

  return (
    <div className="container-geral">
      <MenuLateral />
      <div className="conteudo-principal">
        <MenuNormal />

        <main className="formulario-box-produtos">
          <h2>Cadastro de Produtos</h2>

          <div className="descricao-produto">
            <img src={imagemCaixa} alt="Produto" className="img-produto" />
            <div className="descricao-texto">
              <strong>Descrição:</strong>
              <p>Preencha os campos abaixo para cadastrar um novo produto no sistema.</p>
            </div>
          </div>

          <form className="formulario-grid" onSubmit={cadastrarProduto}>
            <input
              type="text"
              name="Nome"
              placeholder="Nome do Produto"
              value={produto.Nome}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="Valor"
              placeholder="Valor (ex: 21.90)"
              value={produto.Valor}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="Validade"
              placeholder="Validade"
              value={produto.Validade}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="Peso"
              placeholder="Peso (ex: 100ml)"
              value={produto.Peso}
              onChange={handleChange}
              required
            />

            <select
              name="Setor"
              value={produto.Setor}
              onChange={handleChange}
              disabled={carregandoSetores}
              required
            >
              <option value="">
                {carregandoSetores ? "Carregando setores..." : "Selecione um Setor"}
              </option>

              {setoresDisponiveis.map((setor, index) => (
                <option key={index} value={setor}>
                  {setor}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="Fornecedor"
              placeholder="Fornecedor"
              value={produto.Fornecedor}
              onChange={handleChange}
              required
            />

            <input type="file" name="Imagem" onChange={handleChange} required />

            <div className="botao-box">
              <Botao nomeBotao="Cadastrar Produto" tipo="submit" />
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

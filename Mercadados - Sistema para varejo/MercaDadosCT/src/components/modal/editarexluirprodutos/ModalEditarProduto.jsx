import "./modalEditarProduto.css";
import Swal from "sweetalert2";
import api from "../../services/Services.js";
import { useEffect, useState } from "react";

const swalTheme = Swal.mixin({
  background: "#EAF0FF",
  color: "#0C1B3A",
  confirmButtonColor: "#FF7A00",
  cancelButtonColor: "#0C1B3A",
  buttonsStyling: true,
  customClass: {
    popup: "swal-custom-popup",
    title: "swal-custom-title",
    htmlContainer: "swal-custom-text",
  },
});

export const ModalEditarProduto = ({ produtoSelecionado, fechar, atualizarLista }) => {
  const [produto, setProduto] = useState({
    Nome: "",
    Valor: "",
    Validade: "",
    Peso: "",
    Setor: "",
    Fornecedor: "",
  });

  useEffect(() => {
    if (produtoSelecionado) {
      setProduto({
        Nome: produtoSelecionado.nome,
        Valor: produtoSelecionado.valor,
        Validade: produtoSelecionado.validade?.slice(0, 10),
        Peso: produtoSelecionado.peso,
        Setor: produtoSelecionado.setor,
        Fornecedor: produtoSelecionado.fornecedor,
      });
    }
  }, [produtoSelecionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const salvarEdicao = async (e) => {
    e.preventDefault();

    try {
      const envio = {
        produtoID: produtoSelecionado.produtoID,
        nome: produto.Nome,
        valor: parseFloat(produto.Valor),
        validade: produto.Validade,
        peso: produto.Peso,
        setor: produto.Setor,
        fornecedor: produto.Fornecedor,
        imagem: produtoSelecionado.imagem,
      };

      await api.put(`/Produtos/${produtoSelecionado.produtoID}`, envio);

      swalTheme.fire({
        icon: "success",
        title: "Produto atualizado!",
        text: "As informações foram salvas com sucesso.",
      });

      atualizarLista();
      fechar();
    } catch (erro) {
      console.error(erro);
      swalTheme.fire({
        icon: "error",
        title: "Erro ao atualizar",
        text: erro.response?.data || "Não foi possível atualizar o produto.",
      });
    }
  };

  return (
    <div className="modal-editar-bg">
      <div className="modal-editar-conteudo">
        <h2>Editar Produto</h2>

        <form onSubmit={salvarEdicao} className="form-editar-grid">

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
            placeholder="Valor"
            value={produto.Valor}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="Validade"
            value={produto.Validade}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Peso"
            placeholder="Peso"
            value={produto.Peso}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Setor"
            placeholder="Setor"
            value={produto.Setor}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="Fornecedor"
            placeholder="Fornecedor"
            value={produto.Fornecedor}
            onChange={handleChange}
            required
          />

          <div className="botoes-editar">
            <button type="button" className="btn-cancelar" onClick={fechar}>
              Cancelar
            </button>

            <button type="submit" className="btn-salvar">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

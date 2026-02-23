import "./gestaoestoque.css";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { MenuLateral } from "../../components/menulateral/MenuLateral";
import { MenuNormal } from "../../components/menunormal/menunormal.jsx";
import friosIcon from "../../assets/Frios.png";
import bebidasIcon from "../../assets/bebidas.png";
import hortifruitIcon from "../../assets/Hortifruit.png";
import merceariaIcon from "../../assets/Mercearia.png";
import padariaIcon from "../../assets/Padaria.png";
import prolimIcon from "../../assets/limpeza.png";
import api from "../../services/Services.js";
import Swal from "sweetalert2";

/* =====================================================================
      MODAL EDITAR
===================================================================== */
const ModalEditar = ({ produto, fechar, atualizar }) => {
  const [form, setForm] = useState({
    nome: "",
    valor: "",
    validade: "",
    peso: "",
    setor: "",
    fornecedor: "",
  });

  const [setoresDisponiveis, setSetoresDisponiveis] = useState([]);
  const [carregandoSetores, setCarregandoSetores] = useState(true);

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const resposta = await api.get("/Estoque");
        const setores = Array.isArray(resposta.data)
          ? resposta.data.map((item) => item.setor)
          : [];
        setSetoresDisponiveis(setores);
      } catch (err) {
        console.error("Erro ao listar setores", err);
      } finally {
        setCarregandoSetores(false);
      }
    };
    carregarSetores();
  }, []);

  useEffect(() => {
    if (produto) {
      setForm({
        nome: produto.nome,
        valor: produto.valor,
        validade: produto.validade?.slice(0, 10),
        peso: produto.peso,
        setor: produto.setor,
        fornecedor: produto.fornecedor,
      });
    }
  }, [produto]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const salvar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("produtoID", produto.produtoID);
      formData.append("nome", form.nome);
      formData.append("valor", parseFloat(form.valor));
      formData.append("validade", form.validade);
      formData.append("peso", form.peso);
      formData.append("setor", form.setor);
      formData.append("fornecedor", form.fornecedor);
      formData.append("imagem", produto.imagem ?? "");

      await api.put(`/Produtos/${produto.produtoID}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Sucesso", "Produto atualizado!", "success");
      atualizar();
      fechar();
    } catch (err) {
      console.error(err);
      Swal.fire("Erro", "Não foi possível atualizar", "error");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>Editar Produto</h2>
        <form onSubmit={salvar} className="modal-form">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="valor"
            placeholder="Valor"
            value={form.valor}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="validade"
            value={form.validade}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="peso"
            placeholder="Peso"
            value={form.peso}
            onChange={handleChange}
            required
          />
          <select
            name="setor"
            value={form.setor}
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
            name="fornecedor"
            placeholder="Fornecedor"
            value={form.fornecedor}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="button" className="cancelar" onClick={fechar}>
              Cancelar
            </button>
            <button type="submit" className="salvar">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =====================================================================
      TELA PRINCIPAL
===================================================================== */
export const GestaoEstoque = () => {
  const [listaProduto, setListaProduto] = useState([]);
  const [listaCategoria, setListaCategoria] = useState([]);
  const [listaVenda, setListaVenda] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const [produtoEditar, setProdutoEditar] = useState(null);

  const [state, setState] = useState({
    series: [{ name: "Quantidade Vendida", data: [] }],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: { type: "x", enabled: true, autoScaleYaxis: true },
        toolbar: { autoSelected: "zoom" },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      title: { text: "Quantidade Vendida por Data de Venda", align: "left" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: { formatter: (val) => val.toFixed(0) },
        title: { text: "Quantidade Vendida" },
      },
      xaxis: {
        type: "datetime",
        title: { text: "Data da Venda" },
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MM/yyyy",
            day: "dd/MM",
          },
        },
      },
      tooltip: {
        shared: false,
        x: { format: "dd/MM/yyyy" },
        y: { formatter: (val) => `${val.toFixed(0)} unidades` },
      },
    },
  });

  // 🔹 Listar Vendas
  const listarVenda = async () => {
    try {
      const resVendas = await api.get("Venda/Listar");
      const vendas = resVendas.data || [];

      const somaPorData = {};
      vendas.forEach((v) => {
        if (v.dataVenda) {
          const dia = new Date(v.dataVenda).toISOString().split("T")[0];
          somaPorData[dia] = (somaPorData[dia] || 0) + (v.quantidade || 0);
        }
      });

      const dadosGrafico = Object.entries(somaPorData)
        .map(([data, quantidade]) => ({
          x: new Date(data).getTime(),
          y: quantidade,
        }))
        .sort((a, b) => a.x - b.x);

      setState((prev) => ({
        ...prev,
        series: [{ name: "Total Vendido", data: dadosGrafico }],
      }));
    } catch (err) {
      console.error("❌ Erro ao buscar vendas:", err);
    }
  };

  // 🔹 Listar Produtos
  const listarProdutos = async () => {
    try {
      const res = await api.get("Produtos");
      setListaProduto(res.data);
    } catch (err) {
      console.error("❌ Erro ao buscar Produtos:", err);
    }
  };

  // 🔹 Listar Categorias
  const listarCategoria = async () => {
    try {
      const res = await api.get("EstoqueProdutos");
      setListaCategoria(res.data);
    } catch (err) {
      console.error("❌ Erro ao buscar Categorias:", err);
    }
  };

  // 🔹 Excluir Produto
  const excluirProduto = async (id) => {
    const confirm = await Swal.fire({
      title: "Excluir?",
      text: "Deseja realmente excluir?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/Produtos/${id}`);
      Swal.fire("Excluído", "Produto removido!", "success");
      listarProdutos();
    } catch (err) {
      Swal.fire("Erro", "Não foi possível excluir", "error");
    }
  };

  // 🔹 Carrossel scroll
  useEffect(() => {
    listarVenda();
    listarProdutos();
    listarCategoria();

    const carrossel = document.getElementById("carrossel");
    const btnPrev = document.querySelector(".carrossel-btn.prev");
    const btnNext = document.querySelector(".carrossel-btn.next");

    if (!carrossel || !btnPrev || !btnNext) return;

    const scrollRight = () =>
      carrossel.scrollBy({ left: 200, behavior: "smooth" });
    const scrollLeft = () =>
      carrossel.scrollBy({ left: -200, behavior: "smooth" });

    btnNext.addEventListener("click", scrollRight);
    btnPrev.addEventListener("click", scrollLeft);

    return () => {
      btnNext.removeEventListener("click", scrollRight);
      btnPrev.removeEventListener("click", scrollLeft);
    };
  }, []);

  // 🔹 Produtos filtrados
  const produtosFiltrados =
    setorSelecionado && setorSelecionado !== "Mostrar Todos"
      ? listaProduto.filter(
          (produto) =>
            produto.setor &&
            produto.setor.toLowerCase() === setorSelecionado.toLowerCase()
        )
      : listaProduto;

  return (
    <div className="container-geral-gestaoestoque">
      <MenuLateral />
      <div className="conteudo-principal">
        <MenuNormal />
        <main className="gestaoestoque-box">
          <h2>Gestão de Estoque</h2>

          {/* Gráfico */}
          <div className="grafico-container">
            <div className="grafico-box">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height={350}
              />
            </div>
          </div>

          {/* Carrossel */}
          <div className="carrossel-container">
            <button className="carrossel-btn prev">&#10094;</button>
            <div className="categorias-box" id="carrossel">
              <div
                className={`categoria-item ${
                  setorSelecionado === "Frios" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Frios")}
              >
                <img src={friosIcon} alt="Frios" />
                <p>Frios</p>
              </div>
              <div
                className={`categoria-item ${
                  setorSelecionado === "Bebidas" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Bebidas")}
              >
                <img src={bebidasIcon} alt="Bebidas" />
                <p>Bebidas</p>
              </div>
              <div
                className={`categoria-item ${
                  setorSelecionado === "Hortifruit" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Hortifruit")}
              >
                <img src={hortifruitIcon} alt="Hortifruit" />
                <p>Hortifruit</p>
              </div>
              <div
                className={`categoria-item ${
                  setorSelecionado === "Mercearia" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Mercearia")}
              >
                <img src={merceariaIcon} alt="Mercearia" />
                <p>Mercearia</p>
              </div>
              <div
                className={`categoria-item ${
                  setorSelecionado === "Padaria" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Padaria")}
              >
                <img src={padariaIcon} alt="Padaria" />
                <p>Padaria</p>
              </div>
              <div
                className={`categoria-item ${
                  setorSelecionado === "Limpeza" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Limpeza")}
              >
                <img src={prolimIcon} alt="Limpeza" />
                <p>Limpeza</p>
              </div>
              <div
                className={`categoria-item ${
                  setorSelecionado === "Mostrar Todos" ? "ativo" : ""
                }`}
                onClick={() => setSetorSelecionado("Mostrar Todos")}
              >
                <div className="mostrar-todos-icone">🛒</div>
                <p>Mostrar Todos</p>
              </div>
            </div>
            <button className="carrossel-btn next">&#10095;</button>
          </div>

          {/* Listagem Produtos */}
          <div className="listagem-produtos">
            <h4 className="produtos-h4">
              Produtos{" "}
              {setorSelecionado && setorSelecionado !== "Mostrar Todos"
                ? `- ${setorSelecionado}`
                : ""}
            </h4>

            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto, index) => {
                const caminhoImagem =
                  produto.caminhoImagem ||
                  produto.imagem ||
                  produto.urlImagem ||
                  "";
                const imagemFinal = caminhoImagem
                  ? `https://localhost:7067/${caminhoImagem.replace(
                      "wwwroot/",
                      ""
                    )}`
                  : "";

                return (
                  <div className="produto-card" key={index}>
                    <img
                      className="produto-img"
                      src={imagemFinal}
                      alt={produto.nome || "Produto"}
                    />
                    <div className="produto-info">
                      <p>
                        <strong>Descrição:</strong>
                      </p>
                      <p>Produto: {produto.nome}</p>
                      <p>Peso: {produto.peso}</p>
                      <p>Valor: R$ {produto.valor}</p>
                      <p>
                        Validade:{" "}
                        {new Date(produto.validade).toLocaleDateString("pt-BR")}
                      </p>
                      <p>Setor: {produto.setor}</p>
                    </div>
                    <div className="botoes-crud">
                      <button
                        className="bt-editar"
                        onClick={() => setProdutoEditar(produto)}
                      >
                        Editar
                      </button>
                      <button
                        className="bt-excluir"
                        onClick={() => excluirProduto(produto.produtoID)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Nenhum produto encontrado...</p>
            )}
          </div>
        </main>
      </div>

      {produtoEditar && (
        <ModalEditar
          produto={produtoEditar}
          fechar={() => setProdutoEditar(null)}
          atualizar={listarProdutos}
        />
      )}
    </div>
  );
};

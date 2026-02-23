// ===============================
// 📄 LeituraProdutos.jsx (FINAL)
// ===============================

import React, { useState, useEffect } from "react";
import { MenuNormal } from "../../components/menunormal/menunormal";
import { Modal } from "../../components/modal/Modal";
import setaVoltar from "../../assets/setaVoltar.png";
import pix from "../../assets/pix.png";
import cartaoCredito from "../../assets/cartaoCredito.png";
import cartaoDebito from "../../assets/cartaoDebito.png";
import vr from "../../assets/vr.png";
import dinheiro from "../../assets/dinheiro.png";
import check from "../../assets/ok.png";
import api from "../../services/Services";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import "./LeituraProdutos.css";

export const LeituraProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [listaVenda, setListaVenda] = useState([]);
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carregar produtos
  useEffect(() => {
    const listarProdutos = async () => {
      try {
        const res = await api.get("/Produtos");
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };
    listarProdutos();
  }, []);

  const produtosFiltrados = busca
    ? produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()))
    : [];

  const adicionarProduto = (produto) => {
    const existe = listaVenda.find((p) => p.produtoID === produto.produtoID);

    if (existe) {
      setListaVenda((prev) =>
        prev.map((p) =>
          p.produtoID === produto.produtoID
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        )
      );
    } else {
      setListaVenda((prev) => [
        ...prev,
        { ...produto, quantidade: 1 },
      ]);
    }
    setBusca("");
  };

  const removerProduto = (produtoID) => {
    setListaVenda((prev) => prev.filter((p) => p.produtoID !== produtoID));
  };

  const totalVenda = listaVenda.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );

  const handleContinuar = () => {
    if (listaVenda.length === 0) {
      Swal.fire({
        title: "Atenção",
        text: "Adicione ao menos um produto.",
        icon: "warning",
        confirmButtonColor: "#F97316",
        background: "#DEE5FA",
      });
      return;
    }
    setMostrarPagamento(true);
  };

  const handleConfirmarPagamento = () => {
    setMostrarPagamento(false);
    setMostrarConfirmacao(true);
  };

  // ============================
  // 🔥 Cadastrar venda (funcionando)
  // ============================
  const cadastrarVenda = async () => {
    setLoading(true);

    try {
      for (const item of listaVenda) {
        const vendaPayload = {
          vendaID: uuidv4(),
          valor: Number(item.valor),
          quantidade: Number(item.quantidade),

          // 🔥 NOME CORRETO DA FK
          produtoID: item.produtoID,

          // ❌ Não envia DataVenda — BACK coloca DateTime.Now
        };

        await api.post("/Venda", vendaPayload);
      }

      Swal.fire({
        title: "Sucesso!",
        text: "Venda cadastrada com sucesso!",
        icon: "success",
        confirmButtonColor: "#F97316",
        background: "#DEE5FA",
      });

      setListaVenda([]);
      setMostrarConfirmacao(false);

    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      Swal.fire({
        title: "Erro",
        text: "Erro ao cadastrar venda!",
        icon: "error",
        confirmButtonColor: "#F97316",
        background: "#DEE5FA",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leitura-container">
      <MenuNormal />

      <div className="fundo-azul">
        <div className="conteudo">

          {/* BUSCA DE PRODUTOS */}
          <div className="produtos">
            <h6 className="h6">Buscar Produtos:</h6>
            <input
              className="input-busca"
              type="text"
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            {busca && produtosFiltrados.length > 0 && (
              <div className="resultado-busca">
                {produtosFiltrados.map((produto) => {
                  const imgSrc = produto.imagem
                    ? `https://localhost:7067/${produto.imagem}`
                    : "";

                  return (
                    <div
                      key={produto.produtoID}
                      className="item-busca"
                      onClick={() => adicionarProduto(produto)}
                    >
                      {imgSrc && <img src={imgSrc} alt={produto.nome} />}
                      <span>{produto.nome}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* LISTA */}
          <div className="tabela">
            <h2 className="titulo">Registro Atual</h2>

            <div className="tabela-listagem">
              <table className="tabela-dados">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Preço</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {listaVenda.map((item) => {
                    const imgSrc = item.imagem
                      ? `https://localhost:7067/${item.imagem}`
                      : "";

                    return (
                      <tr key={item.produtoID}>
                        <td>
                          {imgSrc && (
                            <img
                              className="produto-pequena-img"
                              src={imgSrc}
                              alt=""
                            />
                          )}
                          {item.nome}
                        </td>

                        <td>{item.quantidade}</td>
                        <td>R$ {item.valor.toFixed(2)}</td>
                        <td>R$ {(item.valor * item.quantidade).toFixed(2)}</td>

                        <td>
                          <button
                            className="botao-lixeira"
                            onClick={() => removerProduto(item.produtoID)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="resumo">
              <span>Total:</span>
              <span className="total">
                R$ {totalVenda.toFixed(2)}
              </span>
            </div>

            <button className="botao_leitura" onClick={handleContinuar}>
              Continuar
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PAGAMENTO */}
      {mostrarPagamento && (
        <Modal onClose={() => setMostrarPagamento(false)}>
          <div className="modal-pagamento">
            <img
              src={setaVoltar}
              className="seta-voltar"
              onClick={() => setMostrarPagamento(false)}
            />

            <h2>Forma de Pagamento</h2>

            <div className="opcoes-pagamento">
              <img src={pix} alt="pix" />
              <img src={cartaoCredito} alt="credito" />
              <img src={cartaoDebito} alt="debito" />
              <img src={vr} alt="vr" />
              <img src={dinheiro} alt="dinheiro" />
            </div>

            <button className="botao-confirmar" onClick={handleConfirmarPagamento}>
              Confirmar
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL CONFIRMAÇÃO */}
      {mostrarConfirmacao && (
        <Modal onClose={() => setMostrarConfirmacao(false)}>
          <div className="modal-confirmacao">
            <h2>Confirmar Venda?</h2>

            <img src={check} className="check-icon" />

            <p>Total da compra: R$ {totalVenda.toFixed(2)}</p>

            <button
              className="botao-voltar"
              onClick={cadastrarVenda}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Confirmar Venda"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LeituraProdutos;

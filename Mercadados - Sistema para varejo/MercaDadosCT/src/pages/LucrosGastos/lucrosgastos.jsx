import "./lucrosgastos.css";
import ReactApexChart from "react-apexcharts";
import { MenuLateral } from "../../components/menulateral/MenuLateral.jsx";
import { MenuNormal } from "../../components/menunormal/menunormal.jsx";
import { useState, useEffect } from "react";
import api from "../../services/Services.js";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const LucrosGastos = () => {
  const [lucros, setLucros] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const carregarDados = async () => {
    try {
      const vendasResp = await api.get("/Venda/Listar");
      const itens = vendasResp.data || [];

      const grupo = {};
      itens.forEach(item => {
        if (!grupo[item.vendaID]) {
          grupo[item.vendaID] = {
            id: item.vendaID,
            dataVenda: item.dataVenda,
            produtos: [],
            valorTotal: 0
          };
        }

        grupo[item.vendaID].produtos.push({
          produtoID: item.produtoID,
          nome: item.produtos?.nome || "Produto sem nome",
          quantidade: item.quantidade,
          valor: item.valor
        });

        grupo[item.vendaID].valorTotal += item.valor;
      });

      const vendasAgrupadas = Object.values(grupo);

      setVendas(vendasAgrupadas);
      setCategorias(vendasAgrupadas.map((v, i) => `Venda ${i + 1}`));
      setLucros(vendasAgrupadas.map(v => v.valorTotal));

      // Gerar gastos fictícios (ex: 20% do valor total da venda)
      const gastosFicticios = vendasAgrupadas.map(v => parseFloat((v.valorTotal * 0.2).toFixed(2)));
      setGastos(gastosFicticios);

    } catch (error) {
      console.error("Erro ao carregar dados de lucro/gasto:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleClickVenda = (index) => {
    const venda = vendas[index];
    if (venda) {
      setVendaSelecionada(venda);
      setModalAberto(true);
    }
  };
const graficoLucros = {
  series: [{ name: "Lucros", data: lucros }],
  options: {
    chart: {
      type: "bar",
      height: 300,
      events: {
        dataPointSelection: (event, chartContext, { dataPointIndex }) => {
          handleClickVenda(dataPointIndex);
        },
      },
      toolbar: { show: true },
    },
    xaxis: {
      categories: categorias, // <-- aqui estava errado
      labels: { style: { colors: "#333", fontSize: "13px" } },
    },
    plotOptions: { bar: { borderRadius: 6, distributed: true, columnWidth: "16%" } },
    colors: ["#00E396"],
    dataLabels: { enabled: true },
    yaxis: { title: { text: "Valor (R$)" } },
    tooltip: { y: { formatter: (val) => `R$ ${val.toFixed(2)}` } },
  },
};

const graficoGastos = {
  series: [{ name: "Gastos", data: gastos }],
  options: {
    chart: { type: "line", height: 250 },
    xaxis: { categories: categorias }, // <-- aqui também
    colors: ["#FF4560"],
    stroke: { curve: "smooth", width: 3 },
    dataLabels: { enabled: true },
    yaxis: { title: { text: "Valor (R$)" } },
  },
};


  return (
    <div className="container-geral-lucroegastos">
      <MenuLateral />
      <div className="conteudo-principal">
        <MenuNormal />
        <main className="lucroegastos-box">
          <h2>Lucros e Gastos</h2>

          <div className="grafico-container">
            <div className="grafico-box">
              <h4>Lucros (por venda)</h4>
              <ReactApexChart
                options={graficoLucros.options}
                series={graficoLucros.series}
                type="bar"
                height={300}
              />
            </div>

            <div className="grafico-box">
              <h4>Gastos</h4>
              <ReactApexChart
                options={graficoGastos.options}
                series={graficoGastos.series}
                type="line"
                height={250}
              />
            </div>
          </div>

          {/* MODAL DETALHES */}
          <Modal
            isOpen={modalAberto}
            onRequestClose={() => setModalAberto(false)}
            className="modal-detalhes"
            overlayClassName="modal-overlay"
          >
            {vendaSelecionada ? (
              <div>
                <h2>Detalhes da Venda</h2>
                <p><strong>Valor total:</strong> R$ {vendaSelecionada.valorTotal.toFixed(2)}</p>
                <p><strong>Data:</strong> {new Date(vendaSelecionada.dataVenda).toLocaleString()}</p>

                <h3>Produtos:</h3>
                <table className="tabela-produtos">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendaSelecionada.produtos && vendaSelecionada.produtos.length > 0 ? (
                      vendaSelecionada.produtos.map((p, i) => (
                        <tr key={i}>
                          <td>{p.nome}</td>
                          <td>{p.quantidade}</td>
                          <td>{p.valor.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">Nenhum produto registrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <button onClick={() => setModalAberto(false)} className="btn-fechar-modal">
                  Fechar
                </button>
              </div>
            ) : (
              <p>Carregando detalhes...</p>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
};

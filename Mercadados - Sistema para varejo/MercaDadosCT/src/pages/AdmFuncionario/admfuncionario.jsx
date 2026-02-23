import "./AdmFuncionario.css";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Swal from "sweetalert2";
import { MenuLateral } from "../../components/menulateral/MenuLateral.jsx";
import { MenuNormal } from "../../components/menunormal/menunormal.jsx";
import perfilazul from "../../assets/perfilazul.svg";
import api from "../../services/Services.js";

export const AdmFuncionario = () => {
  const [listaFuncionario, setListaFuncionario] = useState([]);
  const [funcAberto, setFuncAberto] = useState(null);
  const [listaVenda, setListaVenda] = useState([]);
  const [listaFeed, setListaFeed] = useState([]);

  const toggleFuncionario = (index) => {
    setFuncAberto(funcAberto === index ? null : index);
  };

  // 📡 Buscas API
  const listarFuncionario = async () => {
    try {
      const res = await api.get("Funcionario");
      setListaFuncionario(res.data);
    } catch (err) {
      console.error("❌ Erro ao buscar funcionários:", err);
    }
  };

  const listarVenda = async () => {
    try {
      const res = await api.get("Venda/Listar");
      setListaVenda(res.data);
    } catch (err) {
      console.error("❌ Erro ao buscar vendas:", err);
    }
  };

  const listarFeedback = async () => {
    try {
      const res = await api.get("Feedback");
      setListaFeed(res.data);
    } catch (err) {
      console.error("❌ Erro ao buscar feedbacks:", err);
    }
  };

  useEffect(() => {
    listarFuncionario();
    listarVenda();
    listarFeedback();
  }, []);

  // 🗑 Excluir funcionário
  const excluirFuncionario = async (idFunc) => {
    Swal.fire({
      title: "Deseja realmente descartar  este funcionário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, descartar ",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`Funcionario/${idFunc}`);
          Swal.fire("Excluído!", "Funcionário excluído com sucesso.", "success");
          listarFuncionario(); // Atualiza a lista
        } catch (err) {
          Swal.fire("Erro!", "Não foi possível excluir.", "error");
        }
      }
    });
  };

  return (
    <div className="container-geral-admfuncionario">
      <MenuLateral />
      <div className="conteudo-principal">
        <MenuNormal />

        <main className="funcionario-box">
          <h2>Gestão de funcionários:</h2>

          <div className="lista-funcionarios">
            {listaFuncionario.length === 0 && (
              <p className="nenhum-funcionario">Nenhum funcionário encontrado.</p>
            )}

            {listaFuncionario.map((f, index) => {
              const idFunc = f.funcionarioID || f.idFuncionario || f.id;

              const feedbacksFuncionario = listaFeed.filter(
                (fb) => String(fb.funcionarioID) === String(idFunc)
              );

              const vendasFuncionario = listaVenda.filter(
                (v) => !v.funcionarioID || String(v.funcionarioID) === String(idFunc)
              );

              const vendasPorMes = Array.from({ length: 12 }, (_, i) => {
                const mes = i + 1;
                return vendasFuncionario
                  .filter((v) => new Date(v.dataVenda).getMonth() + 1 === mes)
                  .reduce((acc, v) => acc + (v.quantidade || 0), 0);
              });

              const graficoBarrasFuncionario = {
                series: [{ name: "Vendas", data: vendasPorMes }],
                options: {
                  chart: { type: "bar", height: 250 },
                  plotOptions: {
                    bar: { borderRadius: 10, dataLabels: { position: "top" } },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: (val) => val,
                    offsetY: -20,
                    style: { fontSize: "12px", colors: ["#304758"] },
                  },
                  xaxis: {
                    categories: [
                      "Jan","Fev","Mar","Abr","Mai","Jun",
                      "Jul","Ago","Set","Out","Nov","Dez"
                    ],
                  },
                  yaxis: { title: { text: "Quantidade de Vendas" } },
                  tooltip: { y: { formatter: (val) => `${val} vendas` } },
                },
              };

              const graficoPizzaFuncionario = {
                options: {
                  chart: { type: "pie", width: 380 },
                  labels: ["Satisfeito", "Neutro", "Insatisfeito"],
                  colors: ["#337DFF", "#FFC043", "#FF5A5F"],
                  legend: { position: "bottom" },
                },
                series: [
                  feedbacksFuncionario.filter((fb) => fb.nota?.toLowerCase() === "satisfeito").length,
                  feedbacksFuncionario.filter((fb) => fb.nota?.toLowerCase() === "neutro").length,
                  feedbacksFuncionario.filter((fb) => fb.nota?.toLowerCase() === "insatisfeito").length,
                ],
              };

              return (
                <div key={index} className="item-funcionario-wrapper">
                  <div
                    className="item-funcionario"
                    onClick={() => toggleFuncionario(index)}
                  >
                    <div className="info-funcionario">
                      <img
                        src={
                          f.fotoPerfil
                            ? `https://localhost:7115${
                                f.fotoPerfil.startsWith("/") ? f.fotoPerfil : `/${f.fotoPerfil}`
                              }`
                            : perfilazul
                        }
                        alt={f.nomeFuncionario}
                        className="foto-funcionario"
                        onError={(e) => (e.target.src = perfilazul)}
                      />
                      <p>{f.nomeFuncionario}</p>
                    </div>
                    <span className={`seta ${funcAberto === index ? "aberto" : ""}`}>
                      {funcAberto === index ? "˄" : "˅"}
                    </span>
                  </div>

                  {funcAberto === index && (
                    <div className="detalhes-funcionario-transicao aberto">
                      <div className="detalhes-funcionario">
                        <div className="header-funcionario-expandido">
                          <div>
                            <strong>{f.nomeFuncionario}</strong>
                            <span className="funcao">
                              Função: {f.funcao || "Caixa de Vendas"}
                            </span>
                          </div>
                          <button
                            className="btn-excluir-funcionario"
                            onClick={() => excluirFuncionario(idFunc)}
                          >
                            Descartar 
                          </button>
                        </div>

                        <div className="graficos-funcionario">
                          <div className="grafico-barra-placeholder">
                            {graficoBarrasFuncionario.series[0].data.some((v) => v > 0) ? (
                              <ReactApexChart
                                options={graficoBarrasFuncionario.options}
                                series={graficoBarrasFuncionario.series}
                                type="bar"
                                height={230}
                                width={370}
                              />
                            ) : (
                              <p>Sem vendas cadastradas.</p>
                            )}
                          </div>

                          <div className="grafico-pizza-placeholder">
                            {graficoPizzaFuncionario.series.some((n) => n > 0) ? (
                              <ReactApexChart
                                options={graficoPizzaFuncionario.options}
                                series={graficoPizzaFuncionario.series}
                                type="pie"
                                width={350}
                              />
                            ) : (
                              <p>Sem feedbacks cadastrados.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

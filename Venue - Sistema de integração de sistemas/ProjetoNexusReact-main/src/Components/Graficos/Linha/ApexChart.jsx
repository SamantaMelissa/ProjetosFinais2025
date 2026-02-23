import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./linha.css";

export default function AcessosVideosChart() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7079/api/AcessosVideos/estatisticas")
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) =>
        console.error("Erro ao carregar estatísticas de acessos:", error)
      );
  }, []);

  // 🔹 Exemplo: se sua API retorna { curso: "IA Descomplicada", totalAcessos: 12 }
  const nomesCursos = dados.map((item) => item.curso);
  const totalAcessos = dados.map((item) => item.totalAcessos);

  const options = {
    chart: {
      id: "acessos-videos",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#9B51E0"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: nomesCursos,
      labels: { style: { colors: "#fff" } },
    },
    yaxis: { labels: { style: { colors: "#fff" } } },
    grid: {
      borderColor: "#2b1544",
      strokeDashArray: 5,
    },
    tooltip: { theme: "dark" },
  };

  const series = [
    {
      name: "Total de Acessos",
      data: totalAcessos,
    },
  ];

  return (
    <div className="linha-container">
      <h3 className="titulo-linha">Acessos Gerais por Curso</h3>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
}

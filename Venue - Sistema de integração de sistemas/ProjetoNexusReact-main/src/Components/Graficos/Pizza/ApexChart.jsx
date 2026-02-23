import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import api from "../../../Services/services"; 
import "../Pizza/ApexChart.css";

export default function ApexChart() {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get("/Acessos/estatisticas");
        const data = response.data;

        // extrai os nomes das ferramentas como labels
        setLabels(data.map(item => item.nomeFerramenta));

        // extrai os acessos (soma se tiver múltiplos dias)
        setSeries(data.map(item => item.acessos.reduce((a,b) => a+b, 0)));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLabels(["Erro"]);
        setSeries([1]);
      }
    };

    fetchDados();
  }, []);
  
  const options = {
    chart: {
      type: "donut",
      width: "100%",
      background: "transparent",
      toolbar: { show: false },
    },
    labels: labels,
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
    dataLabels: {
      enabled: true,
      style: { fontSize: "14px", colors: ["#fff"] },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["rgba(255,255,255,0.3)"], // borda clara ao redor do donut
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: { colors: "#333" },
      markers: { width: 12, height: 12, radius: 6 },
      formatter: function(val, opts) {
        return val + ": " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    tooltip: {
      y: { formatter: val => val + " acessos" },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: { width: 350 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="grafico-card-modern">
      <ReactApexChart options={options} series={series} type="donut" height={409} width="1000" />
    </div>
  );
}

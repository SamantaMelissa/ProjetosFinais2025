import { MenuLateral } from "../../components/menulateral/MenuLateral";
import "./fornecedores.css";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import nestleLogo from "../../assets/nestle.avif";
import cocacolaLogo from "../../assets/cocacolaa.jpg";
import unileverLogo from "../../assets/univerogo.png";
import duracellLogo from "../../assets/duracell.png"; // 🔥 voltou

import { MenuNormal } from "../../components/menunormal/menunormal";
import api from "../../services/Services.js";

export const Fornecedores = () => {
  const fornecedores = [
    { nome: "Nestlé", logo: nestleLogo },
    { nome: "Coca-Cola", logo: cocacolaLogo },
    { nome: "Unilever", logo: unileverLogo },
    { nome: "Duracell", logo: duracellLogo }, // 🔥 voltou aqui
  ];

  const [mapasPorFornecedor, setMapasPorFornecedor] = useState({});

  const baseOpcoesGrafico = {
    chart: { type: "bar", height: 220 },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "60%" } },
    dataLabels: { enabled: true },
    yaxis: { title: { text: "Quantidade Vendida" } },
    tooltip: { y: { formatter: (val) => `${val} unidades` } },
  };

  const criarMapaPorFornecedor = async (fornecedorNome) => {
    try {
      const [resVendas, resProdutos] = await Promise.all([
        api.get("Venda/Listar"),
        api.get("Produtos"),
      ]);

      const vendas = resVendas.data || [];
      const produtos = resProdutos.data || [];

      // 🔵 Filtrar produtos do fornecedor
      const produtosDoFornecedor = produtos.filter((p) => {
        const nomeFornecedor =
          p.Fornecedor ||
          p.fornecedor ||
          p.nomeFornecedor ||
          p.fornecedorNome;

        return (
          nomeFornecedor &&
          nomeFornecedor.toString().toLowerCase() === fornecedorNome.toLowerCase()
        );
      });

      if (produtosDoFornecedor.length === 0) return {};

      // 🔵 Criar mapa produtoID → nomeProduto
      const mapaProdutoNome = {};
      produtosDoFornecedor.forEach((p) => {
        const pid = p.produtoID || p.ProdutoID || p.idProduto;
        const nome = p.nome || p.Nome || p.nomeProduto;
        if (pid && nome) mapaProdutoNome[pid] = nome;
      });

      // 🔵 produto → { mesAno → quantidade }
      const mapaVendasPorProduto = {};

      vendas.forEach((v) => {
        const produtoID = v.produtoID || v.ProdutoID;
        const nomeProduto = mapaProdutoNome[produtoID];
        if (!nomeProduto) return;

        const quantidade = v.quantidade || v.Quantidade || 1;

        // 🔵 Usando a data da venda (correto!)
        const data =
          v.dataVenda ||
          v.DataVenda ||
          v.data ||
          v.Data;

        if (!data) return;

        const d = new Date(data);
        const chaveMes = `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

        if (!mapaVendasPorProduto[nomeProduto])
          mapaVendasPorProduto[nomeProduto] = {};

        mapaVendasPorProduto[nomeProduto][chaveMes] =
          (mapaVendasPorProduto[nomeProduto][chaveMes] || 0) + quantidade;
      });

      return mapaVendasPorProduto;
    } catch (err) {
      console.error("ERRO AO MONTAR MAPA:", err);
      return {};
    }
  };

  useEffect(() => {
    const carregarTodos = async () => {
      const novoMapas = {};
      for (const f of fornecedores) {
        novoMapas[f.nome] = await criarMapaPorFornecedor(f.nome);
      }
      setMapasPorFornecedor(novoMapas);
    };
    carregarTodos();
  }, []);

  const gerarGraficoFornecedor = (titulo, logo, vendasPorProduto) => {
    if (!vendasPorProduto || Object.keys(vendasPorProduto).length === 0) {
      return (
        <div className="fornecedor-card" key={titulo}>
          <img src={logo} alt={titulo} className="logo-fornecedor" />
          <p>Nenhum produto ou venda para este fornecedor</p>
        </div>
      );
    }

    const todosMeses = Array.from(
      new Set(
        Object.values(vendasPorProduto).flatMap((vendasMes) =>
          Object.keys(vendasMes)
        )
      )
    ).sort((a, b) => {
      const [mA, aA] = a.split("/").map(Number);
      const [mB, aB] = b.split("/").map(Number);
      return aA === aB ? mA - mB : aA - aB;
    });

    const series = Object.entries(vendasPorProduto).map(
      ([produto, vendasMes]) => ({
        name: produto,
        data: todosMeses.map((mes) => vendasMes[mes] || 0),
      })
    );

    return (
      <div className="fornecedor-card" key={titulo}>
        <img src={logo} alt={titulo} className="logo-fornecedor" />
        <ReactApexChart
          options={{
            ...baseOpcoesGrafico,
            xaxis: { categories: todosMeses },
            title: { text: `Vendas Mensais - ${titulo}`, align: "center" },
          }}
          series={series}
          type="bar"
          height={220}
        />
      </div>
    );
  };

  const carregando = Object.keys(mapasPorFornecedor).length === 0;

  return (
    <div className="container-geral">
      <MenuLateral />
      <div className="conteudo-principal">
        <MenuNormal />

        <main className="fornecedores-box">
          <h2 className="titulo-fornecedores">Fornecedores</h2>

          <div className="fornecedores-lista">
            {carregando ? (
              <p>Carregando dados dos fornecedores...</p>
            ) : (
              fornecedores.map((f) =>
                gerarGraficoFornecedor(
                  f.nome,
                  f.logo,
                  mapasPorFornecedor[f.nome]
                )
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

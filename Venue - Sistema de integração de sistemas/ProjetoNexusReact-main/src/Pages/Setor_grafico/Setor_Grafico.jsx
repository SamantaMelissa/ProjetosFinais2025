import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import "./Setor_Grafico.css";
import ApexChart from "../../Components/Graficos/Pizza/ApexChart.jsx";
import ApexChart2 from "../../Components/Graficos/Linha/ApexChart.jsx";
import CarouselV from "../../Components/CarouselV/carouselV.jsx";

export default function Setor_Grafico() {
  return (
    <>
      <Header />
      <main className="main-grafico">
        <div className="titulo">
          <h1>Gráficos</h1>
          <hr />
        </div>

        <div className="section_grafico">
          <div className="graficos-container">
            <div className="grafico_1">
              <ApexChart />
            </div>
            <div className="grafico_2">
              <ApexChart2 />
            </div>
          </div>

          <div className="carrossel">
            <CarouselV />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

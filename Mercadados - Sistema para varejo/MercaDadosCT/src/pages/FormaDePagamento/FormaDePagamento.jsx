import "./FormaDePagamento.css";
import { Botao } from "../../components/botao/Botao";
import Pix from "../../assets/pix.png";
import Cartao from "../../assets/cartao.png";
import Cartao2 from "../../assets/cartao2.png";
import VR from "../../assets/vr.png";
import Dinheiro from "../../assets/dinheiro.png";
import Voltar from "../../assets/Voltar.png";
import { MenuNormal } from "../../components/menunormal/menunormal";
import { useNavigate } from "react-router-dom";

export const FormaDePagamento = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/LeituraProdutos");
  };

  const handleConfirmar = () => {
    alert("Confirmar Pagamento!");
  };

  return (
    <div className="pagamento-container">
      <MenuNormal />

      <div className="pagamento-content">
        <div className="pagamento-card">
          <h1>Forma de Pagamento!</h1>

          <button className="voltar" onClick={handleVoltar}>
            <div>
              <img src={Voltar} alt="BotaoVoltar" />
            </div>
          </button>

          <div className="opcoes-pagamento">
            <div className="opcao">
              <img src={Pix} alt="Pix" />
            </div>
            <div className="opcao">
              <img src={Cartao} alt="Cartão" />
            </div>
            <div className="opcao">
              <img src={Cartao2} alt="Credito" />
            </div>
            <div className="opcao">
              <img src={VR} alt="Vale Refeição" />
            </div>
            <div className="opcao">
              <img src={Dinheiro} alt="Dinheiro" />
            </div>
          </div>

          <Botao nomeBotao="Confirmar" onClick={handleConfirmar} />
        </div>
      </div>
    </div>
  );
};

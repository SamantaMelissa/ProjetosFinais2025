import "./ModalChamado.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ModalChamado({
  chamado,        
  idChamado,      
  onClose,
  onArquivar,
  sentimentoCalculado 
}) {
  const navigate = useNavigate();

  if (!chamado && !idChamado) return null;

  function formatarData(dataStr) {
    if (!dataStr) return "Data inválida";
    const data = new Date(dataStr);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const chamadoIdEfetivo = chamado?.idChamado ?? idChamado;
  const descricao = chamado?.transcricao ?? chamado?.texto ?? "";

  const sentimentoBruto = chamado?.sentimento ?? sentimentoCalculado ?? chamado?.classificacao ?? chamado?.sentimentoGeral;
  const sentimento = (sentimentoBruto || "neutro").toString().toLowerCase();

  const normalizar = (s) => {
    if (!s) return "neutro";
    const v = s.toString().toLowerCase();
    if (v.includes("positivo") || v.includes("bom") || v.includes("boa") || v.includes("good")) return "positivo";
    if (v.includes("negativo") || v.includes("ruim") || v.includes("péssimo") || v.includes("bad")) return "negativo";
    return "neutro";
  };

  const sentimentoNormalizado = normalizar(sentimento);

  const handleResponder = (e) => {
    e.stopPropagation();

    let timerInterval;
    let timeLeft = 2.0; // 2 segundos

    Swal.fire({
      title: "Chamado Encontrado!",
      html: "Redirecionando para o Chat em <b>2.0</b> s",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          timeLeft -= 0.2;
          if (b) b.textContent = timeLeft.toFixed(1);
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then(() => {
      navigate(`/chat/${chamadoIdEfetivo}`, { state: { chamado } });
    });
  };

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>

        <div className="modal_header">
          <h2>Detalhes do Feedback</h2>
          <button className="modal_close" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        <div className="modal_content">
          <div className="modal_user_info">
            <div className="modal_avatar">👤</div>
            <div className="modal_user_texts">
              <h3>{chamado?.nome ?? chamado?.cliente?.usuario?.nome ?? "Usuário"}</h3>
              <span className="modal_data">{formatarData(chamado?.data)}</span>
            </div>
            <span className={`modal_status sentimento-${sentimentoNormalizado}`}>
              {sentimentoNormalizado === "positivo" && " Positivo"}
              {sentimentoNormalizado === "negativo" && " Negativo"}
              {sentimentoNormalizado === "neutro" && " Neutro"}
            </span>
          </div>

          <div className="modal_msg_box">
            <h4>Mensagem</h4>
            <p>{descricao || "Sem mensagem disponível."}</p>
          </div>

          {(!descricao || descricao === "Erro ao transcrever áudio") && (
            <p className="modal_info">
              Esta mensagem foi originada de um erro na transcrição de áudio.
            </p>
          )}
        </div>

        <div className="modal_footer">
          <button
            className="btn_resolvido"
            onClick={(e) => {
              e.stopPropagation();
              onArquivar?.(chamadoIdEfetivo);
              onClose?.();
            }}
          >
            Marcar como resolvido
          </button>

          <button
            className="btn_responder"
            onClick={handleResponder}
          >
            ↩ Responder
          </button>
        </div>
      </div>
    </div>
  );
}

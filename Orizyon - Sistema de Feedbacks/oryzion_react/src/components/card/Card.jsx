import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Usuario from '../../assets/img/Profile2.png';
import AudioPlayer from "../audioPlayer/AudioPlayer";
import "./Card.css";
import arquiva from "../../assets/img/exibir.svg";

function classificarSentimento(texto) {
  if (!texto || typeof texto !== "string") return "neutro";

  const positivas = ["bom", "ótimo", "excelente", "gostei", "maravilhoso", "perfeito", "legal", "satisfeito", "feliz", "positivo", "boa", "adorei", "top", "show"];
  const negativas = ["ruim", "péssimo", "horrível", "insatisfeito", "triste", "problema", "erro", "demora", "lento", "odiei", "odeio", "lixo", "chato"];

  const lower = texto.toLowerCase();
  let score = 0;

  positivas.forEach(p => lower.includes(p) && score++);
  negativas.forEach(n => lower.includes(n) && score--);

  if (score > 0) return "positivo";
  if (score < 0) return "negativo";
  return "neutro";
}

export default function Card({
  nome,
  texto,
  audio,
  data,
  idChamado,
  onArquivar,
  onOpenModal
}) {
  const [transcricao, setTranscricao] = useState("");
  const [sentimento, setSentimento] = useState("neutro");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function transcrever() {
      let textoBase = texto || "";

      if (!audio) {
        if (!mounted) return;
        setTranscricao(textoBase);
        setSentimento(classificarSentimento(textoBase));
        return;
      }

      try {
        setCarregando(true);

        const audioResponse = await fetch(audio);
        const blob = await audioResponse.blob();

        const formData = new FormData();
        formData.append("arquivoAudio", blob, "audio.wav");

        const resposta = await fetch("http://localhost:5128/api/AzureSpeechServiceClient/transcrever", {
          method: "POST",
          body: formData
        });

        if (!resposta.ok) throw new Error("Falha na transcrição");

        const text = await resposta.text();
        if (!mounted) return;
        setTranscricao(text);
        textoBase = text;
      } catch {
        if (!mounted) return;
        setTranscricao("Erro ao transcrever áudio");
      } finally {
        if (!mounted) return;
        setCarregando(false);
      }

      if (mounted) setSentimento(classificarSentimento(textoBase));
    }

    transcrever();
    return () => { mounted = false; };
  }, [audio, texto]);

  const formatDate = (d) => new Date(d).toLocaleString("pt-BR");

  const handleOpenModal = (e) => {
    if (e) e.stopPropagation?.();
    const chamadoParaModal = {
      idChamado,
      nome,
      texto: texto || transcricao,
      transcricao: texto || transcricao,
      audio,
      data,
      sentimento,
    };
    onOpenModal?.(chamadoParaModal);
  };

  const handleResponder = (e) => {
    e.stopPropagation();

    let timerInterval;
    let timeLeft = 0.0;

    Swal.fire({
      title: "Chamado Encontrado!",
      html: "Redirecionando para o Chat em <b>4.0</b> s",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          timeLeft -= 0.1;
          if (b) b.textContent = timeLeft.toFixed(1);
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then(() => {
      navigate(`/chat/${idChamado}`, {
        state: {
          chamado: {
            idFeedback: idChamado,
            nome,
            texto: texto || transcricao,
            audio,
            data,
            sentimento,
          },
        },
      });
    });
  };

  return (
    <div
      className="card"
      onClick={handleOpenModal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleOpenModal(); }}
    >
      <div className="card_top_content">
        <div className="card_user_info">
          <img className="avatar_user" src={Usuario} alt="Usuário" />
          <h3 className="card_name">{nome}</h3>
        </div>

        <p className="card_text">
          {carregando ? "Transcrevendo..." : (texto || transcricao || "Nenhuma transcrição disponível.")}
        </p>

        <div className="responder_botao">
          <button
            className="btn_responder"
            onClick={handleResponder}
          >
            Responder
          </button>

          <img
            src={arquiva}
            className="icone_arquivar"
            alt="Arquivar"
            onClick={(e) => {
              e.stopPropagation();
              onArquivar?.(idChamado);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="card_footer">
        <span className={`card_tag sentimento-${sentimento}`}>{sentimento}</span>
        <AudioPlayer src={audio} />
        <span className="card_time">{formatDate(data)}</span>
      </div>
    </div>
  );
}

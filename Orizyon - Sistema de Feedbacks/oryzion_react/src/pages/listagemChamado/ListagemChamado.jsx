import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';

import './ListagemChamado.css';

import mais from '../../assets/img/MaisBotao.svg';
import adiciona from '../../assets/img/adicionar.svg';
import transcricaoIcon from '../../assets/img/transcricao.png';
import download from '../../assets/img/download.png';

const ListagemChamado = () => {
  const [chamados, setChamados] = useState([]);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [transcricaoSelecionada, setTranscricaoSelecionada] = useState(null);

  // ------------------------------------------
  // HASH DETERMINÍSTICO PARA GUID → 4 dígitos
  // ------------------------------------------
  function hashStringToNumber(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return (hash >>> 0) % 10000; // retorna 0–9999
  }

  // ------------------------------------------
  // GERA PROTOCOLO FIXO: OC-2025-XXXX
  // ------------------------------------------
  function gerarProtocolo(id) {
    if (!id) return "—";

    const num = hashStringToNumber(String(id))
      .toString()
      .padStart(4, "0");

    return `OC-2025-${num}`;
  }

  // Buscar chamados da API
  useEffect(() => {
    async function buscarChamados() {
      try {
        const resposta = await fetch("http://localhost:5128/api/Chamado");
        if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

        const dados = await resposta.json();
        setChamados(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    buscarChamados();
  }, []);

  if (loading) return <p>🔄 Carregando chamados...</p>;
  if (erro) return <p className="erro">Erro ao carregar chamados: {erro}</p>;

  // Filtro
  const chamadosFiltrados = chamados.filter((c) => {
    const termo = searchTerm.toLowerCase();
    const protocolo = gerarProtocolo(c.idChamado).toLowerCase();
    const cliente = (c.cliente?.usuario?.nome ?? "").toLowerCase();
    const status = c.status ? "ativo" : "pendente";

    return (
      protocolo.includes(termo) ||
      cliente.includes(termo) ||
      status.includes(termo)
    );
  });

  // Abrir modal da transcrição
  const abrirModal = (transcricao) => {
    setTranscricaoSelecionada(transcricao ?? null);
    setModalAberto(true);
  };

  return (
    <>
      <Header />
      <BarraPesquisa mostrarFiltros={false} onSearch={setSearchTerm} />

      <section className="layout_grid listagemChamado">

        {/* Botão adicionar */}
        <div className="img_adiciona">
          <Link to="/chamado" className="botao_adicionar">
            <img src={mais} alt="Mais" />
            <img src={adiciona} alt="Adicionar Chamado" />
          </Link>
        </div>

        {/* Tabela */}
        <div className="tabela_chamados">

          <div className="linha header">
            <h3>Protocolo</h3>
            <h3>Cliente</h3>
            <h3>Transcrição</h3>
            <h3>Áudio</h3>
            <h3>Status</h3>
          </div>

          {chamadosFiltrados.map((c) => (
            <div className="linha" key={c.idChamado}>

              {/* PROTOCOLO FIXO */}
              <p>{gerarProtocolo(c.idChamado)}</p>

              <p>{c.cliente?.usuario?.nome ?? "—"}</p>

              {/* Transcrição */}
              <div className="acao">
                {c.transcricao ? (
                  <div onClick={() => abrirModal(c.transcricao)}>
                    <img
                      src={transcricaoIcon}
                      alt="Transcrição"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ) : (
                  <img
                    src={transcricaoIcon}
                    alt="Sem transcrição"
                    style={{ opacity: 0.3, cursor: "not-allowed" }}
                  />
                )}
              </div>

              {/* Áudio */}
              <div className="acao">
                {c.audio ? (
                  <a href={c.audio} download>
                    <img src={download} alt="Baixar áudio" style={{ cursor: "pointer" }} />
                  </a>
                ) : (
                  <p style={{ opacity: 0.5 }}>—</p>
                )}
              </div>

              <p>{c.status ? "✅ Ativo" : "⏳ Pendente"}</p>

            </div>
          ))}

        </div>
      </section>

      {/* MODAL */}
      {modalAberto && (
        <div className="modal_overlay">
          <div className="modal_conteudo">
            <h2 className="titulo_do_modal">Transcrição do Áudio</h2>
            <p className="texto_transcricao">
              {transcricaoSelecionada ?? "Nenhuma transcrição disponível."}
            </p>
            <button onClick={() => setModalAberto(false)}>Fechar</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ListagemChamado;
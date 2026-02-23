import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ListagemFeedback.css";

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BarraPesquisa from '../../components/barraPesquisa/BarraPesquisa';
import Card from '../../components/card/Card';
import ModalChamado from "../../components/modalChamado/ModalChamado";

const CARDS_POR_PAGINA = 10;

const ListagemFeedback = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paginaAtual, setPaginaAtual] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

    const [removendoId, setRemovendoId] = useState(null);
    const [toast, setToast] = useState(false);

    const clickTimers = useRef({});

    // 🔍 Campo de busca pelo nome
    const [busca, setBusca] = useState("");

    // Normalizador de sentimento
    function normalizarSentimento(s) {
        if (!s) return "neutro";
        const val = s.toString().toLowerCase();
        if (["positivo", "positive", "bom", "boa"].includes(val)) return "positivo";
        if (["negativo", "negative", "ruim", "péssimo"].includes(val)) return "negativo";
        return "neutro";
    }

    const handleTripleClick = (id, chamado) => {
        if (!clickTimers.current[id]) {
            clickTimers.current[id] = { count: 0, timeout: null };
        }

        const obj = clickTimers.current[id];
        obj.count++;

        if (obj.timeout) clearTimeout(obj.timeout);
        obj.timeout = setTimeout(() => {
            obj.count = 0;
        }, 350);

        if (obj.count === 2) {
            obj.count = 0;

            abrirModalChamado({
                ...chamado,
                sentimentoNormalizado: normalizarSentimento(
                    chamado.sentimento || chamado.classificacao
                )
            });
        }
    };

    useEffect(() => {
        async function buscarFeedbacks() {
            try {
                setLoading(true);
                const resposta = await fetch("http://localhost:5128/api/Chamado");
                if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
                const dados = await resposta.json();

                const filtrados = Array.isArray(dados)
                    ? dados.filter((ch) => ch.status === true)
                    : [];

                const normalizados = filtrados.map((ch) => ({
                    ...ch,
                    sentimentoNormalizado: normalizarSentimento(
                        ch.sentimento || ch.classificacao
                    ),
                }));

                setFeedbacks(normalizados);
                setPaginaAtual(1);
            } catch (err) {
                console.error("Erro ao buscar feedbacks:", err);
            } finally {
                setLoading(false);
            }
        }
        buscarFeedbacks();
    }, []);

    const abrirModalChamado = (chamado) => {
        setChamadoSelecionado(chamado);
        setModalOpen(true);
    };

    const abrirChat = (idChamado, chamado) => {
        console.log("Navegando para o chat com ID:", idChamado);
        navigate(`/chat/${idChamado}`, { state: { chamado: chamado } });
    };

    const confirmarArquivarChamado = async (idChamado) => {
        const result = await Swal.fire({
            title: "Arquivar chamado?",
            text: "Você tem certeza que deseja arquivar este feedback?",
            icon: "warning",
            background: "#111828",
            color: "#FFFFFF",
            showCancelButton: true,
            confirmButtonColor: "#5D50E8",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Sim, arquivar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await arquivarChamado(idChamado);
            Swal.fire({
                title: "Arquivado!",
                text: "O feedback foi movido para os arquivados.",
                icon: "success",
                background: "#111828",
                color: "#FFFFFF",
                confirmButtonColor: "#5D50E8",
            });
        }
    };

    const arquivarChamado = async (idChamado) => {
        try {
            setRemovendoId(idChamado);
            const resposta = await fetch(
                `http://localhost:5128/api/Chamado/${idChamado}/status`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(false),
                }
            );
            if (!resposta.ok) throw new Error("Erro ao atualizar status");

            setTimeout(() => {
                setFeedbacks((prev) => prev.filter((ch) => ch.idChamado !== idChamado));
                setRemovendoId(null);
                setToast(true);
                setTimeout(() => setToast(false), 2700);
            }, 400);
        } catch (err) {
            console.error("Erro ao arquivar:", err);
            setRemovendoId(null);
        }
    };

    // 🔍 FILTRO POR NOME DO CLIENTE
    const filtradosPorBusca = feedbacks.filter(fb =>
        fb.cliente?.usuario?.nome
            ?.toLowerCase()
            ?.includes(busca.toLowerCase())
    );

    const totalPaginas = Math.max(
        1,
        Math.ceil(filtradosPorBusca.length / CARDS_POR_PAGINA)
    );

    const indiceInicial = (paginaAtual - 1) * CARDS_POR_PAGINA;
    const indiceFinal = indiceInicial + CARDS_POR_PAGINA;

    const cardsParaExibir = filtradosPorBusca.slice(indiceInicial, indiceFinal);

    return (
        <>
            <Header />

            {/* 🔍 pesquisa por nome */}
            <BarraPesquisa 
                mostrarFiltros={false}
                onSearch={setBusca}
            />

            <section className="listagem_feedbacks">

                <h2 className="qtd_feedback">
                    Feedbacks ({filtradosPorBusca.length})
                </h2>

                <div className="listagem_cards">
                    {cardsParaExibir.map((fb) => (
                        <div
                            key={fb.idChamado}
                            className={`card-wrapper ${removendoId === fb.idChamado ? "removendo" : ""}`}
                            onClick={() => handleTripleClick(fb.idChamado, fb)}
                        >
                            <Card
                                idChamado={fb.idChamado}
                                nome={fb.cliente?.usuario?.nome ?? "Usuário"}
                                texto={fb.transcricao}
                                audio={fb.audio}
                                data={fb.data}
                                sentimento={fb.sentimentoNormalizado}
                                onArquivar={() => confirmarArquivarChamado(fb.idChamado)}
                                onOpenModal={(obj) => abrirModalChamado(obj)}
                                onOpenChat={() => abrirChat(fb.idChamado, fb)}
                            />
                        </div>
                    ))}
                </div>

                {/* Paginação poderia estar aqui */}

            </section>

            {modalOpen && (
                <ModalChamado
                    chamado={chamadoSelecionado}
                    idChamado={chamadoSelecionado?.idChamado}
                    sentimentoCalculado={chamadoSelecionado?.sentimentoNormalizado}
                    onClose={() => setModalOpen(false)}
                    onArquivar={(id) => confirmarArquivarChamado(id)}
                />
            )}

            <Footer />

            {toast && <div className="toast show">Chamado arquivado!</div>}
        </>
    );
};

export default ListagemFeedback;

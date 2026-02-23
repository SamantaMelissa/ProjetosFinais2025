import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ModalSuporte from "../../components/modal/Modal";
import UsuarioImg from "../../assets/img/joao.png";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Chat.css";
import editar from "../../assets/img/editar.png"

import api from "../../Services/services";
import { useAuth } from "../../contexts/AuthContext";

const Chat = () => {
    const { usuario } = useAuth();
    const { idFeedback } = useParams();
    const location = useLocation();
    const [chamadoData, setChamadoData] = useState(location.state?.chamado);

    const [modalAberto, setModalAberto] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [chat, setChat] = useState([]);

    // Estados para edição
    const [editandoId, setEditandoId] = useState(null);
    const [textoEdicao, setTextoEdicao] = useState("");

    useEffect(() => {
        console.log("Usuario logado:", usuario);
    }, [usuario]);

    // 🛑 CORREÇÃO CRÍTICA DO useEffect
    useEffect(() => {
        // 1. Garante que idFeedback existe E que não é o placeholder da rota
        if (idFeedback && idFeedback !== ':idFeedback') {
            console.log("Carregando dados para ID:", idFeedback);

            // 2. Se chamadoData não foi passado via Link (location.state), carregamos
            if (!chamadoData) {
                carregarChamadoOriginal(idFeedback);
            }
            // 3. Carrega as mensagens do chat
            carregarMensagens(idFeedback);
        } else {
            console.log("Aguardando ID válido do feedback. ID atual:", idFeedback);
        }
        // O 'chamadoData' é removido das dependências para evitar chamadas duplicadas
        // quando 'chamadoData' é atualizado por 'carregarChamadoOriginal'.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idFeedback]);


    const carregarChamadoOriginal = async (id) => {
        try {
            if (!id) return;

            console.log("API Chamado URL:", `/Chamado/${id}`);
            // CORREÇÃO DA URL: template string
            const response = await api.get(`/Chamado/${id}`);

            setChamadoData(response.data);
            console.log("Chamado original carregado:", response.data);
        } catch (error) {
            console.error("Erro ao carregar chamado original:", error);
        }
    };


    const carregarMensagens = async (id) => {
        try {
            if (!id) return;

            console.log("API Resposta URL:", `/Resposta/chamado/${id}`);
            // CORREÇÃO DA URL: template string
            const response = await api.get(`/Resposta/chamado/${id}`);

            let mensagens = response.data.map(r => ({
                Texto: r.texto,
                Audio: r.audio,
                Data: r.data || r.Data,
                IdUsuario: String(r.idUsuario),
                idResposta: r.idResposta,

                Usuario: {
                    Nome: r.usuario?.nome || r.Usuario?.Nome || "Usuário"
                }
            }));

            mensagens.sort((a, b) => new Date(a.Data) - new Date(b.Data));

            setChat(mensagens);

        } catch (error) {
            console.error("Erro ao carregar mensagens:", error);
        }
    };


    const iniciarEdicao = (msg) => {
        setEditandoId(msg.idResposta);
        setTextoEdicao(msg.Texto);
    };

    const salvarEdicao = async (idResposta) => {
        if (!textoEdicao.trim()) return;

        // Encontrar a mensagem original para capturar a data antes da edição
        const mensagemOriginal = chat.find(msg => msg.idResposta === idResposta);
        if (!mensagemOriginal) {
            console.error("Mensagem original não encontrada.");
            setEditandoId(null);
            setTextoEdicao("");
            return;
        }

        try {
            await api.put(`/Resposta/${idResposta}`, {
                Texto: textoEdicao,
            });

            setChat(prevChat => prevChat.map(msg =>
                msg.idResposta === idResposta
                    ? {
                        ...msg,
                        Texto: textoEdicao,
                        Data: mensagemOriginal.Data // MANTÉM A DATA ORIGINAL
                    }
                    : msg
            ));

            setEditandoId(null);
            setTextoEdicao("");


        } catch (error) {
            console.error("Erro ao salvar edição:", error);
            alert("Erro ao editar mensagem. Por favor, verifique se o endpoint PUT /Resposta/{id} está funcionando corretamente.");
        }
    };


    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;

        if (!usuario || !usuario.idUsuario) {
            alert("Usuário não logado ou inválido.");
            return;
        }

        if (!idFeedback) {
            alert("Este chamado ainda não possui feedback. Mensagem não pode ser enviada.");
            return;
        }

        const mensagemAtual = mensagem;
        const novaMensagem = {
            IdChamado: idFeedback,
            IdUsuario: usuario.idUsuario,
            Texto: mensagemAtual,
            Data: new Date().toISOString()
        };

        console.log("Payload de envio:", novaMensagem);

        // Otimização: Adiciona a mensagem localmente antes de recarregar
        const tempMensagem = {
            Texto: mensagemAtual,
            Audio: null,
            Data: novaMensagem.Data,
            IdUsuario: String(usuario.idUsuario),
            Usuario: { Nome: "Você" }
            // idResposta é temporário/simulado, será atualizado no carregarMensagens
        };
        setChat(prevChat => [...prevChat, tempMensagem]);
        setMensagem("");

        try {
            await api.post("/Resposta", novaMensagem);

            // Recarrega as mensagens para buscar a versão final do servidor
            await carregarMensagens(idFeedback);

        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            alert("Erro ao enviar mensagem. Por favor, verifique a conexão e o formato dos dados.");
            setMensagem(mensagemAtual);
        }
    };

    const formatarData = (d) => {
        const date = new Date(d);
        if (isNaN(date.getTime())) {
            console.warn("Data inválida recebida:", d);
            return "Data Inválida";
        }
        return date.toLocaleString("pt-BR");
    };

    const getAudioMime = (src) =>
        src?.endsWith(".wav") ? "audio/wav" :
            src?.endsWith(".ogg") ? "audio/ogg" :
                "audio/mpeg";

    return (
        <>
            <Header onSuporteClick={() => setModalAberto(true)} />
            {modalAberto && <ModalSuporte onClose={() => setModalAberto(false)} />}

            <div className="chat-wrapper">
                <div className="chat-header-bar">
                    <div className="chat-left">
                        <Link to="/listagemFeedback" className="chat-back">← Voltar</Link>
                        <img src={UsuarioImg} className="chat-user-avatar" alt="Avatar do Cliente" />
                        <span className="chat-user-name">{chamadoData?.nome || "Usuário"}</span>
                    </div>

                </div>

                <div className="chat-body">
                    {/* Feedback original do chamado */}
                    {chamadoData && (
                        <div className="chat-mensagem-card mensagem-cliente" style={{ maxWidth: "70%" }}>
                            <h4>Feedback recebido:</h4>
                            <p>{chamadoData.texto || "Nenhuma transcrição disponível."}</p>
                            {chamadoData.audio && (
                                <audio controls style={{ marginTop: 10, width: "100%" }}>
                                    <source src={chamadoData.audio} type={getAudioMime(chamadoData.audio)} />
                                </audio>
                            )}
                            {/* Múltipla checagem para data do chamado original */}
                            <small style={{ color: "#94a3b8" }}>
                                Enviado em: {
                                    (chamadoData.Data || chamadoData.data)
                                        ? formatarData(chamadoData.Data || chamadoData.data)
                                        : 'Data não informada'
                                }
                            </small>
                        </div>
                    )}

                    <div className="chat-mensagens-list">
                        {chat.map((msg, idx) => {
                            // Converte AMBAS as IDs para string para comparação (Case-insensitivity)
                            const isCurrentUser = String(msg.IdUsuario).toLowerCase() === String(usuario?.idUsuario).toLowerCase();

                            const messageClass = isCurrentUser ? "mensagem-suporte" : "mensagem-cliente";

                            // Verifica se esta mensagem específica está em modo de edição
                            const isEditing = editandoId === msg.idResposta;

                            return (
                                // GARANTINDO CHAVE ESTÁVEL COM fallback para 'idx'
                                <div key={msg.idResposta || idx} className={`chat-mensagem-card ${messageClass}`}>
                                    <strong style={{ color: "#fff" }}>
                                        {isCurrentUser ? "Você" : msg.Usuario?.Nome || "Usuário"}
                                    </strong>

                                    {/* LÓGICA DE EDIÇÃO */}
                                    {isEditing ? (
                                        <div style={{ padding: '5px 0' }}>
                                            <textarea
                                                value={textoEdicao}
                                                onChange={(e) => setTextoEdicao(e.target.value)}
                                                rows="3"
                                                style={{ width: '100%', padding: '5px', marginBottom: '10px', resize: 'vertical', border: '1px solid #00d4ff', borderRadius: '4px' }}
                                            />
                                            <button
                                                onClick={() => salvarEdicao(msg.idResposta)}
                                                disabled={!textoEdicao.trim()}
                                                style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#00d4ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                onClick={() => setEditandoId(null)}
                                                style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Conteúdo Normal da Mensagem */}
                                            {msg.Texto && <p>{msg.Texto}</p>}
                                            {msg.Audio && (
                                                <audio controls style={{ marginTop: 10, width: "100%" }}>
                                                    <source src={msg.Audio} type={getAudioMime(msg.Audio)} />
                                                </audio>
                                            )}

                                            {/* Data e hora */}
                                            <small style={{ color: "#94a3b8" }}>{msg.Data ? formatarData(msg.Data) : 'Data não informada'}</small>

                                            {/* Botão de Edição */}
                                            {isCurrentUser && msg.idResposta && (
                                                <button
                                                    onClick={() => iniciarEdicao({ ...msg, idResposta: msg.idResposta })}
                                                    className="chat-edit-btn"
                                                    title="Editar Mensagem"
                                                >
                                                    <img src={editar} alt="Editar" />
                                                </button>
                                            )}
                                        </>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="chat-input-bar">
                    <input
                        type="text"
                        placeholder={idFeedback ? "Digite a sua mensagem" : "Feedback não disponível"}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                        disabled={!idFeedback}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={enviarMensagem}
                        disabled={!idFeedback || !mensagem.trim()}
                    >
                        ➤
                    </button>

                </div>

                <Footer />
            </div>
        </>
    );
};

export default Chat;
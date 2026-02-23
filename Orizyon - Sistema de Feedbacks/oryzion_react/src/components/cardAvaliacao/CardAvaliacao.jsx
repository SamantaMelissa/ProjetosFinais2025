import './CardAvaliacao.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Esquerda from '../../assets/img/setaEsquerda.svg'
import Direita from '../../assets/img/setaDireita.svg'
import api from '../../Services/services';

// Mapeamento das cores dos badges com base na classificação (sentimento)
const BADGE_COLORS = {
    positivo: '#CCF2D5',
    negativo: '#FFD6D6',
    neutro: '#DDE6FF'
};

const CardAvaliacao = () => {

    const [feedbacksData, setFeedbacksData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    
    const [index, setIndex] = useState(0);
    // Define 1 card visível para mobile e 3 para desktop
    const [visibleCount, setVisibleCount] = useState(window.innerWidth <= 768 ? 1 : 3);


    useEffect(() => {
        
        const fetchFeedbacks = async () => {
            try {
                // Busca os dados
                const response = await api.get('/Feedback'); 
                const rawFeedbacks = response.data;

                // 2. Filtrar, Mapear e Enriquecer os Feedbacks
                const filteredData = rawFeedbacks
                    .filter(fb => {
                        // Regra de Negócio: Filtro de MENOS de 10 palavras
                        const wordCount = fb.texto.trim().split(/\s+/).length;
                        return wordCount < 10;
                    })
                    .map(fb => {
                        // Acessa a classificação e define a cor
                        const classificacaoNome = fb.classificacao?.comentario?.toLowerCase() || 'neutro'; 
                        const cor = BADGE_COLORS[classificacaoNome] || BADGE_COLORS.neutro;

                        return {
                            id: fb.idFeedback, 
                            nome: "Usuário Anônimo", 
                            classificacao: classificacaoNome,
                            texto: fb.texto,
                            cor: cor
                        };
                    });

                setFeedbacksData(filteredData);
                setIndex(0);
                

            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchFeedbacks();

        // Lógica de resize handler para mudar visibleCount
        const h = () => setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
        
    }, []); 

    // --- Lógica do Carrossel (Avanço de Grupos) ---
    const totalItems = feedbacksData.length;
    
    // Avança o índice pelo número de cards visíveis (evita duplicação)
    const next = () => {
        setIndex(prev => (prev + visibleCount) % totalItems);
    }
    
    // Volta o índice pelo número de cards visíveis
    const prev = () => {
        // Garante que o resultado seja positivo antes de aplicar o módulo
        setIndex(prev => (prev - visibleCount + totalItems) % totalItems);
    }

    // Retorna APENAS os cards que devem estar visíveis
    const getVisibleCards = () => {
        if (totalItems === 0) return [];

        const arr = [];
        for (let i = 0; i < visibleCount; i++) {
            // Aplica o módulo para criar o efeito de loop
            arr.push(feedbacksData[(index + i) % totalItems]);
        }
        return arr;
    };
    
    // --- Renderização de Estado ---
    if (isLoading) {
        return (
            <section className='banner_listagem'>
                <div style={{color: 'white', fontSize: '24px', textAlign: 'center'}}>Carregando feedbacks curtos...</div>
            </section>
        );
    }
    
    if (totalItems === 0) {
         return (
            <section className='banner_listagem'>
                <div style={{color: 'white', fontSize: '24px', textAlign: 'center'}}>Nenhum feedback curto encontrado para o carrossel.</div>
            </section>
        );
    }

    // --- Renderização Principal ---
    return (
        <section className='banner_listagem'>
            <div className="layout_grid banner_cards">

                <div className="carousel_container">

                    <button className="carousel_button prev" onClick={prev}>
                        <img src={Esquerda} alt="voltar" />
                    </button>

                    <div className="carousel_wrapper">
                        <div className="carousel_inner_feedback">
                            {getVisibleCards().map((fb) => (
                                <div key={fb.id} className="feedback_card">
                                    
                                    <h3>{fb.nome}</h3> 

                                    <span
                                        className="badge_feedback"
                                        style={{ backgroundColor: fb.cor }}
                                    >
                                        {fb.classificacao === "positivo" && "Positivo"}
                                        {fb.classificacao === "negativo" && "Negativo"}
                                        {fb.classificacao === "neutro" && "Neutro"}
                                    </span>

                                    <p className="comentario_feedback">“{fb.texto}”</p>

                                    <Link className='link_responder' to="/chat">
                                        Responder
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="carousel_button next" onClick={next}>
                        <img src={Direita} alt="avançar" />
                    </button>
                </div>

                {/* Indicador de bolinhas (dots) - Representa cada item individual */}
                <div className="carousel_dots">
                    {feedbacksData.map((_, i) => (
                        <span
                            key={i}
                            // O dot é ativo se o seu índice for igual ao index atual (módulo para o loop)
                            className={`dot ${i === index % totalItems ? "active" : ""}`}
                            // Ao clicar, o carrossel vai para o início daquele card
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CardAvaliacao;
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import CadastroEquipe from '../pages/cadastroEquipe/CadastroEquipe.jsx';
import Chamado from '../pages/chamado/Chamado.jsx';
import Chat from '../pages/chat/Chat.jsx';
import DashBoard from '../pages/dashboard/Dashboard.jsx';
import HistoricoFeedback from '../pages/historicoFeedback/HistoricoFeedback.jsx';
import ListagemChamado from '../pages/listagemChamado/ListagemChamado.jsx';
import ListagemFeedback from '../pages/listagemFeedback/listagemFeedback.jsx';
import Resumo from '../pages/resumo/Resumo.jsx';
import TelaInicial from '../pages/telaInicial/TelaInicial.jsx';
import Login from '../pages/login/Login.jsx';
import Error from '../pages/error/ErrorPage.jsx';
import DashLista from "../pages/dashListagem/DashListagem.jsx";
import RedefinirSenha from '../pages/redefinirSenha/RedefinirSenha.jsx';

const Rotas = () => {
    const [usuarioAtual, setUsuarioAtual] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        setUsuarioAtual(usuario);
        setCarregando(false);
    }, []);

    if (carregando) {
        return <p>Carregando...</p>;
    }

    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/telainicial' element={<TelaInicial />} />
            <Route path='/listagemfeedback' element={<ListagemFeedback />} />
            <Route path='/listagemchamado' element={<ListagemChamado />} />
            <Route path="/chat/:idFeedback" element={<Chat />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/cadastroequipe' element={<CadastroEquipe />} />
            <Route path='/historicofeedback' element={<HistoricoFeedback />} />
            <Route path='/chamado' element={<Chamado />} />
            <Route path='/resumo' element={<Resumo />} />
            <Route path='/DashListagem' element={<DashLista />} />
            <Route path='*' element={<Error />} />
            <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
        </Routes>
    );
}

export default Rotas;
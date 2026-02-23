import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedefinirSenha = () => {
const { token } = useParams(); // pega o token da URL
const [novaSenha, setNovaSenha] = useState('');
const [mensagem, setMensagem] = useState('');
const [cor, setCor] = useState('red');

const redefinirSenha = async () => {
    if (!novaSenha) {
        setMensagem('Digite a nova senha!');
        setCor('red');
        return;
    }

    try {
        const response = await fetch(`/api/redefinir-senha/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaSenha)
        });

        const data = await response.json();
        if (response.ok) {
            setMensagem(data.mensagem);
            setCor('green');
        } else {
            setMensagem(data.mensagem);
            setCor('red');
        }
    } catch (error) {
        setMensagem('Erro ao redefinir a senha.');
        setCor('red');
    }
};

return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f2f5',
        fontFamily: 'Arial, sans-serif'
    }}>
        <div style={{
            background: 'white',
            padding: '30px 40px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
        }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Redefinir Senha</h2>
            <input
                type="password"
                placeholder="Digite sua nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    margin: '10px 0 20px 0',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                }}
            />
            <button
                onClick={redefinirSenha}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#4bffa5',
                    border: 'none',
                    color: '#000',
                    fontWeight: 'bold',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                Redefinir
            </button>
            {mensagem && (
                <div style={{ textAlign: 'center', marginTop: '15px', color: cor }}>
                    {mensagem}
                </div>
            )}
        </div>
    </div>
);
};

export default RedefinirSenha;

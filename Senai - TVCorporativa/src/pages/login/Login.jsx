import Botao from "../../components/botao/Botao";
import { Link } from "react-router-dom";
import "./Login.css"
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function logar(e) {

        e.preventDefault();

        const emailCorreta = "suporte@email.com";
        const senhaCorreta = "senai123";

        if (senha == senhaCorreta && email == emailCorreta) {
            Swal.fire("Seja bem vindo!");
            navigate("./menu");

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Informações incorretas! Tente novamente"
            });
        }

    }
    return (
        <>
            <Header />
            <main className="main_cadastro">
                <h1>Login</h1>
                <form onSubmit={logar}>
                    <div className="campo_cadastro">
                        <label htmlFor="">Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="campo_cadastro">
                        <label htmlFor="">Senha:</label>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <Botao nomeBotao="Entrar" />
                    <Link className="link_cadastro" to="/cadastro">Não tem conta? Crie aqui!</Link>
                </form>
            </main>
        </>
    )
}

export default Login;
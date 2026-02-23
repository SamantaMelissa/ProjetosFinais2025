import Header from '../../components/header/Header'
import './TelaInicial.css'
import Footer from '../../components/footer/Footer'
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react'
import { userDecodeToken } from "../../auth/Auth";

const TelaInicial = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = userDecodeToken(token);

      // 👉 Pegando só o primeiro nome
      const primeiroNome = user.nome?.split(" ")[0];

      setNome(primeiroNome);
    }
  }, []);

  return (
    <>
      <Header />

      <main className="telaInicial">
        <section className="tituloTela">
          <h1>
            Olá, <span className="nome-destaque">{nome || "Usuário"}</span>
          </h1>
          <p>
            Acesse as páginas de Chamados e Feedbacks clicando em um dos campos abaixo.
          </p>
        </section>

        <section className="cards-container">
          <div className="card-acesso" onClick={() => navigate("/listagemchamado")}>
            <h2>Listagem Chamado</h2>
            <p>
              Acompanhe e gerencie todos os protocolos de chamados abertos,
              adicione novos e edite os existentes.
            </p>
          </div>

          <div className="card-acesso" onClick={() => navigate("/listagemfeedback")}>
            <h2>Listagem Feedback</h2>
            <p>
              Visualize e responda aos feedbacks recebidos, organize por perfil e gerencie as interações.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default TelaInicial;

import './Login.css';
import Botao from '../../components/botao/Botao';
import api from '../../Services/services';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { userDecodeToken } from "../../auth/Auth";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { Link } from 'react-router-dom';
import logo from "../../assets/img/loguinho.png";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const naviGate = useNavigate();
  const { setUsuario } = useAuth();

  function alertar(icone, mensagem) {
    Swal.fire({
      icon: icone,
      text: mensagem,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });
  }

  async function realizarAutenticacao(e) {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      return alertar("warning", "Preencha todos os campos!");
    }

    try {
      const usuario = { email, senha };
      const resposta = await api.post("Login", usuario);
      const token = resposta.data.token;

      if (email.trim() === "" || senha.trim() === "") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Campos vazios",
          showConfirmButton: false,
          timer: 1200,
          width: "220px",
          padding: "8px",
          customClass: {
            popup: "swal-mini",
            title: "swal-mini-title"
          }
        });
        return;
      }
            if (email.trim() === "" || senha.trim() === "") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Campos vazios",
                    showConfirmButton: false,
                    timer: 1200,
                    width: "220px",
                    padding: "8px",
                    customClass: {
                        popup: "swal-mini",
                        title: "swal-mini-title"
                    }
                });
                return;
            }

      if (senha.trim() !== "" && email.trim() !== "") {

        const tokenDecodificado = userDecodeToken(token);

        const primeiroNome = tokenDecodificado.nome?.split(" ")[0];

        const usuarioComPrimeiroNome = {
          ...tokenDecodificado,
          nome: primeiroNome
        };

        setUsuario(usuarioComPrimeiroNome);

        secureLocalStorage.setItem("tokenLogin", JSON.stringify(usuarioComPrimeiroNome));
        localStorage.setItem("token", token);

        let timerInterval;

        if (tokenDecodificado.tipoUsuario === "cliente") {
          let timerInterval;
          Swal.fire({
            title: "Cliente Encontrado!",
            html: "Redirecionando para o Chat... <b></b> ms",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              naviGate("/chat/:idFeedback");
            }
          });
        } else if (tokenDecodificado.tipoUsuario === "suporte") {
          let timerInterval;
          Swal.fire({
            title: "Suporte Encontrado!",
            html: "Redirecionando para a Listagem... <b></b> ms",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              naviGate("/TelaInicial");
            }
          });
        } else {
          let timerInterval;
          Swal.fire({
            title: "Superior Encontrado!",
            html: "Redirecionando para o Dashboard... <b></b> ms",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              naviGate("/dashboard");
            }
          });
        }
      } else {
        alertar("error", "Preencha os campos!");
      }

    } catch (error) {
      console.log(error);
      alertar("error", "Email ou senha inválidos!");
    }
  }

  return (
    <div className="login_container">
      <form className="login_form" onSubmit={realizarAutenticacao}>
        <h2 className="login_logo">
          <img src={logo} alt="Logo" />
        </h2>

        <div className="login_grid">
          <div className="login_campo">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="login_campo senha">
            <label>Senha</label>

            <div className="login_senha_container">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />

              <span
                className="login_icone_olho"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

          </div>

        </div>

        <div className="login_botao">
          <Botao nomeBotao="Entrar" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
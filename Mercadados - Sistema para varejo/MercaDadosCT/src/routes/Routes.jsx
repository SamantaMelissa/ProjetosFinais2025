import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login/login.jsx";
import { CadastroUsuario } from "../pages/CadastroUsuario/cadastrousuario.jsx";
import { Fornecedores } from "../pages/Fornecedores/fornecedores.jsx";
import { GestaoEstoque } from "../pages/GestaoEstoque/gestaoestoque.jsx";
import { Home } from "../pages/Home/home.jsx";
import { LucrosGastos } from "../pages/LucrosGastos/lucrosgastos.jsx";
import { Perfil } from "../pages/Perfil/Perfil.jsx";
import { LeituraProdutos } from "../pages/LeituraProdutos/leituraProdutos.jsx";
import { AdmFuncionario } from "../pages/AdmFuncionario/admfuncionario.jsx";
import { CadastroProduto } from "../pages/CadastroProduto/cadastroproduto.jsx";
import { FeedbacksClientes } from "../pages/FeedbacksClientes/feedbacksclientes.jsx";
import { CadastroAdmin } from "../pages/CadastroAdmin/cadastroAdmin.jsx";
import { useAuth } from "../pages/contexts/authContexts.jsx";

// 🔒 Componente para proteger rotas
const Privado = ({ Item, tipoPermitido }) => {
  const { usuario, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#1b2d68",
        }}
      >
        Carregando...
      </div>
    );
  }

  // Se não houver usuário → volta pro login
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Normaliza o tipo de usuário (tanto no contexto quanto no permitido)
  const tipoUsuarioNormalizado = usuario.tipoUsuario?.trim().toLowerCase();
  const tipoPermitidoNormalizado = tipoPermitido.trim().toLowerCase();

  // Se o tipo não for o permitido → bloqueia
  if (tipoUsuarioNormalizado !== tipoPermitidoNormalizado) {
    return <Navigate to="/" replace />;
  }

  // Se tudo ok → renderiza a página
  return <Item />;
};

// 🌐 Todas as rotas da aplicação
const Rotas = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CadastroAdmin" element={<CadastroAdmin />} />

        <Route path="/Home" element={<Privado tipoPermitido="Admin" Item={Home} />} />
        <Route path="/Perfil" element={<Privado tipoPermitido="Admin" Item={Perfil} />} />
        <Route path="/CadastroUsuario" element={<Privado tipoPermitido="Admin" Item={CadastroUsuario} />} />
        <Route path="/Fornecedores" element={<Privado tipoPermitido="Admin" Item={Fornecedores} />} />
        <Route path="/GestaoEstoque" element={<Privado tipoPermitido="Admin" Item={GestaoEstoque} />} />
        <Route path="/LucrosGastos" element={<Privado tipoPermitido="Admin" Item={LucrosGastos} />} />
        <Route path="/AdmFuncionario" element={<Privado tipoPermitido="Admin" Item={AdmFuncionario} />} />
        <Route path="/CadastroProduto" element={<Privado tipoPermitido="Admin" Item={CadastroProduto} />} />

        <Route path="/LeituraProdutos" element={<Privado tipoPermitido="Funcionario" Item={LeituraProdutos} />} />
        <Route path="/FeedbacksClientes" element={<Privado tipoPermitido="Funcionario" Item={FeedbacksClientes} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default Rotas;

import React, { useState, useEffect } from "react";
import "../homeAdm/homeAdm.css";
import Lista from "../../components/Lista/lista";
import CarrosselADM from "../../components/CarrosselADM/CarrosselADM";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import api from "../../Services/services";
import Swal from "sweetalert2";

const HomeAdm = () => {
  const [funcionarios, setFuncionarios] = useState([]); 

  function alertar(icone, mensagem) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icone,
      title: mensagem,
    });
  }


  async function listarFuncionario() {
    try {
      const resposta = await api.get("/Funcionarios/listar");
      setFuncionarios(resposta.data);
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      alertar("error", "Erro ao listar funcionários!");
    }
  }

  async function deletarFuncionario(funcionario) {
    try {
      Swal.fire({
        title: "Você tem certeza?",
        text: "Essa ação não poderá ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.delete(`/Funcionarios/deletar/${funcionario.idFuncionario}`);
          alertar("success", "Funcionário excluído com sucesso!");
          listarFuncionario();
        }
      });
    } catch (error) {
      console.error(error);
      alertar("error", "Erro ao excluir funcionário!");
    }
  }

async function editarFuncionario(funcionario) {
  const { value: formValues } = await Swal.fire({
    title: "Editar Funcionário",
    html: `
      <input id="nome" class="swal2-input" placeholder="Nome" value="${funcionario.nome}">
      <input id="email" class="swal2-input" placeholder="Email" value="${funcionario.email}">
      <input id="senha" type="password" class="swal2-input" placeholder="Senha (vazio = mantém)">
      <input id="dataNascimento" type="date" class="swal2-input" placeholder="Data Nascimento" value="${funcionario.dataNascimento?.split('T')[0] || ''}">
      <input id="cargo" class="swal2-input" placeholder="Cargo" value="${funcionario.cargo}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const dataNascimento = document.getElementById("dataNascimento").value;
      const cargo = document.getElementById("cargo").value.trim();

      if (!nome || !email || !dataNascimento || !cargo) {
        Swal.showValidationMessage("Todos os campos obrigatórios devem ser preenchidos!");
        return false;
      }

      return { nome, email, senha, dataNascimento, cargo };
    },
  });

  if (formValues) {
    try {
      await api.put("/Funcionarios/atualizar", null, {
        params: {
          id: funcionario.idFuncionario,
          nome: formValues.nome,
          email: formValues.email,
          senha: formValues.senha || "", 
          dataNascimento: formValues.dataNascimento,
          cargo: formValues.cargo,
          tipoFuncionarioId: funcionario.tipoFuncionario?.idTipoFuncionario,
          setorId: funcionario.setor?.idSetor,
          role: funcionario.role || "user"
        },
      });

      alertar("success", "Funcionário atualizado com sucesso!");
      listarFuncionario();
    } catch (error) {
      console.error(error);
      alertar("error", "Erro ao atualizar funcionário!");
    }
  }
}




  useEffect(() => {
    listarFuncionario();
  }, []);

  return (
    <div className="AttBodyADM">
      <Header />
      <main className="backgroundImagem">
        <div className="Janela_HomeAdm">
          <div className="Setoresn">
            <CarrosselADM />
          </div>

          <Lista
            funcionarios={funcionarios} 
            funcExcluir={deletarFuncionario}
            funcEditar={editarFuncionario}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeAdm;

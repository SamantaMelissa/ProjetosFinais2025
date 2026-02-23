import React, { useEffect, useState } from "react";
import "../../Pages/Gestor/gestor.css";
import Editar from "../../assets/img/Editar.svg";

import ApexChart from "../../Components/Graficos/Pizza/ApexChart.jsx";
import  Footer  from "../../Components/Footer/footer";
import  Header  from "../../Components/Header/header.jsx";
import Carousel from "../../Components/Carousel/carousel.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import api from "../../Services/services"; 
import Swal from "sweetalert2";

export default function Gestor() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [editarFunc, setEditarFunc] = useState(null); 

  useEffect(() => {
    async function carregarFuncionarios() {
      try {
        const resposta = await api.get("/Funcionarios/listar");
        setFuncionarios(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar funcionários:", erro);
        Swal.fire("Erro!", "Não foi possível carregar os funcionários.", "error");
      }
    }

    async function carregarTipos() {
      try {
        const resposta = await api.get("/TiposFuncionarios/listar");
        setTipos(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar tipos de funcionário:", erro);
      }
    }

    carregarFuncionarios();
    carregarTipos();
  }, []);

  async function salvarEdicao() {
    try {
      await api.put(`/Funcionarios/atualizar`, null, {
        params: {
          id: editarFunc.idFuncionario,
          nome: editarFunc.nome,
          email: editarFunc.email,
          senha: editarFunc.senha,
          dataNascimento: editarFunc.dataNascimento,
          cargo: editarFunc.cargo,
          tipoFuncionarioId: editarFunc.tipoFuncionarioId,
          setorId: editarFunc.setorId,
          role: editarFunc.role
        }
      });

      Swal.fire("Sucesso!", "Funcionário atualizado.", "success");

      
      setFuncionarios(prev =>
        prev.map(f => f.idFuncionario === editarFunc.idFuncionario ? editarFunc : f)
      );

      setEditarFunc(null); 
    } catch (erro) {
      console.error("Erro ao atualizar funcionário:", erro);
      Swal.fire("Erro!", "Não foi possível atualizar o funcionário.", "error");
    }
  }

  return (
    <>
      <Header />
      <main className="backgroundImagemM">
        <div className="Janela_Gestor">
          <div className="janelaMarketing">
            <h1 className="Marketing">Marketing</h1>
            <div className="quadrado">
              <div className="ListaFunc">
                <h2 className="LDE">Lista de Empregados</h2>

                {/* Cabeçalho */}
                <div className="Topicos">
                  <div className="Nomes"><h4>Nome</h4></div>
                  <div className="Cargos"><h4>Cargo</h4></div>
                  <div className="Editar"><h4>Editar</h4></div>
                </div>

                {funcionarios.length > 0 ? (
                  funcionarios.map((func) => (
                    <div key={func.idFuncionario} className="Topicos">
                      <div className="Nomes"><p>{func.nome}</p></div>
                      <div className="Cargos"><p>{func.tipoFuncionario?.tipoDeFuncionario || "Sem cargo"}</p></div>
                      <div className="Editar">
                        <button className="BotaoEditar" onClick={() => setEditarFunc(func)}>
                          <img src={Editar} alt="Editar" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center", marginTop: "10px" }}>Nenhum funcionário encontrado.</p>
                )}
              </div>
            </div>
          </div>

          <div className="FerramentasGrafico">
            <h1>Ferramentas</h1>
            <div className="Ferramntasexemplo"><Carousel /></div>
            <div className="grafico"><ApexChart /></div>
          </div>
        </div>
      </main>
      <Footer />

     
      {editarFunc && (
        <div className="modalBackground">
          <div className="modalContainer">
            <h2>Editar Funcionário</h2>

            <label>Nome:</label>
            <input
              type="text"
              value={editarFunc.nome}
              onChange={e => setEditarFunc({...editarFunc, nome: e.target.value})}
            />

            <label>Cargo:</label>
            <input
              type="text"
              value={editarFunc.cargo}
              onChange={e => setEditarFunc({...editarFunc, cargo: e.target.value})}
            />

            <label>Role:</label>
            <input
              type="text"
              value={editarFunc.role}
              onChange={e => setEditarFunc({...editarFunc, role: e.target.value})}
            />

            <div className="modalButtons">
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={() => setEditarFunc(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

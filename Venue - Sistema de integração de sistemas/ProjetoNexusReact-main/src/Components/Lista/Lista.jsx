import React from "react";
import "../Lista/Lista.css"; // seu CSS .listagem
import Editar from "../../assets/img/Editar.svg";
import Excluir from "../../assets/img/Excluir.svg";

const Lista = (props) => {
  const funcionariosLista = props.funcionarios || [];

  if (funcionariosLista.length === 0) return <p>Nenhum funcionário encontrado.</p>;

  return (
    <section className="listagem">
      <h1>Lista de Empregados</h1>
      <table className="tabela">
        <thead>
          <tr className="table_cabecalho">
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Data Nascimento</th>
            <th>Cargo</th>
            <th>Setor</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {funcionariosLista.map((item) => (
            <tr className="item_lista" key={item.idFuncionario}>
              <td data-cell="Nome">{item.nome}</td>
              <td data-cell="Email">{item.email}</td>
              <td data-cell="Senha">••••••••</td>
              <td data-cell="Data Nascimento">
                {item.dataNascimento ? item.dataNascimento.split("T")[0] : ""}
              </td>
              <td data-cell="Cargo">{item.cargo}</td>
              <td data-cell="Setor">{item.setor?.tipoSetor}</td>
              <td data-cell="Editar">
                <img
                  className="btn-editar"
                  src={Editar}
                  alt="Editar"
                  onClick={() => props.funcEditar(item)}
                />
              </td>
              <td data-cell="Excluir">
                <img
                  className="btn-excluir"
                  src={Excluir}
                  alt="Excluir"
                  onClick={() => props.funcExcluir(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Lista;

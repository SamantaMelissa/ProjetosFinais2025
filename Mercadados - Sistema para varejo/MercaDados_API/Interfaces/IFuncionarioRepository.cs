using Mercadados_API.Domains;

namespace Mercadados_API.Interfaces
{
    public interface IFuncionarioRepository
    {
        void Cadastrar(Funcionario funcionario);
        Funcionario BuscarPorId(Guid id);
        List<Funcionario> Listar();
        void Atualizar(Guid id, Funcionario funcionario);
        void Deletar(Guid id);
        void AtualizarFoto(Guid id, string caminhoFoto);

    }
}

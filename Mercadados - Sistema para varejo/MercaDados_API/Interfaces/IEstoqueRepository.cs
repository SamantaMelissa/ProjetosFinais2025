using Mercadados_API.Domains;


namespace Mercadados_API.Interfaces
{
    public interface IEstoqueRepository
    {
        void Cadastrar(Estoque estoque);
        Estoque BuscarPorId(Guid id);
        List<Estoque> Listar();
        void Atualizar(Guid id, Estoque estoque);
        void Deletar(Guid id);
    }
}

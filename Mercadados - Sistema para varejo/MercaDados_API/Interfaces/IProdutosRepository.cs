using Mercadados_API.Domains;

namespace Mercadados_API.Interfaces
{
    public interface IProdutosRepository
    {
        void Cadastrar(Produtos produto);
        Produtos BuscarPorId(Guid id);
        List<Produtos> Listar();
        void Atualizar(Guid id, Produtos produto);
        void Deletar(Guid id);
    }
}

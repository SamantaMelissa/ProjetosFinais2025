using Mercadados_API.Domains;


namespace Mercadados_API.Interfaces
{
    public interface IEstoqueProdutosRepository
    {
        void Cadastrar(EstoqueProdutos estoqueProduto);
        EstoqueProdutos BuscarPorId(Guid id);
        List<EstoqueProdutos> Listar();
        void Atualizar(Guid id, EstoqueProdutos estoqueProduto);
        void Deletar(Guid id);

    }
}

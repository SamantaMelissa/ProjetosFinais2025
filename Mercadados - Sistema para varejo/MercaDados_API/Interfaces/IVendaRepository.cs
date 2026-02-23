using Mercadados_API.Domains;


namespace Mercadados_API.Interfaces
{
    public interface IVendaRepository
    {
        void Cadastrar(Venda venda);
        Venda BuscarPorId(Guid id);
        List<Venda> Listar();
        void Atualizar(Guid id, Venda venda);
        void Deletar(Guid id);
    }
}

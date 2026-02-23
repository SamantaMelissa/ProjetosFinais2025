using NexusAPI.Domains;


namespace NexusAPI.Interfaces
{
    public interface IFuncionariosCursosRepository
    {
        List<Ferramentas> ListarTodos();
        Ferramentas BuscarPorId(Guid id);
        void Cadastrar(Ferramentas novaFerramenta);
        void Atualizar(Guid id, Ferramentas ferramentaAtualizada);
        void Deletar(Guid id);
    }
}
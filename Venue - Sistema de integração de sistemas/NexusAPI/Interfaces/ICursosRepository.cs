using NexusAPI.Domains;


namespace NexusAPI.Interfaces
    {
    public interface ICursosRepository
    {
        List<Cursos> ListarTodos();
        Cursos BuscarPorId(Guid id);
        void Cadastrar(Cursos novoCurso);
        void Atualizar(Guid id, Cursos cursoAtualizado);
        void Deletar(Guid id);
    }
}
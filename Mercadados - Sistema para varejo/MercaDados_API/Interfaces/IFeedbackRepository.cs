using Mercadados_API.Domains;


namespace Mercadados_API.Interfaces
{
    public interface IFeedbackRepository
    {
        void Cadastrar(Feedback feedback);
        Feedback BuscarPorId(Guid id);
        List<Feedback> Listar();
        void Atualizar(Guid id, Feedback feedback);
        void Deletar(Guid id);
    }
}

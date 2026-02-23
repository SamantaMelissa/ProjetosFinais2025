using Mercadados_API.Domains;

namespace Mercadados_API.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        void Cadastrar(TipoUsuario tipoUsuario);
        TipoUsuario BuscarPorId(Guid id);
        List<TipoUsuario> Listar();
        void Atualizar(Guid id, TipoUsuario tipoUsuario);
        void Deletar(Guid id);
    }
}

using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Mercadados_API.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly Context _context;

        public UsuarioRepository(Context context)
        {
            _context = context;
        }

        public void Cadastrar(Usuario usuario)
        {
            try
            {
                // Gera novo ID para o usuário
                usuario.UsuarioID = Guid.NewGuid();

                // Adiciona o usuário no contexto
                _context.Usuario.Add(usuario);

                // Salva no banco de dados
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("⚠️ Erro interno no EF: " + ex.InnerException?.Message);
                throw new Exception("Erro ao cadastrar usuário: " + ex.Message);
            }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                return _context.Usuario
                    .Include(u => u.TipoUsuario) // carrega o tipo de usuário relacionado
                    .FirstOrDefault(u => u.UsuarioID == id)!;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar usuário por ID: " + ex.Message);
            }
        }

        public Usuario BuscaPorEmailSenha(string email, string senha)
        {
            try
            {
                return _context.Usuario
                    .Include(u => u.TipoUsuario) // inclui o tipo de usuário também no login
                    .FirstOrDefault(u => u.Email == email && u.Senha == senha)!;
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao buscar usuário por e-mail e senha: " + ex.Message);
            }
        }
    }
}

using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;

namespace Mercadados_API.Repositories
{
    public class FuncionarioRepository : IFuncionarioRepository
    {
        private readonly Context _context;

        public FuncionarioRepository(Context context)
        {
            _context = context;
        }

        public void Atualizar(Guid id, Funcionario funcionario)
        {       
            try
            {
                Funcionario funcionarioBuscado = _context.Funcionario.Find(id)!;

                if(funcionarioBuscado != null)
                {
                    funcionarioBuscado.Email = funcionario.Email;
                    funcionarioBuscado.Senha = funcionario.Senha;
                    funcionarioBuscado.RuaENumero = funcionario.RuaENumero;
                    funcionarioBuscado.Numero = funcionario.Numero;
                    funcionarioBuscado.Complemento = funcionario.Complemento;
                }

                _context.Funcionario.Update(funcionarioBuscado!);
                _context.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public Funcionario BuscarPorId(Guid id)
        {

            try
            {
                return _context.Funcionario.Find(id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Funcionario funcionario)
        {
            try
            {
                funcionario.FuncionarioID = Guid.NewGuid();

                _context.Funcionario.Add(funcionario);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException?.Message);
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Funcionario funcionarioBuscado = _context.Funcionario.Find(id)!;

                if(funcionarioBuscado != null)
                {
                    _context.Funcionario.Remove(funcionarioBuscado);
                }

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Funcionario> Listar()
        {
            try
            {
                return _context.Funcionario.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void AtualizarFoto(Guid id, string caminhoFoto)
        {
            try
            {
                var usuarioBuscado = _context.Funcionario.Find(id);
                if (usuarioBuscado == null)
                    throw new Exception("Usuário não encontrado.");

                usuarioBuscado.FotoPerfil = caminhoFoto;

                _context.Funcionario.Update(usuarioBuscado);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

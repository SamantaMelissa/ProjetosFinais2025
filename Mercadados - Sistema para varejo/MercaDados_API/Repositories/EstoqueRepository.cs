using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;

namespace Mercadados_API.Repositories
{
    public class EstoqueRepository : IEstoqueRepository
    {
        private readonly Context _context;
        public EstoqueRepository(Context context)
        {
            _context = context;
        }
        public void Atualizar(Guid id, Estoque estoque)
        {
            try
            {
                Estoque estoqueBuscado = _context.Estoque.Find(id)!;

                if (estoqueBuscado != null)
                {
                    estoqueBuscado.Setor = estoque.Setor;
                    estoqueBuscado.Quantidade = estoque.Quantidade;
                }

                _context.Estoque.Update(estoqueBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Estoque BuscarPorId(Guid id)
        {
            try
            {
                return _context.Estoque.Find(id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Estoque estoque)
        {
            try
            {
                estoque.EstoqueID = Guid.NewGuid();
                _context.Estoque.Add(estoque);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Estoque estoqueBuscado = _context.Estoque.Find(id)!;

                if(estoqueBuscado != null)
                {
                    _context.Estoque.Remove(estoqueBuscado);
                }

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Estoque> Listar()
        {
            try
            {
                return _context.Estoque.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

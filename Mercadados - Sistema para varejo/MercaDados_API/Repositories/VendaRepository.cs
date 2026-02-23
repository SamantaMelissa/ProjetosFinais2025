using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;

namespace Mercadados_API.Repositories
{
    public class VendaRepository : IVendaRepository
    {
        private readonly Context _context;
        public VendaRepository(Context context)
        {
            _context = context;
        }

        public void Atualizar(Guid id, Venda venda)
        {
            try
            {
                Venda vendaBuscada = _context.Venda.Find(id)!;
                if (vendaBuscada != null)
                {
                    vendaBuscada.Valor = venda.Valor;
                    vendaBuscada.Quantidade = venda.Quantidade;
                }
              
                _context.Venda.Update(vendaBuscada!);
                _context.SaveChanges();

            }
            catch (Exception)
            {
                throw ;
            }
        }

       

        public Venda BuscarPorId(Guid id)
        {
            try
            {
               return _context.Venda.Find(id)!;

            }
            catch (Exception) 
            {
                throw;
            }

        }

        public void Cadastrar(Venda venda)
        {
            try
            {
                venda.VendaID = Guid.NewGuid();
                _context.Venda.Add(venda);
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
                Venda vendaBuscada = _context.Venda.Find(id)!;
                if (vendaBuscada != null)
                {
                    _context.Venda.Remove(vendaBuscada);
                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Venda> Listar()
        {
            try
            {
                return _context.Venda.ToList();

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

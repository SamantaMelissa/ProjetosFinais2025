using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;

namespace Mercadados_API.Repositories
{
    public class EstoqueProdutoRepository : IEstoqueProdutosRepository
    {


        private readonly Context _context;
        public EstoqueProdutoRepository(Context context)
        {
            _context = context;
        }

        public void Atualizar(Guid id, EstoqueProdutos estoqueProduto)
        {
            try
            {
                EstoqueProdutos estoqueProdutoBuscado = _context.EstoqueProdutos.Find(id)!;

                if (estoqueProdutoBuscado != null) 
                {
                    estoqueProdutoBuscado.QuantidadeEstoque = estoqueProduto.QuantidadeEstoque;
                    estoqueProdutoBuscado.DataAtualizacao = estoqueProduto.DataAtualizacao;
                }

                _context.EstoqueProdutos.Update(estoqueProdutoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

        }

        public EstoqueProdutos BuscarPorId(Guid id)
        {
            try
            {
                return _context.EstoqueProdutos.Find(id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(EstoqueProdutos estoqueProduto)
        {
            try
            {
                estoqueProduto.EstoqueProdutosID = Guid.NewGuid();
                _context.EstoqueProdutos.Add(estoqueProduto);
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
                EstoqueProdutos estoqueProdutoBuscado = _context.EstoqueProdutos.Find(id)!;

                if (estoqueProdutoBuscado != null)
                {
                    _context.EstoqueProdutos.Remove(estoqueProdutoBuscado);
                }

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<EstoqueProdutos> Listar()
        {
            try
            {
                return _context.EstoqueProdutos.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

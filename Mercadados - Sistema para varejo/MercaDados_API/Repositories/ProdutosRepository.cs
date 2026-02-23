using Mercadados_API.Contexts;
using Mercadados_API.Domains;
using Mercadados_API.Interfaces;

namespace Mercadados_API.Repositories
{
    public class ProdutosRepository : IProdutosRepository
    {
        private readonly Context _context;
        public ProdutosRepository(Context context)
        {
            _context = context;
        }
        public void Atualizar(Guid id, Produtos produto)
        {
            try
            {

                Produtos produtoBuscado = BuscarPorId(id);
                if (produtoBuscado != null)
                {
                    produtoBuscado.Nome = produto.Nome;
                    produtoBuscado.Valor = produto.Valor;
                    produtoBuscado.NumeroProduto = produto.NumeroProduto;
                    produtoBuscado.Validade = produto.Validade;
                    produtoBuscado.Peso = produto.Peso;
                    produtoBuscado.Setor = produto.Setor;
                    produtoBuscado.Fornecedor = produto.Fornecedor;
                }
                _context.Produtos.Update(produtoBuscado!);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Produtos BuscarPorId(Guid id)
        {
            try
            {
                return _context.Produtos.Find(id)!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Cadastrar(Produtos produto)
        {
            try
            {
                produto.ProdutoID = Guid.NewGuid();
                _context.Produtos.Add(produto);
                _context.SaveChanges();

            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Produtos produtoBuscado = BuscarPorId(id);
                if (produtoBuscado != null)
                {
                    _context.Produtos.Remove(produtoBuscado);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Produtos> Listar()
        {
            try
            {
                return _context.Produtos.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}

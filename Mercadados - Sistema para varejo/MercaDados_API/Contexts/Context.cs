using Mercadados_API.Domains;
using Mercadados_API.DTO;
using Mercadados_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Mercadados_API.Contexts
{
    public class Context : DbContext
    {
        public Context()
        {
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<TipoUsuario> TipoUsuario { get; set; }
        public DbSet<Produtos> Produtos { get; set; }
        public DbSet<Venda> Venda { get; set; }
        public DbSet<Estoque> Estoque { get; set; }
        public DbSet<EstoqueProdutos> EstoqueProdutos { get; set; }
        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<Imagem> Imagens { get; set; }
        public DbSet<Funcionario> Funcionario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server=tcp:ctmerca.database.windows.net,1433;Initial Catalog=serverctmercadados;Persist Security Info=False;User ID=ctmerca;Password=Senai@134;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

            }
        }
    };
}

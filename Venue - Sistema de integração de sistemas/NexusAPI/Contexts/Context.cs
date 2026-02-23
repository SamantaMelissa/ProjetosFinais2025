using Microsoft.EntityFrameworkCore;

namespace NexusAPI.Domains
{
    public class NexusContext : DbContext
    {
        // Construtor para injeção de dependência
        public NexusContext(DbContextOptions<NexusContext> options) : base(options) { }

        // DbSets
        public DbSet<Cursos> Cursos { get; set; }
        public DbSet<Ferramentas> Ferramentas { get; set; }
        public DbSet<Funcionarios> Funcionarios { get; set; }
        public DbSet<FuncionariosCursos> FuncionariosCursos { get; set; }
        public DbSet<Setores> Setores { get; set; }
        public DbSet<TiposFuncionarios> TiposFuncionarios { get; set; }

        // Configuração caso o contexto seja instanciado sem DI
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    "Server=NOTE22-S28\\SQLEXPRESS; Database=nexus; User Id=sa; Pwd=Senai@134; TrustServerCertificate=true;"
                );
            }
        }
    }
}

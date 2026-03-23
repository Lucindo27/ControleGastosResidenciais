using Microsoft.EntityFrameworkCore;
using backend.Controllers.Model;

namespace backend.Controllers.Data
{
    // Classe de contexto do banco, responsável por gerenciar as entidades e a conexão com o banco
    public class AppDbContext : DbContext
    {
        // Representam as tabelas no banco
        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Transacao> Transacao { get; set; }

        // Construtor que recebe as opções de configuração do contexto
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}

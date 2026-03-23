using backend.Controllers.Data;
using backend.Controllers.Model;

namespace backend.Services
{
    public class CategoriaService
    {
        private readonly AppDbContext context;

        public CategoriaService(AppDbContext contextParam)
        {
            context = contextParam;
        }

        // Adiciona uma nova categoria no banco
        public Categoria CriarCategoria(Categoria categoria)
        {
            context.Categorias.Add(categoria);
            context.SaveChanges();

            return categoria;
        }

        // Retorna todas as categorias cadastradas
        public List<Categoria> ListarCategorias()
        {
            return context.Categorias.ToList();
        }
    }
}

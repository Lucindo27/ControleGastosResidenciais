using backend.Controllers.Model;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService categoria;

        public CategoriaController(CategoriaService categoriaParam)
        {
            categoria = categoriaParam;
        }

        // Endpoint GET: retorna todas as categorias cadastradas
        [HttpGet]
        public IActionResult Get()
        {
            var categorias = categoria.ListarCategorias();
            return Ok(categorias);
        }

        // Endpoint POST: cria uma nova categoria a partir dos dados enviados
        [HttpPost]
        public IActionResult Post(Categoria categoriaParam)
        {
            var nova = categoria.CriarCategoria(categoriaParam);
            return Ok(nova);
        }
    }
}

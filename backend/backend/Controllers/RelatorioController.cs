using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly RelatorioService relatorio;

        public RelatorioController(RelatorioService relatorioParam)
        {
            relatorio = relatorioParam;
        }

        // Endpoint GET: retorna todos os dados registrados
        [HttpGet]
        public IActionResult Get()
        {
            var resultado = relatorio.ObterRelatorio();
            return Ok(resultado);
        }
    }
}

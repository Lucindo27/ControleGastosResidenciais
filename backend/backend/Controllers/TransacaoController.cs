using backend.Controllers.Model;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacoesController(TransacaoService service)
        {
            _service = service;
        }

        // Endpoint GET: retorna todas as transações cadastradas
        [HttpGet]
        public IActionResult Get()
        {
            var lista = _service.ListarTransacoes();
            return Ok(lista);
        }

        // Endpoint POST: cria uma nova transação
        [HttpPost]
        public IActionResult Post(Transacao transacao)
        {
            var resultado = _service.CriarTransacao(transacao);
            
            if (resultado != "OK")
                return BadRequest(resultado);

            return Ok();
        }
    }
}

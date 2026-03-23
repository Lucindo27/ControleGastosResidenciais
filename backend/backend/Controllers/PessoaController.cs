using Microsoft.AspNetCore.Mvc;
using backend.Controllers.Data;
using backend.Controllers.Model;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaService pessoa;

        public PessoaController(PessoaService pessoaParam)
        {
            pessoa = pessoaParam;
        }

        // Endpoint GET: retorna todas as pessoas cadastradas
        [HttpGet]
        public IActionResult Get()
        {
            var pessoas = pessoa.ListarPessoasCadastradas();
            return Ok(pessoas);
        }

        // Endpoint POST: adiciona uma nova pessoa
        [HttpPost]
        public IActionResult Post(Pessoa pessoaParam)
        {
            var novaPessoa = pessoa.AdicionarPessoa(pessoaParam);
            return Ok(novaPessoa);
        }

        // Endpoint PUT: atualiza os dados de uma pessoa
        [HttpPut("{id}")]
        public IActionResult Put(int id, Pessoa pessoaParam)
        {
            var pessoaEditar = pessoa.EditarPessoa(id, pessoaParam);

            // Verifica se a pessoa foi encontrada
            if (pessoaEditar == false)
                return NotFound(pessoaEditar);

            return Ok(pessoaEditar);
        }

        // Endpoint DELETE: remove uma pessoa
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pessoaDeletar = pessoa.DeletarPessoa(id);

            // Verifica se a pessoa foi encontrada
            if (pessoaDeletar == false)
                return NotFound(pessoaDeletar);

            return NoContent();
        }
    }
}

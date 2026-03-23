using backend.Controllers.Data;
using backend.Controllers.Model;

namespace backend.Services
{
    public class PessoaService
    {
        private readonly AppDbContext context;

        public PessoaService(AppDbContext contextParam)
        {
            context = contextParam;
        }

        // Adiciona uma nova pessoa no banco
        public Pessoa AdicionarPessoa(Pessoa pessoa)
        {
            context.Pessoa.Add(pessoa);
            context.SaveChanges();

            return pessoa;
        }

        // Retorna todas as pessoas cadastradas
        public List<Pessoa> ListarPessoasCadastradas()
        {
            return context.Pessoa.ToList();
        }

        // Atualiza os dados de uma pessoa cadastrada
        public bool EditarPessoa(int id, Pessoa pessoaEditar)
        {
            // Busca a pessoa no banco
            var pessoa = context.Pessoa.Find(id);

            // Verifica se essa pessoa existe
            if (pessoa == null)
                return false;

            // Atualiza os dados 
            pessoa.Nome = pessoaEditar.Nome;
            pessoa.Idade = pessoaEditar.Idade;

            context.SaveChanges();

            return true;
        }

        // Remove uma pessoa e suas transações relacionadas
        public bool DeletarPessoa(int id)
        {
            // Busca a pessoa no banco
            var pessoa = context.Pessoa.Find(id);

            // Verifica se a pessoa existe
            if (pessoa == null)
                return false;

            // Busca todas as transações vinculadas à pessoa
            var transacoes = context.Transacao.Where(t => t.IdPessoa == id).ToList();

            // Remove as transações e pessoa 
            context.Transacao.RemoveRange(transacoes);
            context.Pessoa.Remove(pessoa);

            context.SaveChanges();

            return true;
        }
    }
}

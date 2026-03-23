using backend.Controllers.Data;
using backend.DTOs;

namespace backend.Services
{
    public class RelatorioService
    {
        private readonly AppDbContext context;

        public RelatorioService(AppDbContext contextParam)
        {
            context = contextParam;
        }

        // Gera relatório com totais por pessoa e totais gerais
        public object ObterRelatorio()
        {
            // Busca todas as pessoas e transações do banco
            var pessoas = context.Pessoa.ToList();
            var transacoes = context.Transacao.ToList();

            var relatorio = new List<RelatorioPessoaDTO>();

            // Percorre cada pessoa para calcular seus totais
            foreach (var pessoa in pessoas)
            {
                // Soma das receitas da pessoa
                var receitas = transacoes
                    .Where(t => t.IdPessoa == pessoa.Id && t.Tipo == "receita")
                    .Sum(t => t.Valor);

                // Soma das despesas da pessoa
                var despesas = transacoes
                    .Where(t => t.IdPessoa == pessoa.Id && t.Tipo == "despesa")
                    .Sum(t => t.Valor);

                // Adiciona os dados calculados no relatório
                relatorio.Add(new RelatorioPessoaDTO
                {
                    Nome = pessoa.Nome,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                });
            }

            // Calcula os totais gerais de todas as pessoas
            var totalReceitas = relatorio.Sum(r => r.TotalReceitas);
            var totalDespesas = relatorio.Sum(r => r.TotalDespesas);

            // Retorna o resultado final do relatório
            return new
            {
                Pessoas = relatorio,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                SaldoGeral = totalReceitas - totalDespesas
            };
        }
    }
}

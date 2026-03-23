using backend.Controllers.Data;
using backend.Controllers.Model;

namespace backend.Services
{
    public class TransacaoService
    {
        private readonly AppDbContext context;

        public TransacaoService(AppDbContext contextParam)
        {
            context = contextParam;
        }

        // Cria uma nova transação com validações de negócio
        public string CriarTransacao(Transacao transacaoParam)
        {
            var pessoa = context.Pessoa.Find(transacaoParam.IdPessoa);
            var categoria = context.Categorias.Find(transacaoParam.IdCategoria);

            // Validação do campos que compõe uma transação
            if (pessoa == null)
                return "Pessoa não encontrada";
            
            if (categoria == null)
                return "Categoria não encontrada";
                        
            if (pessoa.Idade < 18 && transacaoParam.Tipo == "receita")
                return "Menor de idade não pode ter receita";
                        
            if (transacaoParam.Tipo == "despesa" && categoria.Finalidade == "receita")
                return "Categoria inválida para despesa";

            if (transacaoParam.Tipo == "receita" && categoria.Finalidade == "despesa")
                return "Categoria inválida para receita";

            context.Transacao.Add(transacaoParam);
            context.SaveChanges();

            return "OK";
        }

        // Retorna todas as transações cadastradas
        public List<Transacao> ListarTransacoes()
        {
            return context.Transacao.ToList();
        }
    }
}

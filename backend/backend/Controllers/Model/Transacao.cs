namespace backend.Controllers.Model
{
    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public int IdPessoa { get; set; }
        public int IdCategoria { get; set; }
    }
}

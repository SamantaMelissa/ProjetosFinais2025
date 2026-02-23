using Mercadados_API.Domains;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("Venda")]
public class Venda
{
    [Key]
    public Guid VendaID { get; set; }

    [Column(TypeName = "FLOAT")]
    [Required]
    public float Valor { get; set; }

    [Column(TypeName = "INT")]
    [Required]
    public int Quantidade { get; set; }

    public Guid ProdutoID { get; set; }
    public Produtos? Produtos { get; set; }

    public Guid? FeedbackID { get; set; }
    public Feedback? Feedback { get; set; }

    [Column(TypeName = "datetime2")]
    public DateTime DataVenda { get; set; }
}

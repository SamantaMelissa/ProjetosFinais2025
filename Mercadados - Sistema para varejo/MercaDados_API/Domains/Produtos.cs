using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Mercadados_API.DTO;

[Table("Produtos")]
public class Produtos
{
    [Key]
    public Guid ProdutoID { get; set; }

    [Column(TypeName = "Varchar(200)")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public string? Nome { get; set; }

    [Column(TypeName = "Float")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public float Valor { get; set; }

    [Column(TypeName = "INT")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public int NumeroProduto { get; set; }

    [Column(TypeName = "DATE")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public DateTime Validade { get; set; }

    [Column(TypeName = "Varchar(250)")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public string? Peso { get; set; }

    [Column(TypeName = "Varchar(250)")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public string? Setor { get; set; }

    [Column(TypeName = "VARCHAR(250)")]
    public string? Fornecedor { get; set; }

    [Column(TypeName = "Varchar(255)")]
    [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
    public string? Imagem { get; set; }
}
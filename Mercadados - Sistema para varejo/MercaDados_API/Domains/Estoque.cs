using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Mercadados_API.Domains
{
    [Table("Estoque")]
    public class Estoque
    {
        [Key]
        public Guid EstoqueID { get; set; }

        [Column(TypeName = "Varchar(200)")]
        [Required(ErrorMessage = "Setor é obrigatorio!")]
        public string? Setor { get; set; }

        [Column(TypeName = "INT")]
        [Required(ErrorMessage = "Quantidade é obrigatorio!")]
        public int Quantidade { get; set; }

    }
}

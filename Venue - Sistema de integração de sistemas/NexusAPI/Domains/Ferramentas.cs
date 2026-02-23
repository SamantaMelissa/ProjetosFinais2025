using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace NexusAPI.Domains
{
    
    [Table("Ferramentas")]
    public class Ferramentas
    {
        [Key]
        public Guid IdFerramenta { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O nome da ferramenta é obrigatório!")]
        public string? Nome { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "A descrição do curso é obrigatória!")]
        public string? Descricao { get; set; }

        [Column(TypeName = "VARCHAR(500)")]
        [Required(ErrorMessage = "A url é obrigatória!")]
        public string? Url { get; set; }

        [Column(TypeName = "BIT")]
        [Required(ErrorMessage = "Status é obrigatório!")]
        public bool Status { get; set; }

        [Column(TypeName = "VARCHAR (100)")]
        [Required(ErrorMessage = "Tipo de ferramenta é obrigatório!")]
        public string? Tipo { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexusAPI.Domains
{
    [Table("Setores")]
    public class Setores
    {
        [Key]
        public Guid IdSetor { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O nome do setor é obrigatório!")]
        public string? TipoSetor { get; set; }
    }
}

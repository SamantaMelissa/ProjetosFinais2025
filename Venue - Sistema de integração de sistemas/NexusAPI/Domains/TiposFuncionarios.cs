using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexusAPI.Domains
{

    [Table("TiposFuncionarios")]
    public class TiposFuncionarios
    {
        [Key]
        public Guid IdTipoFuncionario { get; set; }

        [Column(TypeName = "VARCHAR(50)")]
        [Required(ErrorMessage = "O tipo do funcionário é obrigatório")]
        public string TipoDeFuncionario { get; set; }
    }
}

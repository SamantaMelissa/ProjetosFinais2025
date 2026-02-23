using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexusAPI.Domains
{
    [Table("FuncionariosFerramentas")]
    public class FuncionarioFerramentas
    {
        [Key]
        public Guid IdFuncionarioFerramenta { get; set; }

        
        [Required]
        public Guid FuncionarioId { get; set; }

        [ForeignKey("FuncionarioId")]
        public Funcionarios? Funcionario { get; set; }

        
        [Required]
        public Guid FerramentaId { get; set; }

        [ForeignKey("FerramentaId")]
        public Ferramentas? Ferramenta { get; set; }
    }
}

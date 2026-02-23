using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexusAPI.Domains
{
    [Table("FuncionariosCursos")]
    public class FuncionariosCursos
    {
        [Key]
        public Guid IdFuncionarioCurso { get; set; }

        
        [Required]
        public Guid CursoId { get; set; }

        [ForeignKey("CursoId")]
        public Cursos? Curso { get; set; }

        
        [Required]
        public Guid FuncionarioId { get; set; }

        [ForeignKey("FuncionarioId")]
        public Funcionarios? Funcionario { get; set; }
    }
}

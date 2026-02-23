using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexusAPI.Domains
{
    [Table ("Cursos")]

    public class Cursos
    {
        [Key]
        public Guid IdCurso { get; set; }

        [Column (TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O id externo é obrigátorio!")]
        public string? IdExterno { get; set; }

        [Column(TypeName ="VARCHAR(250)")]
        [Required(ErrorMessage ="O titulo é obrigátorio!")]
        public string? Titulo { get; set; }

        [Column(TypeName ="VARCHAR(500)")]
        [Required(ErrorMessage ="A url é obrigátoria!")]
        public string? Url { get; set; }
    }
}

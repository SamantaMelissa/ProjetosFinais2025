
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mercadados_API.Domains
{
    public class Feedback
    {
        [Key]
        public Guid FeedbackID { get; set; }

        [Column(TypeName = "Varchar(200)")]
        [Required(ErrorMessage = "A nota é obrigatorio")]
        public string? Nota { get; set; }

        [ForeignKey("Funcionario")]
        public Guid FuncionarioID { get; set; }
        public Funcionario? Funcionario { get; set; }

        [Column(TypeName = "DATETIME")]
        [Required(ErrorMessage = "A data do feedback é obrigatorio")]
        public DateTime DataFeedback { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mercadados_API.Domains
{
    public class TipoUsuario
    {
        [Key]
        public Guid TipoUsuarioID { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O título do tipo de usuário é obrigatório!")]
        public string? TituloTipoUsuario { get; set; }
    }
}

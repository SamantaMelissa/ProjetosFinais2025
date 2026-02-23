using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mercadados_API.Domains
{
    public class Usuario
    {
        [Key]
        public Guid UsuarioID { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O nome do usuário é obrigatório!")]
        public string? NomeUsuario { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O email do usuário é obrigatório!")]
        public string? Email { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "A senha do usuário é obrigatória!")]
        public string? Senha { get; set; }

        [ForeignKey("TipoUsuario")]
        public Guid TipoUsuarioID { get; set; }
        public TipoUsuario? TipoUsuario { get; set; }

        [Column(TypeName = "VARCHAR(13)")]
        [Required(ErrorMessage = "O telefone do usuário é obrigatória!")]
        public string? Numero { get; set; }

        [Column(TypeName = "VARCHAR(14)")]
        [Required(ErrorMessage = "O CPF/CNPJ do usuário é obrigatória!")]
        public string? Cpf { get; set; }


    }
}

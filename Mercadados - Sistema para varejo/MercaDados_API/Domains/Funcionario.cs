using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Mercadados_API.Models;
using Mercadados_API.DTO;
using Microsoft.VisualBasic;

namespace Mercadados_API.Domains
{
    public class Funcionario
    {
        [Key]
        public Guid FuncionarioID { get; set; }

        [Column(TypeName = "DATE")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }


        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        public string? NomeFuncionario { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        public string? Email { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        public string? Senha { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        public string? Genero { get; set; }

        [Column(TypeName = "VARCHAR(200)")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        [RegularExpression(@"^[A-Za-zÀ-ú0-9\s]+, \d+[A-Za-zÀ-ú0-9\s]*$", ErrorMessage = "Informe no formato: Rua/Avenida, número")]
        public string? RuaENumero { get; set; }

        [Column(TypeName = "VARCHAR(200)")]
        [Required(ErrorMessage = "Este campo precisa estar preenchido!")]
        [StringLength(200, MinimumLength = 10, ErrorMessage = "A informação deve ter entre 10 e 200 caracteres.")]
        [RegularExpression(@"^[A-Za-zÀ-ú\s]+, [A-Z]{2}, \d{5}-\d{3}$", ErrorMessage = "Informe no formato: Cidade, Estado, CEP")]
        public string? CidadeEstadoCEP { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        public string? Complemento { get; set; }


        [Column(TypeName = "VARCHAR(13)")]
        [Required(ErrorMessage = "O telefone do usuário é obrigatória!")]
        public string? Numero { get; set; }

        [Column(TypeName = "VARCHAR(14)")]
        [Required(ErrorMessage = "O CPF/CNPJ do usuário é obrigatória!")]
        public string? Cpf { get; set; }

        [ForeignKey("Usuario")]
        public Guid UsuarioID { get; set; }
        public Usuario? Usuario { get; set; }
        [Column(TypeName = "VARCHAR(300)")]
        public string? FotoPerfil { get; set; }
    }
}

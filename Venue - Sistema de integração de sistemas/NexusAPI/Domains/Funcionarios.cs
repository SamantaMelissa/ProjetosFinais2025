using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexusAPI.Domains
{
   
    [Table("Funcionarios")]
    public class Funcionarios
    {
        [Key]
        public Guid IdFuncionario { get; set; }

        // FK para TipoFuncionario
        [Required]
        public Guid TipoFuncionarioId { get; set; }
        [ForeignKey("TipoFuncionarioId")]
        public TiposFuncionarios? TipoFuncionario { get; set; }

        // FK para Setor
        [Required]
        public Guid SetorId { get; set; }
        [ForeignKey("SetorId")]
        public Setores? Setor { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O nome do funcionário é obrigatório")]
        public string? Nome { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O email do funcionário é obrigatório")]
        public string? Email { get; set; }

        [Column(TypeName = "VARCHAR(60)")]
        [Required(ErrorMessage = "A senha do funcionário é obrigatória!")]
        public string? Senha { get; set; }

        [Column(TypeName = "DATE")]
        [Required(ErrorMessage = "A data de nascimento é obrigatória")]
        public DateTime DataNascimento { get; set; }

        [Column(TypeName = "VARCHAR(100)")]
        [Required(ErrorMessage = "O cargo é obrigatório!")]
        public string? Cargo { get; set; }
    }

}

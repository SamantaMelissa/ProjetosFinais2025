using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Mercadados_API.Domains
{
    [Table("EstoqueProdutos")]
    public class EstoqueProdutos
    {
        [Key]
        public Guid EstoqueProdutosID { get; set; }

        [Column(TypeName = "Int")]
        [Required(ErrorMessage = "A Quantidade e obrigatorio")]
        public int QuantidadeEstoque { get; set; }
        public DateTime DataAtualizacao { get; set; }

        [ForeignKey("ProdutosID")]
        public Guid ProdutosID { get; set; }
        public Produtos? Produtos { get; set; }

        [ForeignKey("EstoqueID")]
        public Guid EstoqueID { get; set; }
        public Estoque? Estoque { get; set; }
    }
}

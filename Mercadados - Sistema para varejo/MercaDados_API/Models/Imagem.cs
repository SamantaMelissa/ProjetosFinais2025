using System.ComponentModel.DataAnnotations;

namespace Mercadados_API.Models
{
    public class Imagem
    {
        [Key]
        public Guid ImagemID { get; set; }

        [StringLength(255)]
        public string Nome { get; set; } = null!;

        [StringLength(500)]
        public string Caminho { get; set; } = null!;
    }
}

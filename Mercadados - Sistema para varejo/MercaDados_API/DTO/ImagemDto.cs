using System.ComponentModel.DataAnnotations;

namespace Mercadados_API.DTO
{
    public partial class ImagemDto
    {
        public IFormFile? Arquivo { get; set; }
        public string? Nome { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Mercadados_API.DTO
{
    public class PutImagemDto
    {
        public IFormFile? Arquivo { get; set; }
        public string? Nome { get; set; }
    }
}

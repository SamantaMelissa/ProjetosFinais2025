using Mercadados_API.Domains;
using Mercadados_API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mercadados_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutosRepository _produtosRepository;
        private readonly IWebHostEnvironment _environment;

        public ProdutosController(IProdutosRepository produtosRepository, IWebHostEnvironment environment)
        {
            _produtosRepository = produtosRepository;
            _environment = environment;
        }

        [HttpPost]
        public IActionResult Post([FromForm] Produtos produtos, IFormFile imagem)
        {
            try
            {
                if (imagem == null || imagem.Length == 0)
                {
                    return BadRequest("A imagem do produto é obrigatória!");
                }

                // Criar pasta se não existir
                string pasta = Path.Combine(_environment.WebRootPath ?? "wwwroot", "imagensProdutos");
                if (!Directory.Exists(pasta))
                    Directory.CreateDirectory(pasta);

                // Gerar nome único e salvar
                string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
                string caminhoCompleto = Path.Combine(pasta, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    imagem.CopyTo(stream);
                }

                // Salva o caminho relativo no banco
                produtos.Imagem = $"imagensProdutos/{nomeArquivo}";

                _produtosRepository.Cadastrar(produtos);
                return StatusCode(201, produtos);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_produtosRepository.Listar());
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                var produto = _produtosRepository.BuscarPorId(id);
                if (produto == null) return NotFound("Produto não encontrado.");
                return Ok(produto);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromForm] Produtos produtos, IFormFile? imagem)
        {
            try
            {
                var produtoExistente = _produtosRepository.BuscarPorId(id);
                if (produtoExistente == null)
                    return NotFound("Produto não encontrado.");

                // Se tiver imagem nova, substitui
                if (imagem != null)
                {
                    string pasta = Path.Combine(_environment.WebRootPath ?? "wwwroot", "imagensProdutos");
                    string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
                    string caminhoCompleto = Path.Combine(pasta, nomeArquivo);

                    using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                    {
                        imagem.CopyTo(stream);
                    }

                    produtos.Imagem = $"imagensProdutos/{nomeArquivo}";
                }
                else
                {
                    produtos.Imagem = produtoExistente.Imagem;
                }

                _produtosRepository.Atualizar(id, produtos);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _produtosRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}
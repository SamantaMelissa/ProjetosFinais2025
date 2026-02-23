using Mercadados_API.Domains;
using Mercadados_API.Interfaces;
using Mercadados_API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Mercadados_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class FuncionarioController : ControllerBase
    {
        private readonly IFuncionarioRepository _funcionarioRepository;

        public FuncionarioController(IFuncionarioRepository funcionarioRepository)
        {
            _funcionarioRepository = funcionarioRepository;
        }

        [HttpPost]
        public IActionResult Post(Funcionario funcionario)
        {
            try
            {
                if (funcionario.Usuario != null && funcionario.Usuario.TipoUsuario != null)
                {
                    funcionario.Usuario.TipoUsuario.TituloTipoUsuario = "Funcionario";
                }

                _funcionarioRepository.Cadastrar(funcionario);
                return StatusCode(201, funcionario);
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
                _funcionarioRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Funcionario funcionario)
        {
            try
            {
                _funcionarioRepository.Atualizar(id, funcionario);
                return StatusCode(201, funcionario);
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
                return Ok(_funcionarioRepository.BuscarPorId(id));
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
                return Ok(_funcionarioRepository.Listar());
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPost("upload-foto/{id}")]
        public async Task<IActionResult> UploadFoto(Guid id, IFormFile arquivo)
        {
            if (arquivo == null || arquivo.Length == 0)
                return BadRequest("Nenhum arquivo enviado.");

            try
            {
                // 📁 Cria a pasta de destino, se não existir
                var pastaDestino = Path.Combine("wwwroot", "imagens");
                if (!Directory.Exists(pastaDestino))
                    Directory.CreateDirectory(pastaDestino);

                // 📸 Gera um nome único para o arquivo
                var nomeArquivo = $"{Guid.NewGuid()}{Path.GetExtension(arquivo.FileName)}";
                var caminhoCompleto = Path.Combine(pastaDestino, nomeArquivo);

                // 💾 Salva o arquivo fisicamente
                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await arquivo.CopyToAsync(stream);
                }

                // 🖼️ Define o caminho relativo (para o frontend)
                var caminhoRelativo = $"/imagens/{nomeArquivo}";

                // 🧩 Atualiza apenas o campo de foto no banco
                _funcionarioRepository.AtualizarFoto(id, caminhoRelativo);

                return Ok(new
                {
                    message = "Upload realizado com sucesso!",
                    caminho = caminhoRelativo
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao fazer upload: {ex.Message}");
            }
        }
    }
}
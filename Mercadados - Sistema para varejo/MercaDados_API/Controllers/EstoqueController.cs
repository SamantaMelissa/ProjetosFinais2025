using Mercadados_API.Domains;
using Mercadados_API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mercadados_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class EstoqueController : ControllerBase
    {
        private readonly IEstoqueRepository _estoqueRepository;
        public EstoqueController(IEstoqueRepository estoqueRepository)
        {
            _estoqueRepository = estoqueRepository;
        }

        [HttpPost]
        public IActionResult Post(Estoque estoque)
        {
            try
            {
                _estoqueRepository.Cadastrar(estoque);
                return StatusCode(201, estoque);
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
                _estoqueRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Estoque estoque)
        {
            try
            {
                _estoqueRepository.Atualizar(id, estoque);
                return StatusCode(204, estoque);
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
                return Ok(_estoqueRepository.BuscarPorId(id));
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
                return Ok(_estoqueRepository.Listar());
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}

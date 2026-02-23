using Mercadados_API.Interfaces;
using Mercadados_API.Domains;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Mercadados_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class EstoqueProdutosController : ControllerBase
    {
        private readonly IEstoqueProdutosRepository _estoqueProdutosRepository;
        public EstoqueProdutosController(IEstoqueProdutosRepository estoqueProdutosRepository)
        {
            _estoqueProdutosRepository = estoqueProdutosRepository;
        }

        [HttpPost]
        public IActionResult Post(EstoqueProdutos estoqueProdutos)
        {
            try
            {
                _estoqueProdutosRepository.Cadastrar(estoqueProdutos);
                return StatusCode(201, estoqueProdutos);
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
                _estoqueProdutosRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Guid id, EstoqueProdutos estoqueProdutos)
        {
            try
            {
                _estoqueProdutosRepository.Atualizar(id, estoqueProdutos);
                return StatusCode(204, estoqueProdutos);
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
                return Ok(_estoqueProdutosRepository.BuscarPorId(id));
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
                return Ok(_estoqueProdutosRepository.Listar());
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}

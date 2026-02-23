using Mercadados_API.Domains;
using Mercadados_API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mercadados_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class VendaController : ControllerBase
    {
        private readonly IVendaRepository _vendaRepository;

        public VendaController(IVendaRepository vendaRepository)
        {
            _vendaRepository = vendaRepository;
        }



        //void Deletar(Guid id);

        [HttpPost]
        public IActionResult Post([FromBody] Venda venda)
        {
            try
            {
                venda.VendaID = Guid.NewGuid();

                // 👇 AQUI REGISTRA A DATA AUTOMATICA
                venda.DataVenda = DateTime.Now;

                _vendaRepository.Cadastrar(venda);

                return StatusCode(201, venda);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }



        [HttpGet("BuscarPorId/{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(_vendaRepository.BuscarPorId(id));

            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet("Listar")]
        public IActionResult Get()
        {
            try
            {
                return Ok(_vendaRepository.Listar());

            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(Venda venda, Guid id)
        {
            try
            {
                _vendaRepository.Atualizar(id, venda);

                return StatusCode(204, venda);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id) 
        {
            try
            {
                _vendaRepository.Deletar(id);
                return NoContent();

            }
            catch (Exception error) 
            {
                return BadRequest(error);
            }
        }   
    }
}

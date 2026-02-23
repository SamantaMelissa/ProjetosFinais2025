using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Mercadados_API.Domains;
using Mercadados_API.DTO;
using Mercadados_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Mercadados_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IFuncionarioRepository _funcionarioRepository;

        private const string JwtKey = "eventos-chave-autenticacao-Mercadados-dev";
        private const int JwtExpireMinutes = 30;

        public LoginController(IUsuarioRepository usuarioRepository, IFuncionarioRepository funcionarioRepository)
        {
            _usuarioRepository = usuarioRepository;
            _funcionarioRepository = funcionarioRepository;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO loginDto)
        {
            try
            {
                if (loginDto == null || string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Senha))
                    return BadRequest("Email e senha são obrigatórios.");

                // 🔍 Primeiro tenta achar um FUNCIONÁRIO
                var funcionarioBuscado = _funcionarioRepository
                    .Listar()
                    .FirstOrDefault(f => f.Email == loginDto.Email && f.Senha == loginDto.Senha);

                Usuario usuarioBuscado = null;

                // 🔍 Se não achar funcionário, tenta como USUÁRIO (Admin)
                if (funcionarioBuscado == null)
                {
                    usuarioBuscado = _usuarioRepository.BuscaPorEmailSenha(loginDto.Email, loginDto.Senha);
                }

                if (usuarioBuscado == null && funcionarioBuscado == null)
                    return NotFound("Email ou senha inválidos!");

                var claims = new List<Claim>();

                if (funcionarioBuscado != null)
                {
                    // ✅ FUNCIONÁRIO
                    claims.Add(new Claim("FuncionarioID", funcionarioBuscado.FuncionarioID.ToString()));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Email, funcionarioBuscado.Email!));
                    claims.Add(new Claim("Tipo", "Funcionario"));
                    claims.Add(new Claim("UsuarioID", funcionarioBuscado.UsuarioID.ToString()));
                }
                else if (usuarioBuscado != null)
                {
                    // ✅ ADMIN (usuário)
                    claims.Add(new Claim("UsuarioID", usuarioBuscado.UsuarioID.ToString()));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email!));

                    // Força o tipo "Admin" para usuários do tipo administrador
                    string tipo = usuarioBuscado.TipoUsuario?.TituloTipoUsuario?.ToLower() == "admin"
                        ? "Admin"
                        : "Usuario";

                    claims.Add(new Claim("Tipo", tipo));
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "Mercadados_API",
                    audience: "Mercadados_API",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(JwtExpireMinutes),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao processar o login: {ex.Message}");
            }
        }
    }
}

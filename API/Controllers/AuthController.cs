using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Models;
using ProjetoFinalC_.Services;
using ProjetoFinalC_.Services.Interfaces;
using System.Security.Claims;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserService userService, ITokenService tokenService, IConfiguration configuration)
        {
            _userService = userService;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try

            {
                var user = await _userService.GetUserByEmailAndPasswordAsync(loginModel.Email, loginModel.Password);

                if (user == null)
                {
                    return Unauthorized("Invalid credentials");
                }

                // Create claims for the user
                var claims = new[]
                {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
            };

                // Generate a JWT token
                var token = _tokenService.GenerateToken(claims);

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error during login: {ex.Message}");
            }
        }
    }

}

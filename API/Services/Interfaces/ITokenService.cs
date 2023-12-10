using System.Security.Claims;

namespace ProjetoFinalC_.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(IEnumerable<Claim> claims);
        ClaimsPrincipal ValidateToken(string token);
    }
}

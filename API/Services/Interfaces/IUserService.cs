using ProjetoFinalC_.Entities;
using System.Security.Claims;

namespace ProjetoFinalC_.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
    }
}
using Microsoft.EntityFrameworkCore;
using ProjetoFinalC_.Data;
using ProjetoFinalC_.Entities;

namespace ProjetoFinalC_.Services
{
    public class UserService
    {
        private readonly Context _context;

        public UserService(Context context)
        {
            _context = context;
        }
        public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            // Example: Find a user by email and password
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}

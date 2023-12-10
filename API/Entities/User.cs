using Microsoft.AspNetCore.Identity;

namespace ProjetoFinalC_.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<Sale> Sales { get; set; }
    }
}

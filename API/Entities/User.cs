using Microsoft.AspNetCore.Identity;

namespace ProjetoFinalC_.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string Name { get; set; }
        public ICollection<Sale> Sales { get; set; }
    }
}

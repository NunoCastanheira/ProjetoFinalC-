using Microsoft.AspNetCore.Identity;
using ProjetoFinalC_.Data;
using ProjetoFinalC_.Entities;
using System;
namespace ProjetoFinalC_.Data
{
    // DataSeederService.cs

    using Microsoft.AspNetCore.Identity;
    using ProjetoFinalC_.Data;
    using ProjetoFinalC_.Entities;
    using System;
    using System.Xml.Linq;
    using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
    using static System.Runtime.InteropServices.JavaScript.JSType;

    public class DataSeederService
    {
        private readonly UserManager<User> _userManager;
        private readonly Context _context;

        public DataSeederService(UserManager<User> userManager, Context context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task SeedData()
        {   //Colocar Seeders 
            await SeedUsers();
           
        }

        private async Task SeedUsers()
        {
            // Seed para utilizadores
            var testUsers = new[]
            {
        new User
        {
            Name = "Nuno Castanheira",
            Email = "nuno@teste.com",
            UserName = "nuno@teste.com",
            PhoneNumber = "960364481"
        },
        new User
        {
            Name = "John Doe",
            Email = "john.doe@example.com",
            UserName = "john.doe@example.com",
            PhoneNumber = "123456789"
        },
    };

            foreach (var user in testUsers)
            {
                var existingUser = await _userManager.FindByEmailAsync(user.Email);

                if (existingUser == null)
                {
                    // Criar utilizador
                    var result = await _userManager.CreateAsync(user, "Asdfghjkl.1");

                    if (!result.Succeeded)
                    {
                        throw new Exception($"Error seeding user {user.Name}. {string.Join(", ", result.Errors)}");
                    }
                }
                else
                {
                    // Utilizador existe alterar dados do mesmo para ter uma user de teste
                    existingUser.Name = user.Name;
                    existingUser.PhoneNumber = user.PhoneNumber;

                    await _userManager.UpdateAsync(existingUser);
                }
            }
        }


    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Models;
using ProjetoFinalC_.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] UserCreateModel model)
        {
            try
            {
                var user = new User
                {
                    Name = model.Name,
                    UserName = model.Email, 
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber
                    
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    return Ok($"User {user.UserName} created successfully");
                }
                else
                {
                    var identityErrors = result.Errors.Select(error => error.Description);
                    return BadRequest($"Error creating {typeof(User).Name}: {string.Join(", ", identityErrors)}");

                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating user: {ex.Message}");
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserUpdateModel model)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            user.Name = model.Name;
            user.PhoneNumber = model.PhoneNumber;

            if (!string.IsNullOrEmpty(model.Email))
            {
                // Validar email
                var newEmail = model.Email.ToLowerInvariant();
                if (await _userManager.FindByEmailAsync(newEmail) == null)
                {
                    user.Email = newEmail;
                    user.UserName = newEmail;
                    
                }
                else
                {
                    return BadRequest($"Email '{newEmail}' is already in use.");
                }
            }
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok($"User {user.UserName} updated successfully");
            }
            else
            {
                return BadRequest($"Error updating user: {string.Join(", ", result.Errors)}");
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return Ok($"User {user.UserName} deleted successfully");
            }
            else
            {
                return BadRequest($"Error deleting user: {string.Join(", ", result.Errors)}");
            }
        }
    }
}

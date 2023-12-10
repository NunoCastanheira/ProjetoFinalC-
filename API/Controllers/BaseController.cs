using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<T> : ControllerBase where T : class
    {
        private readonly IGenericService<T> _service;

        public BaseController(IGenericService<T> service)
        {
            _service = service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] T model)
        {
            try
            {
                await _service.CreateAsync(model);
                return Ok($"{typeof(T).Name} created successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating {typeof(T).Name}: {ex.Message}");
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            try
            {
                var entities = await _service.GetAllAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving {typeof(T).Name} list: {ex.Message}");
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var entity = await _service.GetByIdAsync(id);

                if (entity == null)
                    return NotFound();

                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving {typeof(T).Name} by id: {ex.Message}");
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] T updatedModel)
        {
            try
            {
                await _service.UpdateAsync(id, updatedModel);
                return Ok($"{typeof(T).Name} updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating {typeof(T).Name}: {ex.Message}");
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return Ok($"{typeof(T).Name} deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting {typeof(T).Name}: {ex.Message}");
            }
        }
    }
}

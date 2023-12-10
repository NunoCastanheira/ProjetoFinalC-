using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController: BaseController<Product>
    {
        public ProductsController(IGenericService<Product> genericProductService) : base(genericProductService)
        {
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SaleProductsController: BaseController<SaleProduct>
    {
        public SaleProductsController(IGenericService<SaleProduct> genericSaleProductService) : base(genericSaleProductService)
        {
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleProductsController: BaseController<SaleProduct>
    {
        public SaleProductsController(IGenericService<SaleProduct> genericSaleProductService) : base(genericSaleProductService)
        {
        }
    }
}

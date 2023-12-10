using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController: BaseController<Sale>
    {
        public SalesController(IGenericService<Sale> genericSaleService) : base(genericSaleService)
        {
        }
    }
}

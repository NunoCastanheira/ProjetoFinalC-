using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SalesController: BaseController<Sale>
    {
        public SalesController(IGenericService<Sale> genericSaleService) : base(genericSaleService)
        {
        }
    }
}

﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoFinalC_.Entities;
using ProjetoFinalC_.Services.Interfaces;

namespace ProjetoFinalC_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClientsController : BaseController<Client>
    {
        public ClientsController(IGenericService<Client> genericClientService) : base(genericClientService)
        {
        }
    }
}

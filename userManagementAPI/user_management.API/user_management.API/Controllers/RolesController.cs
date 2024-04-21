using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using user_management.API.Modals.Domain;
using user_management.API.Modals.Wrapper;
using user_management.API.Repositories.Interface;

namespace user_management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {

        private readonly IRoleRepository rolesRepository;

        public RolesController(IRoleRepository rolesRepository)
        {
            this.rolesRepository = rolesRepository;
        }

        [HttpGet]
        public IActionResult GetPermissions()
        {
            var RoleList = rolesRepository.GetRoles();

            var TheResponse = new Response<IList<Roles>>()
            {
                Status = new()
                {
                    Code = HttpStatusCode.OK.ToString(),
                    Description = "OK"
                },
                Data = RoleList
            };

            return Ok(TheResponse);

        }
    }
}

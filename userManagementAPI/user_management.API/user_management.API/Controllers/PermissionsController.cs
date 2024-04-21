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
    public class PermissionsController : ControllerBase
    {
        private readonly IPermissionRepository permissionsRepository;

        public PermissionsController(IPermissionRepository permissionsRepository)
        {
            this.permissionsRepository = permissionsRepository;
        }

        [HttpGet]
        public IActionResult GetPermissions()
        {
            var PermissionsList = permissionsRepository.GetPermissions();

            var TheResponse = new Response<IList<Permissions>>()
            {
                Status = new()
                {
                    Code = HttpStatusCode.OK.ToString(),
                    Description = "OK"
                },
                Data = PermissionsList
            };

            return Ok(TheResponse);

        }
    }
}

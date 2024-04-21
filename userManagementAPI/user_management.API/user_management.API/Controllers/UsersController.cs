using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using user_management.API.Modals.Domain;
using user_management.API.Modals.DTO;
using user_management.API.Modals.Wrapper;
using user_management.API.Repositories.Implementation;
using user_management.API.Repositories.Interface;

namespace user_management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IRoleRepository roleRepository;
        private readonly IPermissionRepository permissionRepository;
        private readonly IUserPermissionRepository userPermissionRepository;

        public UsersController(IUserRepository userRepository, IRoleRepository roleRepository, IPermissionRepository permissionRepository, IUserPermissionRepository userPermissionRepository)
        {
            this.userRepository = userRepository;
            this.roleRepository = roleRepository;
            this.permissionRepository = permissionRepository;
            this.userPermissionRepository = userPermissionRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserDTO request)
        {
            Roles newRole = null;
           foreach (var role in roleRepository.GetRoles())
           {
               if (role.RolesId == request.RoleId)
                {
                    newRole = role;
                }
           }

           if (newRole == null)
            {
                return BadRequest();
            }
            var newPermissions = request.UserPermissions.Select(i => new UserPermission()
            {
                UserId = request.Id,
                PermissionId = i.PermissionId,
                IsReadable = i.IsReadable,
                IsDeletable = i.IsDeletable,
                IsWritable = i.IsWritable

            }).ToList();
            
            var date = DateTime.Now.ToString("dd MMM, yyyy");

            var user = new Users()
            {
                Id = request.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Role = newRole,
                Username = request.Username,
                Password = request.Password,
                createdDate = date,
                Permissions = newPermissions.ToList(),
            };

            var permissionsList = permissionRepository.GetPermissions();
            var tempPermissionList = newPermissions.ToList();

            foreach (var permission in permissionsList)
            {
                foreach (var userPermission in tempPermissionList)
                {
                    if (permission.PermissionsId == userPermission.PermissionId)
                    {   
                        permission.Users.Add(userPermission);
                        userPermission.PermissionName = permission.PermissionName;
                        await userPermissionRepository.CreateAsync(userPermission);

                    }
                }
            }

            await userRepository.CreateAsync(user);

            return await GetUserByID(request.Id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByID(string id)
        {
            var User = await userRepository.GetUserByID(id);

            if (User == null)
            {
                return NotFound();
            }

            var permissions = User.Permissions.Select(i => new
            {
                i.PermissionId,
                i.PermissionName
            });
            var data = new
            {
                User.Id,
                User.FirstName,
                User.LastName,
                User.Email,
                User.PhoneNumber,
                User.Role,
                User.Username,
                User.Password,
                User.createdDate,
                Permissions = permissions
            };

            var response = new Response()
            {
                Status = new()
                {
                    Code = HttpStatusCode.OK.ToString(),
                    Description = "OK"
                },
                Data = data
            };

            return Ok(response);
        }

        [HttpPost("DataTable")]
        public async Task<IActionResult> getUsers(GetUsersDTO settings)
        {
            var UserList = await userRepository.GetUsers(settings);

            if (UserList == null)
            {
                return NotFound();
            }

            var Users = new List<object>();

            foreach (var user in UserList)
            {
                var permissions = user.Permissions.Select(i => new
                {
                    i.PermissionId,
                    i.PermissionName
                });

                Users.Add(new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.PhoneNumber,
                    user.Role,
                    user.Username,
                    user.Password,
                    user.createdDate,
                    Permissions = permissions
                });
            }

            var data = new
            {
                DataSource = new {
                    Users
                },
                settings.PageNumber,
                settings.PageSize,
                Total = UserList.Count()
            };

            var TheResponse = new Response()
            {
                Status = new()
                {
                    Code = HttpStatusCode.OK.ToString(),
                    Description = "OK"
                },
                Data = data
            };

            return Ok(TheResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(EditUserDTO request, string id)
        {
            var userId = await userRepository.EditUser(id, request);

            return await GetUserByID(userId);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await userRepository.DeleteUser(id);

            var data = new object();

            if (result == true)
            {
                data = new
                {
                    result = true,
                    message = "Deleted Successfully"
                };
            }
            else
            {
                data = new
                {
                    result = false,
                    message = "Delete Failed"
                };
            }
            var response = new Response()
            {
                Status = new()
                {
                    Code = HttpStatusCode.OK.ToString(),
                    Description = "OK"
                },
                Data = data
            };
            return Ok(response);
        }
    }
}

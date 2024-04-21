using Azure.Core;
using Microsoft.EntityFrameworkCore;
using user_management.API.Data;
using user_management.API.Modals.Domain;
using user_management.API.Modals.DTO;
using user_management.API.Repositories.Interface;

namespace user_management.API.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {

        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
   
        public async Task<Users> CreateAsync(Users users)
        {
            await dbContext.Users.AddAsync(users);
            await dbContext.SaveChangesAsync();

            return users;
        }

        public async Task<bool> DeleteUser(string userID)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userID);
            if (user != null)
            {
                // Delete user permissions
                var userPermissions = await dbContext.UserPermission.Where(p => p.UserId == userID).ToListAsync();
                dbContext.UserPermission.RemoveRange(userPermissions);

                dbContext.Users.Remove(user);
                await dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<string> EditUser(string userID, EditUserDTO request)
        {
            var role = await dbContext.Roles.FirstOrDefaultAsync(r => r.RolesId == request.RoleId);

            foreach (var permission in dbContext.UserPermission.Where(p => p.UserId == userID))
            {
                foreach (var newPermission in request.UserPermissions)
                {
                    if (permission.PermissionId == newPermission.PermissionId)
                    {
                        permission.IsReadable = newPermission.IsReadable;
                        permission.IsWritable = newPermission.IsWritable;
                        permission.IsDeletable = newPermission.IsDeletable;
                    }
                }
            }
            
            var user = await dbContext.Users.Include(u => u.Permissions).Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Id == userID);

            if (user != null)
            {
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.Username = request.Username;
            user.Password = request.Password;
            user.Role = role;
            }

            await dbContext.SaveChangesAsync();
            return userID;
        }

        public async Task<Users> GetUserByID(string id)
        {
            Users theUser = await dbContext.Users.Include(u => u.Permissions).Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);

            return theUser;
        }

        public async Task<IList<Users>> GetUsers(GetUsersDTO settings)
        {
            List<Users> users = new List<Users>();
            if (settings.Search == "")
            {
                users = await dbContext.Users.Include(u => u.Permissions).Include(u => u.Role).ToListAsync();
            }
            else
            {
                users = await dbContext.Users.Include(u => u.Permissions).Include(u => u.Role)
                    .Where(u => u.FirstName.Contains(settings.Search) || u.LastName.Contains(settings.Search) || u.Email.Contains(settings.Search) || u.Role.RoleName.Contains(settings.Search) || u.Username.Contains(settings.Search) || u.PhoneNumber.Contains(settings.Search) || u.Id.Contains(settings.Search)).ToListAsync();
            }
            if (settings.OrderDirection == "asc")
            {
                if (settings.OrderBy == "UserId")
                {
                    users = users.OrderBy(u => u.Id).ToList();
                }
                else if (settings.OrderBy == "FirstName")
                {
                    users = users.OrderBy(u => u.FirstName).ToList();
                }
                else if (settings.OrderBy == "LastName")
                {
                    users = users.OrderBy(u => u.LastName).ToList();
                }
                else if (settings.OrderBy == "Email")
                {
                    users = users.OrderBy(u => u.Email).ToList();
                }
                else if (settings.OrderBy == "Role")
                {
                    users = users.OrderBy(u => u.Role.RoleName).ToList();
                }
            }
            else
            {
                if (settings.OrderBy == "UserId")
                {
                    users = users.OrderByDescending(u => u.Id).ToList();
                }
                else if (settings.OrderBy == "FirstName")
                {
                    users = users.OrderByDescending(u => u.FirstName).ToList();
                }
                else if (settings.OrderBy == "LastName")
                {
                    users = users.OrderByDescending(u => u.LastName).ToList();
                }
                else if (settings.OrderBy == "Email")
                {
                    users = users.OrderByDescending(u => u.Email).ToList();
                }
                else if (settings.OrderBy == "Role")
                {
                    users = users.OrderByDescending(u => u.Role.RoleName).ToList();
                }
            }
            return users;
        }
    }
}

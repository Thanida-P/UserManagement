using user_management.API.Data;
using user_management.API.Modals.Domain;
using user_management.API.Repositories.Interface;

namespace user_management.API.Repositories.Implementation
{
    public class UserPermissionRepository: IUserPermissionRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserPermissionRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<UserPermission> CreateAsync(UserPermission userPermission)
        {
            await dbContext.UserPermission.AddAsync(userPermission);
            await dbContext.SaveChangesAsync();

            return userPermission;
        }

        public IList<UserPermission> GetUserPermissions()
        {
            var PermissionsList = dbContext.UserPermission.ToList();

            return PermissionsList;
        }
    }
}

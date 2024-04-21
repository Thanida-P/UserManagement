using Microsoft.EntityFrameworkCore;
using user_management.API.Data;
using user_management.API.Modals.Domain;
using user_management.API.Repositories.Interface;

namespace user_management.API.Repositories.Implementation
{
    public class PermissionRepository: IPermissionRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PermissionRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IList<Permissions> GetPermissions()
        {
            var PermissionsList = dbContext.Permissions.Include(x => x.Users).ToList();

            return PermissionsList;
        }
    }
}

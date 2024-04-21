using user_management.API.Data;
using user_management.API.Modals.Domain;
using user_management.API.Repositories.Interface;

namespace user_management.API.Repositories.Implementation
{
    public class RoleRepository : IRoleRepository
    {

        private readonly ApplicationDbContext dbContext;

        public RoleRepository(ApplicationDbContext dbContext) 
        { 
            this.dbContext = dbContext;
        }

        public IList<Roles> GetRoles()
        {
            var RolesList = dbContext.Roles.ToList();

            return RolesList;
        }
    }
}

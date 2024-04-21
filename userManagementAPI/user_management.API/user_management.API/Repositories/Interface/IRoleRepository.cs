using user_management.API.Modals.Domain;

namespace user_management.API.Repositories.Interface
{
    public interface IRoleRepository
    {
        IList<Roles> GetRoles();

    }
}

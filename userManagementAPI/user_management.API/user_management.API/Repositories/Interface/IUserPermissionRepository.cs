using user_management.API.Modals.Domain;

namespace user_management.API.Repositories.Interface
{
    public interface IUserPermissionRepository
    {
        Task<UserPermission> CreateAsync(UserPermission userPermission);

        IList<UserPermission> GetUserPermissions();
    }
}

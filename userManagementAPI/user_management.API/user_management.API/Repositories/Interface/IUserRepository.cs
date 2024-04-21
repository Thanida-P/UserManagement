using user_management.API.Modals.Domain;
using user_management.API.Modals.DTO;

namespace user_management.API.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<Users> CreateAsync(Users users);

        Task<Users> GetUserByID(string id);

        Task<IList<Users>> GetUsers(GetUsersDTO settings);

        Task<string> EditUser(string userID, EditUserDTO request);

        Task<Boolean> DeleteUser(string userID);
    }
}

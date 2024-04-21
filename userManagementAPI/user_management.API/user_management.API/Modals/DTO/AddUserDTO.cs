
namespace user_management.API.Modals.DTO
{
    public class AddUserDTO
    {
        public required string Id { get; set; } = string.Empty;

        public required string FirstName { get; set; } = string.Empty;

        public required string LastName { get; set; } = string.Empty;

        public required string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        public required string RoleId { get; set; } = string.Empty;

        public required string Username { get; set; } = string.Empty;

        public required string Password { get; set; } = string.Empty;

        public required ICollection<UserPermissionDTO> UserPermissions { get; set; } = new List<UserPermissionDTO>();
    }
}

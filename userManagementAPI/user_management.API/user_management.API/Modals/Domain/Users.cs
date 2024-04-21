namespace user_management.API.Modals.Domain
{
    public class Users
    {
        public required string Id { get; set; } = string.Empty;

        public required string FirstName { get; set; } = string.Empty;

        public required string LastName { get; set; } = string.Empty;

        public required string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; } = string.Empty;

        public required Roles Role { get; set; }

        public required string Username { get; set; } = string.Empty;

        public required string Password { get; set; } = string.Empty;

        public required string createdDate {  get; set; } = string.Empty;

        public required ICollection<UserPermission> Permissions { get; set; } = new List<UserPermission>();

    }
}

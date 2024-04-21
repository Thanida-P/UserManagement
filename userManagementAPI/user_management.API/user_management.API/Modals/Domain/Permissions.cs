namespace user_management.API.Modals.Domain
{
    public class Permissions
    {
        public required string PermissionsId { get; set; } = string.Empty;
        
        public required string PermissionName { get; set; } = string.Empty; 

        public required ICollection<UserPermission> Users { get; set; } = new List<UserPermission>();
    }
}

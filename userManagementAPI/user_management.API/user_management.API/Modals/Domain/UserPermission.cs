namespace user_management.API.Modals.Domain
{
    public class UserPermission
    {
        public int? Id { get; set; }

        public required string UserId { get; set; } = string.Empty;
        
        public required string PermissionId { get; set; } = string.Empty;

        public string? PermissionName { get; set;}

        public required Boolean IsReadable { get; set; } = false;

        public required Boolean IsWritable { get; set; } = false;

        public required Boolean IsDeletable { get; set; } = false;
   
    }
}

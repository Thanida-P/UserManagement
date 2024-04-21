namespace user_management.API.Modals.DTO
{
    public class UserPermissionDTO
    {
        public required string PermissionId { get; set; } = string.Empty;

        public required Boolean IsReadable { get; set; } = false;

        public required Boolean IsWritable { get; set;} = false;

        public required Boolean IsDeletable { get; set; } = false;
    }
}

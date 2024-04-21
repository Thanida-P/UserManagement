using System.Reflection.Metadata;

namespace user_management.API.Modals.DTO
{
    public class GetUsersDTO
    {
        public required String OrderBy { get; set; } = string.Empty;

        public required String OrderDirection { get; set;} = string.Empty;

        public required int PageNumber { get; set; } = 0;

        public required int PageSize { get; set;} = 0;

        public required String Search { get; set; } = string.Empty;
    }
}

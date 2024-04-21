namespace user_management.API.Modals.Wrapper
{
    public class Response <T>
    {
        public Status? Status { get; set; }
        public T? Data { get; set; }
    }

    public class Response: Response<object> { }

    public class Status
    {
        public required string Code { get; set; }
        public required string Description { get; set; }

    }
}


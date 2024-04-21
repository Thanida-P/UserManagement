using Microsoft.EntityFrameworkCore;
using user_management.API.Modals.Domain;

namespace user_management.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Permissions> Permissions { get; set; }

        public DbSet<Roles> Roles { get; set; }

        public DbSet<Users> Users { get; set; }

        public DbSet<UserPermission> UserPermission { get; set; }
    }
}

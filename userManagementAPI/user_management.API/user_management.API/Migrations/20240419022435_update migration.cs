using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace user_management.API.Migrations
{
    /// <inheritdoc />
    public partial class updatemigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Created_date",
                table: "Users",
                newName: "createdDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "createdDate",
                table: "Users",
                newName: "Created_date");
        }
    }
}

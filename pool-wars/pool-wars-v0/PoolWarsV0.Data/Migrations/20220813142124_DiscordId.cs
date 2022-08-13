using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class DiscordId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DiscordId",
                table: "Submissions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscordId",
                table: "Submissions");
        }
    }
}

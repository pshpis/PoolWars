using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class UserCardRewardTracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Given",
                table: "UserResultCards",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Given",
                table: "UserResultCards");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class WhitelistUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RemainingMints",
                table: "WhitelistedUsers",
                newName: "MintedAmount");

            migrationBuilder.AddColumn<int>(
                name: "CanMintTotal",
                table: "WhitelistedUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CanMintTotal",
                table: "WhitelistedUsers");

            migrationBuilder.RenameColumn(
                name: "MintedAmount",
                table: "WhitelistedUsers",
                newName: "RemainingMints");
        }
    }
}

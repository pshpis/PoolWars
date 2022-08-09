using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class CardTakeData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PoolAddress",
                table: "UserEvents",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TakenCards",
                table: "UserEvents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PoolAddress",
                table: "UserEvents");

            migrationBuilder.DropColumn(
                name: "TakenCards",
                table: "UserEvents");
        }
    }
}

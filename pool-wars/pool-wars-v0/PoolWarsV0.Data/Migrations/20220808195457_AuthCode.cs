using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class AuthCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "auth_code",
                table: "User",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
            
            migrationBuilder.AlterColumn<string>(
                name: "twitter_nickname",
                table: "User",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text");
            
            migrationBuilder.AlterColumn<string>(
                name: "discord_auth_token",
                table: "User",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "auth_code",
                table: "User",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
            
            migrationBuilder.AlterColumn<string>(
                name: "twitter_nickname",
                table: "User",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
            
            migrationBuilder.AlterColumn<string>(
                name: "discord_auth_token",
                table: "User",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}

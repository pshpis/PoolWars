using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class PrismaUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    wallet_address = table.Column<string>(type: "text", nullable: false),
                    auth_token = table.Column<string>(type: "text", nullable: false),
                    twitter_nickname = table.Column<string>(type: "text", nullable: false),
                    discord_auth_token = table.Column<string>(type: "text", nullable: false),
                    auth_code = table.Column<string>(type: "text", nullable: false),
                    auth_token_created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_auth_token",
                table: "User",
                column: "auth_token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_wallet_address",
                table: "User",
                column: "wallet_address",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User");
        }
    }
}

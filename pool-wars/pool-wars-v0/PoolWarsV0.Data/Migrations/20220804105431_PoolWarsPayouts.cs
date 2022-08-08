using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class PoolWarsPayouts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PoolWarsResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PoolWarId = table.Column<int>(type: "integer", nullable: false),
                    WinnerPoolId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoolWarsResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PoolWarsResults_Pools_WinnerPoolId",
                        column: x => x.WinnerPoolId,
                        principalTable: "Pools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PoolWarsResults_PoolWars_PoolWarId",
                        column: x => x.PoolWarId,
                        principalTable: "PoolWars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResultUserLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ResultId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResultUserLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResultUserLinks_Addresses_UserId",
                        column: x => x.UserId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ResultUserLinks_PoolWarsResults_ResultId",
                        column: x => x.ResultId,
                        principalTable: "PoolWarsResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserResultCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LinkId = table.Column<int>(type: "integer", nullable: false),
                    CardId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserResultCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserResultCards_CardMetadata_CardId",
                        column: x => x.CardId,
                        principalTable: "CardMetadata",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserResultCards_ResultUserLinks_LinkId",
                        column: x => x.LinkId,
                        principalTable: "ResultUserLinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PoolWarsResults_PoolWarId",
                table: "PoolWarsResults",
                column: "PoolWarId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PoolWarsResults_WinnerPoolId",
                table: "PoolWarsResults",
                column: "WinnerPoolId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ResultUserLinks_ResultId",
                table: "ResultUserLinks",
                column: "ResultId");

            migrationBuilder.CreateIndex(
                name: "IX_ResultUserLinks_UserId_ResultId",
                table: "ResultUserLinks",
                columns: new[] { "UserId", "ResultId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserResultCards_CardId",
                table: "UserResultCards",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_UserResultCards_LinkId_CardId",
                table: "UserResultCards",
                columns: new[] { "LinkId", "CardId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserResultCards");

            migrationBuilder.DropTable(
                name: "ResultUserLinks");

            migrationBuilder.DropTable(
                name: "PoolWarsResults");
        }
    }
}

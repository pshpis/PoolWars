using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PoolWarsV0.Data.Migrations
{
    public partial class FixDepositDuplicates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Deposits_PoolId",
                table: "Deposits");

            migrationBuilder.CreateIndex(
                name: "IX_Deposits_PoolId_CardMetadataId",
                table: "Deposits",
                columns: new[] { "PoolId", "CardMetadataId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Deposits_PoolId_CardMetadataId",
                table: "Deposits");

            migrationBuilder.CreateIndex(
                name: "IX_Deposits_PoolId",
                table: "Deposits",
                column: "PoolId");
        }
    }
}

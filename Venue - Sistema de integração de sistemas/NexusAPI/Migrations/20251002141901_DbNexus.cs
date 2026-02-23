using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NexusAPI.Migrations
{
    /// <inheritdoc />
    public partial class DbNexus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cursos",
                columns: table => new
                {
                    IdCurso = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdExterno = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Titulo = table.Column<string>(type: "VARCHAR(250)", nullable: false),
                    Url = table.Column<string>(type: "VARCHAR(500)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cursos", x => x.IdCurso);
                });

            migrationBuilder.CreateTable(
                name: "Ferramentas",
                columns: table => new
                {
                    IdFerramenta = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Descricao = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Url = table.Column<string>(type: "VARCHAR(500)", nullable: false),
                    Status = table.Column<bool>(type: "BIT", nullable: false),
                    Tipo = table.Column<string>(type: "VARCHAR(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ferramentas", x => x.IdFerramenta);
                });

            migrationBuilder.CreateTable(
                name: "Setores",
                columns: table => new
                {
                    IdSetor = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TipoSetor = table.Column<string>(type: "VARCHAR(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setores", x => x.IdSetor);
                });

            migrationBuilder.CreateTable(
                name: "TiposFuncionarios",
                columns: table => new
                {
                    IdTipoFuncionario = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TipoDeFuncionario = table.Column<string>(type: "VARCHAR(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposFuncionarios", x => x.IdTipoFuncionario);
                });

            migrationBuilder.CreateTable(
                name: "Funcionarios",
                columns: table => new
                {
                    IdFuncionario = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TipoFuncionarioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SetorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Email = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Senha = table.Column<string>(type: "VARCHAR(60)", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "DATE", nullable: false),
                    Cargo = table.Column<string>(type: "VARCHAR(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionarios", x => x.IdFuncionario);
                    table.ForeignKey(
                        name: "FK_Funcionarios_Setores_SetorId",
                        column: x => x.SetorId,
                        principalTable: "Setores",
                        principalColumn: "IdSetor",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Funcionarios_TiposFuncionarios_TipoFuncionarioId",
                        column: x => x.TipoFuncionarioId,
                        principalTable: "TiposFuncionarios",
                        principalColumn: "IdTipoFuncionario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FuncionariosCursos",
                columns: table => new
                {
                    IdFuncionarioCurso = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CursoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FuncionarioId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FuncionariosCursos", x => x.IdFuncionarioCurso);
                    table.ForeignKey(
                        name: "FK_FuncionariosCursos_Cursos_CursoId",
                        column: x => x.CursoId,
                        principalTable: "Cursos",
                        principalColumn: "IdCurso",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FuncionariosCursos_Funcionarios_FuncionarioId",
                        column: x => x.FuncionarioId,
                        principalTable: "Funcionarios",
                        principalColumn: "IdFuncionario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Funcionarios_SetorId",
                table: "Funcionarios",
                column: "SetorId");

            migrationBuilder.CreateIndex(
                name: "IX_Funcionarios_TipoFuncionarioId",
                table: "Funcionarios",
                column: "TipoFuncionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_FuncionariosCursos_CursoId",
                table: "FuncionariosCursos",
                column: "CursoId");

            migrationBuilder.CreateIndex(
                name: "IX_FuncionariosCursos_FuncionarioId",
                table: "FuncionariosCursos",
                column: "FuncionarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ferramentas");

            migrationBuilder.DropTable(
                name: "FuncionariosCursos");

            migrationBuilder.DropTable(
                name: "Cursos");

            migrationBuilder.DropTable(
                name: "Funcionarios");

            migrationBuilder.DropTable(
                name: "Setores");

            migrationBuilder.DropTable(
                name: "TiposFuncionarios");
        }
    }
}

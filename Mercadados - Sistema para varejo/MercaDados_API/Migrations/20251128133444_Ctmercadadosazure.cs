using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mercadados_API.Migrations
{
    /// <inheritdoc />
    public partial class Ctmercadadosazure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Estoque",
                columns: table => new
                {
                    EstoqueID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Setor = table.Column<string>(type: "Varchar(200)", nullable: false),
                    Quantidade = table.Column<int>(type: "INT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estoque", x => x.EstoqueID);
                });

            migrationBuilder.CreateTable(
                name: "Imagens",
                columns: table => new
                {
                    ImagemID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Caminho = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Imagens", x => x.ImagemID);
                });

            migrationBuilder.CreateTable(
                name: "Produtos",
                columns: table => new
                {
                    ProdutoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "Varchar(200)", nullable: false),
                    Valor = table.Column<double>(type: "Float", nullable: false),
                    NumeroProduto = table.Column<int>(type: "INT", nullable: false),
                    Validade = table.Column<DateTime>(type: "DATE", nullable: false),
                    Peso = table.Column<string>(type: "Varchar(250)", nullable: false),
                    Setor = table.Column<string>(type: "Varchar(250)", nullable: false),
                    Fornecedor = table.Column<string>(type: "VARCHAR(250)", nullable: true),
                    Imagem = table.Column<string>(type: "Varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.ProdutoID);
                });

            migrationBuilder.CreateTable(
                name: "TipoUsuario",
                columns: table => new
                {
                    TipoUsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TituloTipoUsuario = table.Column<string>(type: "VARCHAR(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoUsuario", x => x.TipoUsuarioID);
                });

            migrationBuilder.CreateTable(
                name: "EstoqueProdutos",
                columns: table => new
                {
                    EstoqueProdutosID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuantidadeEstoque = table.Column<int>(type: "Int", nullable: false),
                    DataAtualizacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProdutosID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EstoqueID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstoqueProdutos", x => x.EstoqueProdutosID);
                    table.ForeignKey(
                        name: "FK_EstoqueProdutos_Estoque_EstoqueID",
                        column: x => x.EstoqueID,
                        principalTable: "Estoque",
                        principalColumn: "EstoqueID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstoqueProdutos_Produtos_ProdutosID",
                        column: x => x.ProdutosID,
                        principalTable: "Produtos",
                        principalColumn: "ProdutoID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    UsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeUsuario = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Email = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Senha = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    TipoUsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Numero = table.Column<string>(type: "VARCHAR(13)", nullable: false),
                    Cpf = table.Column<string>(type: "VARCHAR(14)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.UsuarioID);
                    table.ForeignKey(
                        name: "FK_Usuario_TipoUsuario_TipoUsuarioID",
                        column: x => x.TipoUsuarioID,
                        principalTable: "TipoUsuario",
                        principalColumn: "TipoUsuarioID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Funcionario",
                columns: table => new
                {
                    FuncionarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "DATE", nullable: false),
                    NomeFuncionario = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Email = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Senha = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    Genero = table.Column<string>(type: "VARCHAR(100)", nullable: false),
                    RuaENumero = table.Column<string>(type: "VARCHAR(200)", nullable: false),
                    CidadeEstadoCEP = table.Column<string>(type: "VARCHAR(200)", maxLength: 200, nullable: false),
                    Complemento = table.Column<string>(type: "VARCHAR(100)", nullable: true),
                    Numero = table.Column<string>(type: "VARCHAR(13)", nullable: false),
                    Cpf = table.Column<string>(type: "VARCHAR(14)", nullable: false),
                    UsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FotoPerfil = table.Column<string>(type: "VARCHAR(300)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionario", x => x.FuncionarioID);
                    table.ForeignKey(
                        name: "FK_Funcionario_Usuario_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "Usuario",
                        principalColumn: "UsuarioID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    FeedbackID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nota = table.Column<string>(type: "Varchar(200)", nullable: false),
                    FuncionarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataFeedback = table.Column<DateTime>(type: "DATETIME", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.FeedbackID);
                    table.ForeignKey(
                        name: "FK_Feedback_Funcionario_FuncionarioID",
                        column: x => x.FuncionarioID,
                        principalTable: "Funcionario",
                        principalColumn: "FuncionarioID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Venda",
                columns: table => new
                {
                    VendaID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Valor = table.Column<double>(type: "FLOAT", nullable: false),
                    Quantidade = table.Column<int>(type: "INT", nullable: false),
                    ProdutoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProdutosProdutoID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FeedbackID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DataVenda = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venda", x => x.VendaID);
                    table.ForeignKey(
                        name: "FK_Venda_Feedback_FeedbackID",
                        column: x => x.FeedbackID,
                        principalTable: "Feedback",
                        principalColumn: "FeedbackID");
                    table.ForeignKey(
                        name: "FK_Venda_Produtos_ProdutosProdutoID",
                        column: x => x.ProdutosProdutoID,
                        principalTable: "Produtos",
                        principalColumn: "ProdutoID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EstoqueProdutos_EstoqueID",
                table: "EstoqueProdutos",
                column: "EstoqueID");

            migrationBuilder.CreateIndex(
                name: "IX_EstoqueProdutos_ProdutosID",
                table: "EstoqueProdutos",
                column: "ProdutosID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_FuncionarioID",
                table: "Feedback",
                column: "FuncionarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Funcionario_UsuarioID",
                table: "Funcionario",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_TipoUsuarioID",
                table: "Usuario",
                column: "TipoUsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Venda_FeedbackID",
                table: "Venda",
                column: "FeedbackID");

            migrationBuilder.CreateIndex(
                name: "IX_Venda_ProdutosProdutoID",
                table: "Venda",
                column: "ProdutosProdutoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EstoqueProdutos");

            migrationBuilder.DropTable(
                name: "Imagens");

            migrationBuilder.DropTable(
                name: "Venda");

            migrationBuilder.DropTable(
                name: "Estoque");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Produtos");

            migrationBuilder.DropTable(
                name: "Funcionario");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "TipoUsuario");
        }
    }
}

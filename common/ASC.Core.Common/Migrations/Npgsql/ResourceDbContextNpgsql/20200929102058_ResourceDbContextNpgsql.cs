﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ASC.Core.Common.Migrations.Npgsql.ResourceDbContextNpgsql
{
    public partial class ResourceDbContextNpgsql : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.EnsureSchema(
                name: "onlyoffice");

            _ = migrationBuilder.CreateTable(
                name: "res_authors",
                schema: "onlyoffice",
                columns: table => new
                {
                    login = table.Column<string>(maxLength: 150, nullable: false),
                    password = table.Column<string>(maxLength: 50, nullable: false),
                    isAdmin = table.Column<bool>(nullable: false),
                    online = table.Column<bool>(nullable: false),
                    lastVisit = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("res_authors_pkey", x => x.login);
                });

            _ = migrationBuilder.CreateTable(
                name: "res_authorsfile",
                schema: "onlyoffice",
                columns: table => new
                {
                    authorLogin = table.Column<string>(maxLength: 50, nullable: false),
                    fileid = table.Column<int>(nullable: false),
                    writeAccess = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("res_authorsfile_pkey", x => new { x.authorLogin, x.fileid });
                });

            _ = migrationBuilder.CreateTable(
                name: "res_authorslang",
                schema: "onlyoffice",
                columns: table => new
                {
                    authorLogin = table.Column<string>(maxLength: 50, nullable: false),
                    cultureTitle = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("res_authorslang_pkey", x => new { x.authorLogin, x.cultureTitle });
                });

            _ = migrationBuilder.CreateTable(
                name: "res_cultures",
                schema: "onlyoffice",
                columns: table => new
                {
                    title = table.Column<string>(type: "character varying", nullable: false),
                    value = table.Column<string>(type: "character varying", nullable: false),
                    available = table.Column<bool>(nullable: false, defaultValueSql: "'0'"),
                    creationDate = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("res_cultures_pkey", x => x.title);
                });

            _ = migrationBuilder.CreateTable(
                name: "res_data",
                schema: "onlyoffice",
                columns: table => new
                {
                    fileid = table.Column<int>(nullable: false),
                    title = table.Column<string>(maxLength: 120, nullable: false),
                    cultureTitle = table.Column<string>(maxLength: 20, nullable: false),
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    textValue = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    timeChanges = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    resourceType = table.Column<string>(maxLength: 20, nullable: true, defaultValueSql: "NULL"),
                    flag = table.Column<int>(nullable: false),
                    link = table.Column<string>(maxLength: 120, nullable: true, defaultValueSql: "NULL"),
                    authorLogin = table.Column<string>(maxLength: 50, nullable: false, defaultValueSql: "'Console'")
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("res_data_pkey", x => new { x.fileid, x.cultureTitle, x.title });
                });

            _ = migrationBuilder.CreateTable(
                name: "res_files",
                schema: "onlyoffice",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    projectName = table.Column<string>(maxLength: 50, nullable: false),
                    moduleName = table.Column<string>(maxLength: 50, nullable: false),
                    resName = table.Column<string>(maxLength: 50, nullable: false),
                    isLock = table.Column<bool>(nullable: false, defaultValueSql: "'0'"),
                    lastUpdate = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    creationDate = table.Column<DateTime>(nullable: false, defaultValueSql: "'1975-03-03 00:00:00'")
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("PK_res_files", x => x.id);
                });

            _ = migrationBuilder.CreateTable(
                name: "res_reserve",
                schema: "onlyoffice",
                columns: table => new
                {
                    fileid = table.Column<int>(nullable: false),
                    title = table.Column<string>(maxLength: 120, nullable: false),
                    cultureTitle = table.Column<string>(maxLength: 20, nullable: false),
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    textValue = table.Column<string>(nullable: true),
                    flag = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    _ = table.PrimaryKey("res_reserve_pkey", x => new { x.fileid, x.title, x.cultureTitle });
                });

            _ = migrationBuilder.CreateIndex(
                name: "res_authorsfile_FK2",
                schema: "onlyoffice",
                table: "res_authorsfile",
                column: "fileid");

            _ = migrationBuilder.CreateIndex(
                name: "res_authorslang_FK2",
                schema: "onlyoffice",
                table: "res_authorslang",
                column: "cultureTitle");

            _ = migrationBuilder.CreateIndex(
                name: "resources_FK2",
                schema: "onlyoffice",
                table: "res_data",
                column: "cultureTitle");

            _ = migrationBuilder.CreateIndex(
                name: "id_res_data",
                schema: "onlyoffice",
                table: "res_data",
                column: "id",
                unique: true);

            _ = migrationBuilder.CreateIndex(
                name: "dateIndex",
                schema: "onlyoffice",
                table: "res_data",
                column: "timeChanges");

            _ = migrationBuilder.CreateIndex(
                name: "resname",
                schema: "onlyoffice",
                table: "res_files",
                column: "resName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            _ = migrationBuilder.DropTable(
                name: "res_authors",
                schema: "onlyoffice");

            _ = migrationBuilder.DropTable(
                name: "res_authorsfile",
                schema: "onlyoffice");

            _ = migrationBuilder.DropTable(
                name: "res_authorslang",
                schema: "onlyoffice");

            _ = migrationBuilder.DropTable(
                name: "res_cultures",
                schema: "onlyoffice");

            _ = migrationBuilder.DropTable(
                name: "res_data",
                schema: "onlyoffice");

            _ = migrationBuilder.DropTable(
                name: "res_files",
                schema: "onlyoffice");

            _ = migrationBuilder.DropTable(
                name: "res_reserve",
                schema: "onlyoffice");
        }
    }
}

// <auto-generated />
using System;
using ASC.Webhooks.Core.EF.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASC.Migrations.PostgreSql.Migrations.WebhooksDb
{
    [DbContext(typeof(WebhooksDbContext))]
    [Migration("20230426121807_WebhooksDbContext_Upgrade1")]
    partial class WebhooksDbContextUpgrade1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbTenant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("alias");

                    b.Property<bool>("Calls")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasColumnName("calls")
                        .HasDefaultValueSql("true");

                    b.Property<DateTime>("CreationDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creationdatetime");

                    b.Property<int>("Industry")
                        .HasColumnType("integer")
                        .HasColumnName("industry");

                    b.Property<string>("Language")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(10)
                        .HasColumnType("character(10)")
                        .HasColumnName("language")
                        .HasDefaultValueSql("'en-US'")
                        .IsFixedLength();

                    b.Property<DateTime>("LastModified")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("last_modified")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("MappedDomain")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("mappeddomain")
                        .HasDefaultValueSql("NULL");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("name");

                    b.Property<Guid?>("OwnerId")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(38)
                        .HasColumnType("uuid")
                        .HasColumnName("owner_id")
                        .HasDefaultValueSql("NULL");

                    b.Property<string>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(38)
                        .HasColumnType("character varying(38)")
                        .HasColumnName("payment_id")
                        .HasDefaultValueSql("NULL");

                    b.Property<bool>("Spam")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasColumnName("spam")
                        .HasDefaultValueSql("true");

                    b.Property<int>("Status")
                        .HasColumnType("integer")
                        .HasColumnName("status");

                    b.Property<DateTime?>("StatusChanged")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("statuschanged");

                    b.Property<string>("TimeZone")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("timezone")
                        .HasDefaultValueSql("NULL");

                    b.Property<int>("TrustedDomainsEnabled")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("trusteddomainsenabled")
                        .HasDefaultValueSql("1");

                    b.Property<string>("TrustedDomainsRaw")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)")
                        .HasColumnName("trusteddomains")
                        .HasDefaultValueSql("NULL");

                    b.Property<int>("Version")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("version")
                        .HasDefaultValueSql("2");

                    b.Property<DateTime?>("Version_Changed")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("version_changed");

                    b.HasKey("Id");

                    b.HasIndex("Alias")
                        .IsUnique()
                        .HasDatabaseName("alias");

                    b.HasIndex("LastModified")
                        .HasDatabaseName("last_modified_tenants_tenants");

                    b.HasIndex("MappedDomain")
                        .HasDatabaseName("mappeddomain");

                    b.HasIndex("Version")
                        .HasDatabaseName("version");

                    b.ToTable("tenants_tenants", "onlyoffice", t =>
                        {
                            t.ExcludeFromMigrations();
                        });

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Alias = "localhost",
                            Calls = false,
                            CreationDateTime = new DateTime(2021, 3, 9, 17, 46, 59, 97, DateTimeKind.Utc).AddTicks(4317),
                            Industry = 0,
                            LastModified = new DateTime(2022, 7, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Web Office",
                            OwnerId = new Guid("66faa6e4-f133-11ea-b126-00ffeec8b4ef"),
                            Spam = false,
                            Status = 0,
                            TrustedDomainsEnabled = 0,
                            Version = 0
                        },
                        new
                        {
                            Id = -1,
                            Alias = "settings",
                            Calls = false,
                            CreationDateTime = new DateTime(2021, 3, 9, 17, 46, 59, 97, DateTimeKind.Utc).AddTicks(4317),
                            Industry = 0,
                            LastModified = new DateTime(2022, 7, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Web Office",
                            OwnerId = new Guid("00000000-0000-0000-0000-000000000000"),
                            Spam = false,
                            Status = 1,
                            TrustedDomainsEnabled = 0,
                            Version = 0
                        });
                });

            modelBuilder.Entity("ASC.Webhooks.Core.EF.Model.DbWebhook", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Method")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)")
                        .HasColumnName("method")
                        .HasDefaultValueSql("''");

                    b.Property<string>("Route")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)")
                        .HasColumnName("route")
                        .HasDefaultValueSql("''");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("webhooks", (string)null);
                });

            modelBuilder.Entity("ASC.Webhooks.Core.EF.Model.WebhooksConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<bool>("Enabled")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasColumnName("enabled")
                        .HasDefaultValueSql("true");

                    b.Property<string>("SecretKey")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("secret_key")
                        .HasDefaultValueSql("''");

                    b.Property<int>("TenantId")
                        .HasColumnType("integer")
                        .HasColumnName("tenant_id");

                    b.Property<string>("Uri")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("uri")
                        .HasDefaultValueSql("''");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex("TenantId")
                        .HasDatabaseName("tenant_id");

                    b.ToTable("webhooks_config", (string)null);
                });

            modelBuilder.Entity("ASC.Webhooks.Core.EF.Model.WebhooksLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ConfigId")
                        .HasColumnType("int")
                        .HasColumnName("config_id");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime")
                        .HasColumnName("creation_time");

                    b.Property<DateTime?>("Delivery")
                        .HasColumnType("datetime")
                        .HasColumnName("delivery");

                    b.Property<string>("RequestHeaders")
                        .HasColumnType("json")
                        .HasColumnName("request_headers");

                    b.Property<string>("RequestPayload")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("request_payload");

                    b.Property<string>("ResponseHeaders")
                        .HasColumnType("json")
                        .HasColumnName("response_headers");

                    b.Property<string>("ResponsePayload")
                        .HasColumnType("text")
                        .HasColumnName("response_payload");

                    b.Property<int>("Status")
                        .HasColumnType("int")
                        .HasColumnName("status");

                    b.Property<int>("TenantId")
                        .HasColumnType("integer")
                        .HasColumnName("tenant_id");

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar")
                        .HasColumnName("uid");

                    b.Property<int>("WebhookId")
                        .HasColumnType("int")
                        .HasColumnName("webhook_id");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex("ConfigId");

                    b.HasIndex("TenantId")
                        .HasDatabaseName("tenant_id");

                    b.ToTable("webhooks_logs", (string)null);
                });

            modelBuilder.Entity("ASC.Webhooks.Core.EF.Model.WebhooksConfig", b =>
                {
                    b.HasOne("ASC.Core.Common.EF.Model.DbTenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tenant");
                });

            modelBuilder.Entity("ASC.Webhooks.Core.EF.Model.WebhooksLog", b =>
                {
                    b.HasOne("ASC.Webhooks.Core.EF.Model.WebhooksConfig", "Config")
                        .WithMany()
                        .HasForeignKey("ConfigId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ASC.Core.Common.EF.Model.DbTenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Config");

                    b.Navigation("Tenant");
                });
#pragma warning restore 612, 618
        }
    }
}

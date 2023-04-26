// <auto-generated />
using System;
using ASC.EventBus.Extensions.Logger;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ASC.Migrations.MySql.Migrations
{
    [DbContext(typeof(IntegrationEventLogContext))]
    partial class IntegrationEventLogContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbTenant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Alias")
                        .HasColumnType("longtext");

                    b.Property<bool>("Calls")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreationDateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Industry")
                        .HasColumnType("int");

                    b.Property<string>("Language")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("MappedDomain")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<Guid?>("OwnerId")
                        .HasColumnType("char(36)");

                    b.Property<string>("PaymentId")
                        .HasColumnType("longtext");

                    b.Property<bool>("Spam")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime?>("StatusChanged")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("StatusChangedHack")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("TimeZone")
                        .HasColumnType("longtext");

                    b.Property<int>("TrustedDomainsEnabled")
                        .HasColumnType("int");

                    b.Property<string>("TrustedDomainsRaw")
                        .HasColumnType("longtext");

                    b.Property<int>("Version")
                        .HasColumnType("int");

                    b.Property<DateTime>("VersionChanged")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("Version_Changed")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("DbTenant");
                });

            modelBuilder.Entity("ASC.EventBus.Extensions.Logger.IntegrationEventLogEntry", b =>
                {
                    b.Property<string>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(38)")
                        .HasColumnName("event_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("create_by")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("CreateOn")
                        .HasColumnType("datetime")
                        .HasColumnName("create_on");

                    b.Property<string>("EventTypeName")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("event_type_name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("State")
                        .HasColumnType("int(11)")
                        .HasColumnName("state");

                    b.Property<int>("TenantId")
                        .HasColumnType("int(11)")
                        .HasColumnName("tenant_id");

                    b.Property<int>("TimesSent")
                        .HasColumnType("int(11)")
                        .HasColumnName("times_sent");

                    b.Property<string>("TransactionId")
                        .HasColumnType("longtext");

                    b.HasKey("EventId")
                        .HasName("PRIMARY");

                    b.HasIndex("TenantId")
                        .HasDatabaseName("tenant_id");

                    b.ToTable("event_bus_integration_event_log", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.EventBus.Extensions.Logger.IntegrationEventLogEntry", b =>
                {
                    b.HasOne("ASC.Core.Common.EF.Model.DbTenant", "Tenant")
                        .WithMany()
                        .HasForeignKey("TenantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tenant");
                });
#pragma warning restore 612, 618
        }
    }
}

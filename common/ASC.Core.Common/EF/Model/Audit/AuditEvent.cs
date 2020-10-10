﻿using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.EntityFrameworkCore;

namespace ASC.Core.Common.EF.Model
{
    [Table("audit_events")]
    public class AuditEvent : MessageEvent
    {
        public string Initiator { get; set; }
        public string Target { get; set; }
    }
    public static class AuditEventExtension
    {
        public static ModelBuilderWrapper AddAuditEvent(this ModelBuilderWrapper modelBuilder)
        {
            _ = modelBuilder
                .Add(MySqlAddAuditEvent, Provider.MySql)
                .Add(PgSqlAddAuditEvent, Provider.Postgre);
            return modelBuilder;
        }
        public static void MySqlAddAuditEvent(this ModelBuilder modelBuilder)
        {
            _ = modelBuilder.Entity<AuditEvent>(entity =>
            {
                _ = entity.ToTable("audit_events");

                _ = entity.HasIndex(e => new { e.TenantId, e.Date })
                    .HasName("date");

                _ = entity
                .Property(e => e.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

                _ = entity.Property(e => e.Action).HasColumnName("action");

                _ = entity.Property(e => e.Browser)
                    .HasColumnName("browser")
                    .HasColumnType("varchar(200)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                _ = entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(20000)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Initiator)
                    .HasColumnName("initiator")
                    .HasColumnType("varchar(200)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Ip)
                    .HasColumnName("ip")
                    .HasColumnType("varchar(50)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Page)
                    .HasColumnName("page")
                    .HasColumnType("varchar(300)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Platform)
                    .HasColumnName("platform")
                    .HasColumnType("varchar(200)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Target)
                    .HasColumnName("target")
                    .HasColumnType("text")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.TenantId).HasColumnName("tenant_id");

                _ = entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .HasColumnType("char(38)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });
        }
        public static void PgSqlAddAuditEvent(this ModelBuilder modelBuilder)
        {
            _ = modelBuilder.Entity<AuditEvent>(entity =>
            {
                _ = entity.ToTable("audit_events", "onlyoffice");

                _ = entity.HasIndex(e => new { e.TenantId, e.Date })
                    .HasName("date");

                _ = entity.Property(e => e.Id).HasColumnName("id");

                _ = entity.Property(e => e.Action).HasColumnName("action");

                _ = entity.Property(e => e.Browser)
                    .HasColumnName("browser")
                    .HasMaxLength(200)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Date).HasColumnName("date");

                _ = entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(20000)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Initiator)
                    .HasColumnName("initiator")
                    .HasMaxLength(200)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Ip)
                    .HasColumnName("ip")
                    .HasMaxLength(50)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Page)
                    .HasColumnName("page")
                    .HasMaxLength(300)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Platform)
                    .HasColumnName("platform")
                    .HasMaxLength(200)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Target).HasColumnName("target");

                _ = entity.Property(e => e.TenantId).HasColumnName("tenant_id");

                _ = entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .HasMaxLength(38)
                    .IsFixedLength()
                    .HasDefaultValueSql("NULL");
            });
        }
    }
}

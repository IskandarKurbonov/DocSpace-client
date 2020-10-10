﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

using ASC.Core.Common.EF.Model;
using ASC.Core.Users;

using Microsoft.EntityFrameworkCore;

namespace ASC.Core.Common.EF
{
    [Table("core_user")]
    public class User : BaseEntity
    {
        public int Tenant { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Guid Id { get; set; }

        public bool? Sex { get; set; }

        [Column("bithdate")]
        public DateTime? Birthdate { get; set; }

        public EmployeeStatus Status { get; set; }

        [Column("activation_status")]
        public EmployeeActivationStatus ActivationStatus { get; set; }
        public string Email { get; set; }

        public DateTime? WorkFromDate { get; set; }

        public DateTime? TerminatedDate { get; set; }

        public string Title { get; set; }

        public string Culture { get; set; }

        public string Contacts { get; set; }

        public string Phone { get; set; }

        [Column("phone_activation")]
        public MobilePhoneActivationStatus PhoneActivation { get; set; }

        public string Location { get; set; }

        public string Notes { get; set; }

        public string Sid { get; set; }

        [Column("sso_name_id")]
        public string SsoNameId { get; set; }

        [Column("sso_session_id")]
        public string SsoSessionId { get; set; }

        public bool Removed { get; set; }

        [Column("create_on")]
        public DateTime CreateOn { get; set; }

        [Column("last_modified")]
        public DateTime LastModified { get; set; }

        public UserSecurity UserSecurity { get; set; }

        public List<UserGroup> Groups { get; set; }

        public override object[] GetKeys()
        {
            return new object[] { Id };
        }
    }

    public static class DbUserExtension
    {

        public static ModelBuilderWrapper AddUser(this ModelBuilderWrapper modelBuilder)
        {
            _ = modelBuilder
                .Add(MySqlAddUser, Provider.MySql)
                .Add(PgSqlAddUser, Provider.Postgre)
                .HasData(
                new User
                {
                    Id = Guid.Parse("66faa6e4-f133-11ea-b126-00ffeec8b4ef"),
                    FirstName = "Administrator",
                    LastName = "",
                    UserName = "administrator",
                    Tenant = 1,
                    Email = "",
                    Status = (EmployeeStatus)1,
                    ActivationStatus = 0,
                    WorkFromDate = DateTime.UtcNow,
                    LastModified = DateTime.UtcNow
                }
                );

            return modelBuilder;
        }

        private static void MySqlAddUser(this ModelBuilder modelBuilder)
        {
            modelBuilder.MySqlAddUserGroup();
            _ = modelBuilder.Entity<User>(entity =>
            {
                _ = entity.ToTable("core_user");

                _ = entity.HasIndex(e => e.Email)
                    .HasName("email");

                _ = entity.HasIndex(e => e.LastModified)
                    .HasName("last_modified");

                _ = entity.HasIndex(e => new { e.Tenant, e.UserName })
                    .HasName("username");

                _ = entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("varchar(38)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.ActivationStatus).HasColumnName("activation_status");

                _ = entity.Property(e => e.Birthdate)
                    .HasColumnName("bithdate")
                    .HasColumnType("datetime");

                _ = entity.Property(e => e.Contacts)
                    .HasColumnName("contacts")
                    .HasColumnType("varchar(1024)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.CreateOn)
                    .HasColumnName("create_on")
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                _ = entity.Property(e => e.Culture)
                    .HasColumnName("culture")
                    .HasColumnType("varchar(20)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");


                _ = entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasColumnType("varchar(64)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.LastModified)
                    .HasColumnName("last_modified")
                    .HasColumnType("datetime");

                _ = entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastname")
                    .HasColumnType("varchar(64)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Location)
                    .HasColumnName("location")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Notes)
                    .HasColumnName("notes")
                    .HasColumnType("varchar(512)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.PhoneActivation).HasColumnName("phone_activation");

                _ = entity.Property(e => e.Removed).HasColumnName("removed");

                _ = entity.Property(e => e.Sex).HasColumnName("sex");

                _ = entity.Property(e => e.Sid)
                    .HasColumnName("sid")
                    .HasColumnType("varchar(512)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.SsoNameId)
                    .HasColumnName("sso_name_id")
                    .HasColumnType("varchar(512)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.SsoSessionId)
                    .HasColumnName("sso_session_id")
                    .HasColumnType("varchar(512)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("'1'");

                _ = entity.Property(e => e.Tenant).HasColumnName("tenant");

                _ = entity.Property(e => e.TerminatedDate)
                    .HasColumnName("terminateddate")
                    .HasColumnType("datetime");

                _ = entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasColumnType("varchar(64)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("varchar(255)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                _ = entity.Property(e => e.WorkFromDate)
                    .HasColumnName("workfromdate")
                    .HasColumnType("datetime");
            });
        }

        private static void PgSqlAddUser(this ModelBuilder modelBuilder)
        {
            modelBuilder.PgSqlAddUserGroup();
            _ = modelBuilder.Entity<User>(entity =>
            {
                _ = entity.ToTable("core_user", "onlyoffice");

                _ = entity.HasIndex(e => e.Email)
                    .HasName("email");

                _ = entity.HasIndex(e => e.LastModified)
                    .HasName("last_modified_core_user");

                _ = entity.HasIndex(e => new { e.UserName, e.Tenant })
                    .HasName("username");

                _ = entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasMaxLength(38);

                _ = entity.Property(e => e.ActivationStatus).HasColumnName("activation_status");

                _ = entity.Property(e => e.Birthdate).HasColumnName("bithdate");

                _ = entity.Property(e => e.Contacts)
                    .HasColumnName("contacts")
                    .HasMaxLength(1024)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.CreateOn)
                    .HasColumnName("create_on")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                _ = entity.Property(e => e.Culture)
                    .HasColumnName("culture")
                    .HasMaxLength(20)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasMaxLength(64);

                _ = entity.Property(e => e.LastModified).HasColumnName("last_modified");

                _ = entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastname")
                    .HasMaxLength(64);

                _ = entity.Property(e => e.Location)
                    .HasColumnName("location")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Notes)
                    .HasColumnName("notes")
                    .HasMaxLength(512)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.PhoneActivation).HasColumnName("phone_activation");

                _ = entity.Property(e => e.Removed).HasColumnName("removed");

                _ = entity.Property(e => e.Sex).HasColumnName("sex");

                _ = entity.Property(e => e.Sid)
                    .HasColumnName("sid")
                    .HasMaxLength(512)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.SsoNameId)
                    .HasColumnName("sso_name_id")
                    .HasMaxLength(512)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.SsoSessionId)
                    .HasColumnName("sso_session_id")
                    .HasMaxLength(512)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("1");

                _ = entity.Property(e => e.Tenant).HasColumnName("tenant");

                _ = entity.Property(e => e.TerminatedDate).HasColumnName("terminateddate");

                _ = entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(64)
                    .HasDefaultValueSql("NULL");

                _ = entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(255);

                _ = entity.Property(e => e.WorkFromDate).HasColumnName("workfromdate");
            });
        }
    }
}

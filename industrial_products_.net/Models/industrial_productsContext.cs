using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IndustrialFeedback.Models
{
    public partial class industrial_productsContext : DbContext
    {
        public industrial_productsContext()
        {
        }

        public industrial_productsContext(DbContextOptions<industrial_productsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<HibernateSequence> HibernateSequences { get; set; } = null!;
        public virtual DbSet<Login> Logins { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderItem> OrderItems { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Seller> Sellers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=industrial_products", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("admin");

                entity.HasIndex(e => e.LoginId, "login_key_idx");

                entity.Property(e => e.Adminid).HasColumnName("adminid");

                entity.Property(e => e.Admincol)
                    .HasMaxLength(45)
                    .HasColumnName("admincol");

                entity.Property(e => e.Email)
                    .HasMaxLength(45)
                    .HasColumnName("email");

                entity.Property(e => e.LoginId).HasColumnName("login_id");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");

                entity.HasOne(d => d.Login)
                    .WithMany(p => p.Admins)
                    .HasForeignKey(d => d.LoginId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("login_key");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(e => e.Orderid)
                    .HasName("PRIMARY");

                entity.ToTable("cart");

                entity.HasIndex(e => e.CustomerId, "FKdebwvad6pp1ekiqy5jtixqbaj");

                entity.HasIndex(e => e.Productid, "FKkl3ikdbb9mmmle61apmnwx86m");

                entity.Property(e => e.Orderid).HasColumnName("orderid");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FKdebwvad6pp1ekiqy5jtixqbaj");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.Productid)
                    .HasConstraintName("FKkl3ikdbb9mmmle61apmnwx86m");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Categoryname)
                    .HasMaxLength(100)
                    .HasColumnName("categoryname");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customer");

                entity.HasIndex(e => e.LoginId, "login_id_idx");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.City)
                    .HasMaxLength(45)
                    .HasColumnName("city");

                entity.Property(e => e.Email)
                    .HasMaxLength(45)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(45)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(45)
                    .HasColumnName("last_name");

                entity.Property(e => e.LoginId).HasColumnName("login_id");

                entity.Property(e => e.PhoneNo).HasColumnName("phone_no");

                entity.Property(e => e.State)
                    .HasMaxLength(45)
                    .HasColumnName("state");

                entity.HasOne(d => d.Login)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.LoginId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("customer_login");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.Idfeedback)
                    .HasName("PRIMARY");

                entity.ToTable("feedback");

                entity.HasIndex(e => e.CustId, "customerid_idx");

                entity.HasIndex(e => e.ProductId, "productid_idx");

                entity.Property(e => e.Idfeedback).HasColumnName("idfeedback");

                entity.Property(e => e.CustId).HasColumnName("cust_id");

                entity.Property(e => e.Feedback1).HasColumnName("feedback");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Star).HasColumnName("star");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("customerid");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("productid");
            });

            modelBuilder.Entity<HibernateSequence>(entity =>
            {
                entity.HasKey(e => e.NextVal)
                    .HasName("PRIMARY");

                entity.ToTable("hibernate_sequence");

                entity.Property(e => e.NextVal)
                    .ValueGeneratedNever()
                    .HasColumnName("next_val");
            });

            modelBuilder.Entity<Login>(entity =>
            {
                entity.ToTable("login");

                entity.HasIndex(e => e.RoleId, "role_id_idx");

                entity.HasIndex(e => e.Username, "username_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.LoginId).HasColumnName("login_id");

                entity.Property(e => e.Flag).HasColumnName("flag");

                entity.Property(e => e.Password)
                    .HasMaxLength(45)
                    .HasColumnName("password");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Username)
                    .HasMaxLength(45)
                    .HasColumnName("username");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Logins)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("role_id");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.HasIndex(e => e.CustomerId, "FK624gtjin3po807j3vix093tlf");

                entity.Property(e => e.Orderid).HasColumnName("orderid");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .HasColumnName("city");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Paymentmode)
                    .HasMaxLength(255)
                    .HasColumnName("paymentmode");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.State)
                    .HasMaxLength(255)
                    .HasColumnName("state");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK624gtjin3po807j3vix093tlf");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("order_item");

                entity.HasIndex(e => e.Orderid, "FK6qdi17749hl3bd01qyvxkid49");

                entity.HasIndex(e => e.Pid, "FKk0l4tdstqf1quor3s0tbguyb6");

                entity.Property(e => e.Orderitemid).HasColumnName("orderitemid");

                entity.Property(e => e.Orderid).HasColumnName("orderid");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.Orderid)
                    .HasConstraintName("FK6qdi17749hl3bd01qyvxkid49");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("FKk0l4tdstqf1quor3s0tbguyb6");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.HasIndex(e => e.Productname, "Product_Name")
                    .IsUnique();

                entity.HasIndex(e => e.Categoryid, "fk1_idx");

                entity.HasIndex(e => e.Sid, "sid");

                entity.Property(e => e.Productid).HasColumnName("productid");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Price)
                    .HasPrecision(10, 2)
                    .HasColumnName("price");

                entity.Property(e => e.Productname).HasColumnName("productname");

                entity.Property(e => e.Sid).HasColumnName("sid");

                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Categoryid)
                    .HasConstraintName("fk1");

                entity.HasOne(d => d.SidNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Sid)
                    .HasConstraintName("products_ibfk_2");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.HasIndex(e => e.RoleName, "role_name_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.RoleId)
                    .ValueGeneratedNever()
                    .HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(45)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<Seller>(entity =>
            {
                entity.ToTable("seller");

                entity.HasIndex(e => e.Email, "email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.GstNo, "gst_no_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.LoginId, "login_id_idx");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(45)
                    .HasColumnName("address");

                entity.Property(e => e.BusinessName)
                    .HasMaxLength(45)
                    .HasColumnName("business_name");

                entity.Property(e => e.City)
                    .HasMaxLength(45)
                    .HasColumnName("city");

                entity.Property(e => e.Email)
                    .HasMaxLength(45)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(45)
                    .HasColumnName("first_name");

                entity.Property(e => e.GstNo)
                    .HasMaxLength(45)
                    .HasColumnName("gst_no");

                entity.Property(e => e.LastName)
                    .HasMaxLength(45)
                    .HasColumnName("last_name");

                entity.Property(e => e.LoginId).HasColumnName("login_id");

                entity.Property(e => e.PhoneNo).HasColumnName("phone_no");

                entity.Property(e => e.State)
                    .HasMaxLength(45)
                    .HasColumnName("state");

                entity.HasOne(d => d.Login)
                    .WithMany(p => p.Sellers)
                    .HasForeignKey(d => d.LoginId)
                    .HasConstraintName("login_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

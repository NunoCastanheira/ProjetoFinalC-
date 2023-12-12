using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Macs;
using ProjetoFinalC_.Entities;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

namespace ProjetoFinalC_.Data
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleProduct> SaleProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurar relações
        


            modelBuilder.Entity<SaleProduct>()
           .HasOne(sp => sp.Sale)
           .WithMany(s => s.SaleProducts)
           .HasForeignKey(sp => sp.SaleId)
           .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sale>()
            .HasOne(s => s.User)
            .WithMany(u => u.Sales)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Sale>()
            .HasMany(s => s.SaleProducts)
            .WithOne(sp => sp.Sale)
            .HasForeignKey(sp => sp.SaleId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Product>()
           .HasMany(p => p.SaleProducts)
           .WithOne(sp => sp.Product)
           .HasForeignKey(sp => sp.ProductId)
           .OnDelete(DeleteBehavior.Cascade);

        }
    }
}

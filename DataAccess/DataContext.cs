﻿using Microsoft.EntityFrameworkCore;

namespace getthehotdish.DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; }

        public DbSet<MaskRequest> MaskRequests { get; set; }
        public DbSet<MaskDonation> MaskDonations { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Aggregate> Aggregates { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Listing>().ToContainer("Listings");
            modelBuilder.Entity<Listing>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Listing>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<MaskRequest>().ToContainer("MaskRequests");
            modelBuilder.Entity<MaskRequest>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<MaskRequest>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<MaskDonation>().ToContainer("MaskDonations");
            modelBuilder.Entity<MaskDonation>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<MaskDonation>().HasPartitionKey(o => o.PartitionKey);
            modelBuilder.Entity<MaskDonation>()
            .HasOne(md => md.Request)
            .WithMany(mr => mr.Donations)
            .HasForeignKey(md => md.RequestId);

            modelBuilder.Entity<Report>().ToContainer("Reports");
            modelBuilder.Entity<Report>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Report>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<Contact>().ToContainer("Contacts");
            modelBuilder.Entity<Contact>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Contact>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<User>().ToContainer("Users");
            modelBuilder.Entity<User>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<User>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<Aggregate>().ToContainer("Aggregates");
            modelBuilder.Entity<Aggregate>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Aggregate>().HasPartitionKey(o => o.PartitionKey);
        }
    }
}

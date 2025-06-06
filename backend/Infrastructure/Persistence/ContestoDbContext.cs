﻿namespace PrenotazioniNRS.Infrastructure.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using PrenotazioniNRS.Domain.Sede;
    using PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie;
    using PrenotazioniNRS.Domain.Sede.Pulizie;

    public class ContestoDbContext : DbContext
    {
        public DbSet<PuliziaSede> PulizieSede { get; set; }
        public DbSet<AttivitaOrdinaria> AttivitaOrdinarie { get; set; }

        public ContestoDbContext(DbContextOptions<ContestoDbContext> options) :
            base(options)
        {
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder
                .Properties<Responsabili>()
                .HaveMaxLength(500)
                .HaveConversion<ResponsabiliConverter>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var pulizieSede = modelBuilder.Entity<PuliziaSede>();
            pulizieSede.HasKey(x => new { x.NumeroSettimana, x.Anno });
            pulizieSede.Property(x => x.NumeroSettimana)
                .ValueGeneratedNever();
            pulizieSede.Property(x => x.Anno)
                .ValueGeneratedNever();
            pulizieSede.Property(x => x.Responsabili);

            var attivitaOrdinarie = modelBuilder.Entity<AttivitaOrdinaria>();
            attivitaOrdinarie.HasKey(x => x.Giorno);
            attivitaOrdinarie.Property(x => x.Giorno)
                .ValueGeneratedNever();
            attivitaOrdinarie.Property(x => x.ResponsabiliApertura);
            attivitaOrdinarie.Property(x => x.ResponsabiliChiusura);
            attivitaOrdinarie.Property(x => x.Stato);
        }
    }
}

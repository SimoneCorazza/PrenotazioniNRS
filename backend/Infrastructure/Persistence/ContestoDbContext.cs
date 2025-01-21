namespace PrenotazioniNRS.Infrastructure.Persistence
{
    using Microsoft.EntityFrameworkCore;
    using PrenotazioniNRS.Domain.Sede;
    using PrenotazioniNRS.Domain.Sede.Pulizie;

    public class ContestoDbContext : DbContext
    {
        public DbSet<PuliziaSede> PulizieSede { get; set; }

        public ContestoDbContext(DbContextOptions<ContestoDbContext> options) :
            base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var pulizieSede = modelBuilder.Entity<PuliziaSede>();

            pulizieSede.HasKey(x => x.NumeroSettimanaDallAnnoZero);
            pulizieSede.Property(x => x.NumeroSettimanaDallAnnoZero)
                .ValueGeneratedNever();

            pulizieSede.Property(x => x.Responsabili)
                .HasConversion(
                    x => string.Join("|", x.Select(x => x.ToString())),
                    x => new Responsabili(x.Split("|", StringSplitOptions.None).Select(x => new Responsabile(x))))
                .HasMaxLength(500);
        }
    }
}

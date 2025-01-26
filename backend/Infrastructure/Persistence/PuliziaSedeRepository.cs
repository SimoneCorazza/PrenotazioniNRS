using Microsoft.EntityFrameworkCore;
using PrenotazioniNRS.Domain.Sede.Pulizie;

namespace PrenotazioniNRS.Infrastructure.Persistence
{
    public class PuliziaSedeRepository : IPuliziaSedeRepository
    {
        private readonly ContestoDbContext contestoDbContext;

        public PuliziaSedeRepository(ContestoDbContext contestoDbContext)
        {
            this.contestoDbContext = contestoDbContext;
        }

        public void Aggiungi(PuliziaSede puliziaSede)
        {
            contestoDbContext.PulizieSede.Add(puliziaSede);
            contestoDbContext.SaveChanges();
        }

        public void Rimuovi(PuliziaSede puliziaSede)
        {
            contestoDbContext.PulizieSede.Remove(puliziaSede);
            contestoDbContext.SaveChanges();
        }

        public void Modifica(PuliziaSede puliziaSede)
        {
            contestoDbContext.Entry(puliziaSede).State = EntityState.Modified;
            contestoDbContext.SaveChanges();
        }

        public async Task<PuliziaSede?> Ottieni(int anno, int numeroSettimana)
        {
            return await contestoDbContext.PulizieSede.SingleOrDefaultAsync(x => x.Anno == anno && x.NumeroSettimana == numeroSettimana);
        }

        public async Task<ICollection<PuliziaSede>> Ottieni(DateOnly from, DateOnly to)
        {
            int fromWeek = GetWeekOfYear(from);
            int toWeek = GetWeekOfYear(to);

            return await contestoDbContext.PulizieSede
                .Where(x => x.Anno >= from.Year && x.Anno <= to.Year && x.NumeroSettimana >= fromWeek && x.NumeroSettimana <= toWeek)
                .OrderBy(x => x.Anno)
                .ThenBy(x => x.NumeroSettimana)
                .ToArrayAsync();
        }
        public static int GetWeekOfYear(DateOnly date)
        {
            var cultureInfo = System.Globalization.CultureInfo.GetCultureInfo("it");
            var calendar = cultureInfo.Calendar;
            var dateTime = date.ToDateTime(TimeOnly.MinValue);
            return calendar.GetWeekOfYear(dateTime, cultureInfo.DateTimeFormat.CalendarWeekRule, cultureInfo.DateTimeFormat.FirstDayOfWeek);
        }
    }
}

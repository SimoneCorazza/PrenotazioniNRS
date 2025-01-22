using Microsoft.EntityFrameworkCore;
using PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie;

namespace PrenotazioniNRS.Infrastructure.Persistence
{
    public class AttivitaOrdinariaRepository : IAttivitaOrdinariaRepository
    {
        private readonly ContestoDbContext contestoDbContext;

        public AttivitaOrdinariaRepository(ContestoDbContext contestoDbContext)
        {
            this.contestoDbContext = contestoDbContext;
        }

        public void Aggiungi(AttivitaOrdinaria puliziaSede)
        {
            contestoDbContext.AttivitaOrdinarie.Add(puliziaSede);
            contestoDbContext.SaveChanges();
        }

        public void Modifica(AttivitaOrdinaria puliziaSede)
        {
            contestoDbContext.Entry(puliziaSede).State = EntityState.Modified;
            contestoDbContext.SaveChanges();
        }

        public async Task<AttivitaOrdinaria?> Ottieni(DateOnly giorno)
        {
            return await contestoDbContext.AttivitaOrdinarie.SingleOrDefaultAsync(x => x.Giorno == giorno);
        }

        public void Rimuovi(AttivitaOrdinaria puliziaSede)
        {
            contestoDbContext.AttivitaOrdinarie.Remove(puliziaSede);
            contestoDbContext.SaveChanges();
        }
    }
}

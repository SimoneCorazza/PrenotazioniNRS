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

        public async Task<PuliziaSede?> Ottieni(int numeroSettimanaDallAnnoZero)
        {
            return await contestoDbContext.PulizieSede.SingleOrDefaultAsync(x => x.NumeroSettimanaDallAnnoZero == numeroSettimanaDallAnnoZero);
        }
    }
}

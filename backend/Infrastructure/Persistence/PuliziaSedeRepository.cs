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

        public void Modifica(PuliziaSede puliziaSede)
        {
            throw new NotImplementedException();
        }

        public async Task<PuliziaSede?> Ottieni(int numeroSettimanaDallAnnoZero)
        {
            return await contestoDbContext.PulizieSede.SingleOrDefaultAsync(x => x.NumeroSettimanaDallAnnoZero == numeroSettimanaDallAnnoZero);
        }

        public void Rimuovi(int numeroSettimanaDallAnnoZero)
        {
            throw new NotImplementedException();
        }
    }
}

namespace PrenotazioniNRS.Domain.Sede.Pulizie
{
    public interface IPuliziaSedeRepository
    {
        void Aggiungi(PuliziaSede puliziaSede);

        void Rimuovi(int numeroSettimanaDallAnnoZero);

        void Modifica(PuliziaSede puliziaSede);

        Task<PuliziaSede?> Ottieni(int numeroSettimanaDallAnnoZero);
    }
}

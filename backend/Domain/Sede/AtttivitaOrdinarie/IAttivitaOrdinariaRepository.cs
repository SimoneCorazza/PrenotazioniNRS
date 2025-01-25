namespace PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie
{
    public interface IAttivitaOrdinariaRepository
    {
        void Aggiungi(AttivitaOrdinaria puliziaSede);

        void Rimuovi(AttivitaOrdinaria puliziaSede);

        void Modifica(AttivitaOrdinaria puliziaSede);

        Task<AttivitaOrdinaria?> Ottieni(DateOnly giorno);

        Task<ICollection<AttivitaOrdinaria>> Ottieni(DateOnly from, DateOnly to);
    }
}

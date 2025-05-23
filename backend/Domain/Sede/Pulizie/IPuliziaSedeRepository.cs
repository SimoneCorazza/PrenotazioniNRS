﻿namespace PrenotazioniNRS.Domain.Sede.Pulizie
{
    public interface IPuliziaSedeRepository
    {
        void Aggiungi(PuliziaSede puliziaSede);

        void Rimuovi(PuliziaSede puliziaSede);

        void Modifica(PuliziaSede puliziaSede);

        Task<PuliziaSede?> Ottieni(int anno, int numeroSettimana);

        Task<ICollection<PuliziaSede>> Ottieni(DateOnly from, DateOnly to);
    }
}

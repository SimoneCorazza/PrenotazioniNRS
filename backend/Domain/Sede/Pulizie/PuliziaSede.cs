namespace PrenotazioniNRS.Domain.Sede.Pulizie
{
    /// <summary>
    ///     Attività di pulizia della sede.
    ///     Occorre una volta alla settimana.
    /// </summary>
    public class PuliziaSede
    {
        /// <summary>
        ///     Anno di riferimento
        /// </summary>
        public int Anno { get; protected set; }

        /// <summary>
        ///     Numero di settiamana dell'anno
        /// </summary>
        public int NumeroSettimana { get; protected set; }

        /// <summary>
        ///     Responsabili delle pulizie di questa settimana
        /// </summary>
        public Responsabili Responsabili { get; protected set; }

        public PuliziaSede(int anno, int numeroSettimana)
        {
            Anno = anno;
            NumeroSettimana = numeroSettimana;
            Responsabili = new Responsabili();

            Valida();
        }

        /// <summary>
        ///     Aggiunge un responsabile all'attività di pulizia
        /// </summary>
        /// <param name="responsabile">Responsabile da aggiungere</param>
        /// <exception cref="DomainException">Se il responsabile è già presente</exception>
        public void AggiungiResponsabile(Responsabile responsabile)
        {
            Responsabili.Aggiungi(responsabile);
        }

        /// <summary>
        ///     Rimuove un responsabile all'attività di pulizia
        /// </summary>
        /// <param name="responsabile">Responsabile da rimuovere</param>
        /// <exception cref="DomainException">Se il responsabile non c'è</exception>
        public void RimuoviResponsabile(Responsabile responsabile)
        {
            Responsabili.Rimuovi(responsabile);
        }

        private void Valida()
        {
            if (NumeroSettimana < 0 || NumeroSettimana > 53)
            {
                throw new DomainException("Numero settimane errato");
            }
            else if (Anno < 0)
            {
                throw new DomainException("Anno errato");
            }
        }
    }
}

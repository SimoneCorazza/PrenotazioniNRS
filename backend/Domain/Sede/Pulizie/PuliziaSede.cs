namespace PrenotazioniNRS.Domain.Sede.Pulizie
{
    /// <summary>
    ///     Attività di pulizia della sede.
    ///     Occorre una volta alla settimana.
    /// </summary>
    public class PuliziaSede
    {
        /// <summary>
        ///     Identificativo della settimana partendo dall'anno 0
        /// </summary>
        public int NumeroSettimanaDallAnnoZero { get; protected set; }

        /// <summary>
        ///     Responsabili delle pulizie di questa settimana
        /// </summary>
        public Responsabili Responsabili { get; protected set; }

        public PuliziaSede(int numeroSettimanaDallAnnoZero)
        {
            NumeroSettimanaDallAnnoZero = numeroSettimanaDallAnnoZero;
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
            if (NumeroSettimanaDallAnnoZero < 0)
            {
                throw new DomainException("Numero settimane errato");
            }
        }
    }
}

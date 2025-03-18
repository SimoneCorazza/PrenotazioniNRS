namespace PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie
{
    public class AttivitaOrdinaria
    {
        /// <summary>
        ///     Giorno di apertura
        /// </summary>
        public DateOnly Giorno { get; protected set; }

        /// <summary>
        ///     Responsabili dell'apertura della sede
        /// </summary>
        public Responsabili ResponsabiliApertura { get; protected set; }

        /// <summary>
        ///     Responsabili della chiusura della sede
        /// </summary>
        public Responsabili ResponsabiliChiusura { get; protected set; }

        /// <summary>
        ///     Stato dell'attività
        /// </summary>
        public StatoAttivitaOrdinaria Stato { get; protected set; }

        public AttivitaOrdinaria(DateOnly giorno, StatoAttivitaOrdinaria stato)
        {
            Giorno = giorno;
            ResponsabiliApertura = new Responsabili();
            ResponsabiliChiusura = new Responsabili();
            Stato = stato;

            Valida();
        }

        public void AggiungiResponsabileChiusura(Responsabile responsabile)
        {
            if (Stato != StatoAttivitaOrdinaria.Aperta)
            {
                throw new DomainException("Non è possibile modificare i responsabili se la sede sarà chiusa");
            }

            ResponsabiliChiusura.Aggiungi(responsabile);

            Valida();
        }

        public void RimuoviResponsabileChiusura(Responsabile responsabile)
        {
            if (Stato != StatoAttivitaOrdinaria.Aperta)
            {
                throw new DomainException("Non è possibile modificare i responsabili se la sede sarà chiusa");
            }

            ResponsabiliChiusura.Rimuovi(responsabile);

            Valida();
        }

        public void AggiungiResponsabileAperura(Responsabile responsabile)
        {
            if (Stato != StatoAttivitaOrdinaria.Aperta)
            {
                throw new DomainException("Non è possibile modificare i responsabili se la sede sarà chiusa");
            }

            ResponsabiliApertura.Aggiungi(responsabile);

            Valida();
        }

        public void RimuoviResponsabileAperura(Responsabile responsabile)
        {
            if (Stato != StatoAttivitaOrdinaria.Aperta)
            {
                throw new DomainException("Non è possibile modificare i responsabili se la sede sarà chiusa");
            }

            ResponsabiliApertura.Rimuovi(responsabile);

            Valida();
        }

        public void ModificaStato(StatoAttivitaOrdinaria stato)
        {
            Stato = stato;

            /* NOTA: non svuoto le liste dei responsabili per non perdere dati in caso di cambio di idea da parte dell'utente.
             * Ragione: l'utente andrebbe ad eliminare altri utenti dall'elenco senza averne richiesto il permesso
             */

            Valida();
        }

        private void Valida()
        {
            IsGiornoCorretto();
        }

        private void IsGiornoCorretto()
        {
            if (Giorno.DayOfWeek != DayOfWeek.Tuesday && Giorno.DayOfWeek != DayOfWeek.Friday)
            {
                throw new DomainException("Giorno della settimana non valido");
            }
        }
    }
}

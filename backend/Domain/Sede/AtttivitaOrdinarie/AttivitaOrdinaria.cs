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

        public AttivitaOrdinaria(DateOnly giorno)
        {
            Giorno = giorno;
            ResponsabiliApertura = new Responsabili();
            ResponsabiliChiusura = new Responsabili();

            Valida();
        }

        public void AggiungiResponsabileChiusura(Responsabile responsabile)
        {
            ResponsabiliChiusura.Aggiungi(responsabile);
        }

        public void RimuoviResponsabileChiusura(Responsabile responsabile)
        {
            ResponsabiliChiusura.Rimuovi(responsabile);
        }

        public void AggiungiResponsabileAperura(Responsabile responsabile)
        {
            ResponsabiliApertura.Aggiungi(responsabile);
        }

        public void RimuoviResponsabileAperura(Responsabile responsabile)
        {
            ResponsabiliApertura.Rimuovi(responsabile);
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

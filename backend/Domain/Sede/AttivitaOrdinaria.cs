namespace PrenotazioniNRS.Domain.Sede
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
        public ICollection<Responsabile> ResponsabiliApertura { get; protected set; }

        /// <summary>
        ///     Responsabili della chiusura della sede
        /// </summary>
        public ICollection<Responsabile> ResponsabiliChiusura { get; protected set; }

        public AttivitaOrdinaria(DateOnly giorno)
        {
            Giorno = giorno;
            ResponsabiliApertura = [];
            ResponsabiliChiusura = [];

            Valida();
        }

        public void AggiungiResponsabileChiusura(Responsabile responsabile)
        {
            if (!ResponsabiliChiusura.Contains(responsabile))
            {
                ResponsabiliChiusura.Add(responsabile);
            }
        }

        public void RimuoviResponsabileChiusura(Responsabile responsabile)
        {
            ResponsabiliChiusura.Remove(responsabile);
        }

        public void AggiungiResponsabileAperura(Responsabile responsabile)
        {
            if (!ResponsabiliApertura.Contains(responsabile))
            {
                ResponsabiliApertura.Add(responsabile);
            }
        }

        public bool RimuoviResponsabileAperura(Responsabile responsabile)
        {
            return ResponsabiliApertura.Remove(responsabile);
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

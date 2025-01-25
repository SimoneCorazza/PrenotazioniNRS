using System.ComponentModel.DataAnnotations;

namespace PrenotazioniNRS.Api.Responses.Calendario
{
    /// <summary>
    ///     Calenmdario delle attività delle sede per le date indicate
    /// </summary>
    public class Calendario
    {
        /// <summary>
        ///     Data di inizio del calendario
        /// </summary>
        [Required]
        public DateOnly DataInizio { get; set; }

        /// <summary>
        ///     Data di fine del calendario
        /// </summary>
        [Required]
        public DateOnly DataFine { get; set; }

        /// <summary>
        ///     Aperture ordinarie della sede
        /// </summary>
        [Required]
        public ICollection<AttivitaOrdinaria> ApertureOrdinarie { get; set; }

        /// <summary>
        ///     Pulizie della sede
        /// </summary>
        [Required]
        public ICollection<PulizieSede> PulizieSede { get; set; }
    }
}

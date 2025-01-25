using System.ComponentModel.DataAnnotations;

namespace PrenotazioniNRS.Api.Responses.Calendario
{
    /// <summary>
    ///     Attività ordinaria della sede
    /// </summary>
    public class AttivitaOrdinaria
    {
        /// <summary>
        ///     Giornata dell'attività
        /// </summary>
        [Required]
        public DateOnly Giorno { get; set; }

        /// <summary>
        ///     Responsabili dell'apertura della sede
        /// </summary>
        [Required]
        public ICollection<string> ResponsabiliApertura { get; set; }

        /// <summary>
        ///     Responsabili della chiusura della sede
        /// </summary>
        [Required]
        public ICollection<string> ResponsabiliChiusura { get; set; }
    }
}

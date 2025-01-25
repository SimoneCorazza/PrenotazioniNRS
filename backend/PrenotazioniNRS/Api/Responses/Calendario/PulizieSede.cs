using System.ComponentModel.DataAnnotations;

namespace PrenotazioniNRS.Api.Responses.Calendario
{
    /// <summary>
    ///     Pilizia della sede per una settimana
    /// </summary>
    public class PulizieSede
    {
        /// <summary>
        ///     Numero della settimana dall'anno zero
        /// </summary>
        [Required]
        public int NumeroSettimana { get; set; }

        /// <summary>
        ///     Nomi dei responsabili che si occuperanno delle pulizie
        /// </summary>
        [Required]
        public ICollection<string> Responsabili { get; set; }
    }
}

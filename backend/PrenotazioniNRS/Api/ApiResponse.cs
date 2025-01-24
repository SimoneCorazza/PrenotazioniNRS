using System.ComponentModel.DataAnnotations;

namespace PrenotazioniNRS.Api
{
    public class ApiResponse
    {
        /// <summary>
        ///     Elenco di errori. Vuota se l'operazione è andata a buon fine
        /// </summary>
        [Required]
        public ICollection<string> Errors { get; init; }
    }
}

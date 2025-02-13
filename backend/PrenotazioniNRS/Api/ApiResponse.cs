using System.ComponentModel.DataAnnotations;

namespace PrenotazioniNRS.Api
{
    public class ApiResponse
    {
        public ApiResponse()
        {
            Errori = [];
        }

        public ApiResponse(string errore)
        {
            Errori = [errore];
        }

        public ApiResponse(ICollection<string> errori)
        {
            Errori = [..errori];
        }

        /// <summary>
        ///     Elenco di errori. Vuota se l'operazione è andata a buon fine
        /// </summary>
        [Required]
        public ICollection<string> Errori { get; }
    }
}

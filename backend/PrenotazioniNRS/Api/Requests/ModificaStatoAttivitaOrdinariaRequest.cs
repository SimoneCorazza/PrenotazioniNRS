using PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie;

namespace PrenotazioniNRS.Api.Requests
{
    /// <summary>
    ///     Modifica lo stato di una apertura ordinaria
    /// </summary>
    public class ModificaStatoAttivitaOrdinariaRequest
    {
        /// <summary>
        ///     Data dell'apertura ordinaria dove impostare l'apertura/chiusura della sede
        /// </summary>
        public DateOnly Data { get; set; }

        /// <summary>
        ///     Stato 
        /// </summary>
        public StatoAttivitaOrdinaria Stato { get; set; }
    }
}

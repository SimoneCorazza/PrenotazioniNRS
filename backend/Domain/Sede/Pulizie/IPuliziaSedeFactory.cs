namespace PrenotazioniNRS.Domain.Sede.Pulizie
{
    /// <summary>
    ///     Factory per la creazione di oggetti PuliziaSede
    /// </summary>
    public interface IPuliziaSedeFactory
    {
        /// <summary>
        ///     Ottiene l'istanza di <c>PuliziaSede</c> per la settimana specificata
        /// </summary>
        /// <param name="numeroSettimana">Numero della settimana</param>
        /// <returns>Istanza della pulizia della sede</returns>
        Task<PuliziaSede> Ottieni(int numeroSettimana);
    }
}

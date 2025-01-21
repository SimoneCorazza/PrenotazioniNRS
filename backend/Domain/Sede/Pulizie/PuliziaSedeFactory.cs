namespace PrenotazioniNRS.Domain.Sede.Pulizie
{
    /// <inheritdoc cref="IPuliziaSedeFactory"/>
    public class PuliziaSedeFactory : IPuliziaSedeFactory
    {
        private readonly IPuliziaSedeRepository puliziaSedeRepository;

        public PuliziaSedeFactory(IPuliziaSedeRepository puliziaSedeRepository)
        {
            this.puliziaSedeRepository = puliziaSedeRepository;
        }

        /// <inheritdoc/>
        public async Task<PuliziaSede> Ottieni(int numeroSettimana)
        {
            var istanzaCaricata = await puliziaSedeRepository.Ottieni(numeroSettimana);

            return istanzaCaricata is null ? new PuliziaSede(numeroSettimana) : istanzaCaricata;
        }
    }
}

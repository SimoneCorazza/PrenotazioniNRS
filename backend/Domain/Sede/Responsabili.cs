using System.Collections;

namespace PrenotazioniNRS.Domain.Sede
{
    /// <summary>
    ///     Elenco di responsabili per un determinato compito presso l'associazione
    /// </summary>
    public class Responsabili : IEnumerable<Responsabile>
    {
        private readonly List<Responsabile> responsabili;

        public int Count => responsabili.Count;

        /// <summary>
        ///     Inizializza l'elenco con una sequenza di responsabili
        /// </summary>
        /// <param name="enumerable">Sequenza da inserire</param>
        public Responsabili(IEnumerable<Responsabile> enumerable)
        {
            responsabili = [];

            foreach (var responsabile in enumerable)
            {
                Aggiungi(responsabile);
            }
        }

        /// <summary>
        ///     Inizializza il responsabile con un elenco vuoto
        /// </summary>
        public Responsabili()
        {
            responsabili = [];
        }

        /// <inheritdoc/>
        public IEnumerator<Responsabile> GetEnumerator()
        {
            return responsabili.GetEnumerator();
        }

        /// <inheritdoc/>
        IEnumerator IEnumerable.GetEnumerator()
        {
            return responsabili.GetEnumerator();
        }

        /// <summary>
        ///     Aggiunge un responsabile all'elenco
        /// </summary>
        /// <param name="responsabile">Responsabile da aggiungere</param>
        /// <exception cref="DomainException">Se il responsabile è già presente</exception>
        public void Aggiungi(Responsabile responsabile)
        {
            if (responsabili.Contains(responsabile))
            {
                throw new DomainException("Responsabile già presente");
            }

            responsabili.Add(responsabile);
        }

        /// <summary>
        ///     Rimuove un responsabile dall'elenco
        /// </summary>
        /// <param name="responsabile">Responsabile da rimuovere</param>
        /// <exception cref="DomainException">Se il responsabile non è presente</exception>
        public void Rimuovi(Responsabile responsabile)
        {
            if (!responsabili.Remove(responsabile))
            {
                throw new DomainException("Responsabile non presente");
            }
        }
    }
}

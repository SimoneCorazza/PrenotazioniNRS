using Microsoft.AspNetCore.Mvc;
using PrenotazioniNRS.Domain.Sede;
using PrenotazioniNRS.Domain.Sede.Pulizie;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

namespace PrenotazioniNRS.Api
{
    [ApiController]
    [Route("api/v1/[controller]/[action]")]
    public class PuliziaSedeController : ApiController
    {
        private readonly IPuliziaSedeRepository puliziaSedeRepository;

        public PuliziaSedeController(IPuliziaSedeRepository puliziaSedeRepository, IUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
            this.puliziaSedeRepository = puliziaSedeRepository;
        }

        /// <summary>
        ///     Rimuove il responsabile loggato della pulizia della sede per la settimana specificata
        /// </summary>
        /// <param name="anno">Anno</param>
        /// <param name="numeroSettimana">Numero della settimana dell'anno</param>
        /// <returns>Esito dell'operazione</returns>
        [HttpDelete("{anno}/{numeroSettimana}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
        public async Task<IActionResult> Rimuovimi(int anno, int numeroSettimana)
        {
            return await ExecuteAsync(async () =>
            {
                var sede = await puliziaSedeRepository.Ottieni(anno, numeroSettimana);
                if (sede is null)
                {
                    return BadRequest("La pulizia della sede per la settimana specificata non esiste");
                }

                sede.RimuoviResponsabile(new Responsabile(NomeUtente));

                if (sede.Responsabili.Count == 0)
                {
                    puliziaSedeRepository.Rimuovi(sede);
                }
                else
                {
                    puliziaSedeRepository.Modifica(sede);
                }

                return Ok();
            });
        }

        /// <summary>
        ///     Aggiunge il responsabile loggato alla pulizia della sede per la settimana specificata
        /// </summary>
        /// <param name="anno">Anno</param>
        /// <param name="numeroSettimana">Numero della settimana dell'anno</param>
        /// <returns>Esito dell'operazione</returns>
        [HttpPost("{anno}/{numeroSettimana}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
        public async Task<IActionResult> Aggiungimi(int anno, int numeroSettimana)
        {
            return await ExecuteAsync(async () =>
            {
                var sedeOriginaria = await puliziaSedeRepository.Ottieni(anno, numeroSettimana);
                var sede = sedeOriginaria ?? new PuliziaSede(anno, numeroSettimana);
                sede.AggiungiResponsabile(new Responsabile(NomeUtente));

                if (sedeOriginaria is null)
                {
                    puliziaSedeRepository.Aggiungi(sede);
                }
                else
                {
                    puliziaSedeRepository.Modifica(sede);
                }

                return Ok();
            });
        }
    }
}

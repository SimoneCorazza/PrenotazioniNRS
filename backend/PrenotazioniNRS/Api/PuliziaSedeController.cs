using Microsoft.AspNetCore.Mvc;
using PrenotazioniNRS.Domain;
using PrenotazioniNRS.Domain.Sede;
using PrenotazioniNRS.Domain.Sede.Pulizie;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

namespace PrenotazioniNRS.Api
{
    [ApiController]
    [Route("api/v1/[controller]/[action]")]
    public class PuliziaSedeController : ControllerBase
    {
        private readonly IPuliziaSedeRepository puliziaSedeRepository;
        private readonly IUnitOfWork unitOfWork;

        public PuliziaSedeController(IPuliziaSedeRepository puliziaSedeRepository, IUnitOfWork unitOfWork)
        {
            this.puliziaSedeRepository = puliziaSedeRepository;
            this.unitOfWork = unitOfWork;
        }

        /// <summary>
        ///     Rimuove il responsabile loggato della pulizia della sede per la settimana specificata
        /// </summary>
        /// <param name="numeroSettimana">Numero della settimana da cui effettuare l'eliminazione</param>
        /// <returns>Esito dell'operazione</returns>
        [HttpDelete("{numeroSettimana}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Rimuovimi(int numeroSettimana)
        {
            var transaction = unitOfWork.Begin();

            var nome = User.Claims.First(c => c.Type == "NomeUtente").Value;

            try
            {
                var sede = await puliziaSedeRepository.Ottieni(numeroSettimana);
                if (sede is null)
                {
                    return BadRequest("La pulizia della sede per la settimana specificata non esiste");
                }

                sede.RimuoviResponsabile(new Responsabile(nome));

                if (sede.Responsabili.Count == 0)
                {
                    puliziaSedeRepository.Rimuovi(sede);
                }
                else
                {
                    puliziaSedeRepository.Modifica(sede);
                }

                await transaction.CommitAsync();
                return Ok();
            }
            catch (DomainException ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(ex.Message);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
            finally
            {
                await transaction.DisposeAsync();
            }
        }

        /// <summary>
        ///     Aggiunge il responsabile loggato alla pulizia della sede per la settimana specificata
        /// </summary>
        /// <param name="numeroSettimana">Numero della settimana da cui effettuare l'eliminazione</param>
        /// <returns>Esito dell'operazione</returns>
        [HttpPost("{numeroSettimana}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Aggiungimi(int numeroSettimana)
        {
            var transaction = unitOfWork.Begin();

            var nome = User.Claims.First(c => c.Type == "NomeUtente").Value;

            try
            {
                var sedeOriginaria = await puliziaSedeRepository.Ottieni(numeroSettimana);
                var sede = sedeOriginaria ?? new PuliziaSede(numeroSettimana);
                sede.AggiungiResponsabile(new Responsabile(nome));

                if (sedeOriginaria is null)
                {
                    puliziaSedeRepository.Aggiungi(sede);
                }
                else
                {
                    puliziaSedeRepository.Modifica(sede);
                }

                await transaction.CommitAsync();
                return Ok();
            }
            catch (DomainException ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(ex.Message);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
            finally
            {
                await transaction.DisposeAsync();
            }
        }
    }
}

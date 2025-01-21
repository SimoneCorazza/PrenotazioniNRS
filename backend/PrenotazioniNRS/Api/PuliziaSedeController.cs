using Microsoft.AspNetCore.Mvc;
using PrenotazioniNRS.Domain;
using PrenotazioniNRS.Domain.Sede;
using PrenotazioniNRS.Domain.Sede.Pulizie;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;
using System.Transactions;

namespace PrenotazioniNRS.Api
{
    [ApiController]
    [Route("api/v1/[controller]/[action]")]
    public class PuliziaSedeController : ControllerBase
    {
        private readonly IPuliziaSedeFactory puliziaSedeFactory;
        private readonly IUnitOfWork unitOfWork;

        public PuliziaSedeController(IPuliziaSedeFactory puliziaSedeFactory, IUnitOfWork unitOfWork)
        {
            this.puliziaSedeFactory = puliziaSedeFactory;
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
                var sede = await puliziaSedeFactory.Ottieni(numeroSettimana);
                sede.AggiungiResponsabile(new Responsabile(nome));

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
            return Ok();
        }
    }
}

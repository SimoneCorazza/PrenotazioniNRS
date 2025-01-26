using Microsoft.AspNetCore.Mvc;
using PrenotazioniNRS.Api.Responses.Calendario;
using PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie;
using PrenotazioniNRS.Domain.Sede.Pulizie;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

namespace PrenotazioniNRS.Api
{
    public class CalendarioController : ApiController
    {
        private readonly IPuliziaSedeRepository puliziaSedeRepository;
        private readonly IAttivitaOrdinariaRepository attivitaOrdinariaRepository;

        public CalendarioController(IUnitOfWork unitOfWork,
            IPuliziaSedeRepository puliziaSedeRepository,
            IAttivitaOrdinariaRepository attivitaOrdinariaRepository)
            : base(unitOfWork)
        {
            this.puliziaSedeRepository = puliziaSedeRepository;
            this.attivitaOrdinariaRepository = attivitaOrdinariaRepository;
        }

        /// <summary>
        ///     Ottiene tutte le attività in programma nel range di date indicate
        /// </summary>
        /// <param name="from">Data di partenza</param>
        /// <param name="to">Data finale</param>
        /// <returns>Calendario di attviità</returns>
        [HttpGet]
        [Route("api/v1/calendario")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Calendario))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse))]
        public async Task<IActionResult> Result([FromQuery] DateOnly from, [FromQuery] DateOnly to)
        {
            var pulizieSedi = await puliziaSedeRepository.Ottieni(from, to);
            var attivitaOrdinarie = await attivitaOrdinariaRepository.Ottieni(from, to);

            return Ok(new Calendario
            {
                DataInizio = from,
                DataFine = to,
                ApertureOrdinarie = attivitaOrdinarie.Select(x => new Responses.Calendario.AttivitaOrdinaria
                {
                    Giorno = x.Giorno,
                    ResponsabiliApertura = x.ResponsabiliApertura.Select(x => x.Nome).ToArray(),
                    ResponsabiliChiusura = x.ResponsabiliChiusura.Select(x => x.Nome).ToArray(),
                }).ToArray(),
                PulizieSede = pulizieSedi.Select(x => new PulizieSede
                {
                    Anno = x.Anno,
                    NumeroSettimana = x.NumeroSettimana,
                    Responsabili = x.Responsabili.Select(x => x.Nome).ToArray(),
                }).ToArray(),
            });
        }
    }
}

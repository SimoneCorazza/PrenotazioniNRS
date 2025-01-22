using Microsoft.AspNetCore.Mvc;
using PrenotazioniNRS.Domain.Sede;
using PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

namespace PrenotazioniNRS.Api
{
    [Route("api/v1/[controller]/[action]")]
    public class AttivitaOrdinariaController : ApiController
    {
        private readonly IAttivitaOrdinariaRepository attivitaOrdinariaRepository;

        public AttivitaOrdinariaController(
            IAttivitaOrdinariaRepository attivitaOrdinariaRepository,
            IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this.attivitaOrdinariaRepository = attivitaOrdinariaRepository;
        }

        [Route("{azione}/{giorno}")]
        public async Task<IActionResult> Aggiungimi(string azione, DateOnly giorno)
        {
            return await ExecuteAsync(async () =>
            {
                var valoreADb = await attivitaOrdinariaRepository.Ottieni(giorno);
                var valore = valoreADb ?? new AttivitaOrdinaria(giorno);

                if (azione.Equals("apertura", StringComparison.CurrentCultureIgnoreCase))
                {
                    valore.AggiungiResponsabileAperura(new Responsabile(NomeUtente));
                }
                else if (azione.Equals("chiusura", StringComparison.CurrentCultureIgnoreCase))
                {
                    valore.AggiungiResponsabileChiusura(new Responsabile(NomeUtente));
                }
                else
                {
                    return BadRequest("Azione non valida");
                }

                if (valoreADb is null)
                {
                    attivitaOrdinariaRepository.Aggiungi(valore);
                }
                else
                {
                    attivitaOrdinariaRepository.Modifica(valore);
                }

                return Ok();
            });
        }

        [Route("{azione}/{giorno}")]
        public async Task<IActionResult> Rimuovimi(string azione, DateOnly giorno)
        {
            return await ExecuteAsync(async () =>
            {
                var valore = await attivitaOrdinariaRepository.Ottieni(giorno);
                if (valore is null)
                {
                    return BadRequest("Attività ordinaria non presente");
                }

                if (azione.Equals("apertura", StringComparison.CurrentCultureIgnoreCase))
                {
                    valore.RimuoviResponsabileAperura(new Responsabile(NomeUtente));
                }
                else if (azione.Equals("chiusura", StringComparison.CurrentCultureIgnoreCase))
                {
                    valore.RimuoviResponsabileChiusura(new Responsabile(NomeUtente));
                }
                else
                {
                    return BadRequest("Azione non valida");
                }

                if (valore.ResponsabiliChiusura.Count == 0 && valore.ResponsabiliApertura.Count == 0)
                {
                    attivitaOrdinariaRepository.Rimuovi(valore);
                }
                else
                {
                    attivitaOrdinariaRepository.Modifica(valore);
                }

                return Ok();
            });
        }
    }
}

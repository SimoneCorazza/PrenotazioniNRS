using Microsoft.AspNetCore.Mvc;
using PrenotazioniNRS.Domain.Sede;
using PrenotazioniNRS.Domain;
using PrenotazioniNRS.Infrastructure.Persistence;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

namespace PrenotazioniNRS.Api
{
    [ApiController]
    public abstract class ApiController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;

        public string NomeUtente => User.Claims.First(c => c.Type == "NomeUtente").Value;

        public ApiController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        protected async Task<IActionResult> ExecuteAsync(Func<Task<IActionResult>> action)
        {
            var transaction = unitOfWork.Begin();

            try
            {
                var r = await action();

                await transaction.CommitAsync();
                return r;
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

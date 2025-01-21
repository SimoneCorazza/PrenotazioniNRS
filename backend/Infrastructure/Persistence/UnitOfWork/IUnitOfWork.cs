using Microsoft.EntityFrameworkCore.Storage;

namespace PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork
{
    public interface IUnitOfWork
    {
        IDbContextTransaction Begin();
    }
}

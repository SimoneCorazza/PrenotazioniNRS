using Microsoft.EntityFrameworkCore.Storage;

namespace PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ContestoDbContext contestoDbContext;

        public UnitOfWork(ContestoDbContext contestoDbContext)
        {
            this.contestoDbContext = contestoDbContext;
        }

        public IDbContextTransaction Begin()
        {
            return contestoDbContext.Database.BeginTransaction();
        }
    }
}

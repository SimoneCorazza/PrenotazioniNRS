using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace PrenotazioniNRS.Infrastructure.Persistence
{
    public static class Inizializza
    {
        public static void InizializzaPersistenzaContesto(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ContestoDbContext>(options => options.UseNpgsql(connectionString));
        }

        public static void UsePersistenzaEntityFramework(this IApplicationBuilder applicationBuilder)
        {
            using var scope = applicationBuilder.ApplicationServices.CreateScope();

            var dbContext = scope.ServiceProvider.GetService<ContestoDbContext>()
                ?? throw new InvalidOperationException($"Non sono stati iniettati i contesti tramite {nameof(InizializzaPersistenzaContesto)}");
            dbContext.Database.EnsureCreated();
        }
    }
}

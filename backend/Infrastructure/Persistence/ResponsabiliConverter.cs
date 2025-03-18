using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PrenotazioniNRS.Domain.Sede;

namespace PrenotazioniNRS.Infrastructure.Persistence
{
    public class ResponsabiliConverter : ValueConverter<Responsabili, string>
    {
        public ResponsabiliConverter()
            : base(x => string.Join("|", x.Select(x => x.ToString())),
                x => new Responsabili(x.Split("|", StringSplitOptions.RemoveEmptyEntries).Select(x => new Responsabile(x))))
        {
        }
    }
}

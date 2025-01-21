using System.Text;
using System.Text.RegularExpressions;

namespace PrenotazioniNRS.Domain.Sede
{
    public partial class Responsabile
    {
        public string Nome { get; }

        public Responsabile(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
                throw new ArgumentException("Nome non valido", nameof(nome));
            }

            Nome = Normalizza(nome);
        }

        public override bool Equals(object? obj)
        {
            if (obj is null)
            {
                return false;
            }
            else if (obj is Responsabile r)
            {
                return r.Nome == Nome;
            }
            else
            {
                return false;
            }
        }

        public override int GetHashCode()
        {
            return Nome.GetHashCode();
        }

        public override string ToString()
        {
            return Nome;
        }

        private static string Normalizza(string s)
        {
            StringBuilder sb = new StringBuilder(s.Trim());
            sb[0] = char.ToUpper(sb[0]);
            return sb.ToString();
        }

        [GeneratedRegex("^[A-Za-z ]+$", RegexOptions.Compiled)]
        private static partial Regex GeneraPattern();
    }
}

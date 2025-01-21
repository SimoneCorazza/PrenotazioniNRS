using Microsoft.AspNetCore.Authentication;

namespace PrenotazioniNRS.Auth
{
    public class Autenticazione : AuthenticationSchemeOptions
    {
        public const string DefaultScheme = "Autenticazione";

        public string HeaderName { get; set; } = "X-Nome-Utente";
    }
}

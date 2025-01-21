using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace PrenotazioniNRS.Auth
{
    public class AutenticazioneHandler : AuthenticationHandler<Autenticazione>
    {
        public AutenticazioneHandler(
            IOptionsMonitor<Autenticazione> options,
            ILoggerFactory logger,
            UrlEncoder encoder) : base(options, logger, encoder)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.TryGetValue(Options.HeaderName, out Microsoft.Extensions.Primitives.StringValues value))
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }

            string nomeUtente = value!;

            // TODO: validare nome utente
            
            var claims = new List<Claim>()
            {
                new ("NomeUtente", nomeUtente)
            };

            var claimsIdentity = new ClaimsIdentity(claims, Scheme.Name);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
        }
    }
}

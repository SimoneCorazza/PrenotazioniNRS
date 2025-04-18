using PrenotazioniNRS.Infrastructure.Persistence;
using PrenotazioniNRS.Auth;
using PrenotazioniNRS.Domain.Sede.Pulizie;
using System.Reflection;
using PrenotazioniNRS.Domain.Sede.AtttivitaOrdinarie;
using Microsoft.OpenApi.Models;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);
}
else
{
    builder.Configuration.AddJsonFile("appsettings.prod.json", optional: false, reloadOnChange: true);
}

string connectionString = builder.Configuration.GetValue<string>("Persistence:ConnectionString") ?? throw new ArgumentNullException();
builder.Services.InizializzaPersistenzaContesto(connectionString);

builder.Services.AddScoped<IPuliziaSedeRepository, PuliziaSedeRepository>();
builder.Services.AddScoped<IAttivitaOrdinariaRepository, AttivitaOrdinariaRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddAuthentication(Autenticazione.DefaultScheme)
    .AddScheme<Autenticazione, AutenticazioneHandler>(Autenticazione.DefaultScheme, null);
builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

    options.AddSecurityDefinition("Name_Header", new OpenApiSecurityScheme
    {
        Description = "Audenticazione tramite header 'X-Nome-Utente'",
        In = ParameterLocation.Header,
        Name = "X-Nome-Utente"
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.UseWhen(context => !context.Request.Path.StartsWithSegments("/docs"), appBuilder =>
{
    appBuilder.UseAuthentication();
    appBuilder.UseAuthorization();
});

app.UsePersistenzaEntityFramework();

app.MapControllers().RequireAuthorization();

app.Run();

using PrenotazioniNRS.Infrastructure.Persistence;
using PrenotazioniNRS.Auth;
using PrenotazioniNRS.Domain.Sede.Pulizie;
using System.Reflection;
using PrenotazioniNRS.Infrastructure.Persistence.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetValue<string>("Persistence:ConnectionString") ?? throw new ArgumentNullException();
builder.Services.InizializzaPersistenzaContesto(connectionString);

builder.Services.AddScoped<IPuliziaSedeRepository, PuliziaSedeRepository>();
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

app.UseWhen(context => !context.Request.Path.StartsWithSegments("/docs"), appBuilder =>
{
    appBuilder.UseAuthentication();
    appBuilder.UseAuthorization();
});

app.UsePersistenzaEntityFramework();


app.MapControllers().RequireAuthorization();

app.Run();

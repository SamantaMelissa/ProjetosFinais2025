using Microsoft.EntityFrameworkCore;
using NexusAPI.Domains; // namespace do NexusContext

var builder = WebApplication.CreateBuilder(args);

// registra o DbContext antes do Build()
builder.Services.AddDbContext<NexusContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.Run();

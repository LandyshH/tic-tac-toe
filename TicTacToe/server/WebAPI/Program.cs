using WebAPI;
using WebAPI.Features.Game;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors();

var app = builder.Build();
app.UseCors((options) =>
{
    options.AllowCredentials()
        .WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
});

app.UseRouting();
app.MapHub<TicTacToeHub>("/game");
app.Run();
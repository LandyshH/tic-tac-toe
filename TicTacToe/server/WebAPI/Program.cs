using System.ComponentModel.DataAnnotations;
using Infrastructure.Configurations;
using MassTransit;
using WebAPI.Features.Game;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors();

builder.Services.AddMassTransit(configurator =>
{
    var cfg = builder.Configuration;
    configurator.UsingRabbitMq((ctx, brokerConfigurator) =>
    {
        var rabbit = cfg.GetRequiredSection("Rabbit").Get<Rabbit>();
        
        brokerConfigurator.Host(rabbit.Host, hostConfigurator =>
        {
            hostConfigurator.Password(rabbit.Password);
            hostConfigurator.Username(rabbit.UserName);
        });
                
        brokerConfigurator.ConfigureEndpoints(ctx);
    });
});

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
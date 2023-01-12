using Consumer;
using Infrastructure.Configurations;
using MassTransit;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =>
    {
        var cfg = context.Configuration;
        var rabbit = cfg.GetRequiredSection("Rabbit").Get<Rabbit>();
        services.AddMassTransit(configurator =>
        {
            configurator.AddConsumer<RabbitConsumer>();

            configurator.UsingRabbitMq((ctx, brokerConfigurator) =>
            {
                brokerConfigurator.Host(rabbit.Host, hostConfigurator =>
                {
                    hostConfigurator.Password(rabbit.Password);
                    hostConfigurator.Username(rabbit.UserName);
                });
                
                brokerConfigurator.ConfigureEndpoints(ctx);
            });
        });
    })
    .Build();

await host.RunAsync();
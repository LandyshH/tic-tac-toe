using Core.Events;
using MassTransit;

namespace Consumer;

public class RabbitConsumer : IConsumer<WinEvent>
{
    public Task Consume(ConsumeContext<WinEvent> context)
    {
        return Task.CompletedTask;
        //smth (например, записать в бд)
    }
}
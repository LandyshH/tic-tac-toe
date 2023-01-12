using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Features.Game;

public interface IHubClient
{
    Task ReceiveMessage(string message);
}

public class TicTacToeHub : Hub<IHubClient>
{
    public async Task SendMessage(string message)
    {
        await Clients.All.ReceiveMessage(message);
    }
}
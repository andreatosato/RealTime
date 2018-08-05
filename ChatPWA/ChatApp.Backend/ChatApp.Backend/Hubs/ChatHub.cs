using ChatApp.Backend.Models;
using ChatApp.Backend.Stores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ChatApp.Backend.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            ChatStore.UsersOnline.Add(new UserSignalR(Context.User.Identity.Name, Context.ConnectionId));
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var currentUser = ChatStore.UsersOnline.Find(x => x.Username == Context.User.Identity.Name);
            if(currentUser != null)
                ChatStore.UsersOnline.Remove(currentUser);

            return base.OnDisconnectedAsync(exception);
        }

        public UserSignalR GetUserContext()
        {
            return new UserSignalR(Context.User.Identity.Name, Context.ConnectionId);
        }

        public void addPrivateMessage(MessageModel message)
        {
            Clients.User(message.To.Username).SendAsync("receivePrivateMessage", message);
        }
    }
}

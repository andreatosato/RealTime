﻿using System;
using System.Threading.Tasks;
using ChatApp.Backend.Hubs;
using ChatApp.Backend.Models.JoinGroups;
using ChatApp.Backend.Stores;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JoinGroupsController : ControllerBase
    {
        private IHubContext<ChatHub> _chatHubContext;
        public JoinGroupsController(IHubContext<ChatHub> chatHubContext)
        {
            _chatHubContext = chatHubContext ?? throw new ArgumentNullException("ChatHub non presente");
        }

        [HttpPost]
        public async Task<IActionResult> AddUserToGroupAsync(JoinGroupModels join)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var group = ChatStore.UsersByGroups.Find(x => x.GroupName == join.Group);
            if (group == null)
                return NotFound("Group not exists");
            else
            {
                var currentUser = ChatStore.UsersOnline.Find(x => x.Username == join.Username);
                if (currentUser == null)
                    return NotFound("User Not Connected");

                var userAlreadyJoin = group.Users.Find(x => x.Username == currentUser.Username);
                if(userAlreadyJoin == null)
                {
                    group.Users.Add(currentUser);
                    await _chatHubContext.Groups.AddToGroupAsync(currentUser.ConnectionId, group.GroupName);
                }
            }
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> RemoveUserFromGroup(JoinGroupModels join)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var group = ChatStore.UsersByGroups.Find(x => x.GroupName == join.Group);
            if (group == null)
                return NotFound();
            else
            {
                var currentUser = ChatStore.UsersOnline.Find(x => x.Username == join.Username);
                if (currentUser == null)
                    return NotFound("User Not Connected");

                var userAlreadyJoin = group.Users.Find(x => x.Username == currentUser.Username);
                if (userAlreadyJoin != null)
                {
                    group.Users.Remove(userAlreadyJoin);
                    await _chatHubContext.Groups.RemoveFromGroupAsync(currentUser.ConnectionId, group.GroupName);
                }
            }
            return Ok();
        }
    }
}
using ChatApp.Backend.Models.Groups;
using ChatApp.Backend.Stores;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddGroup(GroupModel group)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            ChatStore.UsersByGroups.Add(new UserInGroup()
            {
                GroupName = group.Group
            });
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateGroup(GroupUpdateModel group)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var oldGroup = ChatStore.UsersByGroups.Find(x => x.GroupName == group.OldGroup);
            if (oldGroup == null)
                return NotFound();
            else
                oldGroup.GroupName = group.Group;
            return Ok();
        }


        [HttpDelete]
        public IActionResult DeleteGroup(GroupModel group)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var groupToDelete = ChatStore.UsersByGroups.Find(x => x.GroupName == group.Group);
            ChatStore.UsersByGroups.Remove(groupToDelete);
            return Ok();
        }
    }
}
using ChatApp.Backend.Models.Groups;
using System.ComponentModel.DataAnnotations;

namespace ChatApp.Backend.Models.JoinGroups
{
    public class JoinGroupModels : GroupModel
    {
        [Required]
        public string Username { get; set; }
    }
}

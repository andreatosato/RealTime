using System.ComponentModel.DataAnnotations;

namespace ChatApp.Backend.Models.JoinGroups
{
    public class JoinGroupModels
    {
        [Required]
        public string Group { get; set; }
    }
}

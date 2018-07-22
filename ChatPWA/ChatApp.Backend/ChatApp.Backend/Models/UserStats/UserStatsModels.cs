using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Backend.Models.UserStats
{
    public class UserStatsResponseModels
    {
        public UserStatsResponseModels()
        {

        }
        public UserStatsResponseModels(int count)
        {
            Count = count;
        }
        int Count { get; set; }
    }

    public class UserStatsRequestModels
    {
        [Required]
        public StatType Type { get; set; }
        public string Group { get; set; }
    }

    public enum StatType
    {
        Group,
        User,
        UserInGroup
    }
}

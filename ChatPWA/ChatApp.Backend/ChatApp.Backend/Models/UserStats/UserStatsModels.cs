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
        public UserStatsResponseModels(int count, IEnumerable<string> values)
        {
            Count = count;
            Values = values;
        }
        int Count { get; }
        IEnumerable<string> Values { get; }
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

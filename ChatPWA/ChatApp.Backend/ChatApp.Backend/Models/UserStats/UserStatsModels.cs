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
        public int Count { get; set; }
        public IEnumerable<string> Values { get; set; }
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

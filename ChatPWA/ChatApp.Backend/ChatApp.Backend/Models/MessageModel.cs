using ChatApp.Backend.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Backend.Models
{
    public class MessageModel
    {
        public UserSignalR To { get; set; }
        public UserSignalR From { get; set; }
        public string TextMessage { get; set; }
    }
}

using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StazioneMetereologica.Web.Hubs
{
    public interface ITemperatureHub : IClientProxy
    {
        Task SendTemperatureToGroup(DateTime temperatureData, decimal data);
    }
}

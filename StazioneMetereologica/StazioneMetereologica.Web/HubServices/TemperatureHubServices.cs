using Microsoft.AspNetCore.SignalR;
using StazioneMetereologica.Web.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StazioneMetereologica.Web.HubServices
{
    public interface ITemperatureHubService
    {
        Task SendTemperatureToGroup(DateTime temperatureData, decimal data);
    }

    public class TemperatureHubService : ITemperatureHubService
    {
        private IHubContext<TemperatureHub> _hub;
        public TemperatureHubService(IHubContext<TemperatureHub> hub)
        {
            _hub = hub ?? throw new ArgumentNullException("TemperatureHub is null");
        }

        #region [Temperature]
        public Task SendTemperatureToGroup(DateTime temperatureData, decimal data)
        {
            return _hub.Clients
                .Groups(GroupsUsers.TemperatureGroups)
                .SendAsync("ReceiveTemperature", new ChartDataPoint(temperatureData, data));
        }
        #endregion
    }
}

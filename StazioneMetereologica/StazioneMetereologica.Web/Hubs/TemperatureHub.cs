using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StazioneMetereologica.Web.Hubs
{
    public class TemperatureHub : Hub
    {
        public TemperatureHub()
        {
        }

        #region [Connections]
        /// <summary>
        /// Connessione
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {

            await Groups.AddToGroupAsync(Context.ConnectionId, "Temperature");
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Disconnessione Utente
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public async override Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
        #endregion

        
        #region [Umidity]
        #endregion
        #region [Allarms]
        #endregion
    }
}

public static class GroupsUsers
{
    public static IReadOnlyList<string> TemperatureGroups = new[] { "Temperature" };
    public static IReadOnlyList<string> UmidityGroups = new[] { "Umidity" };
}

public class ChartDataPoint
{
    public ChartDataPoint(DateTime currentData, decimal value)
    {
        X = currentData;
        Y = value;
    }

    //[JsonProperty("timestamp")]
    public DateTime X { get; }
    public decimal Y { get; }
}
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StazioneMetereologica.Web.Hubs;
using StazioneMetereologica.Web.HubServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StazioneMetereologica.Web.HostedServices
{
    public class TemperatureHostedService : IHostedService
    {
        private ILogger<TemperatureHostedService> _logger;
        private Task _backgroundTask;
        private CancellationTokenSource _shutdown = new CancellationTokenSource();
        private ITemperatureHubService _temperatureHubService;

        public TemperatureHostedService(ILogger<TemperatureHostedService> logger, ITemperatureHubService temperatureHubService)
        {
            _logger = logger ?? throw new ArgumentNullException("Logger ILogger<TemperatureHostedService> is null");
            _temperatureHubService = temperatureHubService ?? throw new ArgumentNullException("TemperatureHub service is null");             
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"TemperatureHostedService started {DateTime.UtcNow.ToShortDateString()}");

            _backgroundTask = Task.Run(BackgroundProcessing);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"TemperatureHostedService stopped {DateTime.UtcNow.ToShortDateString()}");
            _shutdown.Cancel();
            return Task.WhenAny(_backgroundTask, Task.Delay(Timeout.Infinite, cancellationToken));
        }

        private async Task BackgroundProcessing()
        {
            while (!_shutdown.IsCancellationRequested)
            {
                var cancellationToken = _shutdown.Token;
                //var workItem = await TaskQueue.DequeueAsync(_shutdown.Token);

                //try
                //{
                //    await workItem(_shutdown.Token);
                //}
                //catch (Exception ex)
                //{
                //    _logger.LogError(ex, $"Error occurred executing {nameof(workItem)}.");
                //}
            }
        }
    }
}

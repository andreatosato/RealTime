using Microsoft.Azure.EventHubs.Processor;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.ServiceBus.Messaging;
using StazioneMetereologica.Web.HubServices;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;

namespace StazioneMetereologica.Web.HostedServices
{
    public class TemperatureHostedService : BackgroudServices, IHostedService, IDisposable
    {
        private ILogger<TemperatureHostedService> _logger;
        private ITemperatureHubService _temperatureHubService;
        private readonly string EhConnectionString;
        private readonly string EhEntityPath = "temperature";
        private readonly string StorageContainerName = "eventhub";
        private readonly string StorageConnectionString;
        private EventProcessorHost eventProcessorHost;
        private ProcessorsFactory _processorsFactory;

        public TemperatureHostedService(string connectionString, string storageConnectionString, ILogger<TemperatureHostedService> logger, ITemperatureHubService temperatureHubService)
        {
            _logger = logger ?? throw new ArgumentNullException("Logger ILogger<TemperatureHostedService> is null");
            _temperatureHubService = temperatureHubService ?? throw new ArgumentNullException("TemperatureHub service is null");
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException(nameof(connectionString));
            EhConnectionString = connectionString;
            StorageConnectionString = storageConnectionString;

            eventProcessorHost = new EventProcessorHost(
              EhEntityPath,
              PartitionReceiver.DefaultConsumerGroupName,
              EhConnectionString,
              StorageConnectionString,
              StorageContainerName);
        }

        protected override async Task BackgroundProcessing(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                if(_processorsFactory == null)
                {
                    _processorsFactory = new ProcessorsFactory(_temperatureHubService);
                    await eventProcessorHost.RegisterEventProcessorFactoryAsync(_processorsFactory);
                }
                await Task.FromResult<object>(null);
            }
            await eventProcessorHost.UnregisterEventProcessorAsync();
        }
    }
}

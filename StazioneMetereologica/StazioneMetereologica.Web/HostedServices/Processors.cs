using Microsoft.Azure.EventHubs;
using Microsoft.Azure.EventHubs.Processor;
using StazioneMetereologica.Web.HubServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StazioneMetereologica.Web.HostedServices
{
    public class ProcessorsFactory : IEventProcessorFactory
    {
        public ITemperatureHubService _temperatureHubService;
        public ProcessorsFactory(ITemperatureHubService temperatureHubService)
        {
            _temperatureHubService = temperatureHubService ?? throw new ArgumentNullException("TemperatureHubServices is null");
        }
        public IEventProcessor CreateEventProcessor(PartitionContext context)
        {
            return new IoTHubProcessor(_temperatureHubService);
        }
    }

    public class IoTHubProcessor : IEventProcessor
    {
        public ITemperatureHubService _temperatureHubService;

        public IoTHubProcessor(ITemperatureHubService temperatureHubService)
        {
            _temperatureHubService = temperatureHubService ?? throw new ArgumentNullException("TemperatureHubServices is null");
        }

        public Task CloseAsync(PartitionContext context, CloseReason reason)
        {
            Console.WriteLine($"Processor Shutting Down. Partition '{context.PartitionId}', Reason: '{reason}'.");
            return Task.CompletedTask;
        }

        public Task OpenAsync(PartitionContext context)
        {
            Console.WriteLine($"SimpleEventProcessor initialized. Partition: '{context.PartitionId}'");
            return Task.CompletedTask;
        }

        public Task ProcessErrorAsync(PartitionContext context, Exception error)
        {
            Console.WriteLine($"Error on Partition: {context.PartitionId}, Error: {error.Message}");
            return Task.CompletedTask;
        }

        public Task ProcessEventsAsync(PartitionContext context, IEnumerable<EventData> messages)
        {
            foreach (var eventData in messages)
            {
                var data = Encoding.UTF8.GetString(eventData.Body.Array, eventData.Body.Offset, eventData.Body.Count);
                decimal temperature = decimal.Parse(data);
                _temperatureHubService.SendTemperatureToGroup(eventData.SystemProperties.EnqueuedTimeUtc.ToLocalTime(), temperature);
                Console.WriteLine($"Message received. Partition: '{context.PartitionId}', Data: '{data}'");
            }

            return context.CheckpointAsync();
        }
    }
}

/** 
 * Initialize signalR
 */
function InitializeRealTime() {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/temperaturehub")
        .build();

    connection.on("ReceiveTemperature", (temperatureData) => {
        UpdateCharts(temperatureData);
    });

    connection.start()
        .catch(err => console.error(err.toString()));

    //document.getElementById("sendButton").addEventListener("click", event => {
    //    const user = document.getElementById("userInput").value;
    //    const message = document.getElementById("messageInput").value;
    //    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
    //    event.preventDefault();
    //});
}

var temperatureDataPoints = [];
var chart;
/**
 * Initialize Chart
 */
function InitializeCharts() {
    chart = new CanvasJS.Chart("temperatureContainer", {
        title: { text: "Temperature Real-Time" },
        zoomEnabled: true,
        axisY: { includeZero: false },
        data: [{
            type: "spline",
            xValueType: "dateTime",
            dataPoints: temperatureDataPoints
        }]
    });
}
/**
 * Aggiorna il grafico
 * @param {any} lastPoint
 */
function UpdateCharts(lastPoint) {
    temperatureDataPoints.push({ x: lastPoint.x, y: lastPoint.y });
    //temperatureDataPoints.shift();
    chart.render();
}


// Run
InitializeRealTime();
InitializeCharts();
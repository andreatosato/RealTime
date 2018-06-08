/** 
 * Initialize signalR
 */
function InitializeRealTime() {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/temperatureHub")
        .build();

    connection.on("ReceiveTemperature", (user, temperatureData) => {
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
            type: "area",
            xValueType: "dateTime",
            dataPoints: temperatureDataPoints
        }]
    });
}

/**
 * Update chart
 * @param {number} lastPoint
 */
function UpdateCharts(lastPoint) {
    temperatureDataPoints.push(lastPoint.value);
    temperatureDataPoints.shift();

    chart.update();
}

$(function (jQuery) {

    var url = 'https://api.darksky.net/forecast/';
    var apiKey = 'e1d9e5d4989ede70af611f5cbf8b52c9';
    var unit = 'si';
    var lat = 59.345013;
    var lng = 18.021977;
    var exclude = "?exclude=hourly,minutely,alerts,flags";
    var time = [];
    var minMaxTemp;
    var perHourForecast;
    var timeArray = [];
    var details = [];

    // app part settings
    var getUnit = parseInt(localStorage.getItem("unit"));
    var getLocation = localStorage.getItem("contosoLocation");

    //hämta väderdata från localstorage (sparats ner när app parten körs)
    var localWeatherData = localStorage.getItem("weatherData");
    var weatherData = JSON.parse(localWeatherData);

    perHourForecast = weatherData.hourly.data;
    minMaxTemp = weatherData.daily.data;
    details = weatherData.currently;

    //Defaultvy
    $("#details").hide();
    $("#perHour").show();
    $("#minMax").hide();

    //jQuery.ajax({
    //    url: "https://api.darksky.net/forecast/e1d9e5d4989ede70af611f5cbf8b52c9/59.345013,18.021977?callback=?&units=si",
    //    type: 'GET',
    //    dataType: 'jsonp'
    //})
    // .done(function (data) {


    //     perHourForecast = data.hourly.data;
    //     minMaxTemp = data.daily.data;
    //     details = data.currently;
    // })



    $("#minMaxTab").click(function () {
        $("#minMax").show();
        $("#details").hide();
        $("#perHour").hide();


        var isCelsius = (getUnit === 1) ? true : false;

        console.log("I minMaxTab");

        var minTemp = [];
        var maxTemp = [];


        for (var index = 1; index <= 5; index++) {
            time.push(moment.unix(minMaxTemp[index].time).format("dddd"));

            if (isCelsius) {
                minTemp.push(getCelsius(minMaxTemp[index].temperatureMin));
                maxTemp.push(getCelsius(minMaxTemp[index].temperatureMax));
            }
            else {
                minTemp.push(minMaxTemp[index].temperatureMin);
                maxTemp.push(minMaxTemp[index].temperatureMax);
            }
        }

        var ctx = document.getElementById("minMaxTemp");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'Lägsta temperatur',
                    data: minTemp,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    data: maxTemp,
                    label: "Maxtemperatur",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    showTooltip: false,
                }]
            }
                    ,

            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })


    })



    $("#perHourTab").click(function () {
        $("#perHour").show();
        $("#minMax").hide();
        $("#details").hide();

        var isCelsius = (getUnit === 1) ? true : false;

        console.log("I perHourTab");
        var foreCastDay = moment.unix(perHourForecast[0].time).format("dddd");
        var index = 0;
        var perHourTemp = [];
        var time = [];
        var timeNow = moment.unix(details.time).format("dddd");

        // hämta temperatur / timme för innevarande dygn
        while (timeNow === foreCastDay) {

            time.push(moment.unix(perHourForecast[index].time).format("HH"));

            if (isCelsius) {
                perHourTemp.push(getCelsius(perHourForecast[index].temperature));
            }
            else {
                perHourTemp.push(perHourForecast[index].temperature);
            }

            foreCastDay = moment.unix(perHourForecast[index].time).format("dddd");
            index++;
        }

        var ctxPerHour = document.getElementById("perHourChart");

        var myChart = new Chart(ctxPerHour, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'Temperatur per timme under senaste dygnet',
                    data: perHourTemp,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    })

    $("#detailsTab").click(function () {
        $("#details").show();
        $("#perHour").hide();
        $("#minMax").hide();

        console.log("I detailsTab");
        var isCelsius = (getUnit === 1) ? true : false;

        if (isCelsius) {
            details.temperature = getCelsius(details.temperature);
            details.windSpeed = details.windSpeed / 2.236936;
        }

        var windUnit = getWindSymbol(getUnit);
        var tempUnit = getTempSymbol(getUnit);


        $("#windSpeedHeadline").text("Vindhastighet " + windUnit);
        $("#temperaturHeadline").html("Temperatur " + tempUnit);
        getWindDirection(details.windBearing);

        console.log(details.ozone);
        jQuery('#temp').html(details.temperature.toFixed(1));
        jQuery('#ozone').html(details.ozone);
        jQuery('#windSpeed').html(details.windSpeed.toFixed(0));
        //jQuery('#windBearing').html(details.windBearing);
        jQuery('#humidity').html(details.humidity * 100);
        jQuery('#pressure').html(details.pressure);
    })
})

function getCelsius(temp) {
    return (temp - 32) / 1.8000;
}

function getTempSymbol(unit) {
    unit = parseInt(unit);

    switch (unit) {
        case 1:
            return "&deg;C";
        default:
            return "&deg;F";
    }
}

function getWindSymbol(unit) {

    unit = parseInt(unit);

    switch (unit) {
        case 1:
            return "m/s";
        default:
            return "MPH";
    }
}

// justera kompassnål till aktuell vindriktning
function getWindDirection(direction) {
    direction = parseInt(direction);

    // använder jQuery extensionen rotate för att rotera kompass-bilden
    $("#compass").rotate(direction);
}



$(function (jQuery) {

    //hämta väderdata från localstorage (sparas ner när app parten körs)
    var localWeatherData = localStorage.getItem("weatherData");
    var weatherData = JSON.parse(localWeatherData);
    
    var minMaxTemp = weatherData.daily.data;
    var perHourForecast = weatherData.hourly.data;
    var details = weatherData.currently;

    // app part settings
    var getUnit = parseInt(localStorage.getItem("unit"));
    var getLocation = localStorage.getItem("contosoLocation");

    //Defaultvy
    $("#details").hide();
    $("#perHour").show();
    $("#minMax").hide();

    $("#minMaxTab").click(function () {
        $("#minMax").show();
        $("#details").hide();
        $("#perHour").hide();


        var isCelsius = (getUnit === 1) ? true : false;

        var time = [];
        var minTemp = [];
        var maxTemp = [];


        for (var index = 1; index <= 5; index++) {
            time.push(moment.unix(minMaxTemp[index].time).format("dddd"));

            if (isCelsius) {
                minTemp.push(getCelsius(minMaxTemp[index].temperatureMin).toFixed(1));
                maxTemp.push(getCelsius(minMaxTemp[index].temperatureMax).toFixed(1));
            }
            else {
                minTemp.push(minMaxTemp[index].temperatureMin.toFixed(1));
                maxTemp.push(minMaxTemp[index].temperatureMax.toFixed(1));
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
                    fill: false,
                    borderColor: "lightblue",
                    backgroundColor: "lightblue",
                    pointBorderColor: "blue",
                    pointBackgroundColor: "blue",
                    pointBorderWidth: 1
                },
                {
                    data: maxTemp,
                    label: "Maxtemperatur",
                    fill: false,
                    borderColor: "coral",
                    backgroundColor: "coral",
                    pointBorderColor: "tomato",
                    pointBackgroundColor: "tomato",
                    pointBorderWidth: 1,
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

        var foreCastDay = moment.unix(perHourForecast[0].time).format("dddd");
        var index = 0;
        var perHourTemp = [];
        var time = [];
        var timeNow = moment.unix(details.time).format("dddd");
        var tempSymbol = getTempSymbol(getUnit);

        // hämta temperatur / timme för innevarande dygn
        while (timeNow === foreCastDay) {

            time.push(moment.unix(perHourForecast[index].time).format("HH"));

            if (isCelsius) {
                perHourTemp.push(getCelsius(perHourForecast[index].temperature).toFixed(1));
            }
            else {
                perHourTemp.push(perHourForecast[index].temperature.toFixed(1));
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
                    fill: false,
                    borderColor: "lightgreen",
                    backgroundColor: "lightgreen",
                    pointBorderColor: "green",
                    pointBackgroundColor: "green",
                    pointBorderWidth: 1
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

        var isCelsius = (getUnit === 1) ? true : false;

        if (isCelsius) {
            details.temperature = getCelsius(details.temperature);
            details.windSpeed = details.windSpeed / 2.236936;
        }

        var windDirection = translatewindBearing(details.windBearing);
        var windUnit = getWindSymbol(getUnit);
        var tempUnit = getTempSymbol(getUnit);


        $("#windSpeedHeadline").text("Vindhastighet " + windUnit);
        $("#temperaturHeadline").html("Temperatur " + tempUnit);

        jQuery('#temp').html(details.temperature.toFixed(1));
        jQuery('#ozone').html(details.ozone);
        jQuery('#windSpeed').html(details.windSpeed.toFixed(0));
        jQuery('#windBearing').html(windDirection);
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

function translatewindBearing(input) {

    "use strict";

    var value = parseInt(input);

    var windBearing = "";



    if (value === 0) { windBearing = "nordlig"; }

    else if (value > 0 && value <= 45) { windBearing = "nord / nordost"; }

    else if (value > 45 && value < 90) { windBearing = "ost / nordost"; }

    else if (value > 90 && value < 180) { windBearing = "syd / sydost"; }

    else if (value === 180) { windBearing = "sydlig"; }

    else if (value > 180 && value < 270) { windBearing = "syd / sydväst"; }

    else if (value === 270) { windBearing = "västlig"; }

    else if (value > 270 && value < 360) { windBearing = "nord / nordväst"; }

    else { return "vindstilla"; }



    localStorage.setItem("windBearing", windBearing);

    return windBearing;

}
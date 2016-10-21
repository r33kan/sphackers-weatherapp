var secretKey = "629b0a384ddac75d1c1fa827e8846375/";
var iconColor = "black";
var skycons = new Skycons({ "color": iconColor });

//$("#navDetails").click(function () {
//    $("#details").show();
//    $("#tempGraf").hide();
//    $("#forecastGraf").hide();
//    $("#about").hide();
//});

//$("#navTempGraf").click(function () {
//    $("#details").hide();
//    $("#tempGraf").show();
//    $("#forecastGraf").hide();
//    $("#about").hide();
//});

//$("#navForecastGraf").click(function () {
//    $("#details").hide();
//    $("#tempGraf").hide();
//    $("#forecastGraf").show();
//    $("#about").hide();
//});

//$("#navAbout").click(function () {
//    $("#details").hide();
//    $("#tempGraf").hide();
//    $("#forecastGraf").hide();
//    $("#about").show();
//});

(function () {
    "use strict";

    $("#details").show();
    //var getWeather = setLocation(1);
    var errorMessage = "";

    var weatherTemp = "";
    var detailsData = "";

    var localWeatherData = localStorage.getItem("weatherData");
    var weatherData = JSON.parse(localWeatherData);



    showTempChart(weatherData);
    forecastTempChart(weatherData.daily.data);
    detailsData = showDetails(weatherData);

    $("#detailsData").html(detailsData)
}());

function error() {
    errorMessage = "Det gick inte att hämta väderuppgifterna just nu. Vänligen försök senare";
}

// visa väderdetaljer för vald plats
function showDetails(data) {
    "use strict";
    // hämta inställd temperaturtyp
    var unit = parseInt(localStorage.getItem("unit"));

    // begränsa data till currently-delen
    var today = data.currently;

    var humidity = today.humidity;
    var isCelcius = (unit === 1) ? true : false;
    var ozone = today.ozone;
    var pressure = today.pressure;
    var result = "";
    var temperatur = today.temperature;

    var unitSymbol = localStorage.getItem("unitSymbol");
    var windBearing = localStorage.getItem("windBearing");
    var windSpeed = today.windSpeed;
    var windspeedSymbol = localStorage.getItem("windspeedSymbol");

    if (isCelcius) {
        temperatur = (temperatur - 32) / 1.8000;
        windSpeed = windSpeed / 2.236936;
    }

    result = "<div class='well well-lg'>" +
                "<p><strong>Temperatur: </strong> " + temperatur.toFixed(2) + " " + unitSymbol + "</p>" +
                "<p><strong>Vind: </strong> " + windSpeed.toFixed(2) + " " + windspeedSymbol + " " + windBearing + "</p>" +
                "<p><strong>Luftfuktighet: </strong> " + humidity + "</p>" +
                "<p><strong>Lufttryck: </strong> " + pressure + "</p>" +
                "<p><strong>Ozone: </strong> " + ozone + "</p>" +
            "</div>";
    skycons.add(document.getElementById("weatherIcon"), today.icon);
    skycons.add("icon1", today.icon);
    return result;
}

// rita upp temperatur timme för timme innevarande dygn
function showTempChart(data) {
    "use strict";
    // hämta inställd temperaturtyp
    var unit = parseInt(localStorage.getItem("unit"));

    //begränsa till datan för kommande timmar
    var weatherToday = data.hourly.data;

    // hitta elementet att rita upp grafen i
    var ctx = $("#todayChart");

    // används ihop med timeNow för att avgöra när loopen ska avbrytas
    var foreCastDay = moment.unix(weatherToday[0].time).format("dddd");
    var isCelsius = (unit === 1) ? true : false;
    var index = 0;
    var temperatur = [];
    var time = [];

    // används ihop med foreCastDay för att avgöra när loopen ska avbrytas
    var timeNow = moment.unix(data.currently.time).format("dddd");


    // hämta temperatur / timme för innevarande dag
    if (isCelsius) {
        while (timeNow === foreCastDay) {

            time.push(moment.unix(weatherToday[index].time).format("LT"));
            temperatur.push((weatherToday[index].temperature - 32 ) / 1.800);

            foreCastDay = moment.unix(weatherToday[index].time).format("dddd");
            index++;
        }
    }
    else {
        while (timeNow === foreCastDay) {

            time.push(moment.unix(weatherToday[index].time).format("LT"));
            temperatur.push(weatherToday[index].temperature);

            foreCastDay = moment.unix(weatherToday[index].time).format("dddd");
            index++;
        }
    }

    // rita upp graf med datan
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Temperatur',
                data: temperatur,
                fill: false,
                borderColor: "black",
                backgroundColor: "black",
                pointBorderColor: "tomato",
                pointBackgroundColor: "tomato",
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Temperatur innevarande dag'
            },
            tooltips: {
                mode: 'label'
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Timme'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature'
                    }

                }]
            }
        }
    });
}

// rita upp min och max temperatur för nästkommande 5 dagar
function forecastTempChart(data) {
    "user strict";

    // hämta inställd temperaturtyp
    var unit = parseInt(localStorage.getItem("unit")); 
    
    // används för att hitta rätt canvas för graf
    var ctx = $("#forecastChart"); 
    var day = [];
    var isCelsius = (unit === 1) ? true : false;
    var maxTemp = [];
    var minTemp = [];

    if (isCelsius) {
        for (var index = 1; index <= 5; index++) {

            minTemp.push((data[index].temperatureMin - 32) / 1.800);
            maxTemp.push((data[index].temperatureMax - 32) / 1.800);
            day.push(moment.unix(data[index].time).format("dddd"));
        }
    }
    else {
        for (var index = 1; index <= 5; index++) {

            minTemp.push(data[index].temperatureMin);
            maxTemp.push(data[index].temperatureMax);
            day.push(moment.unix(data[index].time).format("dddd"));
        }
    }
    
    // skapa graf enligt riktlinjer från chart.js
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: day,
            datasets: [{
                label: 'lägsta temperatur',
                data: minTemp,
                fill: false,
                borderColor: "lightblue",
                backgroundColor: "lightblue",
                pointBorderColor: "blue",
                pointBackgroundColor: "blue",
                pointBorderWidth: 1
            },
            {
                label: "högsta temperatur",
                data: maxTemp,
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                pointBorderColor: "tomato",
                pointBackgroundColor: "tomato",
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Temperatur kommande 5 dagar'
            },
            tooltips: {
                mode: 'label'
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Dag'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperatur'
                    }

                }]
            }
        }
    });
}
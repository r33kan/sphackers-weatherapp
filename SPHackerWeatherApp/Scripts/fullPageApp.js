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
    "user strict";

    $("#details").show();
    var getWeather = setLocation(1);
    var errorMessage = "";

    var weatherTemp = "";
    var detailsData = "";

    var localWeatherData = localStorage.getItem("weatherData");
    var weatherData = JSON.parse(localWeatherData);


    //var localWeatherCurrently = localStorage.getItem("weatherCurrently");
    //var weatherCurrently = JSON.parse(localWeatherCurrently);

    //var localWeatherPerHour = localStorage.getItem("weatherPerHour");
    //var weatherPerHour = JSON.parse(localWeatherPerHour);

    //var localWeatherForecast = localStorage.getItem("weatherForecast");
    //var weatherForecast = JSON.parse(localWeatherForecast);

       
    
    // $.ajax({
    //     METHOD: "GET",
    //     dataType: "jsonp",
    //     crossDomain: true,
    //     url: getWeather,
    //     success: function (data) {
    //         weatherTemp = data;
    //     },
    //     failure: error,
    //     complete: function () {

    //         if (errorMessage === "") {
    //             weatherData = weatherTemp;
    //             showTempChart();
    //         }
    //         else {
    //             $("#response").text(errorMessage);
    //         }
    //     }
    // });

    showTempChart(weatherData);
    forecastTempChart(weatherData.daily.data);
    detailsData = showDetails(weatherData);

    $("#detailsData").html(detailsData)
}());

function error() {
    errorMessage = "Det gick inte att hämta väderuppgifterna just nu. Vänligen försök senare";
}


function showDetails(data) {
    var today = data.currently;
    var unit = parseInt(localStorage.getItem("unit"));
    var temperatur = today.temperature;
    var windSpeed = today.windSpeed;
    var windBearing = localStorage.getItem("windBearing");
    var windspeedSymbol = localStorage.getItem("windspeedSymbol");
    var unitSymbol = localStorage.getItem("unitSymbol");
    var humidity = today.humidity;
    var pressure = today.pressure;
    var ozone = today.ozone;
    var result = "";

    var isCelcius = (unit === 1) ? true : false;
    console.log(isCelcius);

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

function getBody(weatherData, getUnit) {
    getUnit = parseInt(getUnit);

    var body = "";
    var isCelsius = (getUnit === 1) ? true : false;
    var unitSymbol = getUnitSymbol(getUnit);
    var windspeedSymbol = getWindSpeedUnit(getUnit);

    var temperatur = parseFloat(weatherData.temperature);
    //var time = new Date(weatherData.time);
    var todayDate = moment.unix(weatherData.time).format("llll");
    var weatherSummary = weatherData.summary;
    var windBearing = translatewindBearing(weatherData.windBearing);
    var windSpeed = parseFloat(weatherData.windSpeed);

    if (isCelsius) {
        temperatur = (temperatur - 32) / 1.8000;
        windSpeed = windSpeed / 2.236936;
    }

    body = "<div><h4> " + temperatur.toFixed(1) + "" + unitSymbol + " " + weatherSummary + "</h4></div>" +
           "<div><p>Vindriktning: " + windBearing + " Vindhastighet: " + windSpeed.toFixed(0) + " " + windspeedSymbol + "</p></div>";

    //rita upp korrekt väderikon för väderleken
    skycons.add(document.getElementById("icon1"), weatherData.icon);
    skycons.add("icon1", weatherData.icon);

    return body;
}

function setLocation(location) {
    var city = {
        Stockholm: {
            longitude: "18.00",
            latitude: "59.00"
        },
        Gothemburg: {
            longitude: "11.97",
            latitude: "57.7"
        },
        Malmo: {
            longitude: "13",
            latitude: "55.6"
        }
    };
    var locationInt = parseInt(location);

    var forecastURL = "https://api.darksky.net/forecast/" + secretKey;
    var position = "";
    switch (locationInt) {
        case 1: {
            position = forecastURL + city.Stockholm.latitude + "," + city.Stockholm.longitude;
            $("#cityLocation").text("Stockholm");
            break;
        }
        case 2: {
            position = forecastURL + city.Gothemburg.latitude + "," + city.Gothemburg.longitude;
            $("#cityLocation").text("Göteborg");
            break;
        }
        case 3: {
            position = forecastURL + city.Malmo.latitude + "," + city.Malmo.longitude;
            $("#cityLocation").text("Malmö");
            break;
        }
    }

    return position;
}

function showTempChart(data) {
    "use strict";
    var unit = parseInt(localStorage.getItem("unit"));
    var weatherToday = data.hourly.data;
    var isCelsius = (unit === 1) ? true : false;

    var foreCastDay = moment.unix(weatherToday[0].time).format("dddd");
    var index = 0;
    var temperatur = [];
    var time = [];
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

    

    // hitta elementet att rita upp grafen i
    var ctx = $("#todayChart");


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


function forecastTempChart(data) {

    "user strict";

    var minTemp = [];
    var maxTemp = [];
    var day = [];
    var unit = parseInt(localStorage.getItem("unit"));
    var isCelsius = (unit === 1) ? true : false;


    console.log("forecastTempChart");

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


    var ctx = $("#forecastChart");
    console.log(minTemp);
    console.log(maxTemp);
    console.log(day);
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
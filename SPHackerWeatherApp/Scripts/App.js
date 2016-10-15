//Mattias key
//var secretKey = "629b0a384ddac75d1c1fa827e8846375";
//Johans key
var secretKey = "1d2a1962f482ae789c15b56b59b526d7";
var iconColor = "black";
var skycons = new Skycons({ "color": iconColor });

function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split('?')[1].split('&');
    var strParams = '';
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split('=');
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}

(function () {
    "use strict";

    //variabler för App Part settings
    var getLocation = getQueryStringParameter("contosoLocation");
    var getUnit = getQueryStringParameter("contosoDegrees");
    var getTheme = getQueryStringParameter("contosoTheme");

    var body = "";
    var errorMessage = "";
    var getWeather = setLocation(getLocation);
    var header = "";
    var unit = setUnitType(getUnit);
    console.log(unitSymbol);
    var weatherObject = {};
    var weatherTemp = "";
    setTheme(getTheme);

    $.ajax({
        METHOD: "GET",
        dataType: "jsonp",
        crossDomain: true,
        url: getWeather,
        success: function (data) {
            weatherTemp = data;
        },
        failure: function () {
            errorMessage = "Det gick inte att hämta väderuppgifterna just nu. Vänligen försök senare";
            console.log(errorMessage);
        },
        complete: function () {

            if (errorMessage === "") {
                weatherObject = weatherTemp;

<<<<<<< HEAD
                var weatherSummary = "";
                var temperatur = "";
                var time = "";
                var todayDate = "";
                var windBearing = "";
                var windSpeed = "";

                //konvertera väderdata till Celsius
                if (unit === "Celsius") {
                    weatherSummary = weatherObject.currently.summary;
                    temperatur = (parseFloat(weatherObject.currently.temperature) - 32) / 1.8000;
                    time = new Date(weatherObject.currently.time);
                    todayDate = moment.unix(time).format("llll");
                    windBearing = translatewindBearing(weatherObject.currently.windBearing);
                    windSpeed = parseFloat(weatherObject.currently.windSpeed) / 2.236936;

                    body = "<div><h4> " + temperatur.toFixed(1) + "&deg;C " + weatherSummary + "</h4></div>" +
                        "<div><p>Vindriktning: " + windBearing + " Vindhastighet: " + windSpeed.toFixed(0) + " m/s</p></div>";

                    skycons.add(document.getElementById("icon1"), weatherObject.currently.icon);
                    skycons.add("icon1", weatherObject.currently.icon);

                    header = weatherObject.timezone + " " + moment(weatherObject.currently.time).format("MMM Do YYYY");
                    listForecast(weatherObject.daily, getUnit);
                }
                    //behåll väderdata i Fahrenheit
                else {
                    weatherSummary = weatherObject.currently.summary;
                    temperatur = (parseFloat(weatherObject.currently.temperature));
                    time = new Date(weatherObject.currently.time);
                    todayDate = moment.unix(time).format("llll");
                    windBearing = translatewindBearing(weatherObject.currently.windBearing);
                    windSpeed = (parseFloat(weatherObject.currently.windSpeed));

                    body = "<div><h4> " + temperatur.toFixed(1) + "&deg;F " + weatherSummary + "</h4></div>" +
                        "<div><p>Vindriktning: " + windBearing + " Vindhastighet: " + windSpeed.toFixed(0) + " MPH</p></div>";
                    skycons.add(document.getElementById("icon1"), weatherObject.currently.icon);
                    skycons.add("icon1", weatherObject.currently.icon);
                    header = weatherObject.timezone + " " + moment(weatherObject.currently.time).format("MMM Do YYYY");
                    listForecast(weatherObject.daily, getUnit);
                }
=======
                var time = new Date(weatherObject.currently.time);
                var todayDate = moment.unix(time).format("llll");

                //skapa html-element för body på app part
                body = getBody(weatherObject.currently, getUnit);

                // hämta forecast för nästkommande 5 dagar
                listForecast(weatherObject.daily.data, getUnit);
>>>>>>> fdda901... slagit ihop celcius / fahrenheit metoder till en enda metod.

                $("#AppPartHeaderDateDisplay").text(todayDate);
                $("#AppPartBodySummary").html(body);

                // starta animation för väderikoner
                skycons.play();
            }
            else {
                $("#response").text(errorMessage);
            }
        }
    });
}());

<<<<<<< HEAD
=======

function getBody(weatherData, getUnit) {
    getUnit = parseInt(getUnit);

    var body = "";
    var isCelsius = (getUnit === 1) ? true : false;
    var unitSymbol = getUnitSymbol(getUnit);
    var windspeedSymbol = getWindSpeedUnit(getUnit);

    var temperatur = parseFloat(weatherData.temperature);
    var time = new Date(weatherData.time);
    var todayDate = moment.unix(time).format("llll");
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

>>>>>>> fdda901... slagit ihop celcius / fahrenheit metoder till en enda metod.
function setTheme(input) {
    var theme = parseInt(input);
    var href = "";

    switch (theme) {
        default: {
            href = "#";
            skycons = iconSetting = new Skycons({ "color": "black" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
        case 1: {
            href = "../Content/lightTheme.css";
            skycons = iconSetting = new Skycons({ "color": "black" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
        case 2: {
            href = "../Content/darkTheme.css";
            skycons = iconSetting = new Skycons({ "color": "tomato" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
        case 3: {
            href = "../Content/spBlue.css";
            skycons = iconSetting = new Skycons({ "color": "white" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
    }
}

//sätter unit till celsius /fahrenheit
function setUnitType(setting) {
    var temp = parseInt(setting);
    var unit = "";
    switch (temp) {
        case 1: {
            unit = "Celsius";
            break;
        }
        case 2: {
            unit = "Fahrenheit";
            break;
        }
    }

    return unit;
}

function getWindSpeedUnit(unit) {

    unit = parseInt(unit);
    var symbol = "";

    switch (unit) {
        case 1:
            symbol = "m/s";
            break;
        case 2:
            symbol = "MPH";
            break;
    }

    return symbol;
}

function getUnitSymbol(unit) {
    unit = parseInt(unit);

    var symbol = "";

    switch (unit) {
        case 1:
            symbol = "&deg;C";
            break;
        case 2:
            symbol = "&deg;F";
            break;
    }

    return symbol;
}

//sätt vilken stad som väderdata ska hämtas för
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

    console.log("setLocation");
    console.log(location);
    var forecastURL = "https://api.darksky.net/forecast/629b0a384ddac75d1c1fa827e8846375/";
    var position = "";
    switch (locationInt) {
        case 1: {
            position = forecastURL + city.Stockholm.latitude + "," + city.Stockholm.longitude;
            $("#cityLocation").text("Stockholm");
            console.log("Stockholm");
            break;
        }
        case 2: {
            position = forecastURL + city.Gothemburg.latitude + "," + city.Gothemburg.longitude;
            $("#cityLocation").text("Göteborg");
            console.log("Göteborg");
            break;
        }
        case 3: {
            position = forecastURL + city.Malmo.latitude + "," + city.Malmo.longitude;
            $("#cityLocation").text("Malmö");
            console.log("Malmö");
            break;
        }
    }

    return position;
}

//översätt vindriktning
function translatewindBearing(input) {
    "use strict";
    var value = parseFloat(input);

    switch (value) {
        case 0: { return "nordlig"; }
        case value > 0 && value < 45: { return "nord / nordost"; }
        case value > 45 && value < 90: { return "ost / nordost"; }
        case 90: { return "östlig"; }
        case value > 90 && value < 180: { return "syd / sydost"; }
        case 180: { return "sydlig"; }
        case value > 180 && value < 270: { return "syd / sydväst"; }
        case 270: { return "västlig"; }
        case value > 270 && value < 360: { return "nord / nordväst"; }
        default: { return "vindstilla"; }
    }
}

function listForecast(weatherForecast, getUnit) {
    getUnit = parseInt(getUnit);

    var canvas = "";
    var day = "";
    var forecastDay = "";
    var forecastTemp = "";
    var unit = getUnitSymbol(getUnit);
    var isCelcius = (getUnit === 1) ? true : false;
    var maxTemp = "";
    var minTemp = "";

    // är celsius valt som enhet loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
    if (isCelcius) {
        for (var index = 1; index <= 5; index++) {
            var day = moment.unix(weatherForecast[index].time).format("dddd");
            var minTemp = (parseFloat(weatherForecast[index].temperatureMin) - 32) / 1.8000;
            var maxTemp = (parseFloat(weatherForecast[index].temperatureMax) - 32) / 1.8000;

            //variabler för att identifiera element i DOM:n
            var canvas = "forecastCanvas" + index;
            var forecastDay = "#forecastDay" + index;
            var forecastTemp = "#forecastTemp" + index;

            //populera HTML-element med korrekt data
            $(forecastDay).html(day);
            skycons.add(document.getElementById(canvas), weatherForecast[index].icon);
            $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unit + "</p>");
        }
    }
        // om Fahrenheit är valt som enhet loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
    else {
        for (var index = 1; index <= 5; index++) {
            var day = moment.unix(weatherForecast[index].time).format("dddd");
            var minTemp = parseFloat(weatherForecast[index].temperatureMin);
            var maxTemp = parseFloat(weatherForecast[index].temperatureMax);

            //variabler för att identifiera element i DOM:n
            var canvas = "forecastCanvas" + index;
            var forecastDay = "#forecastDay" + index;
            var forecastTemp = "#forecastTemp" + index;

            //populera HTML-element med korrekt data
            $(forecastDay).html(day);
            skycons.add(document.getElementById(canvas), weatherForecast[index].icon);
            $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unit + "</p>");
        }
    }
}
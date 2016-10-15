//Mattias key
var secretKey = "629b0a384ddac75d1c1fa827e8846375/";
//Johans key
//var secretKey = "1d2a1962f482ae789c15b56b59b526d7";
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
        },
        complete: function () {

            if (errorMessage === "") {
                weatherObject = weatherTemp;

                var time = new Date(weatherObject.currently.time);
                var todayDate = moment.unix(time).format("llll");

                //skapa html-element för body på app part
                body = getBody(weatherObject.currently, getUnit);

                // hämta forecast för nästkommande 5 dagar
                listForecast(weatherObject.daily.data, getUnit);

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

// ändra temat för appen
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

// sätt enhet till C / F
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

// m/s eller MPH för vindhastighet
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

// hämta väderrapport för kommande dagar
function listForecast(weatherForecast, getUnit) {
    getUnit = parseInt(getUnit);

    var canvas = "";
    var day = "";
    var forecastDay = "";
    var forecastTemp = "";
    var unit = getUnitSymbol(getUnit);
    var index = "";
    var isCelcius = (getUnit === 1) ? true : false;
    var maxTemp = "";
    var minTemp = "";

    // är celsius valt som enhet loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
    if (isCelcius) {
        for (index = 1; index <= 5; index++) {
            day = moment.unix(weatherForecast[index].time).format("dddd");
            minTemp = (parseFloat(weatherForecast[index].temperatureMin) - 32) / 1.8000;
            maxTemp = (parseFloat(weatherForecast[index].temperatureMax) - 32) / 1.8000;

            //variabler för att identifiera element i DOM:n
            canvas = "forecastCanvas" + index;
            forecastDay = "#forecastDay" + index;
            forecastTemp = "#forecastTemp" + index;

            //populera HTML-element med korrekt data
            $(forecastDay).html(day);
            skycons.add(document.getElementById(canvas), weatherForecast[index].icon);
            $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unit + "</p>");
        }
    }
        // om Fahrenheit är valt som enhet loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
    else {
        for (index = 1; index <= 5; index++) {
            day = moment.unix(weatherForecast[index].time).format("dddd");
            minTemp = parseFloat(weatherForecast[index].temperatureMin);
            maxTemp = parseFloat(weatherForecast[index].temperatureMax);

            //variabler för att identifiera element i DOM:n
            canvas = "forecastCanvas" + index;
            forecastDay = "#forecastDay" + index;
            forecastTemp = "#forecastTemp" + index;

            //populera HTML-element med korrekt data
            $(forecastDay).html(day);
            skycons.add(document.getElementById(canvas), weatherForecast[index].icon);
            $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unit + "</p>");
        }
    }
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


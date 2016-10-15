var secretKey = "629b0a384ddac75d1c1fa827e8846375";
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
    console.log(getUnit);


    var body = "";
    var errorMessage = "";
    var getWeather = setLocation(getLocation);
    var header = "";
    var unitSymbol = "";
    var unit = setUnitType(getUnit);
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
            weatherObject = weatherTemp;

            if (errorMessage === "") {
                weatherObject = weatherTemp;

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

                $("#AppPartHeaderDateDisplay").text(todayDate);
                $("#AppPartBodySummary").html(body);
                skycons.play();
            }

            else {
                $("#response").text(errorMessage);
            }
        }
    });
}());


function setTheme(input) {
    var theme = parseInt(input);
    var href = "";

    switch (theme) {
        case 1:

            href = "../Content/App.css";
            skycons = iconSetting = new Skycons({ "color": "black" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        case 2:
            href = "../Content/darkTheme.css";
            skycons = iconSetting = new Skycons({ "color": "tomato" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        case 3:
            href = "../Content/spBlue.css";
            skycons = iconSetting = new Skycons({ "color": "white" });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
    }
}

//sätter unit till celsius /fahrenheit
function setUnitType(setting) {
    var temp = parseInt(setting);
    var unit = "";
    switch (temp) {
        case 1:
            unit = "Celsius";
            unitSymbol = "&deg;C";
            break;
        case 2:
            unit = "Fahrenheit";
            unitSymbol = "&deg;F";
            break;
    }

    return unit;
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
    var position = "";
    switch (locationInt) {

        case 1:
            position = "https://api.darksky.net/forecast/629b0a384ddac75d1c1fa827e8846375/" + city.Stockholm.latitude + "," + city.Stockholm.longitude;
            $("#cityLocation").text("Stockholm");
            console.log("Stockholm");
           break;
        case 2:
            position = "https://api.darksky.net/forecast/629b0a384ddac75d1c1fa827e8846375/" + city.Gothemburg.latitude + "," + city.Gothemburg.longitude;
            $("#cityLocation").text("Göteborg");
            console.log("Göteborg");
            break;
        case 3:
            position = "https://api.darksky.net/forecast/629b0a384ddac75d1c1fa827e8846375/" + city.Malmo.latitude + "," + city.Malmo.longitude;
            $("#cityLocation").text("Malmö");
            console.log("Malmö");
            break;
    }

    return position;
}

//översätt vindriktning
function translatewindBearing(input) {

    "use strict";
    var value = parseFloat(input);

    if (value === 0) {
        return "nordlig";
    }
    else if (value > 0 && value < 45) {
        return "nord / nordost";
    }
    else if (value > 45 && value < 90) {
        return "ost / nordost";
    }
    else if (value === 90) {
        return "ost";
    }
    else if (value > 90 && value < 180) {
        return "syd / sydost";
    }
    else if (value === 180) {
        return "sydlig";
    }
    else if (value > 180 && value < 270) {
        return "syd / sydväst";
    }
    else if (value === 270) {
        return "västlig";
    }
    else if (value > 270 && value < 360) {
        return "nord / nordväst";
    }
    else {
        return "vindstilla";
    }
}

//Forecast med Fahrenheit
function listDailySummaryFahrenheit(result) {
    var weatherForecast = result.data;

    //loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar

}

//Forecast med celsius
function listDailySummaryCelsius(result) {
    var weatherForecast = result.data;

    //loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
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
        $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unitSymbol + "</p>");
    } 
}

function listForecast(result, getUnit) {
    var weatherForecast = result.data;

    var isCelcius = getUnit;

    // är celsius valt som enhet loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
    if (isCelcius) {
        //
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
            $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unitSymbol + "</p>");
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
            $(forecastTemp).html("<p> " + minTemp.toFixed(0) + " - " + maxTemp.toFixed(0) + "" + unitSymbol + "</p>");
        }
    }
   
    
}
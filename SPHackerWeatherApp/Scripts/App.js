//Dark sky key
var secretKey = "0/";

var iconColor = "black";
var skycons = new Skycons({ "color": iconColor });


//kontrollera om rutan har ett Responsive attribut, skapa ett om false
window.Responsive = window.Responsive || {};

Responsive.Part = {
    senderId: '',
    hostURL:null,
    init: function () {
        // Retrieve required params
        var params = document.URL.split("?")[1].split("&");
        for (i = 0; i < params.length; i++) {
            var param = params[i].split("=");
            if (param[0].toLowerCase() == "senderid") {
                this.senderId = decodeURIComponent(param[1]);
            }
            if (this.hostURL == null) {
                this.hostURL = decodeURIComponent(param[1]);
            }
        }
        this.adjustSize();
    },
    adjustSize: function () {
        var step = 30,
            newHeight,
            contentHeight = $('#AppPartContent').height(),
            resizeMessage = '<Message senderId={Sender_Id}>resize(100%, {Height})</Message>';

        newHeight = contentHeight + (contentHeight % step);
        resizeMessage = resizeMessage.replace("{Sender_Id}", this.senderId);
        resizeMessage = resizeMessage.replace("{Height}", newHeight);

        window.parent.postMessage(resizeMessage, this.hostURL);
    }
}

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
    localStorage.setItem("unit", getUnit);
    

    var getTheme = getQueryStringParameter("contosoTheme");
    localStorage.setItem("theme", getTheme);

    // cookies ifall localstorage inte vill fungera i webbläsaren
    Cookies.remove("unit");
    Cookies.set("unit", getUnit);
    
    Cookies.remove("location");
    Cookies.set("location", getLocation);
 
    // variabler för att sköta cachning mot localstorage
    var newDate = new Date();
    var currentTime = moment(newDate).format("HH");
    var updateTime = localStorage.getItem("time");
    // <a  href="Default.aspx" target="_parent" class="btn btn-primary btn-lg">Detaljer</a>

    var url = "Default.aspx?&location=" + getLocation + "&unit=" + getUnit + "";
    $("#detailsLink").attr("href", function () {
        return url;
    });

    var body = "";
    var errorMessage = "";
    var getWeather = setLocation(getLocation);
    var header = "";
    var weatherObject = {};
    var weatherTemp = "";

    // hämta aktuellt tema för appen
    setTheme(getTheme);

    
    if (currentTime === updateTime) {

        weatherTemp = localStorage.getItem("weatherData");
        weatherObject = JSON.parse(weatherTemp);

        var time = weatherObject.currently.time;
        var todayDate = moment.unix(time).format("llll");

        //skapa html-element för body på app part
        body = getBody(weatherObject.currently, getUnit);

        // hämta väderprognos för nästkommande 5 dagar
        listForecast(weatherObject.daily.data, getUnit);

        $("#AppPartHeaderDateDisplay").text(todayDate);
        $("#AppPartBodySummary").html(body);

        // ställ in kompassnålen efter vindriktningen
        getWindDirection(weatherObject.currently.windBearing);

        // starta animation för väderikoner
        skycons.play();
    }
    else {
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

                    var weatherDataString = JSON.stringify(weatherObject);
                    var time = weatherObject.currently.time;
                    var todayDate = moment.unix(time).format("llll");

                    localStorage.setItem("weatherData", JSON.stringify(weatherTemp));
                    localStorage.setItem("time", moment.unix(time).format("HH"));

                    // cookies om webbläsare inte kan använda sig av localstorage
                    Cookies.remove("weatherData");
                    Cookies.set("weatherData", weatherDataString);
                   

                    //skapa html-element för body på app part
                    body = getBody(weatherObject.currently, getUnit);

                    // hämta forecast för nästkommande 5 dagar
                    listForecast(weatherObject.daily.data, getUnit);

                    $("#AppPartHeaderDateDisplay").text(todayDate);
                    $("#AppPartBodySummary").html(body);

                    getWindDirection(weatherObject.currently.windBearing);
                    // starta animation för väderikoner
                    skycons.play();   
                }
                else {
                    $("#response").text(errorMessage);
                }
            }
        });       
    }
    // starta responsive part
    Responsive.Part.init();
}());

function getBody(weatherData, getUnit) {
    getUnit = parseInt(getUnit);

    var body = "";
    var isCelsius = (getUnit === 1) ? true : false;
    var unitSymbol = getUnitSymbol(getUnit);
    var windspeedSymbol = getWindSpeedUnit(getUnit);

    var temperatur = parseFloat(weatherData.temperature);
    var todayDate = moment.unix(weatherData.time).format("llll");
    var windData = "";
    //var windIcon = "<img id='compass' src='../Images/weathericons/compass.svg'></img>";
    var weatherSummary = weatherData.summary;
    var windSpeed = parseFloat(weatherData.windSpeed);

    if (isCelsius) {
        temperatur = getCelsius(temperatur);
        windSpeed = windSpeed / 2.236936;
    }

    body = "<div><h1><strong> " + temperatur.toFixed(1) + "" + unitSymbol + " " + weatherSummary + "</strong></h1></div>";
    windData = "<span class='h2'><strong>Vind: " + windSpeed.toFixed(0) + " " + windspeedSymbol + "</strong></span>";

    $("#windData").html(windData);


    // matchar icon-färg mot tema
    setTheme(localStorage.getItem("theme"));

    //rita upp korrekt väderikon för väderleken
    skycons.add(document.getElementById("icon1"), weatherData.icon);
    skycons.add("icon1", weatherData.icon);


    return body;
}

// ändra temat för appen
function setTheme(input) {
    var theme = parseInt(input);
    var href = "";
    var windIcon = ""; 
    switch (theme) {
        default: {
            href = "#";
            skycons = new Skycons({ "color": "black" });
            
            windIcon = "../Images/weathericons/compass.svg";
            $("#compass").attr("src", function () {
                return windIcon;
            });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
        case 1: {
            href = "../Content/lightTheme.css";
            skycons = new Skycons({ "color": "black" });

            windIcon = "../Images/weathericons/compass.svg";
            
            $("#compass").attr("src", function () {
                return windIcon;
            });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
        case 2: {
            href = "../Content/darkTheme.css";
            skycons = new Skycons({ "color": "tomato" });

            windIcon = "../Images/weathericons/compassTomato.svg";
            
            $("#compass").attr("src", function () {
                return windIcon;
            });

            $("#cssTheme").attr("href", function () {
                return href;
            });
            break;
        }
        case 3: {
            href = "../Content/spBlue.css";
            skycons = new Skycons({ "color": "white" });

            windIcon = "../Images/weathericons/compassWhite.svg";
            
            $("#compass").attr("src", function () {
                return windIcon;
            });

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
        case 1: {
            symbol = "&deg;C";
            break;
        }
        case 2: {
            symbol = "&deg;F";
            break;
        }
    }

    localStorage.setItem("unitSymbol", symbol);

    return symbol;
}

// m/s eller MPH för vindhastighet
function getWindSpeedUnit(unit) {

    unit = parseInt(unit);
    var symbol = "";

    switch (unit) {
        case 1: {
            symbol = "m/s";
            break;
        }
        case 2: {
            symbol = "MPH";
            break;
        }
    }

    localStorage.setItem("windspeedSymbol", symbol);
    return symbol;
}

// hämta väderrapport för kommande dagar
function listForecast(weatherForecast, getUnit) {
    getUnit = parseInt(getUnit);

    var canvas = "";
    var forecastDay = "";
    var forecastTemp = "";
    var index = "";
    var unit = getUnitSymbol(getUnit);
    var isCelcius = (getUnit === 1) ? true : false;

    //loopa igenom forecast för nästkommande dagar börja på värde 1 = imorgon och totalt 5 dagar fram
    for (index = 1; index <= 5; index++) {
        var day = moment.unix(weatherForecast[index].time).format("dddd");
        var maxTemp = parseFloat(weatherForecast[index].temperatureMax);
        var minTemp = parseFloat(weatherForecast[index].temperatureMin);

        //variabler för att identifiera element i DOM:n
        canvas = "forecastCanvas" + index;
        forecastDay = "#forecastDay" + index;
        forecastTemp = "#forecastTemp" + index;

        //om celsius är valt, beräkna.
        if (isCelcius) {
            maxTemp = getCelsius(maxTemp);
            minTemp = getCelsius(minTemp);
        }

        //populera HTML-element med korrekt data
        $(forecastDay).html(day);
        skycons.add(document.getElementById(canvas), weatherForecast[index].icon);
        $(forecastTemp).html("<p><span class='minTemp'>" + minTemp.toFixed(0) + "</span> - <span class='maxTemp'>" + maxTemp.toFixed(0) + "</span>" + unit + "</p>");
    }
}

function getCelsius(temp) {
    return (temp - 32) / 1.8000;
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
            localStorage.setItem("location", "Stockholm");
            break;
        }
        case 2: {
            position = forecastURL + city.Gothemburg.latitude + "," + city.Gothemburg.longitude;
            $("#cityLocation").text("Göteborg");
            localStorage.setItem("location", "Göteborg");
            break;
        }
        case 3: {
            position = forecastURL + city.Malmo.latitude + "," + city.Malmo.longitude;
            $("#cityLocation").text("Malmö");
            localStorage.setItem("location", "Malmö");
            break;
        }
    }

    localStorage.setItem("locationUrl", position);

    return position;
}

// justera kompassnål till aktuell vindriktning
function getWindDirection(direction) {
    direction = parseInt(direction);
    
    // använder jQuery extensionen rotate för att rotera kompass-bilden
    $("#compass").rotate(direction);
}

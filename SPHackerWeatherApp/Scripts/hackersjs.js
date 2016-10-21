//Dark sky key
var secretKey = "0/";

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

    $("#perHour").hide();
    $("#minMax").hide();
    $("#details").hide();

    var location = getQueryStringParameter("location");
    var locationUrl = setLocation(location);
    var getUnit = getQueryStringParameter("unit");

    // hämta väderdata från localStorage
    var weatherData = JSON.parse(localStorage.getItem("weatherdata"));
    console.log(weatherData);

    // om webbläsaren inte har kunnat läsa in väderdata från localstorage
    if (weatherData === null) {
        console.log("AJAX");
        getWeatherData(getUnit, locationUrl);
    }
    else {
        console.log("inte AJAX");
        showDetails(getUnit, weatherData);
        showHourly(getUnit, weatherData);
        showMinMax(getUnit, weatherData);
    }

    // När all data laddats in, visa detaljerna
    $("#details").show();
}());

$("#minMaxTab").click(function () {
    $("#perHour").hide();
    $("#minMax").show();
    $("#details").hide();
});

$("#perHourTab").click(function () {
    $("#perHour").show();
    $("#minMax").hide();
    $("#details").hide();
});

$("#detailsTab").click(function () {
    $("#perHour").hide();
    $("#minMax").hide();
    $("#details").show();
});

//Appens logik


function getCelsius(temp) {
    var celsius = temp;
    return (celsius - 32) / 1.8000;
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


function getWeatherData(getUnit, locationUrl) {

    var errorMessage = "";
    var weatherData = "";

    $.ajax({
        METHOD: "GET",
        dataType: "jsonp",
        crossDomain: true,
        url: locationUrl,
        success: function (data) {
            weatherData = data;
            console.log("Success");
            console.log(data);
        },
        failure: function () {
            console.log("failure");
            errorMessage = "Det gick inte att visa väderuppgifterna just nu. Vänligen försök senare";
            $("#errorMessage").text(errorMessage);
        },
        complete: function (weatherTemp) {
            if (errorMessage === "") {
                // visa detaljer
                showDetails(getUnit, weatherData);
                // visa prognos med min/max temperatur
                showMinMax(getUnit, weatherData);
                // visa temperatur / timme för innevarande dygn
                showHourly(getUnit, weatherData);
            }
        }
    });
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
    console.log(position);
    return position;
}


// visa detaljerna
function showDetails(getUnit, weatherData) {
    "use strict";


    var details = weatherData.currently;
    getUnit = parseInt(getUnit);

    console.log(details);

    var isCelsius = (getUnit === 1) ? true : false;
    var windDirection = translatewindBearing(details.windBearing);
    var windUnit = getWindSymbol(getUnit);
    var windSpeed = "";
    var temperatur = "";
    var tempUnit = getTempSymbol(getUnit);

    if (isCelsius) {
        temperatur = getCelsius(details.temperature);
        windSpeed = details.windSpeed / 2.236936;
    }
    else {
        temperatur = details.temperature;
        windSpeed = details.windSpeed;
    }

    $("#windSpeedHeadline").text("Vindhastighet " + windUnit);
    $("#temperaturHeadline").html("Temperatur " + tempUnit);

    $('#temp').html(temperatur.toFixed(1));
    $('#ozone').text(details.ozone);
    $('#windSpeed').html(windSpeed.toFixed(0));
    $('#windBearing').html(windDirection);
    $('#humidity').html(details.humidity * 100);
    $('#pressure').html(details.pressure);

    $("#details").show();

}


// visa prognos med kommande 5 dagars max/min-temperatur
function showMinMax(getUnit, weatherData) {
    "use strict";

    console.log("showMinMax");

    var mmt = weatherData.daily.data;
    getUnit = parseInt(getUnit);

    var isCelsius = (getUnit === 1) ? true : false;
    var maxTemp = [];
    var minTemp = [];
    var time = [];

    // börja på 1 = imorgon och fortsätt 5 dagar fram
    for (var index = 1; index <= 5; index++) {
        time.push(moment.unix(mmt[index].time).format("dddd"));

        if (isCelsius) {
            minTemp.push(getCelsius(mmt[index].temperatureMin).toFixed(1));
            maxTemp.push(getCelsius(mmt[index].temperatureMax).toFixed(1));
        }
        else {
            minTemp.push(mmt[index].temperatureMin.toFixed(1));
            maxTemp.push(mmt[index].temperatureMax.toFixed(1));
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
                label: "Högsta temperatur",
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
    });
}

function showHourly(getUnit, weatherData) {
    "use strict";


    console.log("showHourly");

    var phf = weatherData.hourly.data;
    getUnit = parseInt(getUnit);

    var foreCastDay = moment.unix(phf[0].time).format("dddd"); // används med timeNow för att veta när man loopat igenom innevarande dygn
    var isCelsius = (getUnit === 1) ? true : false;
    var index = 0;
    var perHourTemp = [];
    var time = [];
    var timeNow = moment.unix(weatherData.currently.time).format("dddd"); // kontrollera vilken dag det är nu
    var tempSymbol = getTempSymbol(getUnit);

    // hämta temperatur / timme för innevarande dygn
    while (timeNow === foreCastDay) {

        time.push(moment.unix(phf[index].time).format("HH"));

        perHourTemp.push(isCelsius ? getCelsius(phf[index].temperature).toFixed(1) : phf[index].temperature.toFixed(1));

        foreCastDay = moment.unix(phf[index].time).format("dddd");
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
    });
}

// översätt gradantalet till vindriktning
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

    return windBearing;
}


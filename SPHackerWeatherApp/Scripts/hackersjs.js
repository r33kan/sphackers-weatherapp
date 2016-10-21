(function () {
    "use strict";

    console.log("Main");

    //hämta väderdata från localstorage (sparas ner när app parten körs)
    var localWeatherData = localStorage.getItem("weatherData");
    var weatherData = JSON.parse(localWeatherData);
    var location = "";

    // app part settings
    var getUnit = parseInt(localStorage.getItem("unit"));

    // test för att försöka lösa localStorage problem i Edge/IE/Safari
    if (weatherData === null) {
        console.log("dags att hämta kaka");
        //getUnit = 
    }

    // När sidan har laddats visa detaljerna
    showDetails(getUnit, weatherData);

    $("#minMaxTab").click(function () {
        showMinMax(getUnit, weatherData);
    });

    $("#perHourTab").click(function () {
        showHourly(getUnit, weatherData);
    });

    $("#detailsTab").click(function () {
        showDetails(getUnit, weatherData);
    });
}());

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

function getWindSymbol(unit) {
    unit = parseInt(unit);

    switch (unit) {
        case 1:
            return "m/s";
        default:
            return "MPH";
    }
}

// visa detaljerna
function showDetails(getUnit, weatherData) {
    "use strict";

    console.log("showDetails");
    $("#perHour").hide();
    $("#minMax").hide();

    var details = weatherData.currently;

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

    // börja med att gömma övriga HTML-element
    $("#details").hide();
    $("#perHour").hide();

    console.log("showMinMax");

    var mmt = weatherData.daily.data;

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
    // avsluta med att visa aktuellt HTML-element
    $("#minMax").show();
}

function showHourly(getUnit, weatherData) {
    "use strict";

    $("#minMax").hide();
    $("#details").hide();

    console.log("showHourly");

    var phf = weatherData.hourly.data;

    console.log(phf);
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

    $("#perHour").show();


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

function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split('?')[1].split('&');
    var strParams = '';
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split('=');
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}
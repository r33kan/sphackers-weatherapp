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



  $("#minMaxTab").click(function() {
            $("#minMax").show();
            $("#details").hide();
            $("#perHour").hide();
    
            console.log("I minMaxTab");

        var minTemp = [];
        var maxTemp = [];

        for (var i = 0; i < 7; i++) {
            time[i] = moment.unix(minMaxTemp[i].time).format("dddd");
            console.log("time i MinMax: " + time[i]);
        }

        for (var i = 0; i < 7; i++) {
            minTemp[i] = minMaxTemp[i].temperatureMin;
            console.log("Dag " + i + "min" + minTemp[i])
        }

        for (var i = 0; i < 7; i++) {
            maxTemp[i] = minMaxTemp[i].temperatureMax;
            console.log("Dag " + i + "max" + maxTemp[i])
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
                    }]}
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



    $("#perHourTab").click(function() {
        $("#perHour").show();
        $("#minMax").hide();
        $("#details").hide();

        console.log("I perHourTab");

        var perHourTemp = [];
        var time = [];

        for (var i = 0; i < 24; i++) {
            time[i] = moment.unix(perHourForecast[i].time).format("HH");
            console.log(time[i])
        }

        for (var i = 0; i < 24; i++) {
            perHourTemp[i] = perHourForecast[i].temperature;
            console.log(perHourTemp[i])
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

    $("#detailsTab").click(function() {
        $("#details").show();
        $("#perHour").hide();
        $("#minMax").hide();

        console.log("I detailsTab");

        jQuery('#temp').html(details.temperature);
        jQuery('#ozone').html(details.ozone);
        jQuery('#windSpeed').html(details.windSpeed);
        jQuery('#windBearing').html(details.windBearing);
        jQuery('#humidity').html(details.humidity);
        jQuery('#pressure').html(details.humidity);
    })
})







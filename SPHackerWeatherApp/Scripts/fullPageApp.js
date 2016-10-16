var secretKey = "629b0a384ddac75d1c1fa827e8846375/";
var iconColor = "black";
var skycons = new Skycons({ "color": iconColor });

$("#navDetails").click(function () {
    $("#details").show();
    $("#tempGraf").hide();
    $("#forecastGraf").hide();
    $("#about").hide();
});

$("#navTempGraf").click(function () {
    $("#details").hide();
    $("#tempGraf").show();
    $("#forecastGraf").hide();
    $("#about").hide();
});

$("#navForecastGraf").click(function () {
    $("#details").hide();
    $("#tempGraf").hide();
    $("#forecastGraf").show();
    $("#about").hide();
});

$("#navAbout").click(function () {
    $("#details").hide();
    $("#tempGraf").hide();
    $("#forecastGraf").hide();
    $("#about").show();
});

(function () {
    "user strict";

    $("#details").show();
    var getWeather = setLocation(1);
    var errorMessage = "";
    var weatherData = {
        "latitude": 62,
        "longitude": 15,
        "timezone": "Europe/Stockholm",
        "offset": 2,
        "currently": {
            "time": 1476616533,
            "summary": "Mostly Cloudy",
            "icon": "partly-cloudy-day",
            "precipIntensity": 0,
            "precipProbability": 0,
            "temperature": 39.33,
            "apparentTemperature": 34.35,
            "dewPoint": 34.07,
            "humidity": 0.81,
            "windSpeed": 6.96,
            "windBearing": 189,
            "cloudCover": 0.66,
            "pressure": 1033.98,
            "ozone": 260.52
        },
        "hourly": {
            "summary": "Mostly cloudy throughout the day.",
            "icon": "partly-cloudy-night",
            "data": [
                {
                    "time": 1476615600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 39.14,
                    "apparentTemperature": 34.19,
                    "dewPoint": 33.96,
                    "humidity": 0.81,
                    "windSpeed": 6.85,
                    "windBearing": 189,
                    "cloudCover": 0.68,
                    "pressure": 1033.99,
                    "ozone": 260.6
                },
                {
                    "time": 1476619200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 39.86,
                    "apparentTemperature": 34.81,
                    "dewPoint": 34.39,
                    "humidity": 0.81,
                    "windSpeed": 7.27,
                    "windBearing": 190,
                    "cloudCover": 0.6,
                    "pressure": 1033.92,
                    "ozone": 260.3
                },
                {
                    "time": 1476622800,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 40.01,
                    "apparentTemperature": 35.04,
                    "dewPoint": 34.66,
                    "humidity": 0.81,
                    "windSpeed": 7.18,
                    "windBearing": 190,
                    "cloudCover": 0.65,
                    "pressure": 1033.87,
                    "ozone": 260.23
                },
                {
                    "time": 1476626400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 39.85,
                    "apparentTemperature": 35.1,
                    "dewPoint": 34.92,
                    "humidity": 0.82,
                    "windSpeed": 6.76,
                    "windBearing": 188,
                    "cloudCover": 0.76,
                    "pressure": 1033.83,
                    "ozone": 260.3
                },
                {
                    "time": 1476630000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 39.52,
                    "apparentTemperature": 35.07,
                    "dewPoint": 35.07,
                    "humidity": 0.84,
                    "windSpeed": 6.19,
                    "windBearing": 186,
                    "cloudCover": 0.85,
                    "pressure": 1033.81,
                    "ozone": 260.5
                },
                {
                    "time": 1476633600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 38.87,
                    "apparentTemperature": 34.75,
                    "dewPoint": 34.93,
                    "humidity": 0.86,
                    "windSpeed": 5.52,
                    "windBearing": 183,
                    "cloudCover": 0.92,
                    "pressure": 1033.82,
                    "ozone": 260.87
                },
                {
                    "time": 1476637200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 38.06,
                    "apparentTemperature": 34.32,
                    "dewPoint": 34.67,
                    "humidity": 0.87,
                    "windSpeed": 4.85,
                    "windBearing": 178,
                    "cloudCover": 0.97,
                    "pressure": 1033.86,
                    "ozone": 261.36
                },
                {
                    "time": 1476640800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 37.43,
                    "apparentTemperature": 33.88,
                    "dewPoint": 34.49,
                    "humidity": 0.89,
                    "windSpeed": 4.5,
                    "windBearing": 174,
                    "cloudCover": 1,
                    "pressure": 1033.89,
                    "ozone": 261.8
                },
                {
                    "time": 1476644400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.93,
                    "apparentTemperature": 33.2,
                    "dewPoint": 34.27,
                    "humidity": 0.9,
                    "windSpeed": 4.61,
                    "windBearing": 173,
                    "cloudCover": 1,
                    "pressure": 1033.94,
                    "ozone": 262.09
                },
                {
                    "time": 1476648000,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.39,
                    "apparentTemperature": 32.27,
                    "dewPoint": 33.95,
                    "humidity": 0.91,
                    "windSpeed": 4.96,
                    "windBearing": 174,
                    "cloudCover": 1,
                    "pressure": 1033.97,
                    "ozone": 262.31
                },
                {
                    "time": 1476651600,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 35.74,
                    "apparentTemperature": 31.22,
                    "dewPoint": 33.58,
                    "humidity": 0.92,
                    "windSpeed": 5.3,
                    "windBearing": 174,
                    "cloudCover": 0.99,
                    "pressure": 1033.97,
                    "ozone": 262.6
                },
                {
                    "time": 1476655200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 34.95,
                    "apparentTemperature": 30.11,
                    "dewPoint": 33.27,
                    "humidity": 0.94,
                    "windSpeed": 5.52,
                    "windBearing": 172,
                    "cloudCover": 0.99,
                    "pressure": 1033.92,
                    "ozone": 263
                },
                {
                    "time": 1476658800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 34.28,
                    "apparentTemperature": 29.18,
                    "dewPoint": 33.15,
                    "humidity": 0.96,
                    "windSpeed": 5.7,
                    "windBearing": 170,
                    "cloudCover": 0.99,
                    "pressure": 1033.84,
                    "ozone": 263.45
                },
                {
                    "time": 1476662400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 33.7,
                    "apparentTemperature": 28.36,
                    "dewPoint": 32.97,
                    "humidity": 0.97,
                    "windSpeed": 5.86,
                    "windBearing": 168,
                    "cloudCover": 0.95,
                    "pressure": 1033.68,
                    "ozone": 263.9
                },
                {
                    "time": 1476666000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 33.33,
                    "apparentTemperature": 27.75,
                    "dewPoint": 32.76,
                    "humidity": 0.98,
                    "windSpeed": 6.09,
                    "windBearing": 168,
                    "cloudCover": 0.86,
                    "pressure": 1033.41,
                    "ozone": 264.33
                },
                {
                    "time": 1476669600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 33.09,
                    "apparentTemperature": 27.26,
                    "dewPoint": 32.55,
                    "humidity": 0.98,
                    "windSpeed": 6.37,
                    "windBearing": 168,
                    "cloudCover": 0.73,
                    "pressure": 1033.07,
                    "ozone": 264.77
                },
                {
                    "time": 1476673200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 32.92,
                    "apparentTemperature": 26.92,
                    "dewPoint": 32.39,
                    "humidity": 0.98,
                    "windSpeed": 6.55,
                    "windBearing": 168,
                    "cloudCover": 0.66,
                    "pressure": 1032.78,
                    "ozone": 265.2
                },
                {
                    "time": 1476676800,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 32.72,
                    "apparentTemperature": 26.68,
                    "dewPoint": 32.33,
                    "humidity": 0.98,
                    "windSpeed": 6.53,
                    "windBearing": 166,
                    "cloudCover": 0.69,
                    "pressure": 1032.62,
                    "ozone": 265.68
                },
                {
                    "time": 1476680400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 32.61,
                    "apparentTemperature": 26.61,
                    "dewPoint": 32.34,
                    "humidity": 0.99,
                    "windSpeed": 6.46,
                    "windBearing": 165,
                    "cloudCover": 0.77,
                    "pressure": 1032.52,
                    "ozone": 266.16
                },
                {
                    "time": 1476684000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 33.43,
                    "apparentTemperature": 27.59,
                    "dewPoint": 32.88,
                    "humidity": 0.98,
                    "windSpeed": 6.46,
                    "windBearing": 164,
                    "cloudCover": 0.82,
                    "pressure": 1032.35,
                    "ozone": 266.5
                },
                {
                    "time": 1476687600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 34.55,
                    "apparentTemperature": 28.8,
                    "dewPoint": 32.87,
                    "humidity": 0.93,
                    "windSpeed": 6.66,
                    "windBearing": 165,
                    "cloudCover": 0.81,
                    "pressure": 1032.1,
                    "ozone": 266.58
                },
                {
                    "time": 1476691200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 35.73,
                    "apparentTemperature": 29.96,
                    "dewPoint": 32.42,
                    "humidity": 0.88,
                    "windSpeed": 7.05,
                    "windBearing": 166,
                    "cloudCover": 0.78,
                    "pressure": 1031.79,
                    "ozone": 266.53
                },
                {
                    "time": 1476694800,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.72,
                    "apparentTemperature": 31.01,
                    "dewPoint": 32.17,
                    "humidity": 0.83,
                    "windSpeed": 7.29,
                    "windBearing": 167,
                    "cloudCover": 0.76,
                    "pressure": 1031.45,
                    "ozone": 266.6
                },
                {
                    "time": 1476698400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 37.91,
                    "apparentTemperature": 32.37,
                    "dewPoint": 33.02,
                    "humidity": 0.82,
                    "windSpeed": 7.42,
                    "windBearing": 167,
                    "cloudCover": 0.78,
                    "pressure": 1031.06,
                    "ozone": 266.79
                },
                {
                    "time": 1476702000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.001,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 39.52,
                    "apparentTemperature": 34.27,
                    "dewPoint": 34.8,
                    "humidity": 0.83,
                    "windSpeed": 7.5,
                    "windBearing": 165,
                    "cloudCover": 0.82,
                    "pressure": 1030.63,
                    "ozone": 267.1
                },
                {
                    "time": 1476705600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0013,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 41.13,
                    "apparentTemperature": 36.25,
                    "dewPoint": 36.76,
                    "humidity": 0.84,
                    "windSpeed": 7.45,
                    "windBearing": 164,
                    "cloudCover": 0.86,
                    "pressure": 1030.2,
                    "ozone": 267.8
                },
                {
                    "time": 1476709200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0014,
                    "precipProbability": 0.03,
                    "precipType": "rain",
                    "temperature": 42.05,
                    "apparentTemperature": 37.51,
                    "dewPoint": 38.17,
                    "humidity": 0.86,
                    "windSpeed": 7.18,
                    "windBearing": 162,
                    "cloudCover": 0.91,
                    "pressure": 1029.74,
                    "ozone": 269.18
                },
                {
                    "time": 1476712800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0014,
                    "precipProbability": 0.03,
                    "precipType": "rain",
                    "temperature": 41.44,
                    "apparentTemperature": 36.98,
                    "dewPoint": 38.22,
                    "humidity": 0.88,
                    "windSpeed": 6.81,
                    "windBearing": 159,
                    "cloudCover": 0.95,
                    "pressure": 1029.26,
                    "ozone": 270.95
                },
                {
                    "time": 1476716400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0014,
                    "precipProbability": 0.03,
                    "precipType": "rain",
                    "temperature": 40.53,
                    "apparentTemperature": 36.05,
                    "dewPoint": 37.92,
                    "humidity": 0.9,
                    "windSpeed": 6.54,
                    "windBearing": 158,
                    "cloudCover": 0.99,
                    "pressure": 1028.82,
                    "ozone": 272.5
                },
                {
                    "time": 1476720000,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0012,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 39.61,
                    "apparentTemperature": 34.99,
                    "dewPoint": 37.5,
                    "humidity": 0.92,
                    "windSpeed": 6.47,
                    "windBearing": 158,
                    "cloudCover": 1,
                    "pressure": 1028.47,
                    "ozone": 273.62
                },
                {
                    "time": 1476723600,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.001,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 38.81,
                    "apparentTemperature": 33.98,
                    "dewPoint": 37.12,
                    "humidity": 0.94,
                    "windSpeed": 6.56,
                    "windBearing": 159,
                    "cloudCover": 1,
                    "pressure": 1028.18,
                    "ozone": 274.51
                },
                {
                    "time": 1476727200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0008,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 38.24,
                    "apparentTemperature": 33.16,
                    "dewPoint": 36.85,
                    "humidity": 0.95,
                    "windSpeed": 6.76,
                    "windBearing": 161,
                    "cloudCover": 1,
                    "pressure": 1027.86,
                    "ozone": 275.2
                },
                {
                    "time": 1476730800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 37.83,
                    "apparentTemperature": 32.6,
                    "dewPoint": 36.56,
                    "humidity": 0.95,
                    "windSpeed": 6.89,
                    "windBearing": 162,
                    "cloudCover": 1,
                    "pressure": 1027.5,
                    "ozone": 275.46
                },
                {
                    "time": 1476734400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 37.52,
                    "apparentTemperature": 32.17,
                    "dewPoint": 36.26,
                    "humidity": 0.95,
                    "windSpeed": 6.96,
                    "windBearing": 163,
                    "cloudCover": 1,
                    "pressure": 1027.11,
                    "ozone": 275.5
                },
                {
                    "time": 1476738000,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 37.19,
                    "apparentTemperature": 31.76,
                    "dewPoint": 35.94,
                    "humidity": 0.95,
                    "windSpeed": 6.99,
                    "windBearing": 164,
                    "cloudCover": 1,
                    "pressure": 1026.72,
                    "ozone": 276
                },
                {
                    "time": 1476741600,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.67,
                    "apparentTemperature": 31.16,
                    "dewPoint": 35.52,
                    "humidity": 0.96,
                    "windSpeed": 6.95,
                    "windBearing": 165,
                    "cloudCover": 0.99,
                    "pressure": 1026.33,
                    "ozone": 277.29
                },
                {
                    "time": 1476745200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.05,
                    "apparentTemperature": 30.46,
                    "dewPoint": 35,
                    "humidity": 0.96,
                    "windSpeed": 6.87,
                    "windBearing": 167,
                    "cloudCover": 0.99,
                    "pressure": 1025.93,
                    "ozone": 279.03
                },
                {
                    "time": 1476748800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 35.42,
                    "apparentTemperature": 29.75,
                    "dewPoint": 34.44,
                    "humidity": 0.96,
                    "windSpeed": 6.8,
                    "windBearing": 168,
                    "cloudCover": 0.99,
                    "pressure": 1025.54,
                    "ozone": 280.9
                },
                {
                    "time": 1476752400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 35.1,
                    "apparentTemperature": 29.4,
                    "dewPoint": 34.16,
                    "humidity": 0.96,
                    "windSpeed": 6.75,
                    "windBearing": 169,
                    "cloudCover": 0.98,
                    "pressure": 1025.17,
                    "ozone": 282.83
                },
                {
                    "time": 1476756000,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 35.51,
                    "apparentTemperature": 30.11,
                    "dewPoint": 34.56,
                    "humidity": 0.96,
                    "windSpeed": 6.41,
                    "windBearing": 168,
                    "cloudCover": 0.98,
                    "pressure": 1024.81,
                    "ozone": 284.89
                },
                {
                    "time": 1476759600,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0011,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 35.89,
                    "apparentTemperature": 30.82,
                    "dewPoint": 34.96,
                    "humidity": 0.96,
                    "windSpeed": 6.06,
                    "windBearing": 165,
                    "cloudCover": 0.98,
                    "pressure": 1024.48,
                    "ozone": 287
                },
                {
                    "time": 1476763200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0011,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 36.12,
                    "apparentTemperature": 30.91,
                    "dewPoint": 35.31,
                    "humidity": 0.97,
                    "windSpeed": 6.32,
                    "windBearing": 164,
                    "cloudCover": 0.98,
                    "pressure": 1024.22,
                    "ozone": 289.26
                },
                {
                    "time": 1476766800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0008,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 36.31,
                    "apparentTemperature": 30.76,
                    "dewPoint": 35.63,
                    "humidity": 0.97,
                    "windSpeed": 6.9,
                    "windBearing": 163,
                    "cloudCover": 0.97,
                    "pressure": 1024,
                    "ozone": 291.57
                },
                {
                    "time": 1476770400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.58,
                    "apparentTemperature": 30.74,
                    "dewPoint": 35.8,
                    "humidity": 0.97,
                    "windSpeed": 7.45,
                    "windBearing": 165,
                    "cloudCover": 0.96,
                    "pressure": 1023.8,
                    "ozone": 293.6
                },
                {
                    "time": 1476774000,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0008,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 37.35,
                    "apparentTemperature": 31.48,
                    "dewPoint": 36.07,
                    "humidity": 0.95,
                    "windSpeed": 7.79,
                    "windBearing": 170,
                    "cloudCover": 0.97,
                    "pressure": 1023.65,
                    "ozone": 295.27
                },
                {
                    "time": 1476777600,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0011,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 38.63,
                    "apparentTemperature": 32.86,
                    "dewPoint": 36.6,
                    "humidity": 0.92,
                    "windSpeed": 8.12,
                    "windBearing": 177,
                    "cloudCover": 0.98,
                    "pressure": 1023.52,
                    "ozone": 296.66
                },
                {
                    "time": 1476781200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0013,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 40.16,
                    "apparentTemperature": 34.66,
                    "dewPoint": 37.44,
                    "humidity": 0.9,
                    "windSpeed": 8.24,
                    "windBearing": 181,
                    "cloudCover": 0.99,
                    "pressure": 1023.38,
                    "ozone": 297.6
                },
                {
                    "time": 1476784800,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0013,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 41.72,
                    "apparentTemperature": 36.74,
                    "dewPoint": 38.5,
                    "humidity": 0.88,
                    "windSpeed": 7.89,
                    "windBearing": 183,
                    "cloudCover": 0.99,
                    "pressure": 1023.23,
                    "ozone": 297.9
                },
                {
                    "time": 1476788400,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0012,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 43.11,
                    "apparentTemperature": 38.77,
                    "dewPoint": 39.5,
                    "humidity": 0.87,
                    "windSpeed": 7.22,
                    "windBearing": 183,
                    "cloudCover": 0.99,
                    "pressure": 1023.05,
                    "ozone": 297.76
                }
            ]
        },
        "daily": {
            "summary": "Mixed precipitation on Wednesday through Sunday, with temperatures peaking at 44°F on Tuesday.",
            "icon": "rain",
            "data": [
                {
                    "time": 1476568800,
                    "summary": "Mostly cloudy throughout the day.",
                    "icon": "partly-cloudy-day",
                    "sunriseTime": 1476596921,
                    "sunsetTime": 1476632674,
                    "moonPhase": 0.51,
                    "precipIntensity": 0.0003,
                    "precipIntensityMax": 0.0008,
                    "precipIntensityMaxTime": 1476568800,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperatureMin": 32.33,
                    "temperatureMinTime": 1476590400,
                    "temperatureMax": 40.01,
                    "temperatureMaxTime": 1476622800,
                    "apparentTemperatureMin": 27.46,
                    "apparentTemperatureMinTime": 1476590400,
                    "apparentTemperatureMax": 35.04,
                    "apparentTemperatureMaxTime": 1476622800,
                    "dewPoint": 33.27,
                    "humidity": 0.9,
                    "windSpeed": 5.16,
                    "windBearing": 175,
                    "cloudCover": 0.92,
                    "pressure": 1034.08,
                    "ozone": 263.11
                },
                {
                    "time": 1476655200,
                    "summary": "Mostly cloudy throughout the day.",
                    "icon": "partly-cloudy-day",
                    "sunriseTime": 1476683484,
                    "sunsetTime": 1476718886,
                    "moonPhase": 0.55,
                    "precipIntensity": 0.0006,
                    "precipIntensityMax": 0.0014,
                    "precipIntensityMaxTime": 1476712800,
                    "precipProbability": 0.03,
                    "precipType": "rain",
                    "temperatureMin": 32.61,
                    "temperatureMinTime": 1476680400,
                    "temperatureMax": 42.05,
                    "temperatureMaxTime": 1476709200,
                    "apparentTemperatureMin": 26.61,
                    "apparentTemperatureMinTime": 1476680400,
                    "apparentTemperatureMax": 37.51,
                    "apparentTemperatureMaxTime": 1476709200,
                    "dewPoint": 34.63,
                    "humidity": 0.92,
                    "windSpeed": 6.66,
                    "windBearing": 164,
                    "cloudCover": 0.88,
                    "pressure": 1030.79,
                    "ozone": 268.64
                },
                {
                    "time": 1476741600,
                    "summary": "Overcast throughout the day.",
                    "icon": "cloudy",
                    "sunriseTime": 1476770048,
                    "sunsetTime": 1476805099,
                    "moonPhase": 0.58,
                    "precipIntensity": 0.0007,
                    "precipIntensityMax": 0.0015,
                    "precipIntensityMaxTime": 1476824400,
                    "precipProbability": 0.03,
                    "precipType": "rain",
                    "temperatureMin": 35.1,
                    "temperatureMinTime": 1476752400,
                    "temperatureMax": 43.94,
                    "temperatureMaxTime": 1476792000,
                    "apparentTemperatureMin": 29.4,
                    "apparentTemperatureMinTime": 1476752400,
                    "apparentTemperatureMax": 40.1,
                    "apparentTemperatureMaxTime": 1476792000,
                    "dewPoint": 36.75,
                    "humidity": 0.93,
                    "windSpeed": 6.41,
                    "windBearing": 167,
                    "cloudCover": 0.99,
                    "pressure": 1023.35,
                    "ozone": 292.78
                },
                {
                    "time": 1476828000,
                    "summary": "Drizzle overnight.",
                    "icon": "rain",
                    "sunriseTime": 1476856613,
                    "sunsetTime": 1476891312,
                    "moonPhase": 0.62,
                    "precipIntensity": 0.0022,
                    "precipIntensityMax": 0.0071,
                    "precipIntensityMaxTime": 1476910800,
                    "precipProbability": 0.32,
                    "precipType": "rain",
                    "temperatureMin": 35.2,
                    "temperatureMinTime": 1476853200,
                    "temperatureMax": 43.65,
                    "temperatureMaxTime": 1476882000,
                    "apparentTemperatureMin": 31.36,
                    "apparentTemperatureMinTime": 1476853200,
                    "apparentTemperatureMax": 41.61,
                    "apparentTemperatureMaxTime": 1476882000,
                    "dewPoint": 37.32,
                    "humidity": 0.96,
                    "windSpeed": 3.11,
                    "windBearing": 113,
                    "cloudCover": 0.93,
                    "pressure": 1021.98,
                    "ozone": 301.86
                },
                {
                    "time": 1476914400,
                    "summary": "Light rain throughout the day.",
                    "icon": "rain",
                    "sunriseTime": 1476943178,
                    "sunsetTime": 1476977527,
                    "moonPhase": 0.66,
                    "precipIntensity": 0.0055,
                    "precipIntensityMax": 0.0102,
                    "precipIntensityMaxTime": 1476997200,
                    "precipProbability": 0.47,
                    "precipType": "rain",
                    "temperatureMin": 35.26,
                    "temperatureMinTime": 1476997200,
                    "temperatureMax": 41.99,
                    "temperatureMaxTime": 1476968400,
                    "apparentTemperatureMin": 30.08,
                    "apparentTemperatureMinTime": 1476997200,
                    "apparentTemperatureMax": 38.47,
                    "apparentTemperatureMaxTime": 1476968400,
                    "dewPoint": 36.5,
                    "humidity": 0.96,
                    "windSpeed": 4.98,
                    "windBearing": 63,
                    "cloudCover": 1,
                    "pressure": 1027.17,
                    "ozone": 297.43
                },
                {
                    "time": 1477000800,
                    "summary": "Light snow (under 1 in.) in the morning and evening.",
                    "icon": "snow",
                    "sunriseTime": 1477029744,
                    "sunsetTime": 1477063742,
                    "moonPhase": 0.7,
                    "precipIntensity": 0.0035,
                    "precipIntensityMax": 0.0097,
                    "precipIntensityMaxTime": 1477000800,
                    "precipProbability": 0.46,
                    "precipType": "rain",
                    "temperatureMin": 32.06,
                    "temperatureMinTime": 1477083600,
                    "temperatureMax": 38.46,
                    "temperatureMaxTime": 1477058400,
                    "apparentTemperatureMin": 25.04,
                    "apparentTemperatureMinTime": 1477083600,
                    "apparentTemperatureMax": 33.3,
                    "apparentTemperatureMaxTime": 1477058400,
                    "dewPoint": 32.89,
                    "humidity": 0.94,
                    "windSpeed": 7.04,
                    "windBearing": 67,
                    "cloudCover": 0.99,
                    "pressure": 1031.31,
                    "ozone": 295.62
                },
                {
                    "time": 1477087200,
                    "summary": "Light snow (under 1 in.) in the morning and evening.",
                    "icon": "snow",
                    "sunriseTime": 1477116311,
                    "sunsetTime": 1477149958,
                    "moonPhase": 0.73,
                    "precipIntensity": 0.0031,
                    "precipIntensityMax": 0.0045,
                    "precipIntensityMaxTime": 1477112400,
                    "precipProbability": 0.17,
                    "precipType": "snow",
                    "precipAccumulation": 0.597,
                    "temperatureMin": 30.49,
                    "temperatureMinTime": 1477105200,
                    "temperatureMax": 36.35,
                    "temperatureMaxTime": 1477137600,
                    "apparentTemperatureMin": 22.69,
                    "apparentTemperatureMinTime": 1477105200,
                    "apparentTemperatureMax": 30.24,
                    "apparentTemperatureMaxTime": 1477137600,
                    "dewPoint": 31.01,
                    "humidity": 0.93,
                    "windSpeed": 7.37,
                    "windBearing": 69,
                    "cloudCover": 1,
                    "pressure": 1032.76,
                    "ozone": 298.83
                },
                {
                    "time": 1477173600,
                    "summary": "Light snow (under 1 in.) throughout the day.",
                    "icon": "snow",
                    "sunriseTime": 1477202878,
                    "sunsetTime": 1477236175,
                    "moonPhase": 0.77,
                    "precipIntensity": 0.0028,
                    "precipIntensityMax": 0.0046,
                    "precipIntensityMaxTime": 1477220400,
                    "precipProbability": 0.18,
                    "precipType": "snow",
                    "precipAccumulation": 0.556,
                    "temperatureMin": 29.03,
                    "temperatureMinTime": 1477191600,
                    "temperatureMax": 34.68,
                    "temperatureMaxTime": 1477224000,
                    "apparentTemperatureMin": 21.92,
                    "apparentTemperatureMinTime": 1477191600,
                    "apparentTemperatureMax": 29.34,
                    "apparentTemperatureMaxTime": 1477224000,
                    "dewPoint": 30,
                    "humidity": 0.94,
                    "windSpeed": 5.89,
                    "windBearing": 81,
                    "cloudCover": 0.99,
                    "pressure": 1032.91,
                    "ozone": 310.55
                }
            ]
        },
        "flags": {
            "sources": [
                "gfs",
                "cmc",
                "fnmoc",
                "metno_ne",
                "metno_ce",
                "isd"
            ],
            "metno-license": "Based on data from the Norwegian Meteorological Institute. (http://api.met.no/)",
            "isd-stations": [
                "020650-99999",
                "023240-99999",
                "023260-99999",
                "023270-99999",
                "023290-99999"
            ],
            "units": "us"
        }
    };
    var weatherTemp = "";
    var detailsData = "";
       
    
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

    var weatherToday = data.hourly.data;

    var foreCastDay = moment.unix(weatherToday[0].time).format("dddd");
    var index = 0;
    var temperatur = [];
    var time = [];
    var timeNow = moment.unix(data.currently.time).format("dddd");

    // hämta temperatur / timme för innevarande dag
    while (timeNow === foreCastDay) {

        time.push(moment.unix(weatherToday[index].time).format("LT"));
        temperatur.push(weatherToday[index].temperature);

        foreCastDay = moment.unix(weatherToday[index].time).format("dddd");
        index++;
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

    console.log("forecastTempChart");
    for (var index = 1; index <= 5; index++) {

        minTemp.push(data[index].temperatureMin);
        maxTemp.push(data[index].temperatureMax);
        day.push(moment.unix(data[index].time).format("dddd"));
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
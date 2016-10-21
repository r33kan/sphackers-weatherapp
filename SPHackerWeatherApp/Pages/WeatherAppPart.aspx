<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <%--ramverk och bibliotek--%>
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script src="../Scripts/jQueryRotate.js"></script>
    <script src="../Scripts/skycons.js"></script>
    <script src="../Scripts/moment-with-locales.min.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/js.cookie.js"></script>

    <%--CSS & ikon-paket--%>
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />

    <%--egen CSS--%>
    <link href="../Content/App.css" rel="stylesheet" />
    <link id="cssTheme" href="#" rel="stylesheet" />
</head>
<body>
    <div id="AppPartContent" class="container main">
        <%--header visar plats, tid och länk till väderdetaljer--%>
        <div id="AppPartHeader" class="jumbotron container row">
            <div id="AppPartHeaderLocation" class="col-sm-12">
                <h1 id="cityLocation"></h1>
            </div>
            <div id="AppPartHeaderDate" class="col-sm-12 info">
                <p id="AppPartHeaderDateDisplay">Datum</p>
            </div>
            <div id="AppPartHeaderDetails" class="col-sm-12 info">
                <p id="AppPartHeaderDetailsLink">
                    <a href="Default.aspx" target="_parent" class="btn btn-primary btn-lg">Detaljer</a>
                </p>
            </div>
        </div>
        <%--body presenterar vädret för idag--%>
        <div id="AppPartBody" class="container row">
            <div id="AppPartBodySummary"></div>

            <%--div för vindhastighet och kompassriktning--%>
            <div id="AppPartBodyDetails">
                <span id="windData"></span>
                <img id="compass" src="../Images/weatherIcons/Compass.svg" />
            </div>
            <div>
                <canvas id='icon1' width='128' height='128'></canvas>
            </div>
        </div>

        <%--footer med väderdata för nästkommande 5 dagar--%>
        <div id="AppPartFooter" class="container row">
            <div class='forcast'>
                <div id="forecastDay1"></div>
                <div>
                    <canvas class="forcastImg" id="forecastCanvas1"></canvas>
                </div>
                <div id="forecastTemp1"></div>
            </div>
            <div class='forcast'>
                <div id="forecastDay2"></div>
                <div>
                    <canvas class="forcastImg" id="forecastCanvas2"></canvas>
                </div>
                <div id="forecastTemp2"></div>
            </div>
            <div class='forcast'>
                <div id="forecastDay3"></div>
                <div>
                    <canvas class="forcastImg" id="forecastCanvas3"></canvas>
                </div>
                <div id="forecastTemp3"></div>
            </div>
            <div class='forcast'>
                <div id="forecastDay4"></div>
                <div>
                    <canvas class="forcastImg" id="forecastCanvas4"></canvas>
                </div>
                <div id="forecastTemp4"></div>
            </div>
            <div class='forcast'>
                <div id="forecastDay5"></div>
                <div>
                    <canvas class="forcastImg" id="forecastCanvas5"></canvas>
                </div>
                <div id="forecastTemp5"></div>
            </div>
        </div>
    </div>

    <%--Egen javascript--%>
    <script src="../Scripts/App.js"></script>
</body>
</html>

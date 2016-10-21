<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>


<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/Chart.min.js"></script>
    <script src="../Scripts/js.cookie.js"></script>
    <!-- CSS bibliotek -->
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />

    <!-- Egen CSS -->
    <link rel="Stylesheet" type="text/css" href="../Content/immersive.css" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="container">
        <ul class="nav nav-tabs">
            <li><a id="perHourTab">Per timme</a></li>
            <li><a id="minMaxTab">Min- och maxtemperatur</a></li>
            <li><a id="detailsTab">Detaljerad info</a></li>
        </ul>
    </div>
    <div id="perHour" class="container">
        <canvas id="perHourChart"></canvas>
    </div>
    <div id="minMax" class="container">
        <canvas id="minMaxTemp"></canvas>
    </div>
    <div id="details" class="container">
        <table class="table table-default table-responsive">
            <tr>
                <th id="temperaturHeadline">Temperatur</th>
                <th>Ozon</th>
                <th id="windSpeedHeadline">Vindhastighet</th>
                <th>Vindriktning</th>
                <th>Luftfuktighet %</th>
                <th>Lufttryck hpa</th>
            </tr>


            <tr>
                <td id="temp"></td>
                <td id="ozone"></td>
                <td id="windSpeed"></td>
                <td id="windBearing"></td>
                <td id="humidity"></td>
                <td id="pressure"></td>
            </tr>

        </table>
        <div id="listDetails"></div>
    </div>
    <script type="text/javascript" src="../Scripts/hackersjs.js"></script>

</asp:Content>



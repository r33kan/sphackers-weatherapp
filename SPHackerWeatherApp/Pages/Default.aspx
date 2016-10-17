<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <%--Javascriptbibliotek--%>
    <script src="../Scripts/bootstrap.min.js"></script>
    <script src="../Scripts/moment-with-locales.min.js"></script>
    <script src="../Scripts/Chart.min.js"></script>
    <script src="../Scripts/skycons.js"></script>

    <%--CSS bibliotek--%>
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />

    <%--Egen CSS--%>
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../Content/fullPageStyle.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="container-fluid">
        <div class="navbar navbar-default">
            <div class="container-fluid">
                <ul class="nav navbar-nav">
                    <li id="navDetails"><a href="#">Detaljer</a></li>
                    <li id="navTempGraf"><a href="#">Temperaturgraf idag</a></li>
                    <li id="navForecastGraf"><a href="#">Forecast</a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li id="navAbout"><a href="#">About</a></li>
                </ul>
            </div>
        </div>

        <div id="response"></div>

        <div id="details" class="container-fluid">
            <div class="well well-lg">
                <h1>Idag</h1>
                <canvas id="weatherIcon"></canvas>
            </div>
                
            <div class="well well-lg">
                <h1>Detaljer</h1>
                <div id="detailsData"></div>
            </div>

<%--            <div class="panel panel-default">
                <div class="panel-heading">Panel heading</div>
                <div class="panel-body">
            </div>--%>


        </div>

        <div id="tempGraf" class="container" hidden="true">
            <div>
                <canvas id="todayChart" width="20" height="10"></canvas>

            </div>
        </div>

        <div id="forecastGraf" class="container" hidden="true">
            <div id="tempChart">
                <canvas id="forecastChart" width="20" height="10"></canvas>
            </div>
        </div>

        <div id="about" class="container" hidden="true">
            about
        </div>
    </div>

        <%--Egen JavaScript--%>
    <script src="../Scripts/fullPageApp.js"></script>
</asp:Content>

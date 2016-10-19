<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />



    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/Chart.js"></script>
    <script type="text/javascript" src="../Scripts/hackersjs.js"></script>

    <!-- CSS bibliotek -->
    <link rel="Stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    
    <!-- Egen CSS -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
</asp:Content>


<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  
    <div class="container">
        <ul class="nav nav-tabs">
       <%--     <li id="perHourTab"><a onclick="showPerHour()">Per timme</a></li>
            <li id="minMaxTab"><a onclick="showMinMax()">Min- och maxtemperatur</a></li>
            <li id="detailsTab"><a onclick="showDetails()">Detaljerad info</a></li>--%>
            <li><a id="perHourTab">Per timme</a></li>
            <li><a id="minMaxTab">Min- och maxtemperatur</a></li>
            <li><a id="detailsTab">Detaljerad info</a></li>
        </ul>
     </div>
    <div id="perHour">
        <canvas "id="perHourChart" ></canvas>
    </div>
      <div id="minMax">
           <canvas id="minMaxTemp"></canvas>
      </div>
    <div id="details">
             <table class="table">
                <thead>
                  <tr>
                    <th>Temperatur</th>
                    <th>Ozon</th>
                    <th>Vindhastighet</th>
                    <th>Vindriktning</th>
                    <th>Fuktighet</th>
                    <th>Lufttryck</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="temp"></td>
                        <td id="ozone"></td>
                        <td id="windSpeed"></td>
                        <td id="windBearing"></td>
                        <td id="humidity"></td>
                        <td id="pressure"></td>
                    </tr>
                </tbody>
                </table>
    </div>

</asp:Content>



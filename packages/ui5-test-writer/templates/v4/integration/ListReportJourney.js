sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();
            Then.onThe<%- pageName%>.iSeeThisPage();
        });

        opaTest("Check if data is loading in the table", function (Given, When, Then) {
            <% if (!hideFilterBar) { %>
            When.onThe<%- pageName%>.onFilterBar().iExecuteSearch();
            <%} %>
            Then.onThe<%- pageName%>.onTable().iCheckRows();
        });

<% if (filterBarItems) { %>
        opaTest("Check filters in filter bar", function (Given, When, Then) {}) {
            <% filterBarItems.forEach(function(item) { %>
            Then.onThe<%- pageName%>.onFilterBar().iCheckFilterField("<%- item %>");
            <% }); %>
        }
<% } %>

<% if (tableColumns) { %>
        opaTest("Check columns of the table", function (Given, When, Then) {}) {
            <% if (tableColumns) { %>
            Then.onThe<%- pageName %>.onTable().iCheckColumns(<%- Object.values(tableColumns).length %>, <%- JSON.stringify(tableColumns) %>);
            <% } %>
        }
<% } %>

<% if (targetOP) { %>
        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            <% if (!hideFilterBar) { %>
            When.onThe<%- pageName%>.onFilterBar().iExecuteSearch();
            <%} %>
            Then.onThe<%- pageName%>.onTable().iCheckRows();
            When.onThe<%- pageName%>.onTable().iPressRow(0);
            Then.onThe<%- targetOP%>.iSeeThisPage();
        });
<%} %>

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});
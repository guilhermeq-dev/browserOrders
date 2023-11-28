sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter"

], function(Controller, ODataModel, JSONModel, Filter, FilterOperator, formatter) {
    "use strict";
    return Controller.extend("com.lab2dev.browserorders.controller.Home", {
        formatter: formatter,
        onInit: function() {
            const oData = new ODataModel("/northwind/northwind.svc/");
            oData.read("/Orders", {
                success: function(Orders) {
                    const oModel = new JSONModel(Orders.results);
                    this.getView().setModel(oModel, "items");
                }.bind(this),
                error: function(error) {
                    console.error("Erro ao carregar os dados:", error);
                }
            });
        }

    })
});
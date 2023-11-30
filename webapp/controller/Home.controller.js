sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/browserorders/model/models",
    "com/lab2dev/browserorders/model/formatter",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
    
],
     /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, models, formatter, MessageToast, Filter, FilterOperator) {
        "use strict";

    return Controller.extend("com.lab2dev.browserorders.controller.Home", {
        formatter: formatter,
        onInit: function() {
            // passar o params no getProducts 
            // const params = {
            //     urlParameters: {
            //         $expand: "Order_Details, Customer, Employee"
            //     }
            // }

            const products = models.getProducts()
            
                products
                    .then((aOrders) => {
                        var oModel = new JSONModel({
                            Orders: aOrders,
                            count: aOrders.length
                        })

                        this.getView().setModel(oModel)
                        
                    })
                    .catch((sError) => {
                        var msg = sError
                        MessageToast.show(msg);
                    })
        },
        onPress: function (oEvent) {
            const sOrderIndex = oEvent.getSource().getBindingContextPath().split('/')[2]
            const oOrderData = this.getView().getModel().getData().Orders[sOrderIndex]
            const orderID = oOrderData.OrderID
            this.getOwnerComponent().getRouter().navTo("ProductDetail", {orderID})
        },
        onSearch: function (oEvent) {
            var aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
              aFilter.push(new Filter("ShipName", FilterOperator.Contains, sQuery));
            }
            const oTable = this.byId("List");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        }
    })
});
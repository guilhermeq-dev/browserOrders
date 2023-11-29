sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/browserorders/model/models",
    "com/lab2dev/browserorders/model/formatter",
    "sap/m/MessageToast"
],
     /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, JSONModel, models, formatter, MessageToast) {
        "use strict";

    return Controller.extend("com.lab2dev.browserorders.controller.Home", {
        formatter: formatter,
        onInit: function() {
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
        onPress: function() {
            this.getOwnerComponent().getRouter().navTo("ProductDetail")
        }
    })
});
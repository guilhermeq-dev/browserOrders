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

		return Controller.extend("com.lab2dev.browserorders.controller.ProductDetail", {
		
		formatter: formatter,
			
        onInit: function() {
            
			this.oRouter = this.getOwnerComponent().getRouter();

			this.oRouter.getRoute("ProductDetail").attachPatternMatched(this._onRouteMatched, this)

            this._params = {
                urlParameters: {
                    $expand: "Order_Details/Product,Customer,Employee"
                }
            }

            // const products = models.getProducts(params)
            
            //     products
            //         .then((aOrders) => {
            //             var oModel = new JSONModel({
            //                 Orders: aOrders,
            //                 count: aOrders.length
            //             })

            //             this.getView().setModel(oModel)
                        
            //         })
            //         .catch((sError) => {
            //             var msg = sError
            //             MessageToast.show(msg);
            //         })
		},
		_onRouteMatched: function (oEvent) {
			const oArguments = oEvent.getParameter("arguments")

			const order = models.getOrderData(oArguments.orderID, this._params)

			order
				.then((oOrders) => {
					var oModel = new JSONModel({
						...oOrders,
					})
					
                    this.getView().setModel(oModel)
				})
		}
    })
});
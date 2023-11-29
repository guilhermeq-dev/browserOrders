sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (ODataModel, JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            getODataModel: function () {
                var oModel = new ODataModel("/northwind/northwind.svc/");

                return new Promise(function (resolve, reject) {
                    oModel.attachMetadataLoaded(() => {
                        resolve(oModel);
                    });
                    oModel.attachMetadataFailed(() => {
                        reject("Serviço não disponível no momento. Tente novamente mais tarde.");
                    });
                });
            },

            getProducts: function () {
                var oDataModel = this.getODataModel();

                return new Promise((resolve, reject) => {
                    oDataModel
                        .then(function (oModel) {
                            oModel.read("/Orders", {
                                success: (oData) => {
                                    resolve(oData.results);
                                },
                                error: (oError) => {
                                    reject(oError);
                                }
                            });
                        })
                        .catch(function (oError) {
                            reject(oError);
                        });
                });

            }
        };
    });
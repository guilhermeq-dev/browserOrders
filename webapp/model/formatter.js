sap.ui.define(["sap/ui/core/format/DateFormat", "sap/ui/core/Locale" ], function(DateFormat, Locale) {
    "use strict";

    return {
        formatDate: function (date) {
            var oLocale = new Locale("pt-BR")
            var dateFormat = DateFormat.getDateTimeInstance({ pattern: "dd/MM/yyyy" }, oLocale).format(date);
            return dateFormat;
        },
        statusText: function (sOrderDate, sShipDate) {
            const oOrderDate = new Date(sOrderDate)
            const oShipDate = new Date(sShipDate)

            const newDate = new Date(oShipDate.getTime() - oOrderDate.getTime()).getDate()
            if (newDate <= 7) {
                return "In time"
            }
            if (newDate <= 14) {
                return "Urgent"
            }
            return "Too late"
        },
        statusState: function (sOrderDate, sShipDate) {
            const oOrderDate = new Date(sOrderDate)
            const oShipDate = new Date(sShipDate)

            const newDate = new Date(oShipDate.getTime() - oOrderDate.getTime()).getDate()
            if (newDate <= 7) {
                return "Success"
            }
            if (newDate <= 14) {
                return "Warning"
            }
            return "Error"
        },
        formatValue: function (nValue) {
            return Number.parseInt(nValue).toFixed(2)
        },
        formatTotalPrice: function (nPrice, nQuantity) {
            const values = (parseInt(nPrice) * nQuantity)
            return values.toFixed(2)
        },
        formatTextDate: function (sTextDate) {
            return new Date(sTextDate).toLocaleDateString("en-us",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })
        },
    };
});
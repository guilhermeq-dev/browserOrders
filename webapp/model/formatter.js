sap.ui.define(["sap/ui/core/format/DateFormat"], function(DateFormat) {
    "use strict";

    return {
        formatDate: function(date) {
            var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ pattern: "MM/dd/yy" });
            return dateFormat.format(date);
        }
    };
});
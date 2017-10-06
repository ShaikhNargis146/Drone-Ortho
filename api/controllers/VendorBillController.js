module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getBill: function (req, res) {
        if (req.body) {
            VendorBill.getBill(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    //-----report api----//

    totalCadRequest: function (req, res) {
        if (req.body) {
            VendorBill.totalCadRequest(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    droneSales: function (req, res) {
        if (req.body) {
            VendorBill.droneSales(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    dfmSales: function (req, res) {
        if (req.body) {
            VendorBill.dfmSales(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    allDfmSub: function (req, res) {
        if (req.body) {
            VendorBill.activeDfmSub(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    vendorBill: function (req, res) {
        if (req.body) {
            VendorBill.vendorBill(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },
};
module.exports = _.assign(module.exports, controller);
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

    testapi: function (req, res) {
        if (req.body) {
            VendorBill.testapi(req.body, res.callback);
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

    exceltotalCadRequest: function (req, res) {
        // if (req.body) {
        VendorBill.exceltotalCadRequest(req.body, function (err, data) {
            VendorBill.generateExcelCad(data, function (err, singleData) {
                Config.generateExcel("CadExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
        // } else {
        //     res.json({
        //         value: false,
        //         data: {
        //             message: "Invalid Request"
        //         }
        //     });
        // }
    },

    cadRevenue: function (req, res) {
        // if (req.body) {
        VendorBill.cadRevenue(req.body, function (err, data) {
            VendorBill.generateExcelCadRevenue(data, function (err, singleData) {
                Config.generateExcel("CadRevenueExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
        // } else {
        //     res.json({
        //         value: false,
        //         data: {
        //             message: "Invalid Request"
        //         }
        //     });
        // }
    },

    droneSales: function (req, res) {
        // if (req.body) {
        VendorBill.droneSales(req.body, function (err, data) {
            VendorBill.generateExcelDroneSales(data, function (err, singleData) {
                Config.generateExcel("DroneSalesExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
        // } else {
        //     res.json({
        //         value: false,
        //         data: {
        //             message: "Invalid Request"
        //         }
        //     });
        // }
    },

    dfmSales: function (req, res) {
        // if (req.body) {
        VendorBill.dfmSales(req.body, function (err, data) {
            VendorBill.generateExcelDfmSales(data, function (err, singleData) {
                Config.generateExcel("DfmSalesExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
        // } else {
        //     res.json({
        //         value: false,
        //         data: {
        //             message: "Invalid Request"
        //         }
        //     });
        // }
    },

    allDfmSub: function (req, res) {
        // if (req.body) {
        VendorBill.allDfmSub(req.body, function (err, data) {
            VendorBill.generateExcelDfm(data, function (err, singleData) {
                Config.generateExcel("DfmExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
        // } else {
        //     res.json({
        //         value: false,
        //         data: {
        //             message: "Invalid Request"
        //         }
        //     });
        // }
    },

    vendorBill: function (req, res) {
        // if (req.body) {
        VendorBill.vendorBill(req.body, function (err, data) {
            VendorBill.generateExcelVendorBill(data, function (err, singleData) {
                Config.generateExcel("VendorBillExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
        // } else {
        //     res.json({
        //         value: false,
        //         data: {
        //             message: "Invalid Request"
        //         }
        //     });
        // }
    },
};
module.exports = _.assign(module.exports, controller);
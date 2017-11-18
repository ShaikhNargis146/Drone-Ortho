module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    generatecsv: function (req, res) {
        VendorBill.exceltotalVendorBill(req.body, function (err, data) {
            data.name = "vendorbill"
            Config.jsonTOCsvConvert(data, function (csv) {
                _.cloneDeep(csv);
                console.log("CSV", csv)
                res.set('Content-Type', "application/CSV");
                res.set('Content-Disposition', "attachment;filename=" + csv.path);
                res.send(csv.csvData);
            });
        });
    },
    generatePdf: function (req, res) {
        VendorBill.exceltotalVendorBill(req.body, function (err, data) {
            data.name = "vendorbill"
            Config.generatePdfFormatData(data, function (pdf) {
                _.cloneDeep(pdf);
                console.log("pdf", pdf)
                res.set('Content-Type', "application/pdf");
                res.set('Content-Disposition', "attachment;filename=" + pdf.path);
                res.send(pdf.pdfData);
            });
        });
    },
    exceltotalVendorBill: function (req, res) {
        VendorBill.exceltotalVendorBill(req.body, function (err, data) {
            VendorBill.generateExcelVendorBills(data, function (err, singleData) {
                Config.generateExcel("MissionExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
    },


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

    exceltotalMission: function (req, res) {
        VendorBill.exceltotalMission(req.body, function (err, data) {
            VendorBill.generateExcelMission(data, function (err, singleData) {
                Config.generateExcel("MissionExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
    },

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
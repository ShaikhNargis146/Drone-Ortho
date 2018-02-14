var schema = new Schema({
    cad: {
        type: Schema.Types.ObjectId,
        ref: 'CadLineWork',
        index: true
    },
    vendorBillId: String,
    vendorCharges: String,
    paidAmount: String,
    balance: String,
    Advance: String,
    paymentStatus: String,
    PaymentDate: Date,
    paymentMode: String,
    additionalInfo: String
});

schema.plugin(deepPopulate, {
    Populate: {
        'cad': {
            select: ''
        },
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('VendorBill', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "cad cad.mission cad.vendor", "cad cad.mission cad.vendor"));
var model = {

    exceltotalVendorBill: function (data, callback) {
        VendorBill.find({}).deepPopulate('cad cad.mission cad.vendor').exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelVendorBills: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                console.log("concatSeries", mainData);
                console.log("concatSeries", mainData.earning)
                var obj = {};
                if (mainData.cad.mission) {
                    obj["MISSION ID"] = mainData.cad.mission.missionId;
                } else {
                    obj["MISSION ID"] = "-";
                }
                if (mainData.cad.vendor) {
                    obj["VENDOR BILLING ID"] = mainData.cad.vendor.dataId;
                } else {
                    obj["VENDOR BILLING ID"] = "-";
                }
                if (mainData.cad) {
                    obj["Earning "] = mainData.cad.vendorCharges;
                } else {
                    obj["Earning "] = "-";
                }

                obj[" PAYMENT STATUS"] = mainData.paymentStatus;
                obj["ADDITIONAL INFORMATION"] = mainData.additionalInfo;
                obj["BILL DATE "] = moment(mainData.createdAt).format("DD/MM/YYYY")
                obj["PAID AMOUNT"] = mainData.paidAmount;
                if (mainData.cad) {
                    if (mainData.cad.vendorCharges > mainData.paidAmount) {
                        obj["BALANCE AMOUNT"] = mainData.cad.vendorCharges - mainData.paidAmount;
                    } else {
                        obj["BALANCE AMOUNT"] = "-";
                    }
                    if (mainData.cad.vendorCharges < mainData.paidAmount) {
                        obj["OUTSTANDING AMOUNT"] = mainData.cad.vendorCharges - mainData.cad.vendorCharges;
                    } else {
                        obj["OUTSTANDING AMOUNT"] = "-";
                    }
                } else {
                    obj["BALANCE AMOUNT"] = "-";
                    obj["OUTSTANDING AMOUNT"] = "-";
                }

                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    getBill: function (data, callback) {
        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        VendorBill.find({})
            .deepPopulate("cad cad.mission cad.vendor")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    testapi: function (data, callback) {
        ProductOrders.find({
            "dfmSubscription": {
                $exists: true
            }
        }).deepPopulate("products user cadLineWork dfmSubscription").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    //----------------report api-------------//

    //############## excel download##########//

    exceltotalMission: function (data, callback) {
        Mission.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            }
        }).deepPopulate("user DFMSubscription").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelMission: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["MISSION ID"] = mainData.missionId;
                if (mainData.user) {
                    obj["USER ID"] = mainData.user.dataId;
                } else {
                    obj["USER ID"] = "-";
                }

                obj["MISSION NAME"] = mainData.name;
                obj["STATUS"] = mainData.status;
                obj[" DATE"] = moment(mainData.createdAt).format("DD/MM/YYYY")
                if (mainData.cadline[0]) {
                    obj["CAD REQUEST"] = "Yes";
                } else {
                    obj["CAD REQUEST"] = "No";
                }
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    exceltotalCadRequest: function (data, callback) {
        CadLineWork.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            }
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelCad: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["CAD ID"] = mainData.cadId;
                obj["STATUS"] = mainData.status;
                obj["NAME"] = mainData.cadLineName;
                obj["CONTOURS"] = mainData.contours;
                obj["ACREAGE"] = mainData.acreage;
                obj["AMOUNT"] = mainData.amount;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    cadRevenue: function (data, callback) {
        ProductOrders.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            },
            "cadLineWork": {
                $exists: true
            },
            status: 'Paid'
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    generateExcelCadRevenue: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["CAD ID"] = mainData.cadId;
                obj["STATUS"] = mainData.status;
                if (mainData.user) {
                    obj["USER NAME"] = mainData.user.name;
                } else {
                    obj["USER NAME"] = "-";
                }
                obj["CONTOURS"] = mainData.contours;
                obj["ACREAGE"] = mainData.acreage;
                obj["AMOUNT"] = mainData.amount;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    droneSales: function (data, callback) {
        ProductOrders.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            },
            "products": {
                $exists: true,
                $ne: []
            }
        }).deepPopulate("products user cadLineWork dfmSubscription").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    generateExcelDroneSales: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["INVOICE NUMBER"] = mainData.invoiceNo;
                obj["STATUS"] = mainData.status;
                if (mainData.user) {
                    obj["USER NAME"] = mainData.user.name;
                } else {
                    obj["USER NAME"] = "-";
                }
                obj["TAX AMOUNT"] = mainData.taxAmount;
                obj["SHIPPING AMOUNT"] = mainData.shippingAmount;
                obj["DISCOUNT AMOUNT"] = mainData.discountAmount;
                obj["TOTAL AMOUNT"] = mainData.totalAmount;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    dfmSales: function (data, callback) {
        ProductOrders.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            },
            "dfmSubscription": {
                $exists: true
            }
        }).deepPopulate("products user cadLineWork dfmSubscription").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    generateExcelDfmSales: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["INVOICE NUMBER"] = mainData.invoiceNo;
                obj["STATUS"] = mainData.status;
                if (mainData.user) {
                    obj["USER NAME"] = mainData.user.name;
                } else {
                    obj["USER NAME"] = "-";
                }
                if (mainData.dfmSubscription) {
                    obj["DFM NAME"] = mainData.dfmSubscription.name;
                } else {
                    obj["DFM NAME"] = "-";
                }

                obj["TAX AMOUNT"] = mainData.taxAmount;
                obj["SHIPPING AMOUNT"] = mainData.shippingAmount;
                obj["DISCOUNT AMOUNT"] = mainData.discountAmount;
                obj["TOTAL AMOUNT"] = mainData.totalAmount;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    allDfmSub: function (data, callback) {
        DFMSubscription.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            }
        }).deepPopulate("user discountCoupon").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelDfm: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                if (mainData.user) {
                    obj["USER NAME"] = mainData.user.name;
                } else {
                    obj["USER NAME"] = "-";
                }
                obj["EXPIRY DATE"] = mainData.expiryDate;
                obj["DISCOUNT AMOUNT"] = mainData.DiscountAmount;
                obj["MOSAIC"] = mainData.Mosaic;
                obj["UPLOAD SIZE"] = mainData.UploadSize;
                obj["MISSIONS"] = mainData.missions;
                obj["STATUS"] = mainData.status;
                obj["AMOUNT"] = mainData.amount;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    vendorBill: function (data, callback) {
        VendorBill.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            }
        }).deepPopulate("cad").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelVendorBill: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["PAYMENT MODE"] = mainData.paymentMode;
                obj["PAID AMOUNT"] = mainData.paidAmount;
                obj["ADDITIONAL INFO"] = mainData.additionalInfo;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });
    },

    //############## excel download End##########//

    //----------------report api end-------------//
};
module.exports = _.assign(module.exports, exports, model);
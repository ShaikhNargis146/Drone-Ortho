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

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "cad", "cad"));
var model = {

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
            .deepPopulate("cad")
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

    //----------------report api-------------//

    //############## pending need to be done excel download##########//

    exceltotalCadRequest: function (data, res) {
        async.waterfall([
                function (callback) {
                    CadLineWork.find({
                        // createdAt: {
                        //     $gte: data.fromDate,
                        //     $lte: data.toDate
                        // }
                    }).exec(function (err, data) {
                        if (err || _.isEmpty(data)) {
                            callback(err, [])
                        } else {
                            callback(null, data)
                        }
                    })
                },
                function (match, callback) {
                    VendorBill.generateExcelCad(match, function (err, singleData) {
                        Config.generateExcel("CadExcel", singleData, res);
                    });
                },
            ],
            function (err, excelData) {
                if (err || _.isEmpty(excelData)) {
                    callback(err, [])
                } else {
                    callback(null, excelData)
                }
            });
    },

    generateExcelCad: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["CAD ID"] = mainData.cadId;
                obj["STATUS"] = mainData.status;
                obj["NAME"] = mainData.name;
                obj["CONTOURS"] = mainData.contours;
                obj["ACREAGE"] = mainData.acreage;
                obj["AMOUNT"] = mainData.amount;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    //#####################
    cadRevenue: function (data, callback) {
        ProductOrders.find({
            "cadLineWork": {
                $exists: true,
                $ne: []
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

    droneSales: function (data, callback) {
        ProductOrders.find({
            "products": {
                $exists: true,
                $ne: []
            }
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    dfmSales: function (data, callback) {
        ProductOrders.find({
            "dfmSubscription": {
                $exists: true,
                $ne: []
            }
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    allDfmSub: function (data, callback) {
        DFMSubscription.find({
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

    vendorBill: function (data, callback) {
        VendorBill.find({
            createdAt: {
                $gte: data.fromDate,
                $lte: data.toDate
            }
        }, function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    }

    //----------------report api end-------------//
};
module.exports = _.assign(module.exports, exports, model);
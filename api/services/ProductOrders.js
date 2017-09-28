var schema = new Schema({
    name: String,
    lname: String,
    phonenumber: String,
    email: {
        type: String,
        validate: validators.isEmail(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    cadLineWork: {
        type: Schema.Types.ObjectId,
        ref: 'CadLineWork',
        index: true
    },
    dfmSubscription: {
        type: Schema.Types.ObjectId,
        ref: 'DFMSubscription',
        index: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products',
        index: true
    }],
    totalAmount: {
        type: Number,
        default: 0
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    discountCoupon: String,
    shippingAmount: {
        type: Number,
        default: 0
    },
    billingAddress: {
        address: String,
        streetAddress: String,
        landmark: String,
        city: String,
        zip: String,
        state: String,
        country: String
    },
    shippingAddress: {
        address: String,
        streetAddress: String,
        landmark: String,
        city: String,
        zip: String,
        state: String,
        country: String
    },
    taxAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Processing"
    },
    pdf: String,
    invoiceNo: String,
    trackingCode: String,
    oraganization: String,
    apartment: String
});



schema.plugin(deepPopulate, {
    populate: {
        products: {
            select: ""
        },
        user: {
            select: ""
        },
        cadLineWork: {
            select: ""
        },
        dfmSubscription: {
            select: ""
        }
    }
});
schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ProductOrders', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "products user cadLineWork dfmSubscription", "products user cadLineWork dfmSubscription"));
var model = {

    invoiceGenerate: function (data, callback) {
        async.waterfall([
                function (callback) {
                    ProductOrders.findOne({
                        invoiceNo: data.invoiceNo
                    }).exec(function (err, data) {
                        if (err || _.isEmpty(data)) {
                            callback(err, [])
                        } else {
                            callback(null, data);
                        }
                    })
                },
                function (complete, callback) {
                    Config.generatePdf(complete, function (err, data) {
                        if (err) {
                            // console.log(err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(data)) {
                                callback(err, null);
                            } else {
                                callback(null, data);
                            }
                        }
                    })
                },
                function (pdfData, callback) {
                    ProductOrders.update({
                        _id: pdfData.id
                    }, {
                        $set: {
                            pdf: pdfData.name
                        }
                    }).exec(function (err, found) {
                        if (err) {
                            callback(err, null);
                        } else if (_.isEmpty(found)) {
                            callback(null, "noDataound");
                        } else {
                            callback(null, found);
                        }

                    });
                },
            ],
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err, []);

                } else {
                    console.log("final result is ****", result)
                    callback(null, result);
                }
            });
    },

    getProductOrders: function (data, callback) {
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
        ProductOrders.find({})
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    //for user

    getProductData: function (data, callback) {
        console.log("inside get getProductData api", data)
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
        ProductOrders.find({
                user: data.user
            })
            .deepPopulate("serviceId user DFMSubscription products cadLineWork dfmSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    console.log("inside paggingtion ProductOrders file", found)
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    //for user end

    invoiceNumberGenerate: function (data, callback) {
        ProductOrders.find({}).sort({
            createdAt: -1
        }).limit(1).deepPopulate('products user cadLineWork dfmSubscription').exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    var year = new Date().getFullYear().toString().substr(-2);
                    var month = new Date().getMonth() + 1;
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var invoiceNumber = "INV" + year + month + "-" + "1";
                    } else if (m == 2) {
                        var invoiceNumber = "INV" + year + month + "-" + "1";
                    }
                    callback(null, invoiceNumber);
                } else {
                    if (!found[0].invoiceNo) {
                        var year = new Date().getFullYear().toString().substr(-2);
                        var month = new Date().getMonth() + 1;
                        var m = month.toString().length;
                        if (m == 1) {
                            month = "0" + month
                            var invoiceNumber = "INV" + year + month + "-" + "1";
                        } else if (m == 2) {
                            var invoiceNumber = "INV" + year + month + "-" + "1";
                        }
                        callback(null, invoiceNumber);
                    } else {
                        var invoiceData = found[0].invoiceNo.split("-");
                        var num = parseInt(invoiceData[1]);
                        var nextNum = num + 1;
                        var year = new Date().getFullYear().toString().substr(-2);
                        var month = new Date().getMonth() + 1;
                        var m = month.toString().length;
                        if (m == 1) {
                            month = "0" + month
                            var invoiceNumber = "INV" + year + month + "-" + nextNum;
                        } else if (m == 2) {
                            var invoiceNumber = "INV" + year + month + "-" + nextNum;
                        }
                        callback(null, invoiceNumber);
                    }
                }
            }
        });
    },

    createInvoice: function (data, callback) {
        async.waterfall([
            function (callback) { // generate invoice id
                ProductOrders.invoiceNumberGenerate(data, function (err, data1) {
                    callback(null, data1);
                })
            },
            function (invoiceID, callback) { //save invoice
                data.invoiceNo = invoiceID;
                ProductOrders.saveData(data, function (err, data2) {
                    if (err || _.isEmpty(data2)) {
                        callback(err, [])
                    } else {
                        callback(null, data2)
                    }
                })
            }
        ], function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },


};
module.exports = _.assign(module.exports, exports, model);
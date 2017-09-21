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
    transactionNo: String,
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

   getProductData: function (data, callback) {
     console.log("inside get ticket api",data)
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
            user:data.user
        })
            .deepPopulate("serviceId user DFMSubscription cadLineWork dfmSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    console.log("inside paggingtion ProductOrders file",found)
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

    getuser: function (data, callback) {
        console.log("data is******", data)

        ProductOrders.findOne({
            user: data.user
        }).deepPopulate("products user cadLineWork dfmSubscription").exec(function (err, found) {
            if (err) {
                console.log("inside error");
                callback(err, null);
            } else if (_.isEmpty(found)) {
                console.log("isemapty")
                callback(null, "noDataound");
            } else {
                console.log("found", found)
                callback(null, found);
            }

        });
    },
    invoiceGenerate: function (data, callback) {
        async.waterfall([
                function (callback) {
                    console.log("data", data);
                    ProductOrders.saveData(data, function (err, complete) {
                        if (err || _.isEmpty(complete)) {
                            callback(err, []);
                        } else {
                            callback(null, complete);
                        }
                    });
                },
                function (complete, callback) {
                    console.log("complete", complete);
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
                    console.log("pdfData", pdfData);
                    ProductOrders.update({
                        _id: pdfData.id
                    }, {
                        $set: {
                            pdf: pdfData.name
                        }
                    }).exec(function (err, found) {
                        if (err) {
                            console.log("inside error");
                            callback(err, null);
                        } else if (_.isEmpty(found)) {
                            console.log("isemapty")
                            callback(null, "noDataound");
                        } else {
                            console.log("found", found)
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
        ProductOrder.find({})
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

};
module.exports = _.assign(module.exports, exports, model);
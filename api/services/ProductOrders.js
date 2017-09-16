var schema = new Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    email: {
        type: String,
        validate: validators.isEmail(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    transactionNo: String,
    trackingCode: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ProductOrders', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {



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
                }
            ],
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    callback(err, []);
                } else {
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
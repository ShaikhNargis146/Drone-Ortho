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
};
module.exports = _.assign(module.exports, exports, model);
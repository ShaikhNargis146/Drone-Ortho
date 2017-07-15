var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    expiryDate: Date,
    amount: {
        type: Number,
        default: 0
    },
    transactionDate: Date,
    transactionId: String,
    plan: [{
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        index: true
    }],
    DiscountAmount: {
        type: Number,
        default: 0
    },
    discountCoupon: {
        type: Schema.Types.ObjectId,
        ref: 'CouponCode',
        index: true
    },
    status: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DFMSubscription', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user plan discountCoupon", "user plan discountCoupon"));
var model = {};
module.exports = _.assign(module.exports, exports, model);
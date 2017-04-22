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
var model = {};
module.exports = _.assign(module.exports, exports, model);
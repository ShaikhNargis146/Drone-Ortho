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

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('VendorBill', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
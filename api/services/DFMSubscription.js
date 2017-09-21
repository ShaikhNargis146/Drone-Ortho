var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    expiryDate: Date,
    transactionDate: Date,

    amount: {
        type: Number,
        default: 0
    },
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
    status: String,
    autoRenewal: Boolean,
    emailReminder: Boolean,
    upgradeEmail: Boolean,
    manualActivation: Boolean,
    invitations: String,
    missions: String,
    UploadPhoto: String,
    UploadSize: String,
    MosaicPerMonth: String,
    Mosaic: String,
    missionsResolution: String,
    exportKMZ: String,
    exportOrthophoto: String,
    exportDEM: String,
    exportPointCloud: String,
    unlimitedUsedApps: String,
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DFMSubscription', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "plan user", "plan user"));
var model = {

    getDfm: function (data, callback) {
        console.log('inside dfm', data)
        DFMSubscription.findOne({
            user: data.user
        }, function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (found) {
                    console.log("FOund*************", found)
                    callback(null, found);
                } else {
                    callback({
                        message: "Something went wrong!"
                    }, null);
                }
            }
        });
    },

    getByUser: function (data, callback) {
        this.find({
            "user": data.user
        }, function (err, dataF) {
            if (err) {
                callback(err, null);
            } else {
                if (dataF) {
                    callback(null, dataF);
                } else {
                    callback({
                        message: "Something went wrong!"
                    }, null);
                }
            }
        });
    },
};

module.exports = _.assign(module.exports, exports, model);
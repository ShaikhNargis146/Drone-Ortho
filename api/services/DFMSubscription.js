var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    expiryDate: Date,
    transactionDate: Date,
    name: String,
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
    status: {
        type: String,
        default: "Processing",
        enum: ['Processing', 'Qc', 'Completed', 'cancelled']
    },
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

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: ''
        },
        'discountCoupon': {
            select: ''
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DFMSubscription', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user discountCoupon", "discountCoupon user"));
var model = {

    getDfm: function (data, callback) {
        DFMSubscription.findOne({
            user: data.user
        }).sort({
            createdAt: -1
        }).limit(1).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (found) {
                    User.UpdateUserDfm(found, callback)
                } else {
                    callback({
                        message: "Something went wrong!"
                    }, null);
                }
            }
        });
    },

    getByUser: function (data, callback) {
        this.findOne({
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
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
        type: String,
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
        default: "Inactive",
        enum: ['Active', 'Inactive'] // enum: ['Processing', 'Qc', 'Completed', 'cancelled']
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


    sendDfmRenewalMail: function (data, callback) {
        User.findOne({
            _id: data.user
        }).exec(function (err, data1) {
            if (err) {
                //callback(err, null);
            } else if (data1) {
                var emailData = {}
                emailData.email = data1.email;
                emailData.filename = "DFM Renewal";
                emailData.subject = "DFM EXPIRE";
                Config.email(emailData, function (err, emailRespo) {
                    // console.log("emailRespo", emailRespo);
                    if (err) {
                        console.log(err);
                        //callback(err, null);
                    } else if (emailRespo) {
                        //callback(null, "Contact us form saved successfully!!!");
                    } else {
                        // callback("Invalid data", null);
                    }
                });
            } else {
                // callback("Invalid data", null);
            }
        });
    },

    //auto renewal

    arbSubReqest: function (data, callback) {
        console.log("Inside arbsubRequest");
        async.waterfall([
            function (callback) {
                DFMSubscription.findOneAndUpdate({
                    _id: data._id
                }, {
                    autoRenewal: true
                }, {
                    new: true
                }).exec(function (err, data) {
                    if (err || _.isEmpty(data)) {
                        console.log("Inside arbsubRequest W1---", err);
                        callback(err, []);
                    } else {
                        console.log("Inside arbsubRequestW1---", data);
                        callback(null, data);
                    }
                });
            },
            function (transactionIdData, callback) {
                var sendData = {};
                sendData.transactionid = transactionIdData.transactionId;
                ProductOrders.recursivePayment(sendData, function (err, data) {
                    if (err || _.isEmpty(data)) {
                        callback(err, []);
                        console.log("Inside arbsubRequest W2---", err);
                    } else {
                        callback(null, data);
                        console.log("Inside arbsubRequestW2---", data);
                    }
                });
            }
        ], function (err, results) {
            if (err || _.isEmpty(results)) {
                console.log("ERRRR", err)
                callback(err);
            } else {
                console.log("Success", results)
                callback(null, results);
            }
        });
    },

    arbSubCancelReqest: function (data, callback) {
        async.waterfall([
            function (callback) {
                DFMSubscription.findOneAndUpdate({
                    _id: data._id
                }, {
                    autoRenewal: false
                }, {
                    new: true
                }).exec(function (err, data) {
                    if (err || _.isEmpty(data)) {
                        callback(err, []);
                    } else {
                        callback(null, data);
                    }
                });
            },
            function (dfmData, callback) {
                ProductOrders.findOne({
                    transactionId: dfmData.transactionId
                }).exec(function (err, data) {
                    if (err || _.isEmpty(data)) {
                        callback(err, []);
                    } else {
                        callback(null, data);
                    }
                });
            },
            function (transactionIdData, callback) {
                var sendData = {};
                sendData.subId = transactionIdData.paymentResponseForArbSub.subscriptionId;
                ProductOrders.cancelSubscription(sendData, callback);
            }
        ], function (err, results) {
            if (err || _.isEmpty(results)) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
};

module.exports = _.assign(module.exports, exports, model);
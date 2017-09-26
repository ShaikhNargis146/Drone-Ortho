URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String,

    },
    userName: String,
    lastName: {
        type: String,
    },
    email: {
        type: String,
        validate: validators.isEmail(),
        excel: "User Email"
    },
    organization: {
        type: String,
        default: ""
    },
    designation: {
        type: String,
        default: ""
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zip: {
        type: String,
    },
    website: {
        type: String,
    },
    lisence: {
        type: String,
    },
    drone: {
        type: String,
    },
    cardDetails: [{
        cardType: String,
        cardNumber: String,
        securityCode: String,
        nameOnCard: String
    }],
    cartProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Products',
        index: true
    }],
    cart: {
        totalAmount: String,
        DiscountAmount: String,
        discountCoupon: String
    },
    currentSubscription: {
        type: Schema.Types.ObjectId,
        ref: 'DFMSubscription'
    },
    dob: {
        type: Date,
        excel: {
            name: "Birthday",
            modify: function (val, data) {
                return moment(val).format("MMM DD YYYY");
            }
        }
    },
    photo: {
        type: String,

    },
    password: {
        type: String,
        default: ""
    },
    forgotPassword: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
        default: ""
    },
    accessToken: {
        type: [String]
    },
    accessLevel: {
        type: String,
        enum: ["Admin", "User", "Vendor"],
        default: "User"

    },
    googleAccessToken: String,
    googleRefreshToken: String,
    oauthLogin: {
        type: [{
            socialId: String,
            socialProvider: String
        }]
    },

});


schema.plugin(deepPopulate, {
    Populate: {
        'cartProducts': {
            select: '_id name'
        },
        'currentSubscription.plan': {
            select: '_id name'
        }

    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(URLSlugs('name', {
    field: 'myslug'
}));

module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "cartProducts currentSubscription.plan", "cartProducts currentSubscription.plan"));
var model = {

    //----------------------Start----------------------//
    getUser: function (data, callback) {
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
        User.find({})
            .deepPopulate("serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    console.log("inside paggingtion cadline file", found)
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

    getVendor: function (data, callback) {
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
        User.find({
                accessLevel: 'Vendor'
            })
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

    updateVendorData: function (data, callback) {
        User.update({
            _id: data._id
        }, {
            password: md5(data.password),
            name: data.name,
            userName: data.userName,
            email: data.email,
            address: data.address,
            mobile: data.mobile
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    //----------------------End----------------------//

    UpdateUserDfm: function (data, callback) {
        console.log("inside update User DFM", data)
        User.update({
            _id: data.user
        }, {
            $set: {
                currentSubscription: data._id
            }
        }).deepPopulate("currentSubscription").exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {
                callback(null, found);
            }

        });
    },

    getByDfm: function (data, callback) {
        console.log("inside getbyDfm", data)
        User.findOne({
            _id: data.user
        }).deepPopulate("currentSubscription currentSubscription.plan").exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {
                console.log("inside getby dfm")
                callback(null, found);
            }

        });
    },

    addCardDetails: function (data, callback) {
        console.log("data inside addCardDetails: ", data);
        User.update({
            _id: mongoose.Types.ObjectId(data._id)
        }, {
            $push: {
                'cardDetails': {
                    cardType: data.cardType,
                    cardNumber: data.cardNumber,
                    securityCode: data.securityCode,
                    nameOnCard: data.nameOnCard
                }
            }
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback("noDataound", null);
            } else {
                callback(null, found);
            }

        });
    },

    Updatepassword: function (data, callback) {

        User.update({
            _id: mongoose.Types.ObjectId(data._id)
        }, {
            $set: {
                password: md5(data.password)
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

    Updateuser: function (data, callback) {
        console.log("data is******", data)

        User.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(data._id)
        }, {
            $set: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                password: data.password
            }
        }, {
            new: true
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
    doLogin: function (data, callback) {
        console.log("data", data)
        User.findOne({
            name: data.name,
            password: md5(data.password)
        }).exec(function (err, found) {
            if (err) {

                callback(err, null);
            } else {
                if (found) {
                    var foundObj = found.toObject();
                    delete foundObj.password;
                    callback(null, foundObj);
                } else {
                    callback({
                        message: "Incorrect Credentials!"
                    }, null);
                }
            }

        });
    },

    getByUrl: function (data, callback) {
        this.findOne({
            "myslug": data.myslug
        }, function (err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
    existsSocial: function (user, callback) {
        var Model = this;
        Model.findOne({
            "oauthLogin.socialId": user.id,
            "oauthLogin.socialProvider": user.provider,
        }).exec(function (err, data) {
            if (err) {
                callback(err, data);
            } else if (_.isEmpty(data)) {
                var modelUser = {
                    name: user.displayName,
                    accessToken: [uid(16)],
                    oauthLogin: [{
                        socialId: user.id,
                        socialProvider: user.provider,
                    }]
                };
                if (user.emails && user.emails.length > 0) {
                    modelUser.email = user.emails[0].value;
                    var envEmailIndex = _.indexOf(env.emails, modelUser.email);
                    if (envEmailIndex >= 0) {
                        modelUser.accessLevel = "Admin";
                    }
                }
                modelUser.googleAccessToken = user.googleAccessToken;
                modelUser.googleRefreshToken = user.googleRefreshToken;
                if (user.image && user.image.url) {
                    modelUser.photo = user.image.url;
                }
                Model.saveData(modelUser, function (err, data2) {
                    if (err) {
                        callback(err, data2);
                    } else {
                        data3 = data2.toObject();
                        delete data3.oauthLogin;
                        delete data3.password;
                        delete data3.forgotPassword;
                        delete data3.otp;
                        callback(err, data3);
                    }
                });
            } else {
                delete data.oauthLogin;
                delete data.password;
                delete data.forgotPassword;
                delete data.otp;
                data.googleAccessToken = user.googleAccessToken;
                data.save(function () {});
                callback(err, data);
            }
        });
    },
    registerUser: function (data, callback) {
        var user = this(data);
        user.accessToken = [uid(16)];
        user.password = md5(user.password);
        if (user.drone) {
            user.lisence = "NDB";
        } else {
            user.lisence = "UDB";
        }
        user.save(function (err, created) {
            if (err) {
                callback(err, null);
            } else if (created) {
                callback(null, created);
            } else {
                callback(null, {});
            }
        });
    },
    profile: function (data, callback, getGoogle) {
        var str = "firstName email photo mobile accessLevel";
        if (getGoogle) {
            str += " googleAccessToken googleRefreshToken";
        }
        User.findOne({
            accessToken: data.accessToken
        }, str).exec(function (err, data) {
            if (err) {
                callback(err);
            } else if (data) {
                callback(null, data);
            } else {
                callback("No Data Found", data);
            }
        });
    },
    updateAccessToken: function (id, accessToken) {
        User.findOne({
            "_id": id
        }).exec(function (err, data) {
            data.googleAccessToken = accessToken;
            data.save(function () {});
        });
    },
    getcart: function (data, callback) {
        this.findOne({
            "_id": data._id
        }, function (err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        }).populate('cartProducts');
    },

};
module.exports = _.assign(module.exports, exports, model);
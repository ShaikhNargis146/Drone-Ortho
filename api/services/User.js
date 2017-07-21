URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String,

    },
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
    accessLevel:{
        type:String,
        enum:["Admin","User"],
        default:"User"

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
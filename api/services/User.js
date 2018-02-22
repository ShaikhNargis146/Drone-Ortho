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
        excel: "User Email",
        unique: true
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
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            index: true
        },
        qty: Number
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
    status: String,
    googleAccessToken: String,
    googleRefreshToken: String,
    oauthLogin: {
        type: [{
            socialId: String,
            socialProvider: String
        }]
    },
    dataId: String
});


schema.plugin(deepPopulate, {
    Populate: {
        'cartProducts': {
            select: '_id name'
        },
        'currentSubscription': {
            select: ''
        }

    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
schema.plugin(URLSlugs('name', {
    field: 'myslug'
}));

module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    exceltotalUser: function (data, callback) {
        User.find({}).deepPopulate("currentSubscription").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelUser: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["USER ID"] = mainData.dataId;
                obj["USER NAME"] = mainData.name;
                obj[" EMAIL"] = mainData.email;
                obj["DFM STATUS"] = mainData.status;
                if (mainData.currentSubscription) {
                    obj["DFM PLAN"] = mainData.currentSubscription.name
                } else {
                    obj["DFM PLAN"] = "-";
                }
                obj["LISENCE TYPE"] = mainData.lisence;
                obj["ACCESS LEVEL"] = mainData.accessLevel;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },


    exceltotalVendor: function (data, callback) {
        User.find({
            accessLevel: 'Vendor'
        }).deepPopulate().exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelVendor: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["VENDOR ID"] = mainData.dataId;
                obj["VENDOR NAME"] = mainData.name;
                obj[" EMAIL"] = mainData.email;
                obj["CONTACT NUMBER"] = mainData.mobile;
                obj["CREATED DATE"] = moment(mainData.createdAt).format("DD/MM/YYYY")
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    findUserForUpdatePass: function (data, callback) {
        async.waterfall([
            function (callback1) { // generate VendorID 
                User.findOne({
                    _id: data._id,
                    password: md5(data.currpassword),
                }).exec(function (err, data) {
                    // console.log("data is", data)
                    if (err || _.isEmpty(data)) {
                        console.log("inside isempty");
                        callback1(err, null);
                    } else {
                        // console.log("data if found true", data)
                        callback1(null, data);
                    }
                })
            },
            function (password, callback2) {
                if (password == null) {
                    callback("nodata found");
                } else {
                    User.update({
                        _id: mongoose.Types.ObjectId(password._id)
                    }, {
                        $set: {
                            password: md5(data.password)
                        }
                    }).exec(function (err, found) {
                        if (err) {
                            callback2(err, null);
                        } else if (_.isEmpty(found)) {
                            callback2(null, "noDataound");
                        } else {
                            callback2(null, found);
                        }

                    });
                }
                // console.log("insidesencod waterfall data is", data)

            }
        ], function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },





    sendOtp: function (data, callback) {
        // console.log("inside send otp", data)
        var emailOtp = (Math.random() + "").substring(2, 6);
        var foundData = {};
        User.findOneAndUpdate({
            email: data.email
        }, {
            otp: emailOtp
        }, {
            new: true
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (found) {
                    var emailData = {}
                    emailData.email = found.email;
                    // emailData.mobile = data1.mobile;
                    emailData.filename = "Forgot Password";
                    emailData.otp = found.otp;
                    emailData.subject = "NEW OTP";
                    emailData.merge_vars = [{
                        "name": "EMAIL",
                        "content": found.email
                    }, {
                        "name": "OTP",
                        "content": found.otp
                    }];

                    Config.email(emailData, function (err, emailRespo) {
                        if (err) {
                            console.log(err);
                            callback(null, err);
                        } else if (emailRespo) {
                            // foundData.otp = emailOtp;
                            // foundData.id = found._id;
                            callback(null, found);
                        } else {
                            callback(null, "Invalid data");
                        }
                    });
                    //callback(null, found);
                } else {
                    callback({
                        message: "Incorrect Credentials!"
                    }, null);
                }
            }

        });
    },

    verifyOTPForResetPass: function (data, callback) {
        User.findOne({
            otp: data.otp,
        }).exec(function (error, found) {
            if (error || found == undefined) {
                callback(error, null);
            } else {
                if (_.isEmpty(found)) {
                    callback(null, {
                        message: "No data found"
                    });
                } else {
                    callback(null, found);
                }
            }
        })
    },

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
            .deepPopulate("serviceId user DFMSubscription currentSubscription")
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

    //--------------dashboard api for admin-------------//

    getTotalUsers: function (data, callback) {
        User.find({
            "accessLevel": {
                $in: ["User", "Vendor"]
            }
        }).count().exec(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },

    getTotalDronesSold: function (data, callback) {
        ProductOrders.find({
            "products": {
                $exists: true,
                $ne: []
            }
        }).count().exec(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },

    getTotalMissions: function (data, callback) {
        Mission.find({}).count().exec(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },

    getTotalCadRequest: function (data, callback) {
        CadLineWork.find({}).count().exec(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },

    getLastTenCad: function (data, callback) {
        CadLineWork.find({}).limit(10).sort({
            createdAt: -1
        }).exec(function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },

    getCadOrderDetails: function (data, callback) {
        var currentDate = new Date();
        var dateFrom = moment(currentDate).subtract(1, 'months').startOf('month').format();
        var dateTo = moment(currentDate).subtract(1, 'months').endOf('month').format();
        var previousYear = moment(currentDate).subtract(1, 'year').format();
        var currentYear = moment(currentDate).format();
        var previousDay = moment(currentDate).subtract(1, 'days').format();
        if (data.timeData == 'Today') {
            ProductOrders.find({
                createdAt: {
                    $gte: previousDay,
                    $lte: currentDate
                }
            }).lean().select('totalAmount _id dfmSubscription products cadLineWork').exec(function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err, "noData")
                } else {
                    var finalResult = {
                        totalProductSum: 0,
                        totalCadSum: 0,
                        totalDfmSum: 0,
                        totalSum: 0
                    };
                    _.map(data, function (n) {
                        if (!_.isEmpty(n.dfmSubscription)) {
                            finalResult.totalDfmSum = finalResult.totalDfmSum + n.totalAmount;
                        } else if (!_.isEmpty(n.products)) {
                            finalResult.totalProductSum = finalResult.totalProductSum + n.totalAmount;
                        } else if (!_.isEmpty(n.cadLineWork)) {
                            finalResult.totalCadSum = finalResult.totalCadSum + n.totalAmount;
                        }
                        finalResult.totalSum = finalResult.totalSum + n.totalAmount;
                    });
                    callback(null, finalResult);
                }
            })
        } else if (data.timeData == 'Month') {
            ProductOrders.find({
                createdAt: {
                    $gte: dateFrom,
                    $lte: dateTo
                }
            }).lean().select('totalAmount _id dfmSubscription products cadLineWork').exec(function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err, "noData")
                } else {
                    var finalResult = {
                        totalProductSum: 0,
                        totalCadSum: 0,
                        totalDfmSum: 0,
                        totalSum: 0
                    };
                    _.map(data, function (n) {
                        if (!_.isEmpty(n.dfmSubscription)) {
                            finalResult.totalDfmSum = finalResult.totalDfmSum + n.totalAmount;
                        } else if (!_.isEmpty(n.products)) {
                            finalResult.totalProductSum = finalResult.totalProductSum + n.totalAmount;
                        } else if (!_.isEmpty(n.cadLineWork)) {
                            finalResult.totalCadSum = finalResult.totalCadSum + n.totalAmount;
                        }
                        finalResult.totalSum = finalResult.totalSum + n.totalAmount;
                    });
                    callback(null, finalResult);
                }
            })
        } else if (data.timeData == 'Year') {
            ProductOrders.find({
                createdAt: {
                    $gte: previousYear,
                    $lte: currentYear
                }
            }).lean().select('totalAmount _id dfmSubscription products cadLineWork').exec(function (err, data) {
                if (err || _.isEmpty(data)) {
                    callback(err, "noData")
                } else {
                    var finalResult = {
                        totalProductSum: 0,
                        totalCadSum: 0,
                        totalDfmSum: 0,
                        totalSum: 0
                    };
                    _.map(data, function (n) {
                        if (!_.isEmpty(n.dfmSubscription)) {
                            finalResult.totalDfmSum = finalResult.totalDfmSum + n.totalAmount;
                        } else if (!_.isEmpty(n.products)) {
                            finalResult.totalProductSum = finalResult.totalProductSum + n.totalAmount;
                        } else if (!_.isEmpty(n.cadLineWork)) {
                            finalResult.totalCadSum = finalResult.totalCadSum + n.totalAmount;
                        }
                        finalResult.totalSum = finalResult.totalSum + n.totalAmount;
                    });
                    callback(null, finalResult);
                }
            })
        }
    },

    getTotalProductOrdersData: function (data, callback) {
        var currentDate = new Date();
        var lastMonth = moment(currentDate).subtract(3, 'months').format();
        ProductOrders.find({
            createdAt: {
                $gte: lastMonth,
                $lte: currentDate
            }
        }).lean().select('totalAmount _id dfmSubscription products cadLineWork').exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                var count1 = 0;
                var count2 = 0;
                var count3 = 0;
                var finalResult = {
                    totalProductSum: 0,
                    totalCadSum: 0,
                    totalDfmSum: 0,
                    totalProductCount: 0,
                    totalCadCount: 0,
                    totalDfmCount: 0,
                };
                _.map(data, function (n) {
                    if (!_.isEmpty(n.dfmSubscription)) {
                        count1++;
                        finalResult.totalDfmSum = finalResult.totalDfmSum + n.totalAmount;
                        finalResult.totalDfmCount = count1;
                    } else if (!_.isEmpty(n.products)) {
                        count2++;
                        finalResult.totalProductSum = finalResult.totalProductSum + n.totalAmount;
                        finalResult.totalProductCount = count2;
                    } else if (!_.isEmpty(n.cadLineWork)) {
                        count3++;
                        finalResult.totalCadSum = finalResult.totalCadSum + n.totalAmount;
                        finalResult.totalCadCount = count3;
                    }
                });
                callback(null, finalResult);
            }
        })
    },

    //--------------dashboard api End-------------//

    //--------------dashboard api for Vendor-------------//

    getTotalCadForVendor: function (data, callback) {
        CadLineWork.find({
            vendor: data.vendorId
        }).count().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    },

    getTotalCompletedCadForVendor: function (data, callback) {
        CadLineWork.find({
            vendor: data.vendorId,
            status: 'Completed'
        }).count().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    },

    getTotalIncompletedCadForVendor: function (data, callback) {
        CadLineWork.find({
            vendor: data.vendorId,
            "status": {
                $in: ["Pending", "Processing"]
            }
        }).lean().count().exec(function (err, data) {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    },

    getTotalEarningData: function (data, callback) {
        CadLineWork.find({
            vendor: data.vendorId
        }).lean().select('amount _id').exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                var finalResult = {
                    totalAmount: 0
                };
                _.forEach(data, function (value) {
                    finalResult.totalAmount = finalResult.totalAmount + value.amount;
                });
                callback(null, finalResult);
            }
        })
    },

    getCurrentMonthCadStats: function (data, callback) {
        CadLineWork.find({
            vendor: data.vendorId
        }).lean().select('amount _id status').exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, "noData")
            } else {
                var count1 = 0;
                var count2 = 0;
                var count3 = 0;
                var count4 = 0
                var finalResult = {
                    totalProcessingCount: 0,
                    totalQcCount: 0,
                    totalCompletedCount: 0,
                    totalCancelledCount: 0
                };
                _.map(data, function (n) {
                    if (n.status == 'Processing') {
                        count1++;
                        finalResult.totalProcessingCount = count1;
                    } else if (n.status == 'Qc') {
                        count2++;
                        finalResult.totalQcCount = count2;
                    } else if (n.status == 'Completed') {
                        count3++;
                        finalResult.totalCompletedCount = count3;
                    } else if (n.status == 'cancelled') {
                        count4++;
                        finalResult.totalCancelledCount = count4;
                    }
                });

                callback(null, finalResult);
            }
        })
    },

    getCurrentMonthCadEarningStats: function (data, callback) {
        CadLineWork.find({
            vendor: data.vendorId
        }).lean().select('_id vendorPaymentStatus').exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, "noData")
            } else {
                var count1 = 0;
                var count2 = 0;
                var finalResult = {
                    totalPaidCount: 0,
                    totalOutstandingCount: 0
                };
                _.map(data, function (n) {
                    if (n.vendorPaymentStatus == 'Paid') {
                        count1++;
                        finalResult.totalPaidCount = count1;
                    } else if (n.status == 'Unpaid') {
                        count2++;
                        finalResult.totalOutstandingCount = count2;
                    }
                });
                callback(null, finalResult);
            }
        })
    },

    //--------------dashboard api  vendorEnd-------------//

    //--------------dashboard api for User-------------//

    getAllMission: function (data, callback) {
        Mission.find({
            user: data.userId
        }).count().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data);
            }
        })
    },

    getTotalCadFile: function (data, callback) {
        CadLineWork.find({
            user: data.userId
        }).count().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data);
            }
        })
    },

    getOrdersDetails: function (data, callback) {
        var currentDate = new Date();
        var currentMonthStart = moment(currentDate).startOf('month').format();
        var currentMonthEnd = moment(currentDate).endOf('month').format();      
        var lastMonthStart = moment(currentDate).subtract(1, 'months').startOf('month').format();
        var lastMonthEnd = moment(currentDate).subtract(1, 'months').endOf('month').format();
        var last1MonthStart = moment(currentDate).subtract(2, 'months').startOf('month').format();
        var last1MonthEnd = moment(currentDate).subtract(2, 'months').endOf('month').format();
        var currentMonth=moment().format("MMMM");
        var lastMonth = moment(lastMonthStart).format("MMMM");
        var last1Month = moment(last1MonthStart).format("MMMM");
        var allData = {};
        async.waterfall([
                function (callback) {
                    ProductOrders.find({
                        user: data.userId,
                        "cadLineWork": {
                            $exists: true
                        },
                        status:'Paid',
                        createdAt: {
                            $gte: currentMonthStart,
                            $lte: currentMonthEnd
                        }
                    }).select('_id totalAmount').exec(function (err, data) {
                        if (err) {
                            callback(err, null)
                        } else {
                            var totalAmount = 0;
                            _.forEach(data, function (value) {
                                totalAmount = totalAmount + value.totalAmount;
                            });
                            allData.currentMonthData = totalAmount;
                            allData.currentMonth = currentMonth;
                            callback(null, data);
                        }
                    })
                },
                function (data1, callback) {
                    ProductOrders.find({
                        user: data.userId,
                        "cadLineWork": {
                            $exists: true
                        },
                        status:'Paid',
                        createdAt: {
                            $gte: lastMonthStart,
                            $lte: lastMonthEnd
                        }
                    }).select('_id totalAmount').exec(function (err, data) {
                        if (err) {
                            callback(err, null)
                        } else {
                            var totalAmount1 = 0;
                            _.forEach(data, function (value) {
                                totalAmount1 = totalAmount1 + value.totalAmount;
                            });
                            allData.lastMonthData = totalAmount1;
                            allData.lastMonth = lastMonth;
                            callback(null, data);
                        }
                    })
                },
                function (data2, callback) {
                    ProductOrders.find({
                        user: data.userId,
                        "cadLineWork": {
                            $exists: true
                        },
                        status:'Paid',
                        createdAt: {
                            $gte: last1MonthStart,
                            $lte: last1MonthEnd
                        }
                    }).select('_id totalAmount').exec(function (err, data) {
                        if (err) {
                            callback(err, null)
                        } else {
                            var totalAmount2 = 0;
                            _.forEach(data, function (value) {
                                totalAmount2 = totalAmount2 + value.totalAmount;
                            });
                            allData.last1MonthData = totalAmount2;
                            allData.last1Month = last1Month;
                            callback(null, allData);
                        }
                    })
                },
            ],
            function (err, results) {
                if (err || _.isEmpty(results)) {
                    callback(err);
                } else {
                    callback(null, results);
                }
            }
        );
    },

    getStatsForPie: function (data, callback) {
        ProductOrders.find({
            user: data.userId
        }).lean().select('totalAmount _id dfmSubscription products cadLineWork').exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, "noData")
            } else {
                var finalResult = {
                    totalProductSum: 0,
                    totalCadSum: 0,
                    totalDfmSum: 0
                };
                _.map(data, function (n) {
                    if (!_.isEmpty(n.dfmSubscription)) {
                        finalResult.totalDfmSum = finalResult.totalDfmSum + n.totalAmount;
                    } else if (!_.isEmpty(n.products)) {
                        finalResult.totalProductSum = finalResult.totalProductSum + n.totalAmount;
                    } else if (!_.isEmpty(n.cadLineWork)) {
                        finalResult.totalCadSum = finalResult.totalCadSum + n.totalAmount;
                    }
                });
                callback(null, finalResult);
            }
        })
    },

    //--------------dashboard api for User End-------------//

    addCardDetails: function (data, callback) {
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
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {
                callback(null, found);
            }

        });
    },

    doLogin: function (data, callback) {
        // console.log("data is", data)
        User.findOne({
            email: data.email,
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
        }).populate('cartProducts.product');
    },


    setQty: function (data, callback) {
        // console.log("inside set qty",data)
        this.findOneAndUpdate({
            "_id": data._id,
            cartProducts:{$elemMatch: {
                product:data.product._id
            }}
        },{
            $set:{
                "cartProducts.$.qty":data.qty
            }
        }).exec(function (err, data) {
        //    console.log("ergkuir",data)
        });
    },

    //Generate Vendor
    createVendor: function (data, callback) {

        async.waterfall([
            function (callback) { // generate VendorID 
                User.vendorIdGenerate(data, function (err, data1) {
                    callback(null, data1);
                });
            },
            function (VendorID, callback) { //save VendorID

                data.dataId = VendorID;
                data.accessToken = [uid(16)];
                // data.password = md5(data.password);
                if (data.drone) {
                    data.lisence = "NDB";
                } else {
                    data.lisence = "UDB";
                }
                User.saveData(data, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (created) {
                        callback(null, created);
                    } else {
                        callback(null, {});
                    }
                });
            }
        ], function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },

    //vendorId Generate start
    vendorIdGenerate: function (data, callback) {
        var findQuery = {};
        findQuery = {
            dataId: {
                $regex: '^V.*',
                $options: 'm'
            }
        };
        var vendorIdNumber;
        User.findOne(findQuery).sort({
            createdAt: -1
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    // console.log("found", found);
                    vendorIdNumber = "VB" + "100";
                    // console.log("is empty vendorIdNumber", vendorIdNumber);
                    callback(null, vendorIdNumber);
                } else {
                    if (!found.dataId) {
                        vendorIdNumber = "VB" + "100";
                        // console.log("dataId null vendorIdNumber", vendorIdNumber);
                        callback(null, vendorIdNumber);
                    } else {
                        // console.log("found", found);
                        var sub = found.dataId
                        var vendorIdData = sub.substring(2, 10000);
                        // console.log("vendorIdData", vendorIdData);
                        var nextNum = parseInt(vendorIdData) + 1
                        vendorIdNumber = "VB" + nextNum;
                        // console.log("final vendorIdNumber", vendorIdNumber);
                        callback(null, vendorIdNumber);

                    }
                }
            }
        });
    },
    //end vendorId
    createUser: function (data, callback) {
        async.waterfall([
            function (callback) { // generate VendorID 
                User.UserIdGenerate(data, function (err, data1) {
                    callback(null, data1);
                })
            },
            function (UserID, callback) { //save VendorID
                data.dataId = UserID;
                data.accessToken = [uid(16)];
                data.password = md5(data.password);
                data.status = 'Active';
                if (data.drone) {
                    data.lisence = "NDB";
                } else {
                    data.lisence = "UDB";
                }
                User.saveData(data, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (created) {
                        async.parallel([
                                function (callback) {
                                    var emailData = {}
                                    emailData.email = global["env"].adminEmail;
                                    emailData.filename = "New Member (Admin)";
                                    emailData.subject = "NEW MEMBER";
                                    emailData.merge_vars = [{
                                        "name": "USER_NAME",
                                        "content": created.name
                                    }, {
                                        "name": "USER_ID",
                                        "content": created.dataId
                                    }, {
                                        "name": "PHONE",
                                        "content": created.phone
                                    }, {
                                        "name": "ADDRESS",
                                        "content": created.address
                                    }];

                                    Config.email(emailData, function (err, emailRespo) {
                                        // console.log("emailRespo", emailRespo);
                                        if (err) {
                                            console.log(err);
                                            callback();
                                        } else if (emailRespo) {
                                            callback();
                                        } else {
                                            callback("Invalid data", null);
                                        }
                                    });
                                },
                                function (callback) {
                                    var emailData = {}
                                    emailData.email = created.email;
                                    emailData.filename = "Membership";
                                    emailData.subject = "MEMBERSHIP";
                                    emailData.merge_vars = [{
                                        "name": "USER_ID",
                                        "content": created.email
                                    }];
                                    Config.email(emailData, function (err, emailRespo) {
                                        if (err) {
                                            console.log(err);
                                            callback();
                                        } else if (emailRespo) {
                                            callback();
                                        } else {
                                            callback("Invalid data", null);
                                        }
                                    });
                                },
                                function (callback) {
                                    var emailData = {}
                                    emailData.email = created.email;
                                    emailData.filename = "DFM Free Trial";
                                    emailData.subject = "DFM FREE TRIAL";
                                    emailData.merge_vars = [{
                                        "name": "USER_NAME",
                                        "content": created.name
                                    }];
                                    Config.email(emailData, function (err, emailRespo) {
                                        if (err) {
                                            console.log(err);
                                            callback();
                                        } else if (emailRespo) {
                                            callback();
                                        } else {
                                            callback("Invalid data", null);
                                        }
                                    });
                                }
                            ],
                            function (err, data) {
                                if (err) {
                                    console.log("error occured")
                                    // callback(null, err);
                                } else {
                                    console.log("waterfall completed successfully", data);
                                    callback(null, created);
                                }
                            });
                    } else {
                        callback(null, {});
                    }
                });
            }
        ], function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },


    //userId Generate start
    UserIdGenerate: function (data, callback) {
        var findQuery = {};
        var userIdNumber;
        findQuery = {
            dataId: {
                $regex: '^UN.*',
                $options: 'm'
            }
        };
        User.findOne(findQuery).sort({
            createdAt: -1
        }).exec(function (err, found) {

            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    userIdNumber = "UN" + "2001";
                    // console.log("is empty userIdNumber", userIdNumber);
                    callback(null, userIdNumber);
                } else {
                    if (!found.dataId) {
                        userIdNumber = "UN" + "2001";
                        // console.log(" found null dataId userIdNumber", userIdNumber);
                        callback(null, userIdNumber);
                    } else {
                        // console.log("found", found);
                        var sub = found.dataId
                        var userIdData = sub.substring(2, 10000);
                        // console.log("userIdData", userIdData);
                        var nextNum = parseInt(userIdData) + 1
                        userIdNumber = "UN" + nextNum;
                        // console.log("final userIdNumber", userIdNumber);
                        callback(null, userIdNumber);
                    }
                }
            }
        });
    },
    //end userId

    //emailer

    sendDfmTrailAndMembershipMail: function (data, callback) {
        User.findOne({
            _id: data.user
        }).select('_id createdAt email dataId').exec(function (err, data1) {
            if (err) {
                //callback(err, null);
            } else if (data1) {
                async.waterfall([
                        function (callback) {
                            var emailData = {}
                            emailData.email = data1.email;
                            emailData.filename = "Membership";
                            emailData.subject = "MEMBERSHIP";
                            emailData.merge_vars = [{
                                "name": "USER_ID",
                                "content": data1.email
                            }];
                            Config.email(emailData, function (err, emailRespo) {
                                if (err) {
                                    console.log(err);
                                    //callback(err, null);
                                } else if (emailRespo) {
                                    //callback(null, "Contact us form saved successfully!!!");
                                } else {
                                    //callback("Invalid data", null);
                                }
                            });
                        },
                        function (first, callback) {
                            var emailData = {}
                            emailData.email = data1.email;
                            emailData.filename = "DFM Free Trial";
                            emailData.subject = "DFM FREE TRIAL";
                            Config.email(emailData, function (err, emailRespo) {
                                if (err) {
                                    console.log(err);
                                    // callback(err, null);
                                } else if (emailRespo) {
                                    //callback(null, "Contact us form saved successfully!!!");
                                } else {
                                    //callback("Invalid data", null);
                                }
                            });
                        }
                    ],
                    function (err, data) {
                        if (err) {
                            console.log("error occured")
                            // callback(null, err);
                        } else {
                            console.log("waterfall completed successfully", data);
                        }
                    });
            } else {
                // callback("Invalid data", null);
            }
        });
    }

};
module.exports = _.assign(module.exports, exports, model);
var schema = new Schema({
    address: String,
    acreage: String,
    contours: Boolean,
    contoursDensity: String,
    draftingDensity: String,
    amount: {
        type: Number,
        default: 0
    },
    instruction: String,
    points: [],
    geoLocation: {
        upperLeft: [],
        lowerLeft: [],
        upperRight: [],
        lowerRight: [],
        center: []
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    isDiscounted: Boolean,
    status: {
        type: String,
        default: "Processing",
        enum: ['Processing', 'Qc', 'Completed', 'cancelled']
    },
    userPaymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid']
    },
    vendorPaymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid']
    },
    mapCenter: String,
    orthoFile: {
        file: String,
        status: {
            type: String,
            default: 'Processing'
        }
    },
    cadFileFromVendor: [String],
    cadFileFromAdmin: [String],

    name: String,
    cadLineName: String,
    mission: {
        type: Schema.Types.ObjectId,
        ref: 'Mission',
        index: true,
        key: "cadline"
    },
    completionDate: Date,
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    vendorCharges: Number,
    cadId: String,

    //****
    requestType: {
        type: String,
        enum: ['Internal', 'External']
    },
    vendorBillingId: String
});

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: ''
        },
        'mission': {
            select: ''
        },
        'vendor': {
            select: ''
        }
    }
});
schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('CadLineWork', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user mission vendor", "user mission vendor"));
var model = {

    getCadByUSer: function (data, callback) {
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
        CadLineWork.find({
                user: data.user
            })
            .deepPopulate("serviceId user DFMSubscription mission")
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


    totalCadReq: function (data, callback) {
        CadLineWork.find({
            user: data.user,
        }).count().exec(function (err, found) {
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

    createCad: function (data, callback) {
        async.waterfall([
            function (callback) { // generate cad id
                CadLineWork.CadIdgenerate(data, function (err, data1) {
                    callback(null, data1);
                })
            },
            function (cadId, callback) { //create cad
                data.cadId = cadId;
                CadLineWork.saveData(data, function (err, found) {
                    if (err || _.isEmpty(found)) {
                        callback(err, []);
                    } else {
                        CadLineWork.sendCadRequestMail(data, callback);
                        callback(null, found);
                    }
                });
            }
        ], function (err, data) { // execute Violation
            if (err || _.isEmpty(data)) {
                callback(null, "Error")
            } else {
                callback(null, data)
            }
        });
    },

    CadIdgenerate: function (data, callback) {
        var findQuery = {};
        var temp;
        var internalRequest = false;
        if (data.mission) {
            findQuery = {
                cadId: {
                    $regex: '^CADI.*',
                    $options: 'm'
                }
            }
            temp = "CADI"
        } else {
            findQuery = {
                cadId: {
                    $regex: '^CADE.*',
                    $options: 'm'
                }
            }
            temp = "CADE"
        }
        CadLineWork.findOne(findQuery).sort({
            createdAt: -1
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    var nextnum = "1"
                    month = month + 1
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var cadId = temp + year + month + nextnum;
                    } else {
                        if (m == 2) {
                            var cadId = temp + year + month + nextnum;
                        }
                    }
                    callback(null, cadId);
                } else {
                    if (_.isEmpty(found.cadId)) {
                        var year = new Date().getFullYear()
                        var month = new Date().getMonth();
                        var nextnum = "1"
                        month = month + 1
                        var m = month.toString().length;
                        if (m == 1) {
                            month = "0" + month
                            var cadId = temp + year + month + nextnum;
                        } else {
                            if (m == 2) {
                                var cadId = temp + year + month + nextnum;
                            }
                        }
                        callback(null, cadId);
                    } else {

                        var cadId = found.cadId
                        var num = cadId.substring(10, 100)
                        var nextnum = parseInt(num) + 1
                        var year = new Date().getFullYear()
                        var month = new Date().getMonth();
                        month = month + 1
                        var m = month.toString().length;
                        if (m == 1) {
                            month = "0" + month
                            var cadId = temp + year + month + nextnum;
                        } else {
                            if (m == 2) {
                                var cadId = temp + year + month + nextnum;
                            }
                        }
                        callback(null, cadId);
                    }
                }
            }

        });
    },

    getSingleCadData: function (data, callback) {
        this.findOne({
            _id: data._id
        }).deepPopulate("vendor mission").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        });
    },

    //******************** START *********************//

    getCad: function (data, callback) {
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
        this.find({})
            .deepPopulate("user mission vendor")
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

    getCadForVendor: function (data, callback) {
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
        this.find({})
            .deepPopulate("user mission vendor")
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

    //******************** END *********************//

    // getGraphDataForAdmin: function (data, callback) {
    //     var addData = [];
    //     var currentDate = new Date();
    //     var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
    //     var prevMonth = moment(currentDate).subtract(1, 'months').month();
    //     var currentYear = moment(currentDate).year();
    //     // var toDate = moment().year(currentYear).month(prevMonth).date(i).format();
    //     // var fromDate = moment(toDate).subtract(1, 'days').format();
    //     CadLineWork.find({}).exec(function (err, data) {
    //         if (err) {
    //             callback(err, null)
    //         } else {
    //             _.forEach(data, function (o) {
    //                 // console.log("o+++++++++++++++", o.createdAt);
    //                 // if (o.createdAt == '2017-09-04T12:45:38.000Z') {
    //                 //     console.log("o----------");
    //                 // } else {
    //                 //     console.log("%%%%%%%%");
    //                 // }
    //                 // var isT = _.isEqual(o.createdAt, '2017-09-04T12:45:38.000Z');
    //                 // console.log("isT", isT);
    //                 var dat = new Date('2017-09-04T12:45:38.000Z');
    //                 console.log(o.createdAt.getTime() === dat.getTime());
    //             })
    //             var sendData = {};
    //             sendData.internalCadCount = 0;
    //             sendData.externalCadCount = 0;
    //             _.forEach(data, function (value) {
    //                 if (value.cadId && value.cadId.charAt(3) == 'E') {
    //                     sendData.externalCadCount++;
    //                 } else if (value.cadId && value.cadId.charAt(3) == 'I') {
    //                     sendData.internalCadCount++
    //                 }
    //             });
    //             console.log("data----", sendData);
    //             addData.push(sendData);
    //             callback(null, data)
    //         }
    //     })
    // },


    // getGraphDataForAdmin: function (data, callback) {
    //     var addData = [];
    //     var currentDate = new Date();
    //     var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
    //     var prevMonth = moment(currentDate).subtract(1, 'months').month();
    //     var currentYear = moment(currentDate).year();
    //     // var toDate = moment().year(currentYear).month(prevMonth).date(i).format();
    //     // var fromDate = moment(toDate).subtract(1, 'days').format();
    //     var arrAllDate = [];
    //     CadLineWork.aggregate([{
    //         $group: {
    //             _id: "$createdAt",
    //             cadId: {
    //                 $push: "$cadId"
    //             }
    //         }
    //     }], function (err, found) {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             if (_.isEmpty(found)) {
    //                 callback(err, null);
    //             } else {
    //                 for (var i = 1; i <= lastMonthDaysCount; i++) {
    //                     var toDate = moment().year(currentYear).month(prevMonth).date(i).format();
    //                     // var fromDate = moment(toDate).subtract(1, 'days').format();
    //                     console.log("toDate", toDate);

    //                 }
    //                 callback(null, found);
    //             }
    //         }
    //     });
    // },

    getGraphDataForAdmin: function (data, callback) {
        async.waterfall([
            function (callback) { // Internal Cad
                var addData = [];
                var currentDate = new Date();
                var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
                var prevMonth = moment(currentDate).subtract(1, 'months').month();
                var currentYear = moment(currentDate).year();
                var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
                var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
                CadLineWork.find({
                    createdAt: {
                        $gte: preMonthStart,
                        $lte: preMonthEnd
                    },
                    "mission": {
                        $exists: true
                    }
                }).lean().exec(function (err, data) {
                    if (err) {
                        callback(err, null)
                    } else {
                        var test = [];
                        i = 1
                        for (var i = 1; i <= lastMonthDaysCount; i++) {
                            var createdDt = new Date().setDate(i)
                            createdDt = new Date(createdDt).setMonth(prevMonth)
                            test[i - 1] = _.countBy(data, function (o) {
                                return moment((o.createdAt)).isSame(createdDt, 'day');
                            });
                            test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                        }
                        var finalArr = [];
                        var i = 0;
                        _.forEach(test, function (x) {
                            if (x.true) {
                                finalArr.push(x.createdAt);
                                finalArr.push(x.true);
                            } else {
                                finalArr.push(x.createdAt);
                                finalArr.push(0);
                            }
                        })
                        var finalSend = {};
                        finalSend = _.chunk(finalArr, 2);
                        // console.log("finalArr------", finalSend);
                        callback(null, finalSend)
                    }
                })
            },
            function (internalData, callback) { //External Cad
                var addData = [];
                var currentDate = new Date();
                var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
                var prevMonth = moment(currentDate).subtract(1, 'months').month();
                var currentYear = moment(currentDate).year();
                var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
                var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
                CadLineWork.find({
                    createdAt: {
                        $gte: preMonthStart,
                        $lte: preMonthEnd
                    },
                    "mission": {
                        $exists: false
                    }
                }).lean().exec(function (err, data) {
                    if (err) {
                        callback(err, null)
                    } else {
                        var test = [];
                        i = 1
                        for (var i = 1; i <= lastMonthDaysCount; i++) {
                            var createdDt = new Date().setDate(i)
                            createdDt = new Date(createdDt).setMonth(prevMonth)
                            test[i - 1] = _.countBy(data, function (o) {
                                return moment((o.createdAt)).isSame(createdDt, 'day');
                            });
                            test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                        }
                        var finalArr = [];
                        var i = 0;
                        _.forEach(test, function (x) {
                            if (x.true) {
                                finalArr.push(x.createdAt);
                                finalArr.push(x.true);
                            } else {
                                finalArr.push(x.createdAt);
                                finalArr.push(0);
                            }
                        })
                        var finalSend = {};
                        finalSend = _.chunk(finalArr, 2);
                        // console.log("finalArr------", finalSend);
                        var allData = {};
                        allData.InternalData = internalData;
                        allData.ExternalData = finalSend;
                        callback(null, allData)
                    }
                })
            }
        ], function (err, data) { // Final Callback
            if (err || _.isEmpty(data)) {
                callback(null, "Error")
            } else {
                callback(null, data)
            }
        });
    },

    getInternalGraphDataForAdmin: function (data, callback) {
        var addData = [];
        var currentDate = new Date();
        var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
        var prevMonth = moment(currentDate).subtract(1, 'months').month();
        var currentYear = moment(currentDate).year();
        var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
        var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
        CadLineWork.find({
            createdAt: {
                $gte: preMonthStart,
                $lte: preMonthEnd
            },
            "mission": {
                $exists: true
            }
        }).lean().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                var test = [];
                i = 1
                for (var i = 1; i <= lastMonthDaysCount; i++) {
                    var createdDt = new Date().setDate(i)
                    createdDt = new Date(createdDt).setMonth(prevMonth)
                    test[i - 1] = _.countBy(data, function (o) {
                        return moment((o.createdAt)).isSame(createdDt, 'day');
                    });
                    test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                }
                var finalArr = [];
                var i = 0;
                _.forEach(test, function (x) {
                    if (x.true) {
                        finalArr.push(x.createdAt);
                        finalArr.push(x.true);
                    } else {
                        finalArr.push(x.createdAt);
                        finalArr.push(0);
                    }
                })
                var finalSend = {};
                finalSend = _.chunk(finalArr, 2);
                // console.log("finalArr------", finalSend);
                callback(null, finalSend)
            }
        })
    },

    getExternalGraphDataForAdmin: function (data, callback) {
        var addData = [];
        var currentDate = new Date();
        var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
        var prevMonth = moment(currentDate).subtract(1, 'months').month();
        var currentYear = moment(currentDate).year();
        var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
        var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
        CadLineWork.find({
            createdAt: {
                $gte: preMonthStart,
                $lte: preMonthEnd
            },
            "mission": {
                $exists: false
            }
        }).lean().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                var test = [];
                i = 1
                for (var i = 1; i <= lastMonthDaysCount; i++) {
                    var createdDt = new Date().setDate(i)
                    createdDt = new Date(createdDt).setMonth(prevMonth)
                    test[i - 1] = _.countBy(data, function (o) {
                        return moment((o.createdAt)).isSame(createdDt, 'day');
                    });
                    test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                }
                var finalArr = [];
                var i = 0;
                _.forEach(test, function (x) {
                    if (x.true) {
                        finalArr.push(x.createdAt);
                        finalArr.push(x.true);
                    } else {
                        finalArr.push(x.createdAt);
                        finalArr.push(0);
                    }
                })
                var finalSend = {};
                finalSend = _.chunk(finalArr, 2);
                // console.log("finalArr------", finalSend);
                callback(null, finalSend)
            }
        })
    },

    //graph api for user

    getGraphDataForUser: function (data, callback) {
        async.waterfall([
            function (callback) { // Internal Cad
                var addData = [];
                var currentDate = new Date();
                var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
                var prevMonth = moment(currentDate).subtract(1, 'months').month();
                var currentYear = moment(currentDate).year();
                var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
                var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
                ProductOrders.find({
                    user: data.userId,
                    createdAt: {
                        $gte: preMonthStart,
                        $lte: preMonthEnd
                    }
                }).lean().exec(function (err, data) {
                    if (err) {
                        callback(err, null)
                    } else {
                        var test = [];
                        i = 1
                        for (var i = 1; i <= lastMonthDaysCount; i++) {
                            var createdDt = new Date('2017-11-01T11:53:01.412Z').setDate(i)
                            createdDt = new Date(createdDt).setMonth(prevMonth)
                            test[i - 1] = _.countBy(data, function (o) {
                                return moment((o.createdAt)).isSame(createdDt, 'day');
                            });
                            test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                        }
                        var finalArr = [];
                        var i = 0;
                        _.forEach(test, function (x) {
                            if (x.true) {
                                finalArr.push(x.createdAt);
                                finalArr.push(x.true);
                            } else {
                                finalArr.push(x.createdAt);
                                finalArr.push(0);
                            }
                        })
                        var finalSend = {};
                        finalSend = _.chunk(finalArr, 2);
                        // console.log("finalArr------", finalSend);
                        callback(null, finalSend)
                    }
                })
            },
            function (orderData, callback) { //External Cad
                var addData = [];
                var currentDate = new Date();
                var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
                var prevMonth = moment(currentDate).subtract(1, 'months').month();
                var currentYear = moment(currentDate).year();
                var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
                var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
                ProductOrders.find({
                    user: data.userId,
                    createdAt: {
                        $gte: preMonthStart,
                        $lte: preMonthEnd
                    }
                }).lean().exec(function (err, data) {
                    if (err) {
                        callback(err, null)
                    } else {
                        var test = [];
                        i = 1
                        for (var i = 1; i <= lastMonthDaysCount; i++) {
                            var createdDt = new Date().setDate(i)
                            createdDt = new Date(createdDt).setMonth(prevMonth)
                            test[i - 1] = _.countBy(data, function (o) {
                                return moment((o.createdAt)).isSame(createdDt, 'day');
                            });
                            test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                        }
                        var finalArr = [];
                        var i = 0;
                        _.forEach(test, function (x) {
                            if (x.true) {
                                finalArr.push(x.createdAt);
                                finalArr.push(x.true);
                            } else {
                                finalArr.push(x.createdAt);
                                finalArr.push(0);
                            }
                        })
                        var finalSend = {};
                        finalSend = _.chunk(finalArr, 2);
                        // console.log("finalArr------", finalSend);
                        var allData = {};
                        allData.OrderData = orderData;
                        allData.Payment = finalSend;
                        callback(null, allData)
                    }
                })
            }
        ], function (err, data) { // Final Callback
            if (err || _.isEmpty(data)) {
                callback(null, "Error")
            } else {
                callback(null, data)
            }
        });
    },

    getAllOrdersGraphDataForUser: function (data, callback) {
        var addData = [];
        var currentDate = new Date();
        var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
        var prevMonth = moment(currentDate).subtract(1, 'months').month();
        var currentYear = moment(currentDate).year();
        var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
        var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
        ProductOrders.find({
            user: data.userId,
            createdAt: {
                $gte: preMonthStart,
                $lte: preMonthEnd
            }
        }).lean().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                var test = [];
                i = 1
                for (var i = 1; i <= lastMonthDaysCount; i++) {
                    var createdDt = new Date('2017-11-01T11:53:01.412Z').setDate(i)
                    createdDt = new Date(createdDt).setMonth(prevMonth)
                    test[i - 1] = _.countBy(data, function (o) {
                        return moment((o.createdAt)).isSame(createdDt, 'day');
                    });
                    test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                }
                var finalArr = [];
                var i = 0;
                _.forEach(test, function (x) {
                    if (x.true) {
                        finalArr.push(x.createdAt);
                        finalArr.push(x.true);
                    } else {
                        finalArr.push(x.createdAt);
                        finalArr.push(0);
                    }
                })
                var finalSend = {};
                finalSend = _.chunk(finalArr, 2);
                // console.log("finalArr------", finalSend);
                callback(null, finalSend)
            }
        })
    },

    getTotalAmtGraphDataForUser: function (data, callback) {
        var addData = [];
        var currentDate = new Date();
        var lastMonthDaysCount = moment(currentDate).subtract(1, 'months').daysInMonth();
        var prevMonth = moment(currentDate).subtract(1, 'months').month();
        var currentYear = moment(currentDate).year();
        var preMonthStart = moment(currentDate).subtract(1, 'months').startOf('months').format();
        var preMonthEnd = moment(currentDate).subtract(1, 'months').endOf('months').format();
        ProductOrders.find({
            user: data.userId,
            createdAt: {
                $gte: preMonthStart,
                $lte: preMonthEnd
            }
        }).lean().exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                var test = [];
                i = 1
                for (var i = 1; i <= lastMonthDaysCount; i++) {
                    var createdDt = new Date().setDate(i)
                    createdDt = new Date(createdDt).setMonth(prevMonth)
                    test[i - 1] = _.countBy(data, function (o) {
                        return o.totalAmount
                        // return moment((o.createdAt)).isSame(createdDt, 'day');
                    });
                    test[i - 1].createdAt = moment(createdDt).format('YYYY,M,D');
                }
                console.log("------", test);
                var finalArr = [];
                var i = 0;
                _.forEach(test, function (x) {
                    if (x.true) {
                        finalArr.push(x.createdAt);
                        finalArr.push(x.true);
                    } else {
                        finalArr.push(x.createdAt);
                        finalArr.push(0);
                    }
                })
                var finalSend = {};
                finalSend = _.chunk(finalArr, 2);
                // console.log("finalArr------", finalSend);
                callback(null, finalSend)
            }
        })
    },

    //graph api end

    //generate vendor billing id

    vendorBillIdGenerate: function (data, callback) {
        var findQuery = {};
        var vendorBillId;
        findQuery = {
            vendorBillingId: {
                $regex: '^VB.*',
                $options: 'm'
            }
        };
        CadLineWork.findOne(findQuery).sort({
            createdAt: -1
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    vendorBillId = "VB" + "100";
                    callback(null, vendorBillId);
                } else {
                    if (!found.vendorBillingId) {
                        vendorBillId = "VB" + "100";
                        callback(null, vendorBillId);
                    } else {
                        var sub = found.vendorBillingId
                        var vendorIdData = sub.substring(2, 10000);
                        var nextNum = parseInt(vendorIdData) + 1
                        vendorBillId = "VB" + nextNum;
                        callback(null, vendorBillId);
                    }
                }
            }
        });
    },

    saveVendorDetails: function (data, callback) {
        async.waterfall([
            function (callback) { // generate vendor id
                CadLineWork.vendorBillIdGenerate(data, function (err, data1) {
                    callback(null, data1);
                })
            },
            function (billID, callback) { //save vendor
                data.vendorBillingId = billID;
                CadLineWork.saveData(data, function (err, data2) {
                    if (err || _.isEmpty(data2)) {
                        callback(err, [])
                    } else {
                        callback(null, data2)
                    }
                })
            }
        ], function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },

    missionIsPresent: function (data, callback) {
        CadLineWork.findOne({
            mission: data.missionId
        }).exec(function (err, data) {
            if (_.isEmpty(data) || err) {
                callback(err, "NoData");
            } else {
                callback(null, data)
            }
        })
    },

    //emailers

    sendCadRequestMail: function (data, callback) {
        console.log("data------------insideSendmailFunc", data);
        CadLineWork.findOne({
            user: data.user
        }).deepPopulate('user').select('user dataId cadId acreage createdAt').exec(function (err, data1) {
            console.log("data1", data1, err);
            if (err) {
                callback(err, null);
            } else if (data1) {
                console.log("data", data1);
                var emailData = {}
                emailData.email = global["env"].adminEmail;
                emailData.filename = "New CAD Request (Admin)";
                emailData.subject = "CAD REQUEST";
                console.log("email data : ", emailData);
                emailData.merge_vars = [{
                    "name": "USER_NAME",
                    "content": data1.user.name
                }, {
                    "name": "USER_ID",
                    "content": data1.user.dataId
                },{
                    "name": "CAD_ID",
                    "content": data1.cadId
                },{
                    "name": "ACREAGE",
                    "content": data1.acreage
                },{
                    "name": "REQUESTED_DATE",
                    "content": data1.createdAt
                }];

                Config.email(emailData, function (err, emailRespo) {
                    console.log("emailRespo", emailRespo);
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
                //callback("Invalid data", null);
            }
        });
    },

    sendCadCompletedMail: function (data, callback) {
        CadLineWork.findOne({
            user: data.user
        }).deepPopulate('user').select('user').exec(function (err, data1) {
            if (err) {
                callback(err, null);
            } else if (data1) {
                var emailData = {}
                emailData.email = data1.user.email;
                emailData.filename = "CAD Complete";
                emailData.subject = "CAD COMPLETED";
                Config.email(emailData, function (err, emailRespo) {
                    console.log("emailRespo", emailRespo);
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
                callback("Invalid data", null);
            }
        });
    }


};
module.exports = _.assign(module.exports, exports, model);
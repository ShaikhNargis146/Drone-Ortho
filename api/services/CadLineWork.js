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
        enum: ['Pending', 'Processing', 'Completed']
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
    orthoFile: [{
        file: String,
        status: {
            type: String,
            default: 'Proceesing'
        }
    }],
    cadFileFromVendor: [String],
    cadFileFromAdmin: [String],

    name: String,
    cadLineName: String,
    mission: {
        type: Schema.Types.ObjectId,
        ref: 'Mission',
        index: true
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
    }

});

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: '_id name'
        },
        'mission': {
            select: ''
        },
        'vendor': {
            select: '_id name'
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


    CadIdgenerate: function (data, callback) {
        var temp;
        var findQuery = {};
        var internalRequest = true;
        if (internalRequest) {
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
            if (err || _.isEmpty(found)) {
                callback(err, []);
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
        });
    },
    
    InternalCadIdgenerate: function (data, callback) {
        console.log("cad id data is", data)
        CadLineWork.find({}).sort({
            createdAt: -1
        }).limit(1).exec(function (err, found) {
            console.log("cad id data found", found)
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    callback(null, "noDataFound");
                }
                if (_.isEmpty(found[0].internalId)) {
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    var nextnum = "1"
                    month = month + 1
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var internalId = "CADE" + year + month + nextnum;
                        console.log("*********", externalId)
                    } else {
                        if (m == 2) {

                            var internalId = "CADE" + year + month + nextnum;
                            console.log("*********", internalId)
                        }
                    }
                    console.log("if  cdid is emapty", internalId)
                    callback(null, internalId);
                } else {

                    var internalId = found[0].internalId
                    var num = internalId.substring(10, 100)
                    var nextnum = parseInt(num) + 1
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    month = month + 2
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var internalId = "CADI" + year + month + nextnum;
                        console.log("cad id data found*********", internalId)
                    } else {
                        if (m == 2) {
                            var internalId = "CADI" + year + month + nextnum;
                            console.log("cad id data found*********", internalId)
                        }
                    }
                    callback(null, internalId);
                }
            }
        });
    },

    ExternalCadIdgenerate: function (data, callback) {
        console.log("cad id data is", data)
        CadLineWork.find({}).sort({
            createdAt: -1
        }).limit(1).exec(function (err, found) {
            console.log("cad id data found", found)
            if (err) {
                callback(err, null);
            } else {

                if (_.isEmpty(found)) {

                    callback(null, "noDataFound");
                }
                if (_.isEmpty(found[0].externalId)) {
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    var nextnum = "1"
                    month = month + 1
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var externalId = "CADE" + year + month + nextnum;
                        console.log("*********", externalId)
                    } else {
                        if (m == 2) {

                            var externalId = "CADE" + year + month + nextnum;
                            console.log("*********", externalId)
                        }
                    }
                    console.log("if  cdid is emapty", externalId)
                    callback(null, externalId);
                } else {

                    var externalId = found[0].externalId
                    var num = externalId.substring(10, 100)
                    var nextnum = parseInt(num) + 1
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    month = month + 1
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var externalId = "CADE" + year + month + nextnum;
                        console.log("cad id data found*********", externalId)
                    } else {
                        if (m == 2) {

                            var externalId = "CADE" + year + month + nextnum;
                            console.log("cad id data found*********", externalId)
                        }
                    }
                    callback(null, externalId);
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
            .deepPopulate("serviceId user DFMSubscription")
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
        this.find({
                vendor: data.vendorId
            })
            .deepPopulate("serviceId user DFMSubscription")
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
    }

    //******************** END *********************//
};
module.exports = _.assign(module.exports, exports, model);
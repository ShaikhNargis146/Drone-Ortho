var schema = new Schema({
    address: String,
    acreage: String,
    contours: Boolean,
    contoursDensity: String,
    density: String,
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
        enum: ['Pending', 'Processing', 'Completed']
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid']
    },
    mapCenter: String,
    cadFile: String,
    name: String,
    cadLineName: String,
    mission: {
        type: Schema.Types.ObjectId,
        ref: 'Mission',
        index: true
    },
    transactionNo: String,
    pdfFile: String,
    completionDate: Date,
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        index: true
    },
});

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: '_id name'
        }

    }
});
schema.plugin(deepPopulate, {
    Populate: {
        'mission': {
            select: '_id name'
        }

    }
});
schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('CadLineWork', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user mission", "user mission"));
var model = {

    getSingleCadData: function (data, callback) {
        this.findOne({
            _id: data._id
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    }
};
module.exports = _.assign(module.exports, exports, model);
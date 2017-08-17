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
    status: String,
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
    completionDate: Date
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
var model = {};
module.exports = _.assign(module.exports, exports, model);
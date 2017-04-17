var schema = new Schema({
    DFMSubscription: {
        type: Schema.Types.ObjectId,
        ref: 'DFMSubscription',
        index: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    description: String,
    files: [{
        type: String
    }],
    status: String,
    orthomosaic: String,
    mapViewer: String,
    DVI: String,
    DSM: String,
    threedMode: String,
    KMZ: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Mission', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
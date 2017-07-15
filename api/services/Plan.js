var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    invitations:String,
    missions:String,
    UploadPhoto:String,
    UploadSize:String,
    MosaicPerMonth:String,
    Mosaic:String,
    missionsResolution :String,
    exportKMZ :String,
    exportOrthophoto:String,
    exportDEM:String,
    exportPointCloud:String,
    unlimitedUsedApps:String,
    price: {
        type: Number,
        default: 0
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Plan', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
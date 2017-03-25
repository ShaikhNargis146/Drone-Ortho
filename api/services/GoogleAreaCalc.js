var schema = new Schema({
     address: {
        type: String,
    },
    acreage: {
        type: String,
    },
    sqft: {
        type: String,
    },
    perimeter: {
        type: String,
    },
   coords : {
        type: String,
    },
   contours : {
        type: Boolean,
    },
  contoursDensity: {
        type: String,
    },
    draftingDensity: {
        type: String,
    },
     amount: {
        type: String,
    },
     instruction: {
        type: String,
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('GoogleAreaCalc', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
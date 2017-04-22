var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    package: String,
    image: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Products', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
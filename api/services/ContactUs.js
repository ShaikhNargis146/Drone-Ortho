var schema = new Schema({
    name: {
        type: String,
        required: true
    },
     mobile: {
        type: String,
        default: ""
    },
     phone: {
        type: String,
        default: ""
    },
     email: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
     company: {
        type: String,
        default: ""
    },
     designation: {
        type: String,
        default: ""
    },
     description: {
        type: String,
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ContactUs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
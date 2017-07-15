var schema = new Schema({
    email: {
        type: String,

    },
    status: {
        type: String,

    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NewsLetter', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
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
};
module.exports = _.assign(module.exports, exports, model);
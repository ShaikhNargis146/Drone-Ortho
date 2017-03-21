URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    email: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
    status: {
        type: String,
    }
});
schema.plugin(URLSlugs('email', {field: 'myslug'}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NewsLetter', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
      getByUrl: function (data, callback) {
    this.findOne({
      "myslug": data.myslug
        }, function(err, deleted) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, deleted);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);
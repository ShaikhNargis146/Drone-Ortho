URLSlugs = require('mongoose-url-slugs');

var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
       type: String,
        validate: validators.isEmail(),
        unique: true
    },
    organization: {
        type: String,
        default: ""
    },
     designation: {
        type: String,
        default: ""
    },
     mobile: {
        type: String,
        default: ""
    },
     phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    website: {
        type: String,
    },
    droneType: {
        type: String,
    },
    
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
});
schema.plugin(URLSlugs('name', {field: 'myslug'}));

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Membership', schema);

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
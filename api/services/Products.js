var schema = new Schema({
    name: {
        type: String
    },
    description: String,
    package: String,
    image: {
        type: String
    },
    category: {
        type: String,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 0
    },
    validity: {
        type: String,
        default: 0
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Products', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    getAllProducts: function (data, callback) {
        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        Products.find({})
            .deepPopulate("serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    UpdateProduct: function (data, callback) {
        Products.update({
            _id: mongoose.Types.ObjectId(data._id)
        }, {
            $set: {
                description: data.description,
                validity: data.validity,
                status: data.status,
                price: data.price,
                category: data.category
            }
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {
                callback(null, found);
            }

        });
    },

    getProduct: function (data, callback) {
        Products.findOne({
            _id: data._id
        }).exec(function (err, found) {
            if (err) {

                callback(err, null);
            } else {
                if (found) {
                    callback(null, found);
                } else {
                    callback({
                        message: "Incorrect Credentials!"
                    }, null);
                }
            }

        });
    },
};
module.exports = _.assign(module.exports, exports, model);
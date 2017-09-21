var schema = new Schema({
    name: {
        type: String,
    },
    description: String,
    package: String,
    image: {
        type: String,

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
    search1: function (data, callback) {
        var Model = Products;
        // var Const = this(data);
        var maxRow = data.maxRow;

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
                asc: 'name'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        // var defaultSort = "desc";
        // if (defaultSort) {
        //     if (defaultSortOrder && defaultSortOrder === "desc") {
        //         options.sort = {
        //             desc: defaultSort
        //         };
        //     } else {
        //         options.sort = {
        //             asc: defaultSort
        //         };
        //     }
        // }

        var Search = Model.find(data.filter)

            .order(options)
            // .deepPopulate(deepSearch)
            .keyword(options)
            .page(options, callback);

    },

    UpdateProduct: function (data, callback) {
        console.log("data is******", data)

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
                console.log("inside error");
                callback(err, null);
            } else if (_.isEmpty(found)) {
                console.log("isemapty")
                callback(null, "noDataound");
            } else {
                console.log("found", found)
                callback(null, found);
            }

        });
    },
    getProduct: function (data, callback) {
        console.log("data is", data)
        console.log("data", data)
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
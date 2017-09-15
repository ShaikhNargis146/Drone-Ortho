var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    subject: {
        type: String,
    },
    description: {
        type: String,
    },
    ticketId: {
        type: String,
    },
    status: {
        type: String,
    },
    closingDate: {
        type: Date,
    },
    reply: String,
    replyDate: Date
});

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: ""
        }
    }

});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Ticket', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user", "user"));
var model = {


    getTicketUser: function (data, callback) {
        console.log("data is******", data)

        Ticket.find({
            user: data.user
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


    getAllTickets: function (data, callback) {
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
        Ticket.find({})
            .deepPopulate("user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },


    getTicketData: function (data, callback) {
        this.findOne({
            _id: data._id
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

};
module.exports = _.assign(module.exports, exports, model);
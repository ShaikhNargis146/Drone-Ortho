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

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Ticket', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
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


};
module.exports = _.assign(module.exports, exports, model);
var schema = new Schema({
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
var model = {};
module.exports = _.assign(module.exports, exports, model);
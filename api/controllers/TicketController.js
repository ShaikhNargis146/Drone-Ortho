module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getTicketUser: function (req, res) {
        console.log("***");
        if (req.body) {
            console.log("**$$$$*");
            Ticket.getTicketUser(req.body, res.callback);
        } else {
            console.log("*%%%%%**");
            res.callback("Please provide Valid AccessToken", null);
        }
    },


};
module.exports = _.assign(module.exports, controller);
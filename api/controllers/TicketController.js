module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getTicket: function (req, res) {
        console.log("***");
        if (req.body) {
            console.log("**$$$$*");
            Ticket.getTicket(req.body, res.callback);
        } else {
            console.log("*%%%%%**");
            res.callback("Please provide Valid AccessToken", null);
        }
    },

    getAllTickets: function (req, res) {
        if (req.body) {
            Ticket.getAllTickets(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },

    getTicketData: function (req, res) {
        if (req.body) {
            Ticket.getTicketData(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },

};
module.exports = _.assign(module.exports, controller);
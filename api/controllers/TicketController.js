module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    exceltotalTicket: function (req, res) {
        Ticket.exceltotalTicket(req.body, function (err, data) {
            Ticket.generateExcelTicket(data, function (err, singleData) {
                Config.generateExcel("TicketExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
    },
    exceltotalTicketforUser: function (req, res) {
        Ticket.exceltotalTicketforUser(req.body, function (err, data) {
            Ticket.generateExcelTicketforUser(data, function (err, singleData) {
                Config.generateExcel("TicketExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
    },

    getTicket: function (req, res) {
        if (req.body) {
            Ticket.getTicket(req.body, res.callback);
        } else {
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

    ticketIdGenerate: function (req, res) {
        if (req.body) {
            Ticket.ticketIdGenerate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    createTicketForUser: function (req, res) {
        if (req.body) {
            Ticket.createTicketForUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

};
module.exports = _.assign(module.exports, controller);
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getDfm: function (req, res) {
        if (req.body) {
            DFMSubscription.getDfm(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    getByUser: function (req, res) {
        if (req.body) {
            DFMSubscription.getByUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    }
};
module.exports = _.assign(module.exports, controller);
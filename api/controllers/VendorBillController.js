module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getBill: function (req, res) {
        if (req.body) {
            VendorBill.getBill(req.body, res.callback);
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
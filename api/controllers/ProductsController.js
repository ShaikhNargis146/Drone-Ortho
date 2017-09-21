module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    search1: function (req, res) {
        if (req.body) {
            Products.search1(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    UpdateProduct: function (req, res) {
        if (req.body) {
            Products.UpdateProduct(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    getProduct: function (req, res) {
        if (req.body) {
            Products.getProduct(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getAllProducts: function (req, res) {
        if (req.body) {
            Products.getAllProducts(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
};
module.exports = _.assign(module.exports, controller);
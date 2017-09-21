module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
 getCadByUSer: function (req, res) {
        if (req.body) {
            CadLineWork.getCadByUSer(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    InternalCadIdgenerate: function (req, res) {
        if (req.body) {
            CadLineWork.InternalCadIdgenerate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    ExternalCadIdgenerate: function (req, res) {
        if (req.body) {
            CadLineWork.ExternalCadIdgenerate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getSingleCadData: function (req, res) {
        if (req.body) {
            CadLineWork.getSingleCadData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    getCadbyeUser: function (req, res) {
        if (req.body) {
            CadLineWork.getCadbyeUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },
    getCad: function (req, res) {
        if (req.body) {
            CadLineWork.getCad(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    getCadForVendor: function (req, res) {
        if (req.body) {
            CadLineWork.getCadForVendor(req.body, res.callback);
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
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getByMission:function (req, res) {
        if (req.body ) {
            ServiceList.getByMission(req.body, res.callback);
        } else {
            res.callback("Please provide Valid----", null);
        }
    },
};
module.exports = _.assign(module.exports, controller);

module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    createMission: function (req, res) { //pix4dmapper -c -n --image-dir C:\Users\dell\Pictures\newMissionImages D:\mining\myquarry.p4d 
        if (req.body) {
            Mission.createMission(req.body, res.callback);
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
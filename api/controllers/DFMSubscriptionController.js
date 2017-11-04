module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var cron = require('node-cron');

var controller = {
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
cron.schedule('1 * * * *', function () {
    DFMSubscription.find({
        status: 'Active'
    }, function (err, found) {
        if (err) {
            callback(err, null);
        } else {
            async.eachSeries(found, function (value, callback1) {
                    var localDate = moment(value.expiryDate);
                    var currentDate = moment(new Date())
                    // console.log("localDate currentDate", localDate, currentDate, moment(currentDate).isSameOrAfter(localDate));
                    if (moment(currentDate).isSameOrAfter(localDate)) {
                        value.status = "Inactive";
                        value.save(function (err, data) {
                            if (err) {
                                // console.log("error occured");
                                callback1("next");
                            } else {
                                // console.log("value updated");
                                callback1("next");
                            }
                        });
                    } else {
                        callback1();
                    }
                },
                function (err, results) {
                    if (err) {
                        // console.log("err", err);
                    } else {
                        // console.log("results", results);
                        // callback();
                    }
                });

        }
    });
});

module.exports = _.assign(module.exports, controller);
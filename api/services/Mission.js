var cron = require('node-cron');
var schema = new Schema({
    missionId: String,
    DFMSubscription: {
        type: Schema.Types.ObjectId,
        ref: 'DFMSubscription'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    files: [{
        file: String,
        status: {
            type: String,
            default: 'Proceesing'
        }
    }],
    fileUploadStatus: {
        type: String,
        default: ''
    },
    status: String,
    others: [{
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: 'ServiceList'
        },
        name: String, //orthomosaic,mapViewer,DVI,DSM,threedMode,KMZ
        file: String,
        data: Schema.Types.Mixed,
        status: {
            type: String
        }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Mission', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "serviceId user DFMSubscription", "serviceId user DFMSubscriptions"));
var model = {
    createMission: function (data, callback) {
        user.save(function (err, created) {
            if (err) {
                callback(err, null);
            } else if (created) {
                exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -n --image-dir C:/Users/dell/Pictures/newMissionImages C:/Users/dell/Documents/pix4d/' + data.name + '.p4d', function (error, stdout, stderr) {
                    if (error) {
                        console.log("error");
                    } else if (stdout) {
                        console.log("stdout", stdout);
                        async.parallel([
                            //Function to search event name
                            function () {
                                exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r C:/Users/dell/Documents/pix4d/' + data.name + '.p4d', function (error, stdout, stderr) {
                                    if (error) {
                                        console.log("error");
                                    } else if (stdout) {
                                        console.log("stdout", stdout);
                                    } else {
                                        console.log("stderr", stderr);
                                    }
                                });
                                // callback(null, found);
                            },

                            function () {
                                exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -i C:/Users/dell/Documents/pix4d/' + data.name + '.p4d', function (error, stdout, stderr) {
                                    if (error) {
                                        console.log("error");
                                    } else if (stdout) {
                                        console.log("stdout", stdout);
                                    } else {
                                        console.log("stderr", stderr);
                                    }
                                });
                                // callback(null, found);

                            },
                            function () {
                                exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -d C:/Users/dell/Documents/pix4d/' + data.name + '.p4d', function (error, stdout, stderr) {
                                    if (error) {
                                        console.log("error");
                                    } else if (stdout) {
                                        console.log("stdout", stdout);
                                    } else {
                                        console.log("stderr", stderr);
                                    }
                                });
                                // callback(null, found);               
                            },
                            function () {
                                exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -o C:/Users/dell/Documents/pix4d/' + data.name + '.p4d', function (error, stdout, stderr) {
                                    if (error) {
                                        console.log("error");
                                    } else if (stdout) {
                                        console.log("stdout", stdout);
                                    } else {
                                        console.log("stderr", stderr);
                                    }
                                });
                                // callback(null, found);               
                            }
                        ], function (error, data) {
                            if (error) {
                                console.log(" async.parallel >>> final callback  >>> error", error);
                                callback(error, null);
                            } else {
                                callback(null, savedData);
                            }
                        })

                    } else {
                        console.log("stderr", stderr);
                        callback(null, stderr);

                    }
                });
                callback(null, created);
            } else {
                callback(null, {});
            }
        });



    },
    getByUser: function (data, callback) {
        this.find({
            "user": data.user
        }, function (err, dataF) {
            if (err) {
                callback(err, null);
            } else {
                if (dataF) {
                    callback(null, dataF);
                } else {
                    callback({
                        message: "Something went wrong!"
                    }, null);
                }
            }
        });
    },
};
// cron.schedule('1 * * * * *', function () {
//     Mission.find({}, function (err, found) {
//         if (err) {
//             callback(err, null);
//         } else {
//             _.forEach(found, function (value) {
//             // write their api to update status if changed
//             value.status="checked";
//             value.save(function(){})
//             });
//             console.log("m in found");
//         }
//     });
// });

module.exports = _.assign(module.exports, exports, model);
var cron = require('node-cron');
var path = require('path');
var request = require('request');
var geotiff = require('geotiff');
var epsg = require('epsg-to-proj');
var extents = require('geotiff-extents');
var storage = require('azure-storage');
var util = require('util');
var fileService = storage.createFileService('DefaultEndpointsProtocol=https;AccountName=uniflirgdiag391;AccountKey=hEiJdKu0GiMFwVtVCqKTJ8n7+7netu5Y4yd4rDjAg8x8RGxZA7E0a4BI3v1V8EkrDBlakpUu1aiqNNIESMWXMg==;EndpointSuffix=core.windows.net');
var shareName = "unifli-file-share";
var counter;
var schema = new Schema({
    missionId: String,
    vmName: String,
    DFMSubscription: {
        type: Schema.Types.ObjectId,
        ref: 'DFMSubscription'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    files: [{
        file: String,
        status: {
            type: String,
            default: 'Processing'
        }
    }],
    fileUploadStatus: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'Processing'
    },
    date: Date,
    geoLocation: {
        upperLeft: [],
        lowerLeft: [],
        upperRight: [],
        lowerRight: [],
        center: []
    },
    zoomLevel: [String],
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
    }],
    cadline: [{
        type: Schema.Types.ObjectId,
        ref: 'CadLineWork',
        index: true
    }],
    trialCount: {
        type: Number,
        default: 0
    }
}, {
    usePushEach: true
});

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: ''
        },
        'DFMSubscription': {
            select: ''
        },
        "others.serviceId": {
            select: ''
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Mission', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "others.serviceId user DFMSubscription", "others.serviceId user DFMSubscriptions"));
var model = {

    exceltotalMission: function (data, callback) {
        Mission.find({

        }).deepPopulate("user").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelMission: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["MISSION ID"] = mainData.missionId;
                if (mainData.user) {
                    obj["USER ID"] = mainData.user.dataId;
                } else {
                    obj["USER ID"] = "-";
                }

                obj["MISSION NAME"] = mainData.name;
                obj["STATUS"] = mainData.status;
                obj[" DATE"] = moment(mainData.createdAt).format("DD/MM/YYYY")
                if (mainData.cadline[0]) {
                    obj[" CADRQUEST"] = "Yes";
                } else {
                    obj[" CADRQUEST"] = "No";
                }
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },
    exceltotalMissionforUser: function (data, callback) {
        Mission.find({
            user: data._id
        }).deepPopulate("user").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelMissionforUser: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["MISSION ID"] = mainData.missionId;
                if (mainData.user) {
                    obj["USER ID"] = mainData.user.dataId;
                } else {
                    obj["USER ID"] = "-";
                }

                obj["MISSION NAME"] = mainData.name;
                obj["STATUS"] = mainData.status;
                obj[" DATE"] = moment(mainData.createdAt).format("DD/MM/YYYY")
                if (mainData.cadline[0]) {
                    obj[" CADRQUEST"] = "Yes";
                } else {
                    obj[" CADRQUEST"] = "No";
                }
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },


    getMissionUser: function (data, callback) {
        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        Mission.find({
                user: data.user
            })
            .deepPopulate("others.serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    getMissionForCad: function (data, callback) {
        Mission.find({
            user: data.user,
            status: "ready"
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (found) {
                callback(null, found);
            } else {
                callback("Invalid data", null);
            }
        });
    },

    totalMission: function (data, callback) {
        Mission.find({
            user: data.user,
        }).count().exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (found) {
                callback(null, found);
            } else {
                callback("Invalid data", null);
            }
        });
    },

    totalMissionCount: function (data, callback) {
        console.log("inside totalMissionCount", data)
        var currentSubscriptionDate = data.currentSubscriptionDate
        var ltDate = new Date();
        var data1;
        // console.log(currentSubscriptionDate)
        Mission.find({
            user: data.user,
            createdAt: {
                $gte: currentSubscriptionDate,
                $lte: ltDate
            }
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                console.log("emapty found")
                data = {
                    folderSize: 0 + " GB",
                    fileSize: 0,
                    missionCount: 0
                };
                callback(null, data);
            } else if (found) {
                console.log("FFFFound", found.length)
                var countFiles = 0;
                var a = 0;
                var foundLength = found.length;
                var totalSizeLenght = 0;

                async.each(found, function (x, cb1) {
                    console.log("----", x._id)
                    countFiles = countFiles + x.files.length
                    console.log("countFilescountFilescountFilescountFiles", countFiles)

                    var getSize = require('get-folder-size');
                    var path = 'pix4dUpload/' + x._id;
                    console.log("Path for folder", path)

                    console.log("else folder found")
                    path1 = path + '/' + x.missionId;
                    path2 = path + '/' + x.missionId + '.pdf'
                    if (!fs.existsSync(path)) {
                        totalSizeLenght++;
                        if (totalSizeLenght == foundLength) {
                            var toShow = (a / 1000000000).toFixed(8) + " GB";
                            data1 = {
                                folderSize: toShow,
                                fileSize: countFiles,
                                missionCount: found.length
                            };
                            console.log("Callback 222222", data1)
                            callback(null, data1);
                        }
                    } else {
                        if (fs.existsSync(path1) && fs.existsSync(path2)) {
                            console.log("inside both files found")
                            getSize(path, function (err, bytes) {
                                if (err) {
                                    throw err;
                                }
                                getSize(path1, function (err, b1) {
                                    if (err) {
                                        throw err;
                                    }
                                    getSize(path2, function (err, b2) {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log("************b1,b2,b3", bytes, b1, b2)
                                        var c=b1
                                        var c1 = c-b2
                                        bytes = bytes - c1
                                        console.log("bytessssssssssss", bytes)
                                        a = a + bytes;
                                        totalSizeLenght++;
                                        if (totalSizeLenght == foundLength) {
                                            var toShow = (a / 1000000000).toFixed(8) + " GB";
                                            data1 = {
                                                folderSize: toShow,
                                                fileSize: countFiles,
                                                missionCount: found.length
                                            };
                                            console.log("Callback 222222", data1)
                                            callback(null, data1);
                                        }
                                    })

                                })

                            })
                        } else if (fs.existsSync(path1)) {
                            console.log("inside path 1 found")
                            getSize(path, function (err, bytes) {
                                if (err) {
                                    throw err;
                                }
                                getSize(path1, function (err, b1) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log("inner folder********************", b1)
                                    console.log("oter folder %%%%%%%%%%%%%%%%%", bytes)
                                    var b2 = b1
                                    bytes = bytes - b2
                                    console.log("bytessssssssssss", bytes)
                                    a = a + bytes;
                                    totalSizeLenght++;
                                    if (totalSizeLenght == foundLength) {
                                        var toShow = (a / 1000000000).toFixed(8) + " GB";
                                        data1 = {
                                            folderSize: toShow,
                                            fileSize: countFiles,
                                            missionCount: found.length
                                        };
                                        console.log("Callback 111111111", data1)
                                        callback(null, data1);
                                    }

                                })

                            })
                        } else if (fs.existsSync(path2)) {
                            console.log("inside path 2 found")
                        } else {
                            console.log("Only  folder size")
                            getSize(path, function (err, bytes) {
                                if (err) {
                                    throw err;
                                }
                                a = a + bytes;
                                totalSizeLenght++;
                                if (totalSizeLenght == foundLength) {
                                    var toShow = (a / 1000000000).toFixed(8) + " GB";
                                    data1 = {
                                        folderSize: toShow,
                                        fileSize: countFiles,
                                        missionCount: found.length
                                    };
                                    console.log("Callback 222222", data1)
                                    callback(null, data1);
                                }
                            })

                        }
                    }

                   
                }, function (err) {
                    console.log("ERRRRRRRRRRRRrrrrr", err)
                    callback(err, null);
                })


            } else {
                callback("Invalid data", null);
            }
        });
    },


    createMission: function (data, callback) {
        // console.log("data", data);
        var sendAllData = {};
        sendAllData.missionName = data.name;
        counter = 0;
        async.waterfall([
            function (callback) { // generate mission id
                Mission.missionIdGenerate(data, function (err, data1) {
                    callback(null, data1);
                })
            },
            function (missionID, callback) { // generate mission id
                sendAllData.missionId = missionID;
                User.findOne({
                    _id: data.user
                }).exec(function (err, found) {
                    if (err || _.isEmpty(found)) {
                        callback(err, null);
                    } else {
                        sendAllData.userName = found.name;
                        sendAllData.userId = found.dataId;
                        sendAllData.email = found.email;
                        var foundObj = found.toObject();
                        var missionIdWithSub = {}
                        missionIdWithSub.missionId = missionID
                        if (!_.isEmpty(foundObj.currentSubscription)) {
                            DFMSubscription.findOne({
                                _id: foundObj.currentSubscription
                            }).exec(function (err, subFound) {
                                if (err || _.isEmpty(subFound)) {
                                    callback(err, null);
                                } else {
                                    missionIdWithSub.plan = subFound.name
                                    callback(null, missionIdWithSub);
                                }
                            });
                        } else {
                            callback(null, missionIdWithSub);
                        }
                    }

                });
            },
            function (missionIdWithSub, callback) { //create mission
                // console.log("missionIdWithSub.missionId", missionIdWithSub);
                data.missionId = missionIdWithSub.missionId;
                Mission.saveData(data, function (err, created) {
                    if (err) {
                        callback(err, null);
                    } else if (created) {
                        var directoryName = created._id.toString();
                        callback(null, "mission Created");
                        async.waterfall([
                            function makeDirOnAzure(callback) {
                                fileService.createDirectoryIfNotExists(shareName, directoryName, function (error) {
                                    if (error) {
                                        console.log("error", error);
                                        callback(err, null);
                                    } else {
                                        callback(null, directoryName);
                                    }
                                });
                            },
                            function concatFiles(directoryName, callback) {
                                async.concatLimit(created.files, 10, function (image, callback) {
                                    model.uploadFileToServer(directoryName, image, callback);
                                }, callback);
                            }
                        ], function asyncComplete(err, asyncData) {
                            if (err) {
                                callback(err, null);
                            } else {
                                console.log("---1---");
                                // callback(null, asyncData);
                                Mission.sendMissionRequestMail(sendAllData, callback); //sending mail
                                // model.pix4dCommandExecution(folder, missionIdWithSub, callback);
                            }
                        });
                    } else {
                        callback(null, {});
                    }
                });
            }
        ], function (err, data) { // execute Violation
            if (err || _.isEmpty(data)) {
                callback(null, "Error")
            } else {
                callback(null, data)
            }
        });
    },

    uploadFileToServer: function (directoryName, image, callback) {
        async.waterfall([
                // function (callback) {
                //     request(global["env"].realHost + '/api/upload/readFile?file=' + image.file).pipe(fs.createWriteStream(image.file)).on('finish', function (myImg) {
                //         console.log("imagessssssssssss", myImg);
                //         callback(null, myImg, image);
                //     }).on("error", function () {
                //         callback("Error while reading the file");
                //     });
                // },
                function (callback) {
                    var oldPath = path.join(path.join(process.cwd(), "pix4dUpload"), image.file);
                    // Uploading a local file to the directory created above
                    console.log('3. Uploading a file to directory', ++counter);
                    fileService.createFileFromLocalFile(shareName, directoryName, image.file, oldPath, function (error) {
                        if (error) {
                            console.log("error", error);
                            callback(error, null);
                        } else {
                            // List all files/directories under the root directory
                            fs.unlink(oldPath);
                            console.log('file saved successfully');
                            callback(null, path.join(directoryName, image.file));
                        }
                    });

                }
            ],
            function (err, data) {
                if (err) {
                    callback(null, err);
                } else {
                    console.log('file saved successfully', counter);
                    callback(null, data);
                }
            });
    },

    pix4dCommandExecution: function (imgPath, missionIdWithSub) {
        var name = missionIdWithSub.missionId;
        var templatePath = 'C:/Users/unifli/Documents/';
        if (missionIdWithSub.plan) {
            if (_.isEqual(missionIdWithSub.plan, "TRIAL")) {
                templatePath = templatePath + 'FREE.tmpl';
            } else if (_.isEqual(missionIdWithSub.plan, "STANDARD")) {
                templatePath = templatePath + 'STANDARD.tmpl';
            } else if (_.isEqual(missionIdWithSub.plan, "PREMIUM")) {
                templatePath = templatePath + 'PRO.tmpl';
            } else {
                templatePath = templatePath + 'FREE.tmpl';
            }
        } else {
            templatePath = templatePath + 'FREE.tmpl';
        }
        var pix4dPath = 'C:/Users/unifli/Documents/pix4d/' + name + '.p4d';
        // var pix4dPath = 'C:/Users/dell/Documents/pix4d/' + name + '.p4d'; ////for local 
        // console.log("inside pix4dCommandExecution", name, imgPath, pix4dPath);
        exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -n --image-dir ' + imgPath + ' --template ' + templatePath + ' ' + pix4dPath, {
            maxBuffer: 1024 * 500000
        }, function (error, stdout, stderr) {
            if (error) {
                console.log("\n error inside pix4dCommandExecution", error);
            } else if (stdout) {
                console.log("stdout inside----c -n---->>>>>>>>>>>> ", stdout);
                if (stdout.includes("database")) {
                    console.log("found------>>>>>>>>>>>", stdout.indexOf("from the user database"));

                    async.waterfall([
                        function runningAllProcessing(callback) {
                            console.log("inside runningAllProcessing 'cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r " + pix4dPath);
                            exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r ' + pix4dPath, {
                                maxBuffer: 1024 * 500000
                            }, function (error, stdout, stderr) {
                                if (error) {
                                    console.log("error inside runningAllProcessing--", error);
                                    callback(error, null)
                                } else if (stdout) {
                                    console.log("and its working----stdout");
                                    callback(null, "done");
                                } else {
                                    console.log("stderr", stderr);
                                    callback(error, null);
                                }
                            });
                        }

                        // function initialProcessing(callback) {
                        //     console.log("inside initialProcessing--");
                        //     exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -i ' + pix4dPath, {
                        //         maxBuffer: 1024 * 500000
                        //     }, function (error, stdout, stderr) {
                        //         if (error) {
                        //             console.log("error inside initialProcessing--", error);
                        //             callback(error, null)
                        //         } else if (stdout) {
                        //             console.log("initialProcessing---stdout");
                        //             callback(null, "done");
                        //         } else {
                        //             console.log("stderr", stderr);
                        //             callback(error, null);
                        //         }
                        //     });
                        // },
                        // function pointCloud(returnVal, callback) {
                        //     console.log("inside pointCloud---", returnVal);
                        //     exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -d ' + pix4dPath, {
                        //         maxBuffer: 1024 * 500000
                        //     }, function (error, stdout, stderr) {
                        //         if (error) {
                        //             console.log("error inside pointCloud---", error);
                        //             callback(error, null)
                        //         } else if (stdout) {
                        //             console.log("pointCloud----stdout");
                        //             callback(null, "done");
                        //         } else {
                        //             console.log("stderr", stderr);
                        //             callback(error, null);
                        //         }
                        //     });
                        // },
                        // function orthomosaic(returnVal, callback) {
                        //     console.log("inside orthomosaic---", returnVal);
                        //     exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -o ' + pix4dPath, {
                        //         maxBuffer: 1024 * 500000
                        //     }, function (error, stdout, stderr) {
                        //         if (error) {
                        //             console.log("error inside orthomosaic---", error);
                        //             callback(error, null)
                        //         } else if (stdout) {
                        //             console.log("orthomosaic-----stdout");
                        //             callback(null, "done");
                        //         } else {
                        //             console.log("stderr", stderr);
                        //             callback(error, null);
                        //         }
                        //     });
                        // }

                    ], function asyncComplete(err, data) {
                        if (err) {
                            console.warn('Error updating file status', err);
                            // callback(err, null);
                        } else {
                            console.log("succefully completed the waterfall---02");
                            // callback(null, data);
                        }
                    });
                }

            } else {
                console.log("stderr", stderr);
                // callback(null, stderr);

            }
        });
    },

    getMission: function (data, callback) {
        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        Mission.find({})
            .deepPopulate("others.serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    missionIdGenerate: function (data, callback) {
        Mission.find({}).sort({
            createdAt: -1
        }).limit(1).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found[0])) {
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth() + 1;
                    var nextnum = "1";
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var missionId = "M" + year + month + nextnum;
                    } else {
                        if (m == 2) {
                            var missionId = "m" + year + month + nextnum;
                        }
                    }
                    callback(null, missionId);
                } else {
                    if (_.isEmpty(found[0])) {
                        var year = new Date().getFullYear()
                        var month = new Date().getMonth() + 1;
                        var nextnum = "1";
                        var m = month.toString().length;
                        if (m == 1) {
                            month = "0" + month
                            var missionId = "M" + year + month + nextnum;
                        } else {
                            if (m == 2) {
                                var missionId = "m" + year + month + nextnum;
                            }
                        }
                        callback(null, missionId);
                    } else {
                        if (!found[0].missionId) {
                            var year = new Date().getFullYear()
                            var month = new Date().getMonth() + 1;
                            var nextnum = "1";
                            var m = month.toString().length;
                            if (m == 1) {
                                month = "0" + month
                                var missionId = "M" + year + month + nextnum;
                            } else {
                                if (m == 2) {
                                    var missionId = "m" + year + month + nextnum;
                                }
                            }
                            callback(null, missionId);
                        } else {
                            var missionId = found[0].missionId
                            var num = missionId.substring(7, 10000);
                            var nextnum = parseInt(num) + 1
                            var year = new Date().getFullYear()
                            var month = new Date().getMonth() + 1;
                            var m = month.toString().length;
                            if (m == 1) {
                                month = "0" + month
                                var missionId = "M" + year + month + nextnum;
                            } else {
                                if (m == 2) {
                                    var missionId = "M" + year + month + nextnum;
                                }
                            }
                            callback(null, missionId);
                        }
                    }
                }
            }

        });
    },

    //email function

    sendMissionRequestMail: function (data, callback) {
        async.parallel({
                forUser: function (callback) {
                    var emailData = {}
                    emailData.email = data.email;
                    emailData.filename = "Mission Started";
                    emailData.subject = "MISSION STARTED";
                    emailData.merge_vars = [{
                        "name": "MISSION_ID",
                        "content": data.missionId
                    }];
                    Config.email(emailData, function (err, emailRespo) {
                        console.log("emailRespo", emailRespo);
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (emailRespo) {
                            callback(null, "Contact us form saved successfully!!!");
                        } else {
                            callback("Invalid data", null);
                        }
                    });
                },
                forAdmin: function (callback) {
                    var creationDate = new Date();
                    var emailData = {}
                    emailData.email = global["env"].adminEmail;
                    emailData.filename = "New Mission Request (Admin)";
                    emailData.name = data.name;
                    emailData.subject = "NEW MISSION REQUEST";
                    emailData.merge_vars = [{
                        "name": "USER_NAME",
                        "content": data.userName
                    }, {
                        "name": "USER_ID",
                        "content": data.userId
                    }, {
                        "name": "MISSION_ID",
                        "content": data.missionId
                    }, {
                        "name": "MISSION_NAME",
                        "content": data.missionName
                    }, {
                        "name": "DATE_OF_CREATION",
                        "content": creationDate
                    }];

                    Config.email(emailData, function (err, emailRespo) {
                        // console.log("emailRespo", emailRespo);
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (emailRespo) {
                            callback(null, "Contact us form saved successfully!!!");
                        } else {
                            callback("Invalid data", null);
                        }
                    });
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    // callback(err, []);
                } else {
                    // callback(null, result);
                }
            });
    },

    sendMissionCompletedMail: function (data, callback) {
        User.findOne({
            _id: data.user
        }).exec(function (err, data1) {
            if (err) {
                callback(err, null);
            } else if (data1) {
                var emailData = {}
                emailData.email = data1.email;
                emailData.filename = "Mission Completed";
                emailData.subject = "MISSION COMPLETED";
                emailData.merge_vars = [{
                    "name": "MISSION_ID",
                    "content": data.missionid
                }];
                console.log("emailData------------", emailData);
                Config.email(emailData, function (err, emailRespo) {
                    // console.log("emailRespo", emailRespo);
                    if (err) {
                        console.log(err);
                        //callback(err, null);
                    } else if (emailRespo) {
                        //callback(null, "Contact us form saved successfully!!!");
                    } else {
                        // callback("Invalid data", null);
                    }
                });
            } else {
                callback("Invalid data", null);
            }
        });
    }

};

module.exports = _.assign(module.exports, exports, model);
``
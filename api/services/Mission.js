var cron = require('node-cron');
var path = require('path');
var request = require('request');
var geotiff = require('geotiff');
var epsg = require('epsg-to-proj');
var extents = require('geotiff-extents');
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
    name: {
        type: String,
        required: true,
        unique: true
    },
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
    date: Date,
    geoLocation: {
        upperLeft: [],
        lowerLeft: [],
        upperRight: [],
        lowerRight: [],
        center: []
    },

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

    getMissionUser: function (data, callback) {
        console.log("inside get ticket api", data)
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
            .deepPopulate("serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    console.log("inside paggingtion cadline file", found)

                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },
    getMissionForCad: function (data, callback) {
        console.log("inside get ticket api", data)
        Mission.find({
            user: data.user,
            status: "ready"
        }).exec(function (err, found) {
            console.log("inside paggingtion cadline file", found)

            if (err) {
                console.log(err);
                callback(err, null);
            } else if (found) {
                callback(null, found);
            } else {
                callback("Invalid data", null);
            }
        });
    },

    createMission: function (data, callback) {

        Mission.saveData(data, function (err, created) {
            if (err) {
                callback(err, null);
            } else if (created) {
                var dir;
                var folder;
                console.log("created", created, process.cwd());
                dir = path.join(process.cwd(), "pix4dUpload");
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                    folder = path.join(dir, created._id.toString());
                    fs.mkdirSync(folder)
                } else {
                    folder = path.join(dir, created._id.toString());
                    fs.mkdirSync(folder)
                }
                var missionName = created.name;
                async.waterfall([
                    function concatFiles(callback) {
                        console.log("inside concatFiles create", created.files);
                        async.concatLimit(created.files, 20, function (image, callback) {
                            model.uploadFileToServer(folder, image, callback);
                        }, callback);
                    }
                ], function asyncComplete(err, data) {
                    if (err) {
                        console.warn('Error updating file status', err);
                        callback(err, null);
                    } else {
                        console.log("succefully completed the waterfall");
                        callback(null, data);
                        model.pix4dCommandExecution(folder, missionName);
                    }
                });
            } else {
                callback(null, {});
            }
        });

    },

    uploadFileToServer: function (imgPath, image, callback) {
        console.log("inside uploadFileToServer---");
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
                    console.log("image", image);
                    var oldPath = path.join(path.join(process.cwd(), "pix4dUpload"), image.file);
                    var newPath = path.join(imgPath, image.file);
                    fs.rename(oldPath, newPath, function (err) {
                        if (err) {
                            callback(err, null);
                        } else {
                            console.log("folder", imgPath);
                            callback(null, imgPath);
                        }
                    });

                }
            ],
            function (err, data) {
                if (err) {
                    callback(null, err);
                } else {
                    console.log("data", data);
                    callback(null, data);
                }
            });
    },

    pix4dCommandExecution: function (imgPath, name) {
        // var pix4dPath = 'C:/Users/unifli/Documents/pix4d/' + name + '.p4d';
        var pix4dPath = 'C:/Users/dell/Documents/pix4d/' + name + '.p4d';
        console.log("inside pix4dCommandExecution", name, imgPath, pix4dPath);

        exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -n --image-dir ' + imgPath + ' ' + pix4dPath, {
            maxBuffer: 1024 * 5000
        }, function (error, stdout, stderr) {
            if (error) {
                console.log("\n error inside pix4dCommandExecution", error);
            } else if (stdout) {
                console.log("stdout inside----c -n---->>>>>>>>>>>> ", stdout);
                if (stdout.includes("database")) {
                    console.log("found------>>>>>>>>>>>", stdout.indexOf("from the user database"));

                    async.waterfall([
                        // function runningAllProcessing(callback) {
                        //     console.log("inside runningAllProcessing 'cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r " + pix4dPath);
                        //     exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r ' + pix4dPath, {
                        //         maxBuffer: 1024 * 5000
                        //     }, function (error, stdout, stderr) {
                        //         if (error) {
                        //             console.log("error inside runningAllProcessing--", error);
                        //             callback(error, null)
                        //         } else if (stdout) {
                        //             console.log("and its working----stdout");
                        //             callback(null, "done");
                        //         } else {
                        //             console.log("stderr", stderr);
                        //             callback(error, null);
                        //         }
                        //     });
                        // },

                        function initialProcessing(callback) {
                            console.log("inside initialProcessing--");
                            exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -i ' + pix4dPath, {
                                maxBuffer: 1024 * 5000
                            }, function (error, stdout, stderr) {
                                if (error) {
                                    console.log("error inside initialProcessing--", error);
                                    callback(error, null)
                                } else if (stdout) {
                                    console.log("initialProcessing---stdout");
                                    callback(null, "done");
                                } else {
                                    console.log("stderr", stderr);
                                    callback(error, null);
                                }
                            });
                        },
                        function pointCloud(returnVal, callback) {
                            console.log("inside pointCloud---", returnVal);
                            exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -d ' + pix4dPath, {
                                maxBuffer: 1024 * 5000
                            }, function (error, stdout, stderr) {
                                if (error) {
                                    console.log("error inside pointCloud---", error);
                                    callback(error, null)
                                } else if (stdout) {
                                    console.log("pointCloud----stdout");
                                    callback(null, "done");
                                } else {
                                    console.log("stderr", stderr);
                                    callback(error, null);
                                }
                            });
                        },
                        function orthomosaic(returnVal, callback) {
                            console.log("inside orthomosaic---", returnVal);
                            exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -o ' + pix4dPath, {
                                maxBuffer: 1024 * 5000
                            }, function (error, stdout, stderr) {
                                if (error) {
                                    console.log("error inside orthomosaic---", error);
                                    callback(error, null)
                                } else if (stdout) {
                                    console.log("orthomosaic-----stdout");
                                    callback(null, "done");
                                } else {
                                    console.log("stderr", stderr);
                                    callback(error, null);
                                }
                            });
                        }

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
            .deepPopulate("serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        console.log(err);
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

                if (_.isEmpty(found)) {
                    callback(null, "noDataFound");
                }
                if (_.isEmpty(found[0].missionId)) {
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    var nextnum = "1"
                    month = month + 1
                    var m = month.toString().length;
                    if (m == 1) {
                        month = "0" + month
                        var missionId = "M" + year + month + nextnum;
                        console.log("*********", missionId)
                    } else {
                        if (m == 2) {

                            var missionId = "m" + year + month + nextnum;
                            console.log("*********", missionId)
                        }
                    }
                    console.log("if  MissionId is emapty", missionId)
                    callback(null, missionId);
                } else {

                    var missionId = found[0].missionId
                    var num = missionId.substring(7, 100)
                    var nextnum = parseInt(num) + 1
                    var year = new Date().getFullYear()
                    var month = new Date().getMonth();
                    month = month + 2
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
        });
    },

};
// cron.schedule('1 * * * * *', function () {
//     Mission.find({
//         status: {
//             $ne: 'ready'
//         }
//     }, function (err, found) {
//         if (err) {
//             callback(err, null);
//         } else {
//             console.log(found.length);
//             var dsmList;
//             var mosaicList;
//             async.eachSeries(found, function (value, callback1) {
//                     console.log("value", value.name);
//                     dirName1 = 'C:/Users/dell/Documents/pix4d/' + value.name + '/3_dsm_ortho/2_mosaic';
//                     fs.readdir(dirName1, function (err, items) {
//                         console.log("inside dsm", items);
//                         _.forEach(items, function (val) {
//                             var extension = val.split(".").pop();
//                             extension = extension.toLowerCase();
//                             if (extension == 'tif') {
//                                 console.log("status-----", extension);
//                                 fs.readFile(dirName1 + '/' + val, function (err, data) {
//                                     if (err) {
//                                         console.log("err", err);
//                                         // throw err;
//                                     } else {
//                                         console.log("data", data);
//                                         dataArray = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

//                                         var im = geotiff.parse(dataArray).getImage()
//                                         var fd = im.getFileDirectory()
//                                         var gk = im.getGeoKeys()
//                                         //   value.status = "checked";
//                                         value.geoLocation = extents({
//                                             tiePoint: fd.ModelTiepoint,
//                                             pixelScale: fd.ModelPixelScale,
//                                             width: fd.ImageWidth,
//                                             height: fd.ImageLength,
//                                             proj: require('proj4'),
//                                             from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
//                                             to: epsg[4326]
//                                         });
//                                         value.save(function (err, data) {
//                                             if (err) {
//                                                 console.log("error occured");
//                                             } else {
//                                                 console.log(extents({
//                                                     tiePoint: fd.ModelTiepoint,
//                                                     pixelScale: fd.ModelPixelScale,
//                                                     width: fd.ImageWidth,
//                                                     height: fd.ImageLength,
//                                                     proj: require('proj4'),
//                                                     from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
//                                                     to: epsg[4326]
//                                                 }));
//                                                 callback1();
//                                             }
//                                         });

//                                     }
//                                 });
//                             }
//                         });
//                     });
//                     // write their api to update status if changed
//                 },
//                 function (err, results) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log("results", results);
//                         // callback();
//                     }
//                 });
//         }
//     });
// });

module.exports = _.assign(module.exports, exports, model);
``
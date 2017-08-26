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
                        model.pix4dCommandExecution(folder, missionName, callback);
                        // callback(null, data);
                    }
                });
            } else {
                callback(null, {});
            }
        });

    },
    uploadFileToServer: function (imgPath, image, callback) {
        console.log("inside uploadFileToServer---", global["env"].realHost + '/api/upload/readFile?file=' + image.file);
        async.waterfall([
                function (callback) {
                    request(global["env"].realHost + '/api/upload/readFile?file=' + image.file).pipe(fs.createWriteStream(image.file)).on('finish', function (myImg) {
                        console.log("imagessssssssssss", myImg);
                        callback(null, myImg, image);
                    }).on("error", function () {
                        callback("Error while reading the file");
                    });
                },
                function (myImg, image, callback) {
                    console.log("image", myImg, image);
                    var oldPath = path.join(process.cwd(), image.file);
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
    pix4dCommandExecution: function (imgPath, name, callback) {
        var pix4dPath = 'C:/Users/unifli/Documents/pix4d/' + name + '.p4d';
        // var pix4dPath = 'C:/Users/dell/Documents/pix4d/' + name + '.p4d';
        console.log("inside pix4dCommandExecution", name, imgPath, pix4dPath);

        exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -n --image-dir ' + imgPath + ' ' + pix4dPath, {
            maxBuffer: 1024 * 5000
        }, function (error, stdout, stderr) {
            if (error) {
                console.log("\n error inside pix4dCommandExecution", error);
            } else if (stdout) {
                console.log("stdout inside----c -n---->>>>>>>>>>>> ", stdout);
                if (stdout.includes("from the user database")) {
                    console.log("found------>>>>>>>>>>>", stdout.indexOf("from the user database"));

                    async.waterfall([
                        function runningAllProcessing(callback) {
                            console.log("inside runningAllProcessing 'cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r " + pix4dPath);
                            exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -r ' + pix4dPath, {
                                maxBuffer: 1024 * 5000
                            }, function (error, stdout, stderr) {
                                if (error) {
                                    console.log("error inside runningAllProcessing--", error);
                                    callback(error, null)
                                } else if (stdout) {
                                    console.log("stdout", stdout);
                                    callback(null, "done");
                                } else {
                                    console.log("stderr", stderr);
                                    callback(error, null);
                                }
                            });
                        },

                        function initialProcessing(msg, callback) {
                            console.log("inside initialProcessing--", msg);
                            exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -i ' + pix4dPath, {
                                maxBuffer: 1024 * 5000
                            }, function (error, stdout, stderr) {
                                if (error) {
                                    console.log("error inside initialProcessing--", error);
                                    callback(error, null)
                                } else if (stdout) {
                                    console.log("stdout", stdout);
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
                                    console.log("stdout", stdout);
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
                                    console.log("stdout", stdout);
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
                            callback(err, null);
                        } else {
                            console.log("succefully completed the waterfall---02");
                            callback(null, data);
                        }
                    });
                }

            } else {
                console.log("stderr", stderr);
                callback(null, stderr);

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
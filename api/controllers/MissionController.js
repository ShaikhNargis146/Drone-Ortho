module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var fs = require('fs');
var geotiff = require('geotiff');
var epsg = require('epsg-to-proj');
var extents = require('geotiff-extents');
var ConvertTiff = require('tiff-to-png');
var path = require('path');
var decode = require("decode-tiff");
var PNG = require('pngjs');
// var sharp = require('sharp');
var cron = require('node-cron');
var controller = {


    getMissionUser: function (req, res) {
        if (req.body) {
            Mission.getMissionUser(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },

    getCords: function (req, res) {
        console.log("path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))", path.join('./pix4dUpload', 'vashi_transparent_mosaic_group1.tif'));
        // var width, height, data = decode(fs.readFileSync(path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))));
        // var png = new PNG({
        //     width,
        //     height
        // });
        // png.data = data;
        // fs.writeFileSync(path.join(process.cwd(), "lena.png"), PNG.sync.write(png));

        // sharp(path.join('./pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))
        //     .webp()
        //     .toFile('./.tmp/vashi_transparent_mosaic_group1.webp', function (err, info) {
        //         console.log("err", err);
        //         console.log("done");
        //     });
        // converter = new ConvertTiff();
        // var imgPath = path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'));
        // console.log(imgPath);

        // var tiffs = [
        //     imgPath
        // ];
        // var location = path.join(process.cwd(), 'assets');
        // // Setup Callback 
        // converter.complete = function (errors, total) {
        //     // Do something with errors and/or total 
        //     console.log('Started converting %i TIFFs', errors);

        // };

        // converter.convertArray(tiffs, location);

        // fs.readFile('./pix4dUpload/vashi_transparent_mosaic_group1.tif', function (err, data) {
        //     if (err) {
        //         console.log("err", err);
        //         // throw err;
        //     } else {
        //         console.log("data", data);
        //         dataArray = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

        //         var im = geotiff.parse(dataArray).getImage()
        //         var fd = im.getFileDirectory()
        //         var gk = im.getGeoKeys()
        //         console.log(extents({
        //             tiePoint: fd.ModelTiepoint,
        //             pixelScale: fd.ModelPixelScale,
        //             width: fd.ImageWidth,
        //             height: fd.ImageLength,
        //             proj: require('proj4'),
        //             from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
        //             to: epsg[4326]
        //         }))
        //     }
        // });

    },
    missionIdGenerate: function (req, res) {
        if (req.body) {
            Mission.missionIdGenerate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
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

    },


    getMission: function (req, res) {
        if (req.body) {
            Mission.getMission(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },



    getSingleMissionData: function (req, res) {
        if (req.body) {
            Mission.getSingleMissionData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },
    getGeoLocation: function (req, res) {
        fs.readFile('./pix4dUpload/vashi_transparent_mosaic_group1.tif', function (err, data) {
            if (err) {
                console.log("err", err);
                // throw err;
            } else {
                console.log("data", data);
                dataArray = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

                var im = geotiff.parse(dataArray).getImage()
                var fd = im.getFileDirectory()
                var gk = im.getGeoKeys()
                console.log(extents({
                    tiePoint: fd.ModelTiepoint,
                    pixelScale: fd.ModelPixelScale,
                    width: fd.ImageWidth,
                    height: fd.ImageLength,
                    proj: require('proj4'),
                    from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
                    to: epsg[4326]
                }));
                var geoLoc = extents({
                    tiePoint: fd.ModelTiepoint,
                    pixelScale: fd.ModelPixelScale,
                    width: fd.ImageWidth,
                    height: fd.ImageLength,
                    proj: require('proj4'),
                    from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
                    to: epsg[4326]
                });
                return geoLoc;
            }
        });

    }

};

cron.schedule('1 * * * *', function () {
    Mission.find({
        status: {
            $ne: 'ready'
        }
    }, function (err, found) {
        if (err) {
            callback(err, null);
        } else {
            console.log(found.length);
            var dsmList;
            var mosaicList;
            var geoLocation;
            async.eachSeries(found, function (value, callback1) {
                    console.log("value", value.name);
                    dirName1 = 'C:/Users/unifli/Documents/pix4d/' + value.name + '/3_dsm_ortho/2_mosaic'
                    if (fs.existsSync(dirName1)) {
                        fs.readdir(dirName1, function (err, items) {
                            if (err) {
                                console.log("err-----1  ", err);
                                callback1();
                            } else {
                                console.log("inside dsm", items);
                                _.forEach(items, function (val) {
                                    var fileName = val.split(".");
                                    var extension = val.split(".").pop();
                                    extension = extension.toLowerCase();
                                    console.log("dirName1 + '/' + val", dirName1 + '/' + val);
                                    if (extension == 'tif') {
                                        console.log("status-----", extension, fileName[0]);
                                        async.waterfall([
                                                function (callback) {
                                                    fs.readFile(dirName1 + '/' + val, function (err, data) {
                                                        if (err) {
                                                            console.log("err", err);
                                                            callback(null, "err");
                                                        } else {
                                                            console.log("data f1 ", data);
                                                            callback(null, data);
                                                        }
                                                    });
                                                },
                                                function (data, callback) {
                                                    console.log("data inside f2 ", data);
                                                    if (data != "err") {
                                                        dataArray = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
                                                        var tiff = geotiff.parse(dataArray);
                                                        var im = geotiff.parse(dataArray).getImage()
                                                        var fd = im.getFileDirectory()
                                                        var gk = im.getGeoKeys()
                                                        var geoLoc;
                                                        try {
                                                            var geoLoc = extents({
                                                                tiePoint: fd.ModelTiepoint,
                                                                pixelScale: fd.ModelPixelScale,
                                                                width: fd.ImageWidth,
                                                                height: fd.ImageLength,
                                                                proj: require('proj4'),
                                                                from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
                                                                to: epsg[4326]
                                                            });
                                                            console.log("geoLocation ", geoLoc);
                                                            callback(null, geoLoc);
                                                        } catch (err) {
                                                            console.log("errrrrrrrr", err);
                                                            callback(null, "error");
                                                        }
                                                    } else {
                                                        console.log("errrrrrrrr in else");
                                                        callback(null, "error");
                                                    }
                                                },
                                                function (geoLocation, callback) {
                                                    console.log("geoLocation inside f3 ", geoLocation);
                                                    if (geoLocation != "error") {
                                                        value.status = "ready";
                                                        value.geoLocation = geoLocation;
                                                        value.save(function (err, data) {
                                                            if (err) {
                                                                console.log("error occured");
                                                                callback(null, err);
                                                            } else {

                                                                console.log("value.geoLocation", data.geoLocation);
                                                                callback(null, "done");
                                                            }
                                                        });
                                                    } else {
                                                        callback(null, "error");
                                                    }
                                                },
                                                function (msg, callback) {
                                                    console.log("fileName[0]----", fileName[0].split('_'));
                                                    var firstName = fileName[0].split('_');
                                                    console.log("fileName[0] ", './tmp/public/' + firstName[0] + '.png', dirName1 + '/' + val)
                                                    sharp(dirName1 + '/' + val)
                                                        .png()
                                                        .toFile('./.tmp/public/' + firstName[0] + '.png', function (err, info) {
                                                            console.log("done");
                                                            callback(null, "done");
                                                        });
                                                }
                                            ],
                                            function (err, data) {
                                                if (err) {
                                                    callback(null, err);
                                                } else {
                                                    console.log("waterfall completed successfully", data);
                                                    callback1();
                                                }
                                            });
                                    }
                                });
                            }
                        });
                    } else {
                        console.log("file doesn't exist");
                        callback1();
                    }
                    // write their api to update status if changed
                },
                function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("results", results);
                        // callback();
                    }
                });
        }
    });
});
module.exports = _.assign(module.exports, controller);
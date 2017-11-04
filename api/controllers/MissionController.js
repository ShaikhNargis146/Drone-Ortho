module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var fs = require('fs');
var fse = require('fs-extra')
var geotiff = require('geotiff');
var epsg = require('epsg-to-proj');
var extents = require('geotiff-extents');
var ConvertTiff = require('tiff-to-png');
var path = require('path');
var decode = require("decode-tiff");
var PNG = require('pngjs');
// var sharp = require('sharp');
var getSize = require('get-folder-size');
var cron = require('node-cron');
// var gdal = require("gdal");
var util = require('util');
var dms = require("dms-conversion");
var controller = {


    getMissionUser: function (req, res) {
        if (req.body) {
            Mission.getMissionUser(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },

    getMissionForCad: function (req, res) {
        if (req.body) {
            Mission.getMissionForCad(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },

    getCords: function (req, res) {
        console.log("path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))", path.join('./pix4dUpload', 'vashi_transparent_mosaic_group1.tif'));
        var ds;
        try {
            ds = gdal.open(path.join('./pix4dUpload', 'vashi_transparent_mosaic_group1.tif'));

            // raster dimensions
            var size = ds.rasterSize;
            console.log('Size is ' + size.x + ', ' + size.y);

            // geotransform
            var geotransform = ds.geoTransform;
            console.log('Origin = (' + geotransform[0] + ', ' + geotransform[3] + ')');
            console.log('Pixel Size = (' + geotransform[1] + ', ' + geotransform[5] + ')');
            console.log('GeoTransform =');
            console.log(geotransform);

            // corners
            var corners = {
                'upperLeft': {
                    x: 0,
                    y: 0
                },
                'upperRight': {
                    x: size.x,
                    y: 0
                },
                'lowerRight': {
                    x: size.x,
                    y: size.y
                },
                'lowerLeft': {
                    x: 0,
                    y: size.y
                },
                'center': {
                    x: size.x / 2,
                    y: size.y / 2
                }
            };

            var wgs84 = gdal.SpatialReference.fromEPSG(4326);
            var coord_transform = new gdal.CoordinateTransformation(ds.srs, wgs84);

            console.log('Corner Coordinates:');
            var corner_names = Object.keys(corners);
            var cornList = {}

            corner_names.forEach(function (corner_name) {
                // convert pixel x,y to the coordinate system of the raster
                // then transform it to WGS84
                var corner = corners[corner_name];
                var pt_orig = {
                    x: geotransform[0] + corner.x * geotransform[1] + corner.y * geotransform[2],
                    y: geotransform[3] + corner.x * geotransform[4] + corner.y * geotransform[5]
                };
                var pt_wgs84 = coord_transform.transformPoint(pt_orig);
                var cord = []
                cord.push(pt_wgs84.x)
                cord.push(pt_wgs84.y)
                cornList[corner_name.trim()] = cord
                console.log(cornList)
                var description = util.format('%s (%d, %d) (%s, %s)',
                    corner_name,
                    Math.floor(pt_orig.x * 100) / 100,
                    Math.floor(pt_orig.y * 100) / 100,
                    gdal.decToDMS(pt_wgs84.x, 'Long'),
                    gdal.decToDMS(pt_wgs84.y, 'Lat')
                );
                console.log(description);
            });
            console.log(cornList)
            console.log("srs: " + (ds.srs ? ds.srs.toWKT() : 'null'));
        } catch (err) {
            console.log("errrrrrrrr", err);
        }
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

    totalMission: function (req, res) {
        if (req.body) {
            Mission.totalMission(req.body, res.callback);
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
                console.log("data");
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

    },

    totalMissionCount: function (req, res) {
        if (req.body) {
            Mission.totalMissionCount(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },

    //generate zip for 3 files in mission details

    generateZipForMissionFiles: function (req, res) {
        var JSZip = require("jszip");
        var type = req.query;
        var zip = new JSZip();
        var folder = "./.tmp/";
        var path = moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".zip";
        var finalPath = folder + path;
        // var files = req.query.id.split(',');
        var name = req.param("filename");
        var files = [];
        files = ["C:/Users/unifli/Documents/pix4d/" + name + "/3_dsm_ortho/2_mosaic/" + name + "_transparent_mosaic_group1.tif", "C:/Users/unifli/Documents/pix4d/" + name + "/3_dsm_ortho/1_dsm/" + name + "_dsm.tfw"]
        async.eachSeries(files, function (image, callback) {
            // request(global["env"].realHost + '/api/upload/readFile?file=' + image).pipe(fs.createWriteStream(image)).on('finish', function (images) {
            // JSZip generates a readable stream with a "end" event,
            // but is piped here in a writable stream which emits a "finish" event.
            fs.readFile(image, function (err, imagesData) {
                if (err) {
                    res.callback(err, null);
                } else {
                    //Remove image
                    // fs.unlink(image);
                    // zip.file("file", content); ... and other manipulations
                    var n = image.split("/");
                    zip.file(n[n.length - 1], imagesData);
                    callback();
                }
            });
            // });
        }, function () {
            //Generate Zip file
            zip.generateNodeStream({
                    type: 'nodebuffer',
                    streamFiles: true
                })
                .pipe(fs.createWriteStream(finalPath))
                .on('finish', function (zipData) {
                    // JSZip generates a readable stream with a "end" event,
                    // but is piped here in a writable stream which emits a "finish" event.
                    fs.readFile(finalPath, function (err, zip) {
                        if (err) {
                            res.callback(err, null);
                        } else {
                            res.set('Content-Type', "application/octet-stream");
                            res.set('Content-Disposition', "attachment;filename=" + path);
                            res.send(zip);
                            fs.unlink(finalPath);
                        }
                    });
                });
        });
    },

    //for pointCloud

    generateZipForPointCloudFiles: function (req, res) {
        var JSZip = require("jszip");
        var type = req.query;
        var zip = new JSZip();
        var folder = "./.tmp/";
        var path = moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".zip";
        var finalPath = folder + path;
        // var files = req.query.id.split(',');
        var name = req.param("filename");
        var dirName = "C:/Users/unifli/Documents/pix4d/" + name + "/2_densification/point_cloud/";
        if (fs.existsSync(dirName)) {
            fs.readdir(dirName, function (err, found) {
                console.log("found------");
                var finalpath1 = "C:/Users/unifli/Documents/pix4d/" + name + "/2_densification/point_cloud/";
                async.eachSeries(found, function (image, callback) {
                    // request(global["env"].realHost + '/api/upload/readFile?file=' + image).pipe(fs.createWriteStream(image)).on('finish', function (images) {
                    // JSZip generates a readable stream with a "end" event,
                    // but is piped here in a writable stream which emits a "finish" event.
                    console.log("image--");
                    fs.readFile(finalpath1 + image, function (err, imagesData) {
                        if (err) {
                            res.callback(err, null);
                        } else {
                            //Remove image
                            // fs.unlink(image);
                            // zip.file("file", content); ... and other manipulations
                            console.log("imagesData---");
                            zip.file(image, imagesData);
                            callback();
                        }
                    });
                    // });
                }, function () {
                    //Generate Zip file
                    zip.generateNodeStream({
                            type: 'nodebuffer',
                            streamFiles: true
                        })
                        .pipe(fs.createWriteStream(finalPath))
                        .on('finish', function (zipData) {
                            // JSZip generates a readable stream with a "end" event,
                            // but is piped here in a writable stream which emits a "finish" event.
                            fs.readFile(finalPath, function (err, zip) {
                                if (err) {
                                    res.callback(err, null);
                                } else {
                                    res.set('Content-Type', "application/octet-stream");
                                    res.set('Content-Disposition', "attachment;filename=" + path);
                                    res.send(zip);
                                    fs.unlink(finalPath);
                                }
                            });
                        });
                });
            })
        }
    },
};

cron.schedule('1 * * * *', function () {
    Mission.find({
        status: {
            $nin: ['ready', 'failed']
        }
    }, function (err, found) {
        if (err) {
            callback(err, null);
        } else {
            console.log(found.length);
            var emailData={};
            var dsmList;
            var mosaicList;
            var geoLocation;
            async.eachSeries(found, function (value, callback1) {
                    // console.log("value", value);
                    emailData.user=value.user;
                    dirName1 = 'C:/Users/unifli/Documents/pix4d/' + value.missionId + '/3_dsm_ortho/2_mosaic'
                    // dirName1 = 'C:/Users/dell/Documents/pix4d/' + value.missionId + '/3_dsm_ortho/2_mosaic' //for local                 
                    if (fs.existsSync(dirName1)) {
                        fs.readdir(dirName1, function (err, items) {
                            if (err) {
                                console.log("err-----1  ", err);
                                callback1();
                            } else {
                                // console.log("inside dsm", items);
                                _.forEach(items, function (val) {
                                    var fileName = val.split(".");
                                    var extension = val.split(".").pop();
                                    extension = extension.toLowerCase();
                                    console.log("dirName1 + '/' + val", dirName1 + '/' + val);
                                    if (extension == 'tif') {
                                        console.log("status-----", extension, fileName[0]);
                                        async.waterfall([
                                                function (callback) {
                                                    try {
                                                        var ds = gdal.open(path.join(dirName1, val));
                                                        // raster dimensions
                                                        var size = ds.rasterSize;
                                                        console.log('Size is ' + size.x + ', ' + size.y);

                                                        // geotransform
                                                        var geotransform = ds.geoTransform;
                                                        console.log('GeoTransform =');
                                                        console.log(geotransform);

                                                        // corners
                                                        var corners = {
                                                            'upperLeft': {
                                                                x: 0,
                                                                y: 0
                                                            },
                                                            'upperRight': {
                                                                x: size.x,
                                                                y: 0
                                                            },
                                                            'lowerRight': {
                                                                x: size.x,
                                                                y: size.y
                                                            },
                                                            'lowerLeft': {
                                                                x: 0,
                                                                y: size.y
                                                            },
                                                            'center': {
                                                                x: size.x / 2,
                                                                y: size.y / 2
                                                            }
                                                        };

                                                        var wgs84 = gdal.SpatialReference.fromEPSG(4326);
                                                        var coord_transform = new gdal.CoordinateTransformation(ds.srs, wgs84);

                                                        console.log('Corner Coordinates:');
                                                        var corner_names = Object.keys(corners);
                                                        var cornList = {}

                                                        corner_names.forEach(function (corner_name) {
                                                            // convert pixel x,y to the coordinate system of the raster
                                                            // then transform it to WGS84
                                                            var corner = corners[corner_name];
                                                            var pt_orig = {
                                                                x: geotransform[0] + corner.x * geotransform[1] + corner.y * geotransform[2],
                                                                y: geotransform[3] + corner.x * geotransform[4] + corner.y * geotransform[5]
                                                            };
                                                            var pt_wgs84 = coord_transform.transformPoint(pt_orig);
                                                            var cord = [];
                                                            cord.push(pt_wgs84.x);
                                                            cord.push(pt_wgs84.y);
                                                            cornList[corner_name] = cord;
                                                        });
                                                        console.log(cornList)
                                                        callback(null, cornList);
                                                    } catch (err) {
                                                        console.log("errrrrrrrr", err);
                                                        callback(null, "error");
                                                    }
                                                    // fs.readFile(dirName1 + '/' + val, function (err, data) {
                                                    //     if (err) {
                                                    //         console.log("err", err);
                                                    //         callback(null, "err");
                                                    //     } else {
                                                    //         console.log("data f1 ", data);
                                                    //         callback(null, data);
                                                    //     }
                                                    // });
                                                },
                                                // function (data, callback) {
                                                //     console.log("data inside f2 ", data);
                                                //     if (data != "err") {
                                                //         dataArray = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
                                                //         var tiff = geotiff.parse(dataArray);
                                                //         var im = geotiff.parse(dataArray).getImage()
                                                //         var fd = im.getFileDirectory()
                                                //         var gk = im.getGeoKeys()
                                                //         var geoLoc;
                                                //         try {
                                                //             var geoLoc = extents({
                                                //                 tiePoint: fd.ModelTiepoint,
                                                //                 pixelScale: fd.ModelPixelScale,
                                                //                 width: fd.ImageWidth,
                                                //                 height: fd.ImageLength,
                                                //                 proj: require('proj4'),
                                                //                 from: epsg[gk.ProjectedCSTypeGeoKey || gk.GeographicTypeGeoKey],
                                                //                 to: epsg[4326]
                                                //             });
                                                //             console.log("geoLocation ", geoLoc);
                                                //             callback(null, geoLoc);
                                                //         } catch (err) {
                                                //             console.log("errrrrrrrr", err);
                                                //             callback(null, "error");
                                                //         }
                                                //     } else {
                                                //         console.log("errrrrrrrr in else");
                                                //         callback(null, "error");
                                                //     }
                                                // },
                                                function (geoLocation, callback) {
                                                    console.log("geoLocation inside f3 ", geoLocation);
                                                    if (geoLocation != "error") {
                                                        value.status = "ready";
                                                        value.geoLocation = geoLocation;
                                                        var tilePath = dirName1 + '/google_tiles'
                                                        fs.readdirSync(tilePath).filter(function (file) {
                                                            if (fs.statSync(tilePath + '/' + file).isDirectory()) {
                                                                console.log(file);
                                                                value.zoomLevel.push(file)
                                                            }
                                                        });
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
                                                    console.log("C:/Users/unifli/Documents/googleTile-Mosaic");
                                                    console.log("fileName[0]----", fileName[0].split('_'));
                                                    var oldPath = dirName1 + '/google_tiles'
                                                    var newPath = 'C:/Users/unifli/Documents/googleTile-Mosaic/' + value.missionId + 'google_tiles'

                                                    fse.copy(oldPath, newPath, err => {
                                                        if (err) console.error(err)
                                                        console.log('success!')
                                                    })
                                                }
                                            ],
                                            function (err, data) {
                                                if (err) {
                                                    callback(null, err);
                                                } else {
                                                    console.log("waterfall completed successfully", data);
                                                    Mission.sendMissionCompletedMail(emailData,callback);
                                                    callback1();
                                                }
                                            });
                                    }
                                });
                            }
                        });
                    } else {
                        var localDate = moment(value.createdAt).add(12, 'hours');
                        var currentDate = moment(new Date())
                        console.log("file doesn't exist", localDate, currentDate, moment(currentDate).isSameOrAfter(localDate));
                        if (moment(currentDate).isSameOrAfter(localDate)) {
                            value.status = "failed";
                            value.save(function (err, data) {
                                if (err) {
                                    console.log("error occured");
                                    callback1();
                                } else {
                                    console.log("value updated");
                                    callback1();
                                }
                            });
                        } else {
                            callback1();
                        }
                    }
                    // write their api to update status if changed
                },
                function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log("results", results);
                        // callback();
                    }
                });
        }
    });
});
module.exports = _.assign(module.exports, controller);
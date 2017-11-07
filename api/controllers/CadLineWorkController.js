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
var JSZip = require("jszip");
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

    createCad: function (req, res) {
        if (req.body) {
            CadLineWork.createCad(req.body, function (err, cadData) {
                res.callback(null, cadData);
                // console.log('m in external cad', cadData);
                if (!cadData.mission) {
                    controller.generatePng(cadData, res.callback);
                }
            });
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },


    totalCadReq: function (req, res) {
        if (req.body) {
            CadLineWork.totalCadReq(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
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
    generatePng: function (req, res) {
        // console.log("cadData", req);
        var cadData = req;
        async.waterfall([
                function (callback) {
                    try {
                        var ds = gdal.open(path.join(path.join(process.cwd(), "pix4dUpload"), cadData.orthoFile.file));
                        // raster dimensions
                        var size = ds.rasterSize;
                        // console.log('Size is ' + size.x + ', ' + size.y);

                        // geotransform
                        var geotransform = ds.geoTransform;
                        // console.log('GeoTransform =');
                        // console.log(geotransform);

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

                        // console.log('Corner Coordinates:');
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
                        // console.log(cornList)
                        callback(null, cornList);
                    } catch (err) {
                        console.log("errrrrrrrr", err);
                        callback(null, "error");
                    }

                    // fs.readFile(path.join(process.cwd(), "pix4dUpload") + '/' + cadData.orthoFile.file, function (err, data) {
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
                    // console.log("geoLocation inside f3 ", geoLocation);
                    if (geoLocation != "error") {
                        cadData.status = "initialized";
                        cadData.geoLocation = geoLocation;
                        CadLineWork.saveData(cadData, function (err, data) {
                            if (err) {
                                console.log("error occured");
                                callback(null, err);
                            } else {
                                // console.log("value.geoLocation", data.geoLocation);
                                callback(null, "done");
                            }
                        });
                    } else {
                        callback(null, "error");
                    }
                },
                function (msg, callback) {
                    // console.log("fileName[0]----", cadData.orthoFile.file);
                    var firstName = cadData.orthoFile.file.split(".");
                    var extension = cadData.orthoFile.file.split(".").pop();
                    // console.log("fileName[0] ", 'C:/Users/unifli/Documents/googleTile-Mosaic/' + firstName[0] + '.jpg', path.join(process.cwd(), "pix4dUpload") + '/' + cadData.orthoFile.file)
                    sharp(path.join(process.cwd(), "pix4dUpload") + '/' + cadData.orthoFile.file)
                        .jpeg()
                        .toFile('C:/Users/unifli/Documents/googleTile-Mosaic/' + firstName[0] + '.jpg', function (err, info) {
                            // console.log("done");
                            callback(null, "done");
                        });
                }
            ],
            function (err, data) {
                if (err) {
                    console.log("error occured")
                    // callback(null, err);
                } else {
                    console.log("waterfall completed successfully", data);
                }
            });
    },


    //************zip for adminCaDfileDownload***********//

    generateZipForAdmin: function (req, res) {
        var JSZip = require("jszip");
        var type = req.query;
        var zip = new JSZip();
        var folder = "./.tmp/";
        var path = moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".zip";
        var finalPath = folder + path;
        var files = req.query.id.split(',');
        async.eachSeries(files, function (image, callback) {
            request(global["env"].realHost + '/api/upload/readFile?file=' + image).pipe(fs.createWriteStream(image)).on('finish', function (images) {
                // JSZip generates a readable stream with a "end" event,
                // but is piped here in a writable stream which emits a "finish" event.
                fs.readFile(image, function (err, imagesData) {
                    if (err) {
                        res.callback(err, null);
                    } else {
                        //Remove image
                        fs.unlink(image);
                        // zip.file("file", content); ... and other manipulations
                        zip.file(image, imagesData);
                        callback();
                    }
                });
            });
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

    //graph api

    getInternalGraphDataForAdmin: function (req, res) {
        if (req.body) {
            CadLineWork.getInternalGraphDataForAdmin(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    getExternalGraphDataForAdmin: function (req, res) {
        if (req.body) {
            CadLineWork.getExternalGraphDataForAdmin(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    getGraphDataForAdmin: function (req, res) {
        if (req.body) {
            CadLineWork.getGraphDataForAdmin(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    //graph api for Users

    getAllOrdersGraphDataForUser: function (req, res) {
        if (req.body) {
            CadLineWork.getAllOrdersGraphDataForUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    getTotalAmtGraphDataForUser: function (req, res) {
        if (req.body) {
            CadLineWork.getTotalAmtGraphDataForUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    getGraphDataForUser: function (req, res) {
        if (req.body) {
            CadLineWork.getGraphDataForUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    //vendor billId

    saveVendorDetails: function (req, res) {
        if (req.body) {
            CadLineWork.saveVendorDetails(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    vendorBillIdGenerate: function (req, res) {
        if (req.body) {
            CadLineWork.vendorBillIdGenerate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }

    },

    missionIsPresent: function (req, res) {
        if (req.body) {
            CadLineWork.missionIsPresent(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    sendCadCompletedMail: function (req, res) {
        if (req.body) {
            CadLineWork.sendCadCompletedMail(req.body, res.callback);
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
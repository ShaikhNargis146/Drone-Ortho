module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var fs = require('fs');
var geotiff = require('geotiff');
var epsg = require('epsg-to-proj');
var extents = require('geotiff-extents');
var ConvertTiff = require('tiff-to-png');
var path = require('path');
var decode = require("decode-tiff");
var PNG = require('pngjs');
var sharp = require('sharp');
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

   CadIdgenerate: function (req, res) {
        if (req.body) {
            CadLineWork.CadIdgenerate(req.body, res.callback);
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
            CadLineWork.createCad(req.body, res.callback);
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
        console.log("cadData", req);
        var cadData = req;
        async.waterfall([
                function (callback) {
                    fs.readFile(path.join(process.cwd(), "pix4dUpload") + '/' + cadData.orthoFile[0].file, function (err, data) {
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
                        cadData.status = "initialized";
                        cadData.geoLocation = geoLocation;
                        CadLineWork.saveData(cadData, function (err, data) {
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
                    console.log("fileName[0]----", cadData.orthoFile[0].file);
                    var firstName = cadData.orthoFile[0].file.split(".");
                    var extension = cadData.orthoFile[0].file.split(".").pop();
                    console.log("fileName[0] ", './tmp/public/' + firstName[0] + '.png', path.join(process.cwd(), "pix4dUpload") + '/' + cadData.orthoFile[0].file)
                    sharp(path.join(process.cwd(), "pix4dUpload") + '/' + cadData.orthoFile[0].file)
                        .png()
                        .toFile('./.tmp/public/' + firstName[0] + '.png', function (err, info) {
                            console.log("done");
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
    }

};
module.exports = _.assign(module.exports, controller);
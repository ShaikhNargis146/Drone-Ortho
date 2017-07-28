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
    getCords: function (req, res) {
        console.log("path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))", path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif')))
        // var width, height, data = decode(fs.readFileSync(path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))));
        // var png = new PNG({
        //     width,
        //     height
        // });
        // png.data = data;
        // fs.writeFileSync(path.join(process.cwd(), "lena.png"), PNG.sync.write(png));
        // sharp(path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif')))
        //     .png()
        //     .toFile('output01.png', function (err, info) {
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
                }))
            }
        });

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

    }
};
module.exports = _.assign(module.exports, controller);
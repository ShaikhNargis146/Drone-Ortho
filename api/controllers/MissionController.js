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
var JSZip = require("jszip");
// var sharp = require('sharp');
var getSize = require('get-folder-size');
var cron = require('node-cron');
var gdal = require("gdal");
var util = require('util');
var dms = require("dms-conversion");
var msRestAzure = require('ms-rest-azure');
var ComputeManagementClient = require('azure-arm-compute');
var StorageManagementClient = require('azure-arm-storage');
var NetworkManagementClient = require('azure-arm-network');
var ResourceManagementClient = require('azure-arm-resource').ResourceManagementClient;
var computeManagement = require('azure-asm-compute');
var storage = require('azure-storage');
var clientId = global["env"].CLIENT_ID;
var domain = global["env"].DOMAIN;
var secret = global["env"].APPLICATION_SECRET;
var subscriptionId = global["env"].AZURE_SUBSCRIPTION_ID;
var resourceClient, computeClient, storageClient, networkClient;
//Sample Config
var randomIds = {};
var location = 'South Central US';
var accType = 'Standard_LRS';
// var resourceGroupName = 'myResourceGroup';
// var vmName = 'myVM1';
// var storageAccountName = 'csgac825e9687dfx4576x93f';
// var vnetName = 'myVMVNET';
// var subnetName = 'myVMSubnet';
// var publicIPName = 'myVMPublicIP'
// var networkInterfaceName = 'myVMVMNic'
// var ipConfigName = 'ipconfigmyVM';
// var domainNameLabel = 'gsourcedataoutlook.onmicrosoft.com'
// var osDiskName = 'myVM_OsDisk_1_fc1a7ced97274cf490c019aa14fec4c1';

var resourceGroupName = "unifliRG"; //_generateRandomId('testrg', randomIds);
var vmName = _generateRandomId('testvm', randomIds);
var storageAccountName = _generateRandomId('testac', randomIds);
var vnetName = _generateRandomId('testvnet', randomIds);
var subnetName = _generateRandomId('testsubnet', randomIds);
var publicIPName = _generateRandomId('testpip', randomIds);
var networkInterfaceName = _generateRandomId('testnic', randomIds);
var ipConfigName = _generateRandomId('testcrpip', randomIds);
var domainNameLabel = _generateRandomId('testdomainname', randomIds);
var osDiskName = _generateRandomId('testosdisk', randomIds);

var adminUsername = 'gsourcedata';
var adminPassword = 'MAlaKKA@12345';
// Ubuntu config
// var publisher = 'Canonical';
// var offer = 'UbuntuServer'; --bind_ip
// var sku = '16.04-LTS';
// var osType = 'Linux';

// // Windows config
var publisher = 'MicrosoftWindowsServer';
var offer = 'WindowsServer';
var sku = '2016-Datacenter';
var osType = 'Windows';
var serviceName = "cloudservice01";
var deploymentName = "deployment01";
var virualMachineName = "vm01";
var storageAccountName = "testingrgdiag690";
var diskContainerName = "testingVm_OsDisk_1_1c82d4718b1d428e82aa45025d235235";
var controller = {

    vmAzure: function (req, res) {
        msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, function (err, credentials, subscriptions) {
            if (err) return console.log("------------------------>>>>>>>>>>>>>", err);
            console.log('credentials', credentials, subscriptionId)
            resourceClient = new ResourceManagementClient(credentials, subscriptionId);
            computeClient = new ComputeManagementClient(credentials, subscriptionId);
            storageClient = new StorageManagementClient(credentials, subscriptionId);
            networkClient = new NetworkManagementClient(credentials, subscriptionId);
            async.series([
                    // function (callback) {
                    ///////////////////////////////////////////////////////////////////////////////////
                    //Task1: Create VM. This is a fairly complex task. Hence we have a wrapper method//
                    //named createVM() that encapsulates the steps to create a VM. Other tasks are   //
                    //fairly simple in comparison. Hence we don't have a wrapper method for them.    //
                    ///////////////////////////////////////////////////////////////////////////////////
                    // console.log('\n>>>>>>>Start of Task1: Create a VM named: ' + vmName);
                    // computeClient.virtualMachineImages.list(location, publisher, offer, sku, function (err, result, request, response) {
                    //     if (err) console.log(err);
                    //     console.log(result);
                    // });
                    // computeClient.virtualMachines.listAll(function (err, result) {
                    //     if (err) {
                    //         console.log(util.format('\n???????Error in Task5: while listing all the vms under ' +
                    //             'the current subscription:\n%s', util.inspect(err, {
                    //                 depth: null
                    //             })));
                    //         callback(err);
                    //     } else {
                    //         console.log(util.format('\n######End of Task5: List all the vms under the current ' +
                    //             'subscription is successful.\n%s', util.inspect(result, {
                    //                 depth: null
                    //             })));
                    //         callback(null, result);
                    //     }
                    // });
                    // createVM(function (err, result) {
                    //     if (err) {
                    //         console.log(util.format('\n???????Error in Task1: while creating a VM:\n%s',
                    //             util.inspect(err, {
                    //                 depth: null
                    //             })));
                    //         callback(err);
                    //     } else {
                    //         console.log(util.format('\n######End of Task1: Create a VM is succesful.\n%s',
                    //             util.inspect(result, {
                    //                 depth: null
                    //             })));
                    //         callback(null, result);
                    //     }
                    // });

                    // var vmParameters = {
                    //     location: location,
                    //     osProfile: {
                    //         computerName: vmName,
                    //         adminUsername: adminUsername,
                    //         adminPassword: adminPassword
                    //     },
                    //     hardwareProfile: {
                    //         vmSize: 'Basic_A0'
                    //     },
                    //     storageProfile: {
                    //         imageReference: {
                    //             publisher: publisher,
                    //             offer: offer,
                    //             sku: sku,
                    //             version: "latest",
                    //             id: '/subscriptions/ac825e96-87df-4576-93fb-5a3f24840ed2/resourceGroups/myRG/providers/Microsoft.Compute/images/myVM-image-20171206123151'
                    //         },
                    //         osDisk: {
                    //             name: osDiskName,
                    //             caching: 'None',
                    //             createOption: 'fromImage'
                    //         }
                    //     },
                    //     networkProfile: {
                    //         networkInterfaces: [{
                    //             id: '/subscriptions/ac825e96-87df-4576-93fb-5a3f24840ed2/resourceGroups/myrg/providers/Microsoft.Storage/storageAccounts/myrgdiag631',
                    //             primary: true
                    //         }]
                    //     }
                    // };
                    // console.log('\n6.Creating Virtual Machine: ' + vmName);
                    // console.log('\n VM create parameters: ' + util.inspect(vmParameters, {
                    //     depth: null
                    // }));
                    // computeClient.virtualMachines.createOrUpdate(resourceGroupName, vmName, vmParameters, callback);

                    // },
                    // function (callback) {
                    //     /////////////////////////////////////////////////////////
                    //     //Task2: Get Information about the vm created in Task1.//
                    //     /////////////////////////////////////////////////////////
                    //     console.log('\n>>>>>>>Start of Task2: Get VM Info about VM: ' + vmName);
                    //     computeClient.virtualMachines.get(resourceGroupName, vmName, {
                    //         expand: 'instanceView'
                    //     }, function (err, result) {
                    //         if (err) {
                    //             console.log(util.format('\n???????Error in Task2: while getting the VM Info:\n%s',
                    //                 util.inspect(err, {
                    //                     depth: null
                    //                 })));
                    //             callback(err);
                    //         } else {
                    //             console.log("result.instanceView", result.instanceView);
                    //             console.log(util.format('\n######End of Task2: Get VM Info is successful.\n%s',
                    //                 util.inspect(result, {
                    //                     depth: null
                    //                 })));
                    //             callback(null, result);
                    //         }
                    //     });
                    // },
                    // function (callback) {
                    //     ///////////////////////////
                    //     //Task3: Poweroff the VM.//
                    //     ///////////////////////////
                    //     console.log('\n>>>>>>>Start of Task3: Poweroff the VM: ' + vmName);
                    //     computeClient.virtualMachines.powerOff(resourceGroupName, vmName, function (err, result) {
                    //         if (err) {
                    //             console.log(util.format('\n???????Error in Task3: while powering off the VM:\n%s',
                    //                 util.inspect(err, {
                    //                     depth: null
                    //                 })));
                    //             callback(err);
                    //         } else {
                    //             console.log(util.format('\n######End of Task3: Poweroff the VM is successful.\n%s',
                    //                 util.inspect(result, {
                    //                     depth: null
                    //                 })));
                    //             callback(null, result);
                    //         }
                    //     });
                    // },
                    // function (callback) {
                    //     ////////////////////////
                    //     //Task4: Start the VM.//
                    //     ////////////////////////
                    //     console.log('\n>>>>>>>Start of Task4: Start the VM: ' + vmName);
                    //     computeClient.virtualMachines.start(resourceGroupName, vmName, function (err, result) {
                    //         if (err) {
                    //             console.log(util.format('\n???????Error in Task4: while starting the VM:\n%s',
                    //                 util.inspect(err, {
                    //                     depth: null
                    //                 })));
                    //             callback(err);
                    //         } else {
                    //             console.log(util.format('\n######End of Task4: Start the VM is successful.\n%s',
                    //                 util.inspect(result, {
                    //                     depth: null
                    //                 })));
                    //             callback(null, result);
                    //         }
                    //     });
                    // },
                    function (callback) {
                        //////////////////////////////////////////////////////
                        //Task5: Lisitng All the VMs under the subscription.//
                        //////////////////////////////////////////////////////
                        console.log('\n>>>>>>>Start of Task5: List all vms under the current subscription.');
                        computeClient.virtualMachines.listAll(function (err, result) {
                            if (err) {
                                console.log(util.format('\n???????Error in Task5: while listing all the vms under ' +
                                    'the current subscription:\n%s', util.inspect(err, {
                                        depth: null
                                    })));
                                callback(err);
                            } else {
                                console.log(util.format('\n######End of Task5: List all the vms under the current ' +
                                    'subscription is successful.\n%s'));
                                _.forEach(result, function (value) {
                                    console.log(value);
                                    console.log(value.name);
                                    computeClient.virtualMachines.get(resourceGroupName, value.name, {
                                        expand: 'instanceView'
                                    }, function (err, result) {
                                        if (err) console.log(err);
                                        console.log(result.instanceView.statuses[1].displayStatus);
                                    });
                                });

                                callback(null, result);
                            }
                        });
                    }
                ],
                //final callback to be run after all the tasks
                function (err, results) {
                    if (err) {
                        console.log(util.format('\n??????Error occurred in one of the operations.\n%s',
                            util.inspect(err, {
                                depth: null
                            })));
                    } else {
                        // console.log(util.format('\n######All the operations have completed successfully. ' +
                        //     'The final set of results are as follows:\n%s', util.inspect(results, {
                        //         depth: null
                        //     })));
                        console.log(util.format('\n\n-->Please execute the following script for cleanup:\nnode cleanup.js %s %s', resourceGroupName, vmName));
                    }
                    return;
                });
        });
    },
    vmFileStorage: function (req, res) {
        var fileService = storage.createFileService('DefaultEndpointsProtocol=https;AccountName=uniflirgdiag391;AccountKey=hEiJdKu0GiMFwVtVCqKTJ8n7+7netu5Y4yd4rDjAg8x8RGxZA7E0a4BI3v1V8EkrDBlakpUu1aiqNNIESMWXMg==;EndpointSuffix=core.windows.net');

        var imageToUpload = "MissionApi.js";
        var shareName = "unifli-file-share"
        var directoryName = "demofiledirectory";
        var fileName = "demobfile-" + imageToUpload;

        console.log('Basic File Sample');

        // Create a share for organizing files within the storage account.
        console.log('1. Creating file share');
        fileService.createShareIfNotExists(shareName, function (error) {
            if (error) {
                console.log("error", error);
            } else {
                // Create a directory under the root directory
                console.log('2. Creating a directory under the root directory');
                fileService.createDirectoryIfNotExists(shareName, directoryName, function (error) {
                    if (error) {
                        console.log("error", error);
                    } else {
                        // Uploading a local file to the directory created above
                        console.log('3. Uploading a file to directory');
                        fileService.createFileFromLocalFile(shareName, directoryName, fileName, imageToUpload, function (error) {
                            if (error) {
                                console.log("error", error);
                            } else {
                                // List all files/directories under the root directory
                                console.log('file saved successfully');
                            }
                        });
                    }
                });
            }
        });
    },

    generatecsvForUser: function (req, res) {
        Mission.exceltotalMissionforUser(req.body, function (err, data) {
            data.name = "missionUser"
            Config.jsonTOCsvConvert(data, function (csv) {
                _.cloneDeep(csv);
                res.set('Content-Type', "application/CSV");
                res.set('Content-Disposition', "attachment;filename=" + csv.path);
                res.send(csv.csvData);
            });
        });
    },
    generatecsv: function (req, res) {
        Mission.exceltotalMission(req.body, function (err, data) {
            data.name = "mission"
            Config.jsonTOCsvConvert(data, function (csv) {
                _.cloneDeep(csv);
                res.set('Content-Type', "application/CSV");
                res.set('Content-Disposition', "attachment;filename=" + csv.path);
                res.send(csv.csvData);
            });
        });
    },
    generatePdfForUser: function (req, res) {
        Mission.exceltotalMissionforUser(req.body, function (err, data) {
            data.name = "missionUser"
            Config.generatePdfFormatData(data, function (pdf) {
                _.cloneDeep(pdf);
                res.set('Content-Type', "application/pdf");
                res.set('Content-Disposition', "attachment;filename=" + pdf.path);
                res.send(pdf.pdfData);
            });
        });
    },
    generatePdf: function (req, res) {
        Mission.exceltotalMission(req.body, function (err, data) {
            data.name = "mission"
            Config.generatePdfFormatData(data, function (pdf) {
                _.cloneDeep(pdf);
                res.set('Content-Type', "application/pdf");
                res.set('Content-Disposition', "attachment;filename=" + pdf.path);
                res.send(pdf.pdfData);
            });
        });
    },
    exceltotalMission: function (req, res) {
        Mission.exceltotalMission(req.body, function (err, data) {
            Mission.generateExcelMission(data, function (err, singleData) {
                Config.generateExcel("CadExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
    },
    exceltotalMissionforUser: function (req, res) {
        Mission.exceltotalMissionforUser(req.body, function (err, data) {
            Mission.generateExcelMissionforUser(data, function (err, singleData) {
                Config.generateExcel("CadExcel", singleData, function (excels) {
                    // console.log("excel", excels, "err", err);
                    res.set('Content-Type', "application/octet-stream");
                    res.set('Content-Disposition', "attachment;filename=" + excels.path);
                    res.send(excels.excel);
                });
            });
        });
    },

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
        // console.log("path.join(process.cwd(), path.join('pix4dUpload', 'vashi_transparent_mosaic_group1.tif'))", path.join('./pix4dUpload', 'vashi_transparent_mosaic_group1.tif'));
        var ds;
        try {
            ds = gdal.open(path.join('./pix4dUpload', 'vashi_transparent_mosaic_group1.tif'));

            // raster dimensions
            var size = ds.rasterSize;
            // console.log('Size is ' + size.x + ', ' + size.y);

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
                cornList[corner_name.trim()] = cord.reverse();
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
        var type = req.query;
        var zip = new JSZip();
        var folder = "./.tmp/";
        var path = moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".zip";
        var finalPath = folder + path;
        // var files = req.query.id.split(',');
        var name = req.param("filename");
        var id = req.param("id");
        var files = [];
        files = ["/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/2_mosaic/" + name + "_transparent_mosaic_group1.tif", "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/2_mosaic/" + name + "_transparent_mosaic_group1.tfw"]
        async.eachSeries(files, function (image, callback) {
            // request(global["env"].realHost + '/api/upload/readFile?file=' + image).pipe(fs.createWriteStream(image)).on('finish', function (images) {
            // JSZip generates a readable stream with a "end" event,
            // but is piped here in a writable stream which emits a "finish" event.
            console.log("image", image);
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
        console.log(req.body);
        var zip = new JSZip();
        var folder = "./.tmp/";
        var path = moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".zip";
        var finalPath = folder + path;
        // var files = req.query.id.split(',');
        var name = req.body.filename;
        var id = req.body.id;
        //" /mymountpoint/5a54c7da9c64c776608e48c4/M2018011/2_densification/point_cloud"
        var dirName = "/mymountpoint/" + id + "/" + +name + "/2_densification/point_cloud/";
        console.log("dirname", dirName);
        console.log("files exists------");
        fs.readdir(dirName, function (err, found) {
            console.log("found------", found);
            if (found) {
                res.json({
                    value: true,
                    data: found
                });
            } else {
                res.json({
                    value: true,
                    data: "files not found"
                });
            }
        })
    }
};


function _generateRandomId(prefix, exsitIds) {
    var newNumber;
    while (true) {
        newNumber = prefix + Math.floor(Math.random() * 10000);
        if (!exsitIds || !(newNumber in exsitIds)) {
            break;
        }
    }
    return newNumber;
}


// Helper functions
function createVM(finalCallback) {
    //We could have had an async.series over here as well. However, we chose to nest
    //the callbacks to showacase a different pattern in the sample.
    // createResourceGroup(function (err, result) {
    //     if (err) return finalCallback(err);
    // createStorageAccount(function (err, accountInfo) {
    //     if (err) return finalCallback(err);
    createVnet(function (err, vnetInfo) {
        if (err) return finalCallback(err);
        console.log('\nCreated vnet:\n' + util.inspect(vnetInfo, {
            depth: null
        }));
        getSubnetInfo(function (err, subnetInfo) {
            if (err) return finalCallback(err);
            console.log('\nFound subnet:\n' + util.inspect(subnetInfo, {
                depth: null
            }));
            createPublicIP(function (err, publicIPInfo) {
                if (err) return finalCallback(err);
                console.log('\nCreated public IP:\n' + util.inspect(publicIPInfo, {
                    depth: null
                }));
                createNIC(subnetInfo, publicIPInfo, function (err, nicInfo) {
                    if (err) return finalCallback(err);
                    console.log('\nCreated Network Interface:\n' + util.inspect(nicInfo, {
                        depth: null
                    }));
                    findVMImage(function (err, vmImageInfo) {
                        if (err) return finalCallback(err);
                        console.log('\nFound Vm Image:\n' + util.inspect(vmImageInfo, {
                            depth: null
                        }));
                        getNICInfo(function (err, nicResult) {
                            if (err) {
                                console.log('Could not get the created NIC: ' + networkInterfaceName + util.inspect(err, {
                                    depth: null
                                }));
                            } else {
                                console.log('Found the created NIC: \n' + util.inspect(nicResult, {
                                    depth: null
                                }));
                            }
                            createVirtualMachine(nicInfo.id, vmImageInfo[0].name, function (err, vmInfo) {
                                if (err) return finalCallback(err);
                                return finalCallback(null, vmInfo);
                            });
                        });
                    });
                });
            });
        });
    });
    // });
    // });
}

function createResourceGroup(callback) {
    var groupParameters = {
        location: location,
        tags: {
            sampletag: 'sampleValue'
        }
    };
    console.log('\n1.Creating resource group: ' + resourceGroupName);
    return resourceClient.resourceGroups.createOrUpdate(resourceGroupName, groupParameters, callback);
}

function createStorageAccount(callback) {
    console.log('\n2.Creating storage account: ' + storageAccountName);
    var createParameters = {
        location: location,
        sku: {
            name: accType,
        },
        kind: 'Storage',
        tags: {
            tag1: 'val1',
            tag2: 'val2'
        }
    };
    return storageClient.storageAccounts.create(resourceGroupName, storageAccountName, createParameters, callback);
}

function createVnet(callback) {
    var vnetParameters = {
        location: location,
        addressSpace: {
            addressPrefixes: ['10.0.0.0/16']
        },
        dhcpOptions: {
            dnsServers: ['10.1.1.1', '10.1.2.4']
        },
        subnets: [{
            name: subnetName,
            addressPrefix: '10.0.0.0/24'
        }],
    };
    console.log('\n3.Creating vnet: ' + vnetName);
    return networkClient.virtualNetworks.createOrUpdate(resourceGroupName, vnetName, vnetParameters, callback);
}

function getSubnetInfo(callback) {
    console.log('\nGetting subnet info for: ' + subnetName);
    return networkClient.subnets.get(resourceGroupName, vnetName, subnetName, callback);
}

function createPublicIP(callback) {
    var publicIPParameters = {
        location: location,
        publicIPAllocationMethod: 'Dynamic',
        dnsSettings: {
            domainNameLabel: domainNameLabel
        }
    };
    console.log('\n4.Creating public IP: ' + publicIPName);
    return networkClient.publicIPAddresses.createOrUpdate(resourceGroupName, publicIPName, publicIPParameters, callback);
}

function createNIC(subnetInfo, publicIPInfo, callback) {
    var nicParameters = {
        location: location,
        ipConfigurations: [{
            name: ipConfigName,
            privateIPAllocationMethod: 'Dynamic',
            subnet: subnetInfo,
            publicIPAddress: publicIPInfo
        }]
    };
    console.log('\n5.Creating Network Interface: ' + networkInterfaceName);
    return networkClient.networkInterfaces.createOrUpdate(resourceGroupName, networkInterfaceName, nicParameters, callback);
}

function findVMImage(callback) {
    console.log(util.format('\nFinding a VM Image for location %s from ' +
        'publisher %s with offer %s and sku %s', location, publisher, offer, sku));
    return computeClient.virtualMachineImages.list(location, publisher, offer, sku, {
        top: 1
    }, callback);
}

function getNICInfo(callback) {
    return networkClient.networkInterfaces.get(resourceGroupName, networkInterfaceName, callback);
}

function createVirtualMachine(nicId, vmImageVersionNumber, callback) {
    var vmParameters = {
        location: location,
        osProfile: {
            computerName: vmName,
            adminUsername: adminUsername,
            adminPassword: adminPassword
        },
        hardwareProfile: {
            vmSize: 'Basic_A0'
        },
        storageProfile: {
            imageReference: {
                id: '/subscriptions/ac825e96-87df-4576-93fb-5a3f24840ed2/resourceGroups/myRG/providers/Microsoft.Compute/images/myVM-image-20171206123151'
            },
            osDisk: {
                name: osDiskName,
                caching: 'None',
                createOption: 'fromImage'
            }
        },
        networkProfile: {
            networkInterfaces: [{
                id: nicId,
                primary: true
            }]
        }
    };
    console.log('\n6.Creating Virtual Machine: ' + vmName);
    console.log('\n VM create parameters: ' + util.inspect(vmParameters, {
        depth: null
    }));
    computeClient.virtualMachines.createOrUpdate(resourceGroupName, vmName, vmParameters, callback);
}

function _validateEnvironmentVariables() {
    var envs = [];
    if (!process.env['CLIENT_ID']) envs.push('CLIENT_ID');
    if (!process.env['DOMAIN']) envs.push('DOMAIN');
    if (!process.env['APPLICATION_SECRET']) envs.push('APPLICATION_SECRET');
    if (!process.env['AZURE_SUBSCRIPTION_ID']) envs.push('AZURE_SUBSCRIPTION_ID');
    if (envs.length > 0) {
        throw new Error(util.format('please set/export the following environment variables: %s', envs.toString()));
    }
}

function listOfFreeVMs(callback) {
    msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, function (err, credentials, subscriptions) {
        if (err) {
            console.log("loginWithServicePrincipalSecret", err);
            callback(err, null);
        }
        computeClient = new ComputeManagementClient(credentials, subscriptionId);
        console.log('\n>>>>>>>Start of: List all vms under the current subscription.');
        computeClient.virtualMachines.listAll(function (err, result) {
            if (err) {
                console.log(util.format('\n???????Error in : while listing all the vms under ' +
                    'the current subscription:\n%s', util.inspect(err, {
                        depth: null
                    })));
                callback(err, null);
            } else {
                console.log(util.format('\n######End of : List all the vms under the current ' +
                    'subscription is successful.\n%s'));
                var VMs = [];
                async.each(result, function (value, callback1) {
                    console.log(value.name);
                    computeClient.virtualMachines.get(resourceGroupName, value.name, {
                        expand: 'instanceView'
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        }
                        console.log(result.instanceView.statuses[1].displayStatus);
                        if (result.instanceView.statuses[1].displayStatus.includes("deallocated")) {
                            VMs.push(value.name);
                        }
                        callback1();
                    });

                }, function (err) {
                    if (err) {
                        console.log("Error grabbing data");
                        callback(err, null);
                    } else {
                        console.log("Finished processing all data", VMs);
                        callback(null, VMs);

                    }
                });
            }
        });
    });
}
cron.schedule('1 * * * * *', function () {
    Mission.find({
        status: {
            $nin: ['ready', 'failed', 'In Progress']
        }
    }, function (err, found) {
        if (err || _.isEmpty(found)) {
            console.log("err or empty");
            // callback(err, null);
        } else {
            console.log(found.length);
            var emailData = {};
            var dsmList;
            var mosaicList;
            var geoLocation;
            async.eachSeries(found, function (value, callback1) {
                    console.log("value", value.missionId);
                    emailData.user = value.user;
                    emailData.missionid = value.missionId
                    dirName1 = '/mymountpoint/' + value._id + '/' + value.missionId + '/3_dsm_ortho/2_mosaic'
                    // dirName1 = 'C:/Users/dell/Documents/pix4d/' + value.missionId + '/3_dsm_ortho/2_mosaic' //for local                 
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
                                    // console.log("dirName1 + '/' + val", dirName1 + '/' + val);
                                    if (extension == 'tif') {
                                        // console.log("status-----", extension, fileName[0]);
                                        async.waterfall([
                                                function (callback) {
                                                    try {
                                                        var ds = gdal.open(path.join(dirName1, val));
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
                                                            cornList[corner_name.trim()] = cord.reverse();
                                                        });
                                                        // console.log(cornList)
                                                        callback(null, cornList);
                                                    } catch (err) {
                                                        console.log("errrrrrrrr", err);
                                                        callback1();
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
                                                    // console.log("geoLocation inside f3 ", geoLocation);
                                                    if (geoLocation != "error") {
                                                        value.status = "ready";
                                                        value.geoLocation = geoLocation;
                                                        var tilePath = dirName1 + '/google_tiles'
                                                        fs.readdirSync(tilePath).filter(function (file) {
                                                            if (fs.statSync(tilePath + '/' + file).isDirectory()) {
                                                                // console.log(file);
                                                                value.zoomLevel.push(file)
                                                            }
                                                        });
                                                        value.save(function (err, data) {
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
                                                    // console.log("C:/Users/unifli/Documents/googleTile-Mosaic");
                                                    // console.log("fileName[0]----", fileName[0].split('_'));
                                                    var oldPath = dirName1 + '/google_tiles'
                                                    var newPath = '/home/unifliubuntu/myApp/googleTile-Mosaic/' + value.missionId + 'google_tiles'

                                                    fse.copy(oldPath, newPath, err => {
                                                        if (err) console.error(err)
                                                        // console.log('success!')
                                                        callback(null, "done");
                                                    })
                                                }
                                            ],
                                            function (err, data) {
                                                if (err) {
                                                    callback1();
                                                } else {
                                                    console.log("waterfall completed successfully", data);
                                                    console.log("emailData emailData emailData", emailData);
                                                    Mission.sendMissionCompletedMail(emailData, callback1);
                                                }
                                            });
                                    }
                                });
                            }
                        });
                    } else {
                        var localDate = moment(value.createdAt).add(48, 'hours');
                        var currentDate = moment(new Date())
                        // console.log("file doesn't exist", localDate, currentDate, moment(currentDate).isSameOrAfter(localDate));
                        if (moment(currentDate).isSameOrAfter(localDate)) {
                            value.status = "failed";
                            value.save(function (err, data) {
                                if (err) {
                                    console.log("error occured");
                                    callback1();
                                } else {
                                    // console.log("value updated");
                                    callback1();
                                }
                            });
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

// https://ubunturgdiag149.file.core.windows.net/fileshareunifli

// ubunturgdiag149

// sudo mount -t cifs //ubunturgdiag149.file.core.windows.net/fileshareunifli [mount point] -o vers=3.0,username=ubunturgdiag149,password=h62EQtRoeZtOE973xR2eZ5QrjJrV4/oP6dTETyNQgyQcuwTuiwUp6cKVSe0w3CsRsSt8LZrBcBBC3cEY+Erdcg==,dir_mode=0777,file_mode=0777,sec=ntlmssp

// sudo mount -t cifs //ubunturgdiag149.file.core.windows.net/fileshareunifli ./mymountpoint -o vers=2.1,username=ubunturgdiag149,password=h62EQtRoeZtOE973xR2eZ5QrjJrV4/oP6dTETyNQgyQcuwTuiwUp6cKVSe0w3CsRsSt8LZrBcBBC3cEY+Erdcg==,dir_mode=0777,file_mode=0777,serverino
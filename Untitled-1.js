API LOGIN ID 
4HdBk6u8K
TRANSACTION KEY 
2C82k5Zc34t7pWt6
SECRET KEY 
Simon



/* Variable definitions
, url =  url 
, date = getDateTime() function
, method = method type ex post/get
, nonce = insert nonce var here
, publicToken = insert public token var here
, privateToken = insert private token var here
, userAgent = insert user agent var here
, contentLength = insert content length variable here
*/

/*THESE GLOBAL VARIABLE EXAMPLES CHANGE THEM IN YOUR CODE SET BASED ON THE NEED*/
var request = require('request');
var crypto = require('crypto');
var cron = require('node-cron');
var path = require('path');
var publicToken = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB";
var privateToken = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2";
var nonce = "92301kjsadln98123124";
var userAgent = '';
module.exports = _.cloneDeep(require("sails-wohlig-controller"));

function getDateTime() {
    d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    d = d.replace(/:/g, "");
    d = d.replace(/-/g, "");
    d = d.replace(' ', '');
    return d;
}

function calculateContentLength(body) {
    body2 = JSON.stringify(body);
    body2 = body2.replace(/"/g, "");
    body2 = body2.replace(/{/g, "");
    body2 = body2.replace(/}/g, "");
    console.log("Buffer.byteLength body2, utf8", Buffer.byteLength(body2, "utf8"));
    return Buffer.byteLength(body2, "utf8")

}

function Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength) {


    var key = nonce + date + privateToken

    header1 = "user-agent: " + userAgent
    header2 = "content-length: " + contentLength

    var signdata = [method.toUpperCase(), url, date, publicToken, nonce, header1, header2]

    sign_data = signdata.join("\n")

    console.log(sign_data)

    sign = crypto.createHmac('SHA256', key).update(sign_data).digest('hex')


    return sign
}

function sendRequest(url, method, userAgent, date, nonce, publicToken, sign, body) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log("inside sendRequest", method, userAgent, date, nonce, sign, body, contentLength);

    request(
        url, {
            method: method,
            headers: {
                'user-agent': userAgent,
                'X-E38-Date': date,
                'X-E38-Nonce': nonce,
                'authorization': "Signature token=" + publicToken + "; signature=" + sign + '; headers=user-agent,content-length',
                'content-length': contentLength
            },
            form: body
        },
        function (error, response, body) {
            console.log("error", error);
            console.log("JSON.parse(body)---", JSON.parse(body))
            return JSON.parse(body)
        });

}

function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}
var controller = {

    // Creates mission on both the ends, DDMS server ,and on our server..
    createMission: function (req, res) {
        console.log("m in getData", req.body);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        var url = "https://app.unifli.aero/api/missions/",
            method = "post",
            userAgent = req.headers['user-agent']
        date = getDateTime()
        console.log("req.body.files", req.body.files.length);

        //assign request to var body here 
        sentBody = {
            description: req.body.description,
            collected_at: date
        }
        contentLength = calculateContentLength(sentBody)

        //E38 signing function
        sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength);
        //send request to server
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        console.log("inside sendRequest", method, userAgent, date, nonce, sign, sentBody, contentLength);

        request(
            url, {
                method: method,
                headers: {
                    'user-agent': userAgent,
                    'X-E38-Date': date,
                    'X-E38-Nonce': nonce,
                    'authorization': "Signature token=" + publicToken + "; signature=" + sign + '; headers=user-agent,content-length',
                    'content-length': contentLength
                },
                form: sentBody
            },
            function (error, response, body) {
                var missionDetails = JSON.parse(body);
                console.log("body", missionDetails)

                req.body.missionId = missionDetails.id;
                if (body && missionDetails.id) {
                    Mission.saveData(req.body, res.callback);
                    req.body.processingsId = missionDetails.processings[0].id;
                    controller.initializeUpload(req, res);
                } else {
                    res.callback("Please provide Valid data", null);
                }
            });
    },
    // Initiallizing upload on DDMS server..
    initializeUpload: function (req, res) {
        console.log("m in initializeUpload", req.body);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        var url = "https://app.unifli.aero/api/missions/" + req.body.missionId + "/processings/" + req.body.processingsId + "/chunked/",
            method = "post",
            userAgent = req.headers['user-agent']
        var fileLen = req.body.files.length
        console.log("req.body.files", fileLen);
        //assign request to var body here 
        body = {
            total_parts: 3,
            downloadable: 'true',
            resource_type: 'JPEG Image'
        }

        contentLength = calculateContentLength(body);

        date = getDateTime();

        //E38 signing function
        sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength);

        //send request to server
        request(
            url, {
                method: method,
                headers: {
                    'user-agent': userAgent,
                    'X-E38-Date': date,
                    'X-E38-Nonce': nonce,
                    'authorization': "Signature token=" + publicToken + "; signature=" + sign + '; headers=user-agent,content-length',
                    'content-length': contentLength
                },
                form: body
            },
            function (error, response, body) {
                console.log("response-", error);
                var serverRes = JSON.parse(body);
                console.log("body", serverRes)

                req.body.chunkId = serverRes.id;
                if (body && serverRes.id) {
                    controller.uploadingFiles(req, res);
                } else {
                    res.callback("Please provide Valid data", null);
                }
            });

    },
    // Have to write upload..
    uploadingFiles: function (req, res) {
        console.log("m in uploadingFiles", req.body);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        var url = "http://app.unifli.aero/api/chunked/" + req.body.chunkId + "/",
            // var url = "https://requestb.in/suvqqpsu",
            method = "post",
            userAgent = req.headers['user-agent']

        //assign request to var body here 
        var files = [];
        var processedFile = [];
        Mission.findOne({
            missionId: req.body.missionId
        }).lean().exec(function (err, missionData) {
            if (err || _.isEmpty(missionData)) {
                res.callback(err, missionData);
            } else {
                //send request to server
                files = missionData.files;
                var i = 0;
                async.waterfall([
                    function concatFiles(callback) {
                        console.log("inside concatFiles create", files);
                        async.concatLimit(files, 20, function (image, callback) {
                            controller.uploadFileToServer(image, url, userAgent, callback);
                        }, callback);
                    },
                    function saveMissionWithFile(returnVal, callback) {
                        console.log("inside saveMissionWithFile", returnVal);

                    }
                ], function asyncComplete(err, savedDelivery) {
                    if (err) {
                        console.warn('Error updating file status', err);
                        callback(err, null);
                    } else {
                        console.log("succefully completed the waterfall");
                    }
                });
            }
        });
    },
    uploadFileToServer: function (image, url, userAgent, callback) {
        var method = "post"
        async.waterfall([
                function (callback) {
                    request(global["env"].realHost + '/api/upload/readFile?file=' + image.file).pipe(fs.createWriteStream(image.file)).on('finish', function (images) {
                        callback(null, images, image);
                    }).on("error", function () {
                        callback("Error while reading the file");
                    });
                },
                function (images, image, callback) {
                    console.log("image", image);
                    fs.readFile(image.file, function (err, imagesData) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var dir = "./.tmp/filesToUpload/";
                            if (!fs.existsSync(dir)) {
                                fs.mkdirSync(dir);
                            }
                            var fileName = image.file;
                            var folder = dir + fileName;
                            var file = fs.createWriteStream(folder);
                            console.log("folder", folder);
                            callback(null, folder, imagesData, fileName, dir);
                        }
                    });
                },
                function (folder, imagesData, fileName, dir, callback) {
                    fs.writeFile(folder, imagesData, 'binary', function (err) {
                        if (err) {
                            console.log("fs.writeFile ---- error---")
                            callback(err, null);
                        } else {
                            console.log(checksum(imagesData));
                            console.log(checksum(imagesData, 'sha256'));
                            gfs.findOne({
                                filename: image.file
                            }, function (err, file) {
                                console.log("file---", file);
                                body = {
                                    part: 1,
                                    file_size: file.chunkSize,
                                    checksum_sha256: checksum(imagesData, 'sha256'),
                                    checksum_md5: checksum(imagesData)
                                }
                                body = _.cloneDeep(body);
                                var FormData = require('form-data');
                                var form = new FormData();
                                form.append('part', 1);
                                form.append('file_size', file.length);
                                form.append('checksum_sha256', checksum(imagesData, 'sha256'));
                                form.append('checksum_md5', checksum(imagesData));
                                form.append('upload', fs.createReadStream(path.join(dir, file.filename)))

                                callback(null, body, file, dir, form);
                            });
                        }
                    });
                },
                function (body, file, dir, form, callback) {
                    console.log("body--", body);
                    contentLength = calculateContentLength(_.cloneDeep(body));
                    contentLength = contentLength + file.length;
                    console.log("contentLength--", contentLength);
                    var myFiles = fs.createReadStream(path.join(dir, file.filename));
                    console.log("myFiles", myFiles);
                    myFiles = _.cloneDeep(myFiles);
                    body.upload = myFiles;
                    date = getDateTime()
                    //E38 signing function


                    form.getLength(function (err, length) {
                        console.log(length);
                        sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, length);
                        console.log("sign--", sign);
                        var r = request(url, {
                            method: method,
                            headers: {
                                'user-agent': userAgent,
                                'X-E38-Date': date,
                                'X-E38-Nonce': nonce,
                                'authorization': "Signature token=" + publicToken + "; signature=" + sign + "; headers=user-agent,content-length",
                                'content-length': length
                            }
                        }, function (err, res, body) {
                            if (err) {
                                return console.error('upload failed:', err);
                            }
                            if (body) {
                                image.status = "success";
                                console.log("image", image);
                                // fs.unlink(image.file);

                                callback(null, []);
                            } else {
                                callback("Please provide Valid data", null);
                            }
                            console.log("new form body", body)
                        });
                        r._form = form
                    });

                    // request(
                    //     url, {
                    //         method: method,
                    //         headers: {
                    //             'user-agent': userAgent,
                    //             'X-E38-Date': date,
                    //             'X-E38-Nonce': nonce,
                    //             'authorization': "Signature token=" + publicToken + "; signature=" + sign + "; headers=user-agent,content-length",
                    //             'content-length': contentLength
                    //         },
                    //         formData: _.cloneDeep(body)
                    //     },
                    //     function (error, response, body) {
                    //         console.log("error", error)
                    //         console.log("body\n", body);
                    //         if (body) {
                    //             image.status = "success";
                    //             console.log("image", image);
                    //             // fs.unlink(image.file);

                    //             callback(null, []);
                    //         } else {
                    //             callback("Please provide Valid data", null);
                    //         }
                    //     });
                }
            ],
            function (err, data) {
                if (err) {
                    image.value = false;
                    data = image;
                    callback(null, err);
                } else {
                    image.value = true;
                    data = image
                    callback(null, data);
                }
            });
    },
    // Get mission from DDMS server byt its Id..
    getMissionFromServer: function (req, res) {
        console.log("m in getData", req.body);
        var url = "https://app.unifli.aero/api/missions/720f4966-a3c5-4153-9a98-c5ff72314072/",
            method = "get",
            nonce = "92301kjsadln98123124",
            publicToken = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB",
            privateToken = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2",
            userAgent = req.headers['user-agent']
        date = getDateTime();

        //assign request to var body here 
        body = {
            // description: req.body.description,
            // collected_at: date
        }

        contentLength = calculateContentLength(body)

        //E38 signing function
        sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength);

        //send request to server
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        console.log("inside sendRequest", method, userAgent, date, nonce, sign, body, contentLength);

        request(
            url, {
                method: method,
                headers: {
                    'user-agent': userAgent,
                    'X-E38-Date': date,
                    'X-E38-Nonce': nonce,
                    'authorization': "Signature token=" + publicToken + "; signature=" + sign + '; headers=user-agent,content-length',
                    'content-length': contentLength
                }
            },
            function (error, response, body) {
                var missionDetails = JSON.parse(body);
                console.log("body", missionDetails)
                callback(null, missionDetails)
            });
    },

    getMission: function (req, res) {
        Mission.findMe(req.body, res.callback)
    },

    unknownF: function () {
        var files = [];
        Mission.find({
            fileUploadStatus: ""
        }, function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                console.log(found);
                async.eachSeries(found, function (itrData, callback) {
                    console.log("files---", itrData);
                    var url = "https://app.unifli.aero/api/missions/" + itrData.missionId + "/",
                        method = "get",

                        userAgent = req.headers['user-agent']
                    date = getDateTime();

                    //assign request to var body here 
                    body = {
                        // description: req.body.description,
                        // collected_at: date
                    }

                    contentLength = calculateContentLength(body)

                    //E38 signing function
                    sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength);

                    //send request to server
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                    console.log("inside sendRequest", method, userAgent, date, nonce, sign, body, contentLength);

                    sendRequest()
                    files = itrData.files;
                    async.eachSeries(files, function (image, callback1) {
                        console.log("files---", image);
                        request(global["env"].realHost + '/api/upload/readFile?file=' + image).pipe(fs.createWriteStream(image)).on('finish', function (images) {
                            // JSZip generates a readable stream with a "end" event,
                            // but is piped here in a writable stream which emits a "finish" event.
                            fs.readFile(image, function (err, imagesData) {
                                if (err) {
                                    res.callback(err, null);
                                } else {
                                    //Remove image
                                    console.log(checksum(imagesData));

                                    console.log(checksum(imagesData, 'sha256'));
                                    fs.unlink(image);
                                    // zip.file("file", content); ... and other manipulations
                                    callback1();
                                }
                            });
                        });
                    }, function () {
                        //Generate Zip file
                        // zip.generateNodeStream({
                        //         type: 'nodebuffer',
                        //         streamFiles: true
                        //     })
                        //     .pipe(fs.createWriteStream(finalPath))
                        //     .on('finish', function (zipData) {
                        //         // JSZip generates a readable stream with a "end" event,
                        //         // but is piped here in a writable stream which emits a "finish" event.
                        //         fs.readFile(finalPath, function (err, zip) {
                        //             if (err) {
                        //                 res.callback(err, null);
                        //             } else {
                        //                 res.set('Content-Type', "application/octet-stream");
                        //                 res.set('Content-Disposition', "attachment;filename=" + path);
                        //                 res.send(zip);
                        //                 fs.unlink(finalPath);
                        //             }
                        //         });
                        //     });
                        callback();
                    });
                }, function () {
                    console.log("m in found");

                });
            }
        });
    },

    generateZip: function (req, res) {
        // var JSZip = require("jszip");
        // var type = req.query.type;
        // var zip = new JSZip();
        var folder = "./.tmp/";
        // var path = _.capitalize(type) + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".zip";
        // var finalPath = folder + path;
        var files = [];
        Mission.findOne({
            _id: req.body._id
        }).lean().exec(function (err, assignementData) {
            if (err || _.isEmpty(assignementData)) {
                res.callback(err, assignementData);
            } else {
                files = assignementData.files;
                async.eachSeries(files, function (image, callback) {
                    console.log("files---", image);
                    request(global["env"].realHost + '/api/upload/readFile?file=' + image).pipe(fs.createWriteStream(image)).on('finish', function (images) {
                        // JSZip generates a readable stream with a "end" event,
                        // but is piped here in a writable stream which emits a "finish" event.
                        fs.readFile(image, function (err, imagesData) {
                            if (err) {
                                res.callback(err, null);
                            } else {
                                //Remove image
                                console.log(fs.statSync(image).size);
                                console.log(checksum(imagesData));

                                console.log(checksum(imagesData, 'sha256'));
                                fs.unlink(image);
                                // zip.file("file", content); ... and other manipulations
                                callback();
                            }
                        });
                    });
                }, function () {
                    //Generate Zip file
                    // zip.generateNodeStream({
                    //         type: 'nodebuffer',
                    //         streamFiles: true
                    //     })
                    //     .pipe(fs.createWriteStream(finalPath))
                    //     .on('finish', function (zipData) {
                    //         // JSZip generates a readable stream with a "end" event,
                    //         // but is piped here in a writable stream which emits a "finish" event.
                    //         fs.readFile(finalPath, function (err, zip) {
                    //             if (err) {
                    //                 res.callback(err, null);
                    //             } else {
                    //                 res.set('Content-Type', "application/octet-stream");
                    //                 res.set('Content-Disposition', "attachment;filename=" + path);
                    //                 res.send(zip);
                    //                 fs.unlink(finalPath);
                    //             }
                    //         });
                    //     });
                });

            }
        });

    },
    getByUser: function (req, res) {
        if (req.body) {
            Mission.getByUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    getCmdWorking: function (req, res) { //pix4dmapper -c -n --image-dir C:\Users\dell\Pictures\newMissionImages D:\mining\myquarry.p4d 
        // exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -n --image-dir C:/Users/dell/Pictures/newMissionImages C:/Users/dell/Documents/pix4d/myquarry.p4d', function (error, stdout, stderr) {
        //     if (error) {
        //         console.log("error");
        //     }
        //     console.log("stdout", stdout);
        //     console.log("stderr", stderr);
        // });
        exec('cd C:/Program Files/Pix4Dmapper && pix4dmapper -c -d C:/Users/dell/Documents/pix4d/myquarry.p4d', function (error, stdout, stderr) {
            if (error) {
                console.log("error");
            }
            console.log("stdout", stdout);
            console.log("stderr", stderr);
        });

    }

};

module.exports = _.assign(module.exports, controller);

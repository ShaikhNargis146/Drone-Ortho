/**
 * Config.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var MaxImageSize = 1600;


var path = require('path');
var schema = new Schema({
    name: String,
    content: String,
});

// var client = new Twitter({
//     consumer_key: 'w0Mizb3YKniG8GfZmhQJbMvER',
//     consumer_secret: '6wnwpnm6a475ROm3aY8aOy8YXynQxQgZkcoJ05Y8D9EvL0Duov',
//     access_token_key: '121427044-PJTEM2zmqwcRu4K0FBotK9jtTibsNOiomyVlkSo0',
//     access_token_secret: 'TvMPCXaXpJOvpu8hCGc61kzp5EpIPbrAgOT7u6lDnastg'
// });

module.exports = mongoose.model('Config', schema);

var models = {
    maxRow: 10,
    getForeignKeys: function (schema) {
        var arr = [];
        _.each(schema.tree, function (n, name) {
            if (n.key) {
                arr.push({
                    name: name,
                    ref: n.ref,
                    key: n.key
                });
            }
        });
        return arr;
    },
    checkRestrictedDelete: function (Model, schema, data, callback) {

        var values = schema.tree;
        var arr = [];
        var ret = true;
        _.each(values, function (n, key) {
            if (n.restrictedDelete) {
                arr.push(key);
            }
        });

        Model.findOne({
            "_id": data._id
        }, function (err, data2) {
            if (err) {
                callback(err, null);
            } else if (data2) {
                _.each(arr, function (n) {
                    if (data2[n].length !== 0) {
                        ret = false;
                    }
                });
                callback(null, ret);
            } else {
                callback("No Data Found", null);
            }
        });
    },
    manageArrayObject: function (Model, id, data, key, action, callback) {
        Model.findOne({
            "_id": id
        }, function (err, data2) {
            if (err) {
                callback(err, null);
            } else if (data2) {
                switch (action) {
                    case "create":
                        {
                            data2[key].push(data);
                            data2[key] = _.uniq(data2[key]);
                            data2.update(data2, {
                                w: 1
                            }, callback);
                        }
                        break;
                    case "delete":
                        {
                            _.remove(data2[key], function (n) {
                                return (n + "") == (data + "");
                            });
                            data2.update(data2, {
                                w: 1
                            }, callback);
                        }
                        break;
                }
            } else {
                callback(null, null);
            }
        });


    },


    generatePdf: function (page, callback) {
        var pdf = require('html-pdf');
        var obj = {};
        var env = {};
        obj.name = page.name;
        obj.lname = page.lname;
        obj.organization = page.organization;
        obj.city = page.shippingAddress.city;
        obj.country = page.shippingAddress.country;
        obj.state = page.shippingAddress.state;
        obj.createdAt = page.createdAt;
        obj.status = page.status;
        obj.phonenumber = page.phonenumber;
        obj.apartment = page.apartment;
        obj.invoiceNo = page.invoiceNo;
        var i = 0;

        var file = "cad_invoice";
        sails.hooks.views.render(file, obj, function (err, html) {
            if (err) {
                console.log("errr", err);
                callback(err);
            } else {
                // var path = "C:/Users/unifli/Documents/googleTile-Mosaic/";
                var path = "pdf/";
                var newFilename = page.invoiceNo + ".pdf";
                var writestream = fs.createWriteStream(path + newFilename);
                writestream.on('finish', function (err, res) {
                    if (err) {
                        console.log("Something Fishy", err);
                    } else {
                        red("Finish is working");
                        console.log("Success", res);
                        callback(null, {
                            id: page._id,
                            name: newFilename,
                            url: newFilename
                        });
                    }
                });

                var options = {
                    "phantomPath": "node_modules/phantomjs/bin/phantomjs",
                    "format": "A4",
                    // Export options 
                    "directory": "/tmp",
                    "height": "13in", // allowed units: mm, cm, in, px
                    "width": "14in",
                    // "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
                    // "orientation": "portrait", // portrait or landscape 
                    // "zoomFactor": "1", // default is 1 
                    // Page options 
                    "border": {
                        "top": "2cm", // default is 0, units: mm, cm, in, px 
                        "right": "1cm",
                        "bottom": "1cm",
                        "left": "1cm"
                    },
                    // File options 
                    "type": "pdf", // allowed file types: png, jpeg, pdf 
                    "timeout": 30000, // Timeout that will cancel phantomjs, in milliseconds 
                    "footer": {
                        "height": "2cm",
                    },
                    // "filename": page.filename + ".pdf"
                };
                // var options = {
                //     "phantomPath": "node_modules/phantomjs/bin/phantomjs",
                //     "format": "A4"
                // };

                pdf.create(html, options).toStream(function (err, stream) {
                    if (err) {
                        callback(err);
                    } else {
                        green("IN PDF CREATE");
                        console.log("In Config To generate PDF");
                        i++;
                        stream.pipe(writestream);
                    }
                });
            }

        });
    },

    uploadFile: function (filename, callback) {
        var id = mongoose.Types.ObjectId();
        var extension = filename.split(".").pop();
        extension = extension.toLowerCase();
        if (extension == "jpeg") {
            extension = "jpg";
        }
        var newFilename = id + "." + extension;

        var writestream = gfs.createWriteStream({
            filename: newFilename
        });
        writestream.on('finish', function () {
            callback(null, {
                name: newFilename
            });
            fs.unlink(filename);
        });

        var imageStream = fs.createReadStream(filename);

        if (extension == "png" || extension == "jpg" || extension == "gif") {
            Jimp.read(filename, function (err, image) {
                if (err) {
                    callback(err, null);
                } else {
                    if (image.bitmap.width > MaxImageSize || image.bitmap.height > MaxImageSize) {
                        image.scaleToFit(MaxImageSize, MaxImageSize).getBuffer(Jimp.AUTO, function (err, imageBuf) {
                            var bufferStream = new stream.PassThrough();
                            bufferStream.end(imageBuf);
                            bufferStream.pipe(writestream);
                        });
                    } else {
                        image.getBuffer(Jimp.AUTO, function (err, imageBuf) {
                            var bufferStream = new stream.PassThrough();
                            bufferStream.end(imageBuf);
                            bufferStream.pipe(writestream);
                        });
                    }

                }

            });
        } else {
            imageStream.pipe(writestream);
        }


    },


    moveFile: function (filename, callback) {
        var id = mongoose.Types.ObjectId();
        var extension = filename.split(".").pop();
        extension = extension.toLowerCase();
        if (extension == "jpeg") {
            extension = "jpg";
        }
        var newFilename = id + "." + extension;
        var newPath;
        dir = path.join(process.cwd(), "pix4dUpload");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            newPath = path.join(dir, newFilename);
        } else {
            newPath = path.join(dir, newFilename);
        }
        fs.rename(filename, newPath, function (err) {
            if (err) {
                console.log("error---", err);
                callback(err, null);
            } else {
                console.log("folder----->>>>>", newPath);
                callback(null, {
                    name: newFilename
                });
            }
        });
    },

    readUploaded: function (filename, width, height, style, res) {
        res.set({
            'Cache-Control': 'public, max-age=31557600',
            'Expires': new Date(Date.now() + 345600000).toUTCString(),
            'Content-Type': 'image/jpeg'
        });
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });
        var buf;
        var newNameExtire;
        var bufs = [];
        var proceedI = 0;
        var wi;
        var he;
        readstream.on('data', function (d) {
            bufs.push(d);
        });
        readstream.on('end', function () {
            buf = Buffer.concat(bufs);
            proceed();
        });


        function proceed() {
            proceedI++;
            if (proceedI === 2) {
                Jimp.read(buf, function (err, image) {
                    if (err) {
                        callback(err, null);
                    } else {
                        if (style === "contain" && width && height) {
                            image.contain(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if (style === "cover" && (width && width > 0) && (height && height > 0)) {
                            image.cover(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if ((width && width > 0) && (height && height > 0)) {
                            image.resize(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if ((width && width > 0) && !(height && height > 0)) {
                            image.resize(width, Jimp.AUTO).getBuffer(Jimp.AUTO, writer2);
                        } else {
                            image.resize(Jimp.AUTO, height).getBuffer(Jimp.AUTO, writer2);
                        }
                    }
                });
            }
        }

        function writer2(err, imageBuf) {
            var writestream2 = gfs.createWriteStream({
                filename: newNameExtire,
            });
            var bufferStream = new stream.PassThrough();
            bufferStream.end(imageBuf);
            bufferStream.pipe(writestream2);
            res.send(imageBuf);
        }

        function read2(filename2) {
            var readstream2 = gfs.createReadStream({
                filename: filename2
            });
            readstream2.on('error', function (err) {
                res.json({
                    value: false,
                    error: err
                });
            });
            readstream2.pipe(res);
        }
        var onlyName = filename.split(".")[0];
        var extension = filename.split(".").pop();
        if ((extension == "jpg" || extension == "png" || extension == "gif") && ((width && width > 0) || (height && height > 0))) {
            //attempt to get same size image and serve
            var newName = onlyName;
            if (width > 0) {
                newName += "-" + width;
            } else {
                newName += "-" + 0;
            }
            if (height) {
                newName += "-" + height;
            } else {
                newName += "-" + 0;
            }
            if (style && (style == "contain" || style == "cover")) {
                newName += "-" + style;
            } else {
                newName += "-" + 0;
            }
            newNameExtire = newName + "." + extension;
            gfs.exist({
                filename: newNameExtire
            }, function (err, found) {
                if (err) {
                    res.json({
                        value: false,
                        error: err
                    });
                }
                if (found) {
                    read2(newNameExtire);
                } else {
                    proceed();
                }
            });
            //else create a resized image and serve
        } else {
            readstream.pipe(res);
        }
        //error handling, e.g. file does not exist
    },

    readUploadedFromLocal: function (filename, width, height, style, res) {
        res.set({
            'Cache-Control': 'public, max-age=31557600',
            'Expires': new Date(Date.now() + 345600000).toUTCString(),
            'Content-Type': 'image/jpeg'
        });
        var readstream = fs.createReadStream(path.join(path.join(process.cwd(), "pix4dUpload"), filename));

        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });
        var buf;
        var newNameExtire;
        var bufs = [];
        var proceedI = 0;
        var wi;
        var he;
        readstream.on('data', function (d) {
            bufs.push(d);
        });
        readstream.on('end', function () {
            buf = Buffer.concat(bufs);
            proceed();
        });


        function proceed() {
            proceedI++;
            if (proceedI === 2) {
                Jimp.read(buf, function (err, image) {
                    if (err) {
                        callback(err, null);
                    } else {
                        if (style === "contain" && width && height) {
                            image.contain(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if (style === "cover" && (width && width > 0) && (height && height > 0)) {
                            image.cover(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if ((width && width > 0) && (height && height > 0)) {
                            image.resize(width, height).getBuffer(Jimp.AUTO, writer2);
                        } else if ((width && width > 0) && !(height && height > 0)) {
                            image.resize(width, Jimp.AUTO).getBuffer(Jimp.AUTO, writer2);
                        } else {
                            image.resize(Jimp.AUTO, height).getBuffer(Jimp.AUTO, writer2);
                        }
                    }
                });
            }
        }

        function writer2(err, imageBuf) {
            var writestream2 = fs.createWriteStream(path.join(path.join(process.cwd(), "pix4dUpload"), newNameExtire));
            var bufferStream = new stream.PassThrough();
            bufferStream.end(imageBuf);
            bufferStream.pipe(writestream2);
            res.send(imageBuf);
        }

        function read2(filename2) {
            var readstream2 = fs.createReadStream(path.join(path.join(process.cwd(), "pix4dUpload"), filename2));
            readstream2.on('error', function (err) {
                res.json({
                    value: false,
                    error: err
                });
            });
            readstream2.pipe(res);
        }
        var onlyName = filename.split(".")[0];
        var extension = filename.split(".").pop();
        console.log("onlyName", onlyName)
        if ((extension == "jpg" || extension == "png" || extension == "gif") && ((width && width > 0) || (height && height > 0))) {
            //attempt to get same size image and serve
            var newName = onlyName;
            if (width > 0) {
                newName += "-" + width;
            } else {
                newName += "-" + 0;
            }
            if (height) {
                newName += "-" + height;
            } else {
                newName += "-" + 0;
            }
            if (style && (style == "contain" || style == "cover")) {
                newName += "-" + style;
            } else {
                newName += "-" + 0;
            }
            newNameExtire = newName + "." + extension;
            console.log("newNameExtire", newNameExtire);
            fs.existsAsync(path.join(path.join(process.cwd(), "pix4dUpload"), newNameExtire)).then(function (exists) {
                if (exists) {
                    read2(newNameExtire);
                } else {
                    proceed();
                }
            })
            //else create a resized image and serve
        } else {
            readstream.pipe(res);
        }
        //error handling, e.g. file does not exist
    },

    import: function (name) {
        var jsonExcel = xlsx.parse(name);
        var retVal = [];
        var firstRow = _.slice(jsonExcel[0].data, 0, 1)[0];
        var excelDataToExport = _.slice(jsonExcel[0].data, 1);
        var dataObj = [];
        _.each(excelDataToExport, function (val, key) {
            dataObj.push({});
            _.each(val, function (value, key2) {
                dataObj[key][firstRow[key2]] = value;
            });
        });
        return dataObj;
    },

    importGS: function (filename, callback) {
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });
        var buffers = [];
        readstream.on('data', function (buffer) {
            buffers.push(buffer);
        });
        readstream.on('end', function () {
            var buffer = Buffer.concat(buffers);
            callback(null, Config.import(buffer));
        });
    },

    generateExcel: function (name, found, res) {
        name = _.kebabCase(name);
        var excelData = [];
        _.each(found, function (singleData) {
            var singleExcel = {};
            _.each(singleData, function (n, key) {
                if (key != "__v" && key != "createdAt" && key != "updatedAt") {
                    singleExcel[key] = n;
                }
            });
            excelData.push(singleExcel);
        });
        var xls = json2xls(excelData);
        var folder = "./.tmp/";
        var path = name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-a") + ".xlsx";
        var finalPath = folder + path;
        fs.writeFile(finalPath, xls, 'binary', function (err) {
            if (err) {
                res.callback(err, null);
            } else {
                fs.readFile(finalPath, function (err, excel) {
                    if (err) {
                        res.callback(err, null);
                    } else {
                        // console.log("excel-------", excel);
                        // console.log("res", res);
                        // res.set('Content-Type', "application/octet-stream");
                        // res.set('Content-Disposition', "attachment;filename=" + path);
                        // res.send(excel);
                        res({
                            excel: excel,
                            path: path,
                            finalPath: finalPath
                        })
                        fs.unlink(finalPath);
                    }
                });
            }
        });

    },

    excelDateToDate: function isDate(value) {
        value = (value - (25567 + 1)) * 86400 * 1000;
        var mom = moment(value);
        if (mom.isValid()) {
            return mom.toDate();
        } else {
            return undefined;
        }
    },

    downloadFromUrl: function (url, callback) {
        var dest = "./.tmp/" + moment().valueOf() + "-" + _.last(url.split("/"));
        var file = fs.createWriteStream(dest);
        var request = http.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                Config.uploadFile(dest, callback);
            });
        }).on('error', function (err) {
            fs.unlink(dest);
            callback(err);
        });
    },

    downloadWithName: function (filename, name, res) {
        res.set('Content-Disposition', "filename=" + name);
        var readstream = gfs.createReadStream({
            filename: filename
        });
        readstream.on('error', function (err) {
            res.json({
                value: false,
                error: err
            });
        });
        var onlyName = filename.split(".")[0];
        var extension = filename.split(".").pop();
        readstream.pipe(res);
        //error handling, e.g. file does not exist
    },

    //email

    email: function (data, callback) {
        var emailMessage = {};
        emailMessage.from_email = "info@unifli.aero";
        emailMessage.from_name = "unifli";
        emailMessage.to = [{}];

        console.log("*************************** Inside email function of Config model ************************** & data is :", data);
        Password.find().exec(function (err, emailKey) {

            console.log("************ inside emila function ****************", emailKey);
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (emailKey && emailKey.length > 0) {
                if (data.filename && data.filename != "") {
                    var mandrill = require('mandrill-api/mandrill');
                    var mandrillClient = new mandrill.Mandrill(emailKey[0].name);

                    console.log("**************filename *********************", data.filename);
                    var merge_vars = [];
                    mandrillClient.templates.render({
                        "template_name": data.filename,
                        "template_content": [],
                        "merge_vars": data.merge_vars ? data.merge_vars : []
                    }, function (result) {
                        // console.log(result);
                        if (result.html && result.html != "") {
                            emailMessage.html = result.html;
                            emailMessage.subject = data.subject;
                            emailMessage.to[0].email = data.email;
                            emailMessage.to[0].name = data.name;
                            emailMessage.to[0].type = "to";
                            // if (data.filename == 'Invoice Alert' ||
                            //     data.filename == 'Order Upload' || data.filename == 'Documents missing on your Order') {
                            //     emailMessage.to.push({
                            //         email: "info@gsourcedata.com",
                            //         type: "cc"
                            //     });
                            // }
                            emailMessage.tags = data.tags;

                            if (data.attachments) {
                                emailMessage.attachments = [];
                                console.log("Email attachment found");
                                for (var idx = 0; idx < data.attachments.length; idx++) {
                                    emailMessage.attachments.push(data.attachments[idx]);
                                }
                            }

                            // console.log("Actual email message sent to mandrill: ", emailMessage);
                            mandrillClient.messages.send({
                                "message": emailMessage
                            }, function (result) {
                                console.log(result);
                                delete emailMessage.attachments;
                                callback(null, result);
                            });
                        } else {
                            callback({
                                message: "Error while sending mail."
                            }, null);
                        }
                        /*
                        {
                            "html": "<p><div>content to inject merge1 content</div></p>"
                        }
                        */
                    }, function (e) {
                        // Mandrill returns the error as an object with name and message keys
                        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                        // A mandrill error occurred: Invalid_Key - Invalid API key
                    });
                } else {
                    callback({
                        message: "Please provide params"
                    }, null);
                }
            } else {
                callback({
                    message: "No api keys found"
                }, null);
            }
        });
    },
};
module.exports = _.assign(module.exports, models);
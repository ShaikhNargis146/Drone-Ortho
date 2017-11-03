module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    getUser: function (req, res) {
        if (req.body) {
            User.getUser(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    addCardDetails: function (req, res) {
        console.log("***");
        if (req.body) {
            console.log("**$$$$*");
            User.addCardDetails(req.body, res.callback);
        } else {
            console.log("*%%%%%**");
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    Updatepassword: function (req, res) {
        if (req.body) {
            User.Updatepassword(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    getByDfm: function (req, res) {
        if (req.body) {
            User.getByDfm(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    Updateuser: function (req, res) {
        if (req.body && req.body.accessToken) {
            User.Updateuser(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    sendOtp: function (req, res) {
        console.log("inside user controller", req.body)
        if (req.body) {
            console.log("inside user controllerif")

            User.sendOtp(req.body, res.callback);
        } else {
            console.log("inside user controller else")

            res.callback("", null);
        }
    },
    verifyOTPForResetPass: function (req, res) {
        if (req.body) {
            User.verifyOTPForResetPass(req.body, res.callback);
        } else {
            res.callback("", null);
        }
    },
    login: function (req, res) {
        if (req.body && req.body.name && req.body.name !== '' && req.body.password && req.body.password !== '') {
            User.doLogin(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },
    registerUser: function (req, res) {
        function callback(err, data) {

            if (data) {
                res.json({
                    value: true,
                    data: {
                        message: "Registration Successful!"
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: {
                        message: "Registration Failed!"
                    }
                });
            }
        }
        if (req.body) {
            User.registerUser(req.body, callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },


    loginFacebook: function (req, res) {
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    loginGoogle: function (req, res) {
        if (req.query.returnUrl) {
            req.session.returnUrl = req.query.returnUrl;
        } else {

        }

        passport.authenticate('google', {
            scope: ['openid', 'profile', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    profile: function (req, res) {
        if (req.body && req.body.accessToken) {
            User.profile(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    pdf: function (req, res) {

        var html = fs.readFileSync('./views/pdf/demo.ejs', 'utf8');
        var options = {
            format: 'A4'
        };
        var id = mongoose.Types.ObjectId();
        var newFilename = id + ".pdf";
        var writestream = gfs.createWriteStream({
            filename: newFilename
        });
        writestream.on('finish', function () {
            res.callback(null, {
                name: newFilename
            });
        });
        pdf.create(html).toStream(function (err, stream) {
            stream.pipe(writestream);
        });
    },
    backupDatabase: function (req, res) {
        var q = req.ip.search("127.0.0.1");
        if (q >= 0) {
            var jagz = _.map(mongoose.models, function (Model, key) {
                var name = Model.collection.collectionName;
                return {
                    key: key,
                    name: name,
                };
            });
            var isBackup = fs.existsSync("./backup");
            if (!isBackup) {
                fs.mkdirSync("./backup");
            }
            var mom = moment();
            var folderName = "./backup/" + mom.format("ddd-Do-MMM-YYYY-HH-mm-SSSSS");
            var retVal = [];
            fs.mkdirSync(folderName);
            async.eachSeries(jagz, function (obj, callback) {
                exec("mongoexport --db " + database + " --collection " + obj.name + " --out " + folderName + "/" + obj.name + ".json", function (data1, data2, data3) {
                    retVal.push(data3 + " VALUES OF " + obj.name + " MODEL NAME " + obj.key);
                    callback();
                });
            }, function () {
                res.json(retVal);
            });
        } else {
            res.callback("Access Denied for Database Backup");
        }
    },
    getcart: function (req, res) {
        if (req.body) {
            User.getcart(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    //----------------------Start----------------------//
    getVendor: function (req, res) {
        if (req.body) {
            User.getVendor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    updateVendorData: function (req, res) {
        if (req.body) {
            User.updateVendorData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalUsers: function (req, res) {
        if (req.body) {
            User.getTotalUsers(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalDronesSold: function (req, res) {
        if (req.body) {
            User.getTotalDronesSold(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalMissions: function (req, res) {
        if (req.body) {
            User.getTotalMissions(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalCadRequest: function (req, res) {
        if (req.body) {
            User.getTotalCadRequest(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getLastTenCad: function (req, res) {
        if (req.body) {
            User.getLastTenCad(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getCadOrderDetails: function (req, res) {
        if (req.body) {
            User.getCadOrderDetails(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalProductOrdersData: function (req, res) {
        if (req.body) {
            User.getTotalProductOrdersData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    //----------------------End----------------------//

    //--------------dashboard for vendor-------------//

    getTotalCadForVendor: function (req, res) {
        if (req.body) {
            User.getTotalCadForVendor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalCompletedCadForVendor: function (req, res) {
        if (req.body) {
            User.getTotalCompletedCadForVendor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalIncompletedCadForVendor: function (req, res) {
        if (req.body) {
            User.getTotalIncompletedCadForVendor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getCurrentMonthCadStats: function (req, res) {
        if (req.body) {
            User.getCurrentMonthCadStats(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getCurrentMonthCadEarningStats: function (req, res) {
        if (req.body) {
            User.getCurrentMonthCadEarningStats(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalEarningData: function (req, res) {
        if (req.body) {
            User.getTotalEarningData(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },


    //--------------dashboard for vendor End-------------//

    //--------------dashboard for User-------------//

    getAllMission: function (req, res) {
        if (req.body) {
            User.getAllMission(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getTotalCadFile: function (req, res) {
        if (req.body) {
            User.getTotalCadFile(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getOrdersDetails: function (req, res) {
        if (req.body) {
            User.getOrdersDetails(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getStatsForPie: function (req, res) {
        if (req.body) {
            User.getStatsForPie(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    //--------------dashboard for User End-------------//

    vendorIdGenerate: function (req, res) {
        if (req.body) {
            User.vendorIdGenerate(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },
    createVendor: function (req, res) {
        if (req.body) {
            User.createVendor(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },
    createUser: function (req, res) {
        if (req.body) {
            User.createUser(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },

    UserIdGenerate: function (req, res) {
        if (req.body) {
            User.UserIdGenerate(req.body, res.callback);
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
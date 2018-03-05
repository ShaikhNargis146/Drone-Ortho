var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    subject: {
        type: String,
    },
    description: {
        type: String,
    },
    ticketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Closed", "Active"],
        default: "Active"
    },
    closingDate: {
        type: Date,
    },
    reply: String,
    replyDate: Date
});

schema.plugin(deepPopulate, {
    Populate: {
        'user': {
            select: ""
        }
    }

});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Ticket', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user", "user"));
var model = {

    exceltotalTicketforUser: function (data, callback) {
        Ticket.find({
            user: data._id
        }).deepPopulate("user").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelTicketforUser: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["TICKET ID"] = mainData.ticketId;
                obj["DATE"] = moment(mainData.createdAt).format("DD/MM/YYYY")
                obj["SUBJECT"] = mainData.subject;
                obj["DESCRIPTION"] = mainData.description;
                obj["TICKET STATUS"] = mainData.status;
                if (mainData.replyDate) {
                    obj["CLOSING DATE"] = moment(mainData.replyDate).format("DD/MM/YYYY")
                } else {
                    obj["CLOSING DATE"] = '-'
                }



                // obj["USER"] = mainData.user.name;
                // obj["DFM SUBSCRIPTION"] = mainData.DFMSubscription.name;
                // obj["DATE"] = mainData.date;
                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    exceltotalTicket: function (data, callback) {
        Ticket.find({}).deepPopulate("user").exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        })
    },

    generateExcelTicket: function (match, callback) {
        async.concatSeries(match, function (mainData, callback) {
                var obj = {};
                obj["TICKET ID"] = mainData.ticketId;
                obj["DATE"] = moment(mainData.createdAt).format("DD/MM/YYYY")
                obj["SUBJECT"] = mainData.subject;
                if (mainData.user) {
                    obj["USER ID"] = mainData.user.dataId;
                } else {
                    obj["USER ID"] = "-";
                }

                obj["TICKET STATUS"] = mainData.status;
                if (mainData.replyDate) {
                    obj["CLOSING DATE"] = moment(mainData.replyDate).format("DD/MM/YYYY")
                } else {
                    obj["CLOSING DATE"] = '-'
                }

                callback(null, obj);
            },
            function (err, singleData) {
                callback(null, singleData);
            });

    },

    createTicketForUser: function (data, callback) {
        async.waterfall([
            function (callback) { // generate ticket Id
                Ticket.ticketIdGenerate(data, function (err, data1) {
                    callback(null, data1);
                })
            },
            function (ticketID, callback) { //save invoice
                data.ticketId = ticketID;
                Ticket.saveData(data, function (err, data2) {
                    if (err || _.isEmpty(data2)) {
                        callback(err, [])
                    } else {
                        callback(null, data2)
                    }
                })
            }
        ], function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, [])
            } else {
                callback(null, data)
            }
        });
    },

    getTicket: function (data, callback) {
        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        Ticket.find({
                user: data.user
            })
            .deepPopulate("serviceId user DFMSubscription")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },

    getAllTickets: function (data, callback) {
        if (data.count) {
            var maxCount = data.count;
        } else {
            var maxCount = Config.maxRow;
        }
        var maxRow = maxCount
        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['name'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        Ticket.find({})
            .deepPopulate("user")
            .order(options)
            .keyword(options)
            .page(options,
                function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (found) {
                        callback(null, found);
                    } else {
                        callback("Invalid data", null);
                    }
                });
    },


    getTicketData: function (data, callback) {
        this.findOne({
            _id: data._id
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                callback(err, []);
            } else {
                callback(null, data);
            }
        })
    },

    //ticketId Generate start
    ticketIdGenerate: function (data, callback) {
        Ticket.find({}).sort({
            createdAt: -1
        }).limit(1).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(found)) {
                    var ticketIdNumber = "T" + "100";
                    // console.log("ticketIdNumber", ticketIdNumber)
                    callback(null, ticketIdNumber);
                } else {
                    if (!found[0].ticketId) {
                        var ticketIdNumber = "T" + "100";
                        // console.log("ticketIdNumber", ticketIdNumber)

                        callback(null, ticketIdNumber);
                    } else {
                        // console.log("found", found);
                        var sub = found[0].ticketId
                        var ticketData = sub.substring(1, 10000);
                        // console.log("ticketData", ticketData);
                        var nextNum = parseInt(ticketData) + 1
                        ticketIdNumber = "T" + nextNum;
                        // console.log("final userIdNumber", ticketIdNumber);

                        callback(null, ticketIdNumber);
                    }
                }
            }
        });
    },
    //end ticketId


    sendMailOnTicketRaised: function (data, callback) {
        async.parallel({
                forUser: function (callback) {
                    var emailData = {};
                    emailData.filename = "Support Ticket Request - Customer Email";
                    emailData.subject = "Support Ticket Request";
                    emailData.email = data.user.email;
                    emailData.merge_vars = [{
                        "name": "USERNAME",
                        "content": data.user.name
                    }];
                    Config.email(emailData, function (err, emailRespo) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (emailRespo) {
                            callback(null, "Support Ticket Request successfully!!!");
                        } else {
                            callback("Invalid data", null);
                        }
                    });
                },
                forAdmin: function (callback) {
                    var emailData = {};
                    emailData.filename = "Support Ticket Request - Admin Email";
                    emailData.subject = "Support Ticket Request";
                    emailData.email = global["env"].adminEmail;
                    Config.email(emailData, function (err, emailRespo) {
                        // console.log("emailRespo", emailRespo);
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (emailRespo) {
                            callback(null, "Support Ticket Request successfully!!!");
                        } else {
                            callback("Invalid data", null);
                        }
                    });
                }
            },
            function (err, result) {
                if (err || _.isEmpty(result)) {
                    // callback(err, []);
                } else {
                    // callback(null, result);
                }
            });
    },

    submitTicketData: function (data, callback) {
        Ticket.findOneAndUpdate({
            _id: data._id
        }, {
            status:"Closed",
            replyDate:new Date(),
            reply:data.reply
        },{
            new:true
        }).deepPopulate('user').exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {
                Ticket.sendMailOnTicketRaised(found, callback);
                callback(null, found);
            }
        });
    },

};
module.exports = _.assign(module.exports, exports, model);
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


    jsonTOCsvConvert: function (page, res) {
        // console.log("inside jsonTOCsvConvert", page)
        var json2csv = require('json2csv');
        var fs = require('fs');


        var mission = [];
        if (page.name == "mission") {
            var fields = ['MissionId', 'UserId', 'MissionName', 'Status', 'CreatedAt', 'CadRequest'];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.MissionId = pg.missionId;
                if (pg.user) {
                    tempObj.UserId = pg.user.dataId;
                } else {
                    tempObj.UserId = "-";
                }

                tempObj.MissionName = pg.name;
                tempObj.Status = pg.status;
                tempObj.CreatedAt = moment(pg.createdAt).format("DD/MM/YYYY");
                if (pg.cadline[0]) {
                    tempObj.CadRequest = "YES";
                } else {
                    tempObj.CadRequest = "NO";
                }
                mission.push(tempObj);

            });
            console.log("mission", mission);
            var csv = json2csv({
                data: mission,
                fields: fields,


            });
        } else if (page.name == "missionUser") {
            var missionUser = [];
            var fields = ['MissionId', 'MissionName', 'Status', 'CreatedAt'];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.MissionId = pg.missionId;
                tempObj.MissionName = pg.name;
                tempObj.Status = pg.status;
                tempObj.CreatedAt = moment(pg.createdAt).format("DD/MM/YYYY");

                missionUser.push(tempObj);

            });
            console.log("mission", missionUser);
            var csv = json2csv({
                data: missionUser,
                fields: fields,


            });
        } else if (page.name == "CadLineWork") {
            var fields = ['CadId', 'UserId', 'Acreage', 'Description', 'Status', 'CreatedAt', 'CompletionDate'];
            var CadLineWork = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.CadId = pg.cadId;
                if (pg.user) {
                    tempObj.UserId = pg.user.dataId;
                } else {
                    tempObj.UserId = "";
                }
                if (pg.acreage) {
                    tempObj.Acreage = pg.acreage;
                } else {
                    tempObj.Acreage = "-";
                }
                if (pg.instruction) {
                    tempObj.Description = pg.instruction;
                } else {
                    tempObj.Description = "-";
                }


                tempObj.Status = pg.status;
                tempObj.CreatedAt = moment(pg.createdAt).format("DD/MM/YYYY");
                if (pg.completionDate) {
                    tempObj.CompletionDate = moment(pg.completionDate).format("DD/MM/YYYY")
                } else {
                    tempObj.CompletionDate = "-"
                }

                CadLineWork.push(tempObj);
            });

            console.log("mission", mission);
            var csv = json2csv({
                data: CadLineWork,
                fields: fields

            });
        } else if (page.name == "CadLineWorkForUser") {
            var fields = ['CadId', 'Acreage', 'Description', 'Status', 'DateofRequest', 'CompletionDate'];
            var CadLineWorkForUser = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.CadId = pg.cadId;
                if (pg.acreage) {
                    tempObj.Acreage = pg.acreage;
                } else {
                    tempObj.Acreage = "-";
                }
                if (pg.instruction) {
                    tempObj.Description = pg.instruction;
                } else {
                    tempObj.Description = "-";
                }
                tempObj.Status = pg.status;
                tempObj.DateofRequest = moment(pg.createdAt).format("DD/MM/YYYY");
                if (pg.completionDate) {
                    tempObj.CompletionDate = moment(pg.completionDate).format("DD/MM/YYYY")
                } else {
                    tempObj.CompletionDate = "-"
                }

                CadLineWorkForUser.push(tempObj);
            });

            console.log("mission", mission);
            var csv = json2csv({
                data: CadLineWorkForUser,
                fields: fields

            });
        } else if (page.name == "CadLineWorkForVendor") {
            var fields = ['MissionId', 'Acreage', 'Description', 'Status', 'DateofRequest', 'CompletionDate'];
            var CadLineWorkForVendor = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.MissionId = pg.mission.missionId;
                if (pg.acreage) {
                    tempObj.Acreage = pg.acreage;
                } else {
                    tempObj.Acreage = "-";
                }
                if (pg.instruction) {
                    tempObj.Description = pg.instruction;
                } else {
                    tempObj.Description = "-";
                }
                tempObj.Status = pg.status;
                tempObj.DateofRequest = moment(pg.createdAt).format("DD/MM/YYYY");
                if (pg.completionDate) {
                    tempObj.CompletionDate = moment(pg.completionDate).format("DD/MM/YYYY")
                } else {
                    tempObj.CompletionDate = "-"
                }

                CadLineWorkForVendor.push(tempObj);
            });

            console.log("mission", mission);
            var csv = json2csv({
                data: CadLineWorkForVendor,
                fields: fields

            });
        } else if (page.name == "user") {
            var fields = ['UserId', 'Name', 'Email', 'LisenceType', 'AccessLevel', 'DFMStatus', 'DFMPlan'];
            var user = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.UserId = pg.dataId;
                tempObj.Name = pg.name;
                tempObj.Email = pg.email;
                tempObj.LisenceType = pg.lisence;
                tempObj.AccessLevel = pg.accessLevel;
                tempObj.DFMStatus = pg.status;
                if (pg.currentSubscription) {
                    tempObj.DFMPlan = pg.currentSubscription.name
                } else {
                    tempObj.DFMPlan = "-"
                }
                user.push(tempObj);
            });

            console.log("user", mission);
            var csv = json2csv({
                data: user,
                fields: fields,

            });
        } else if (page.name == "ecommerce") {
            console.log("page data is ecc", page)
            var fields = ['DataId', 'TrascationId', 'TrascationDate', 'SoldItem', 'Cost', 'Lisence', 'Status', 'ShippingAddress'];
            var ecommerce = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                if (pg.user) {
                    tempObj.DataId = pg.user.dataId;
                } else {
                    tempObj.DataId = "-";
                }
                if (pg.transactionId) {
                    tempObj.TrascationId = pg.transactionId;
                } else {
                    tempObj.TrascationId = "-";
                }
                if (pg.transactionDate) {
                    tempObj.TrascationDate = pg.TrascationDate;
                } else {
                    tempObj.TrascationDate = "-";
                }
                if (pg.dfmSubscription) {
                    tempObj.SoldItem = pg.dfmSubscription.name

                } else if (pg.products[0]) {
                    tempObj.SoldItem = pg.products.name;

                } else if (pg.cadLineWork) {
                    tempObj.SoldItem = "cadLineWork";
                }
                if (pg.user) {
                    tempObj.Lisence = pg.user.lisence;
                } else {
                    tempObj.Lisence = "-";
                }
                tempObj.Cost = pg.totalAmount;

                tempObj.Status = pg.status;
                if (pg.shippingAddress) {
                    if (pg.shippingAddress.city) {
                        tempObj.ShippingAddress = pg.shippingAddress.city;
                    } else {
                        tempObj.ShippingAddress = "-";
                    }

                } else {
                    tempObj.ShippingAddress = "-";
                }


                ecommerce.push(tempObj);
            });

            console.log("ecommerce", mission);
            var csv = json2csv({
                data: ecommerce,
                fields: fields,
                quotes: ''

            });
        } else if (page.name == "vendor") {
            var fields = ['VendorId', 'Name', 'Email', 'ContactNumber', 'CreatedAt'];
            var vendor = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.VendorId = pg.dataId;
                tempObj.Name = pg.name;
                tempObj.Email = pg.email;
                tempObj.ContactNumber = pg.mobile;
                tempObj.CreatedAt = moment(pg.createdAt).format("DD/MM/YYYY");
                vendor.push(tempObj);
            });

            console.log("vendor", vendor);
            var csv = json2csv({
                data: vendor,
                fields: fields,

            });
        } else if (page.name == "ticket") {
            var fields = ['TicketId', 'CreatedAt', 'Subject', 'UserId', 'TicketStatus', 'TicketClosingDate'];
            var ticket = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.TicketId = pg.ticketId;
                tempObj.CreatedAt = moment(pg.createdAt).format("DD/MM/YYYY")
                tempObj.Subject = pg.subject;
                if (pg.user) {
                    tempObj.UserId = pg.user.dataId;
                } else {
                    tempObj.UserId = "-";
                }

                tempObj.TicketStatus = pg.status;
                if (pg.replyDate) {
                    tempObj.TicketClosingDate = moment(pg.replyDate).format("DD/MM/YYYY");
                } else {
                    tempObj.TicketClosingDate = "-";
                }
                ticket.push(tempObj);
            });

            console.log("ticket", ticket);
            var csv = json2csv({
                data: ticket,
                fields: fields,

            });
        } else if (page.name == "ticketForUser") {
            var fields = ['TicketId', 'CreatedAt', 'Subject', 'Description', 'TicketStatus', 'TicketClosingDate'];
            var ticketForUser = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.TicketId = pg.ticketId;
                tempObj.CreatedAt = moment(pg.createdAt).format("DD/MM/YYYY")
                tempObj.Subject = pg.subject;
                tempObj.Description = pg.description;
                tempObj.TicketStatus = pg.status;
                if (pg.replyDate) {
                    tempObj.TicketClosingDate = moment(pg.replyDate).format("DD/MM/YYYY");
                } else {
                    tempObj.TicketClosingDate = "-";
                }
                ticketForUser.push(tempObj);
            });

            console.log("ticketForUser", ticketForUser);
            var csv = json2csv({
                data: ticketForUser,
                fields: fields,

            });
        } else if (page.name == "invoice") {
            var fields = ['name', 'TrasactionDate', 'amount', 'status'];
            var invoice = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                tempObj.CadId = pg.cadId;
                if (pg.dfmSubscription) {
                    tempObj.name = pg.dfmSubscription.name;
                } else if (pg.products[0]) {
                    _.forEach(products, function (pro) {
                        tempObj.name = pro.products.name;
                    })

                } else if (pg.cadLineWork) {
                    tempObj.name = "cadLineWork";

                }
                if (pg.transactionDate) {
                    tempObj.TrasactionDate = moment(pg.transactionDate).format("DD/MM/YYYY")
                } else {
                    tempObj.TrasactionDate = "-"
                }

                tempObj.amount = pg.totalAmount;
                tempObj.status = pg.status;
                invoice.push(tempObj);
            });

            console.log("invoice", invoice);
            var csv = json2csv({
                data: invoice,
                fields: fields

            });
        } else if (page.name == "vendorbill") {
            var fields = ['MissionId', 'VendorBillId', 'Earning', 'PaymentStatus', 'AdditionalInfo', 'BillDate', 'PaidAmount', 'Balance', 'Advance'];
            var vendorbill = [];
            _.forEach(page, function (pg) {
                var tempObj = {};
                if (pg.cad.mission) {
                    tempObj.MissionId = pg.cad.mission.missionId;
                } else {
                    tempObj.MissionId = "-";
                }
                if (pg.cad.vendor) {
                    tempObj.VendorBillId = pg.cad.vendor.dataId;
                } else {
                    tempObj.VendorBillId = "-";
                }

                if (pg.cad) {
                    tempObj.Earning = pg.cad.vendorCharges;
                } else {
                    tempObj.Earning = "-";
                }

                tempObj.PaymentStatus = pg.paymentStatus;
                tempObj.AdditionalInfo = pg.additionalInfo;
                tempObj.BillDate = moment(pg.createdAt).format("DD/MM/YYYY")
                tempObj.PaidAmount = pg.paidAmount;
                if (pg.cad.vendorCharges > pg.paidAmount) {
                    tempObj.Balance = pg.cad.vendorCharges - pg.paidAmount;
                } else {
                    tempObj.Balance = "-";
                }
                if (pg.cad.vendorCharges < pg.paidAmount) {
                    tempObj.Advance = pg.cad.vendorCharges - pg.cad.vendorCharges;
                } else {
                    tempObj.Advance = "-";
                }
                vendorbill.push(tempObj);
            });

            console.log("vendorbill", vendorbill);
            var csv = json2csv({
                data: vendorbill,
                fields: fields,

            });
        }

        var newFilename = page.name + ".csv";
        var finalPath = newFilename;
        console.log("newFilename", newFilename)
        fs.writeFile(finalPath, csv, function (err, csvDatas) {
            if (err) {
                res.callback(err, null);
            } else {
                // console.log()
                fs.readFile(finalPath, function (err, csvData) {
                    if (err) {
                        res.callback(err, null);
                    } else {
                        res({
                            csvData: csvData,
                            path: newFilename,
                            finalPath: finalPath
                        })
                        fs.unlink(finalPath);
                    }
                });
            }
        });
    },


    generatePdfFormatData: function (page, res) {
        console.log("inside generatePdfFormatData", page.name)
        // console.log("inside generatePdfFormatData", page)

        var pdf = require('html-pdf');
        var env = {};
        if (page.name == "mission") {
            var obj = {};
            obj.missionId = [];
            obj.status = [];
            obj.name = [];
            obj.dataId = [];
            obj.cad = [];
            obj.createdAt = [];
            console.log("inside if mission")
            _.forEach(page, function (pg) {
                obj.missionId.push(pg.missionId);
                if (pg.user) {
                    obj.dataId.push(pg.user.dataId);
                } else {
                    obj.dataId.push("-");
                }

                obj.name.push(pg.name);
                obj.status.push(pg.status);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                if (pg.cadline[0]) {
                    obj.cad.push("YES");
                } else {
                    obj.cad.push("NO");
                }
            });
            obj.name1 = "mission";
        } else if (page.name == "missionUser") {
            var obj = {};
            obj.missionId = [];
            obj.status = [];
            obj.name = [];
            obj.dataId = [];
            obj.cad = [];
            obj.createdAt = [];
            console.log("inside if missionUser")
            _.forEach(page, function (pg) {
                obj.missionId.push(pg.missionId);
                obj.name.push(pg.name);
                obj.status.push(pg.status);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
            });
            obj.name1 = "missionUser";
        } else if (page.name == "CadLineWork") {
            var obj = {};
            obj.cadId = [];
            obj.dataId = [];
            obj.acreage = [];
            obj.instruction = [];
            obj.status = [];
            obj.createdAt = [];
            obj.CompletionDate = [];
            console.log("inside if CadLineWork")

            _.forEach(page, function (pg) {
                obj.cadId.push(pg.cadId);
                if (pg.user) {
                    obj.dataId.push(pg.user.dataId);
                } else {
                    obj.dataId.push("-");
                }
                if (pg.acreage) {
                    obj.acreage.push(pg.acreage);
                } else {
                    obj.acreage.push("-");
                }
                if (pg.instruction) {
                    obj.instruction.push(pg.instruction);
                } else {
                    obj.instruction.push("-");
                }


                obj.status.push(pg.status);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                if (pg.completionDate) {
                    obj.CompletionDate.push(moment(pg.completionDate).format("DD/MM/YYYY"));
                } else {
                    obj.CompletionDate.push("-");
                }
            });
            obj.name1 = "CadLineWork";
        } else if (page.name == "CadLineWorkForUser") {
            var obj = {};
            obj.cadId = [];
            obj.acreage = [];
            obj.instruction = [];
            obj.status = [];
            obj.createdAt = [];
            obj.CompletionDate = [];
            obj.missionId = [];
            console.log("inside if CadLineWorkForUser")

            _.forEach(page, function (pg) {
                obj.cadId.push(pg.cadId);
                if (pg.acreage) {
                    obj.acreage.push(pg.acreage);
                } else {
                    obj.acreage.push("-");
                }
                if (pg.instruction) {
                    obj.instruction.push(pg.instruction);
                } else {
                    obj.instruction.push("-");
                }
                obj.status.push(pg.status);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                if (pg.completionDate) {
                    obj.CompletionDate.push(moment(pg.completionDate).format("DD/MM/YYYY"));
                } else {
                    obj.CompletionDate.push("-");
                }
            });
            obj.name1 = "CadLineWorkForUser";
        } else if (page.name == "CadLineWorkForVendor") {
            var obj = {};
            obj.missionId = [];
            obj.acreage = [];
            obj.instruction = [];
            obj.status = [];
            obj.createdAt = [];
            obj.CompletionDate = [];
            obj.missionId = [];
            console.log("inside if CadLineWorkForVendor")

            _.forEach(page, function (pg) {
                obj.missionId.push(pg.mission.missionId);
                if (pg.acreage) {
                    obj.acreage.push(pg.acreage);
                } else {
                    obj.acreage.push("-");
                }
                if (pg.instruction) {
                    obj.instruction.push(pg.instruction);
                } else {
                    obj.instruction.push("-");
                }
                obj.status.push(pg.status);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                if (pg.completionDate) {
                    obj.CompletionDate.push(moment(pg.completionDate).format("DD/MM/YYYY"));
                } else {
                    obj.CompletionDate.push("-");
                }
            });
            obj.name1 = "CadLineWorkForVendor";
        } else if (page.name == "user") {
            var obj = {};
            obj.dataId = [];
            obj.name = [];
            obj.email = [];
            obj.status = [];
            obj.lisence = [];
            obj.accessLevel = [];
            obj.dfmPlan = [];
            console.log("inside if user")
            _.forEach(page, function (pg) {
                obj.dataId.push(pg.dataId);
                obj.name.push(pg.name);
                obj.email.push(pg.email);
                obj.status.push(pg.status);
                obj.lisence.push(pg.lisence);
                obj.accessLevel.push(pg.accessLevel);
                if (pg.currentSubscription) {
                    obj.dfmPlan.push(pg.currentSubscription.name)
                } else {
                    obj.dfmPlan.push("-")
                }

            });
            obj.name1 = "user";
        } else if (page.name == "ecommerce") {
            var obj = {};
            obj.DataId = [];
            obj.TrascationId = [];
            obj.TrascationDate = [];
            obj.SoldItem = [];
            obj.Cost = [];
            obj.Lisence = [];
            obj.Status = [];
            obj.ShippingAddress = [];
            console.log("inside if ecommerce")
            _.forEach(page, function (pg) {
                if (pg.user) {
                    obj.DataId.push(pg.user.dataId);
                } else {
                    obj.DataId.push("-");
                }
                if (pg.transactionId) {
                    obj.TrascationId.push(pg.transactionId);
                } else {
                    obj.TrascationId.push("-");
                }
                if (pg.transactionDate) {
                    obj.TrascationDate.push(pg.transactionDate);
                } else {
                    obj.TrascationDate.push("-");
                }

                obj.TrascationId.push("-");
                if (pg.dfmSubscription) {
                    obj.SoldItem.push(pg.dfmSubscription.name);
                } else if (pg.products[0]) {
                    var myVal = '';
                    _.forEach(products, function (pro) {
                        myVal = myVal + ',' + pro.name;
                    })
                    obj.SoldItem.push(myVal);
                } else if (pg.cadLineWork) {
                    obj.SoldItem.push("cadLineWork");

                }

                obj.Cost.push(pg.totalAmount);
                if (pg.user) {
                    obj.Lisence.push(pg.user.lisence);
                } else {
                    obj.Lisence.push("-");
                }


                obj.Status.push(pg.status);
                if (pg.shippingAddress) {
                    if (pg.shippingAddress.city) {
                        obj.ShippingAddress.push(pg.shippingAddress.city);
                    } else {
                        obj.ShippingAddress.push("-");
                    }


                } else {
                    obj.ShippingAddress.push("-");
                }

            });
            obj.name1 = "ecommerce";
        } else if (page.name == "vendor") {
            var obj = {};
            obj.dataId = [];
            obj.name = [];
            obj.email = [];
            obj.mobile = [];
            obj.createdAt = [];
            console.log("inside if vendor")
            _.forEach(page, function (pg) {
                obj.dataId.push(pg.dataId);
                obj.name.push(pg.name);
                obj.email.push(pg.email);
                obj.mobile.push(pg.mobile);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
            });
            obj.name1 = "vendor";
        } else if (page.name == "ticket") {
            var obj = {};
            obj.ticketId = [];
            obj.subject = [];
            obj.dataId = [];
            obj.status = [];
            obj.createdAt = [];
            obj.replyDate = [];

            console.log("inside if ticket")
            _.forEach(page, function (pg) {
                obj.ticketId.push(pg.ticketId);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                obj.subject.push(pg.subject);
                obj.dataId.push(pg.user.dataId);
                obj.status.push(pg.status);
                if (pg.replyDate) {
                    obj.replyDate.push(moment(pg.replyDate).format("DD/MM/YYYY"));
                } else {
                    obj.replyDate.push("-");
                }
            });
            obj.name1 = "ticket";
        } else if (page.name == "ticketForUser") {
            var obj = {};
            obj.ticketId = [];
            obj.subject = [];
            obj.dataId = [];
            obj.description = [];
            obj.status = [];

            obj.createdAt = [];
            obj.replyDate = [];

            console.log("inside if ticket")
            _.forEach(page, function (pg) {
                obj.ticketId.push(pg.ticketId);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                obj.subject.push(pg.subject);
                obj.description.push(pg.description);
                obj.status.push(pg.status);
                if (pg.replyDate) {
                    obj.replyDate.push(moment(pg.replyDate).format("DD/MM/YYYY"));
                } else {
                    obj.replyDate.push("-");
                }
            });
            obj.name1 = "ticketForUser";
        } else if (page.name == "invoice") {
            var obj = {};
            obj.name = [];
            obj.createdAt = [];
            obj.amount = [];
            obj.status = [];
            _.forEach(page, function (pg) {
                if (pg.dfmSubscription) {
                    obj.name.push(pg.dfmSubscription.name);
                } else if (pg.products[0]) {
                    var myVal = '';
                    _.forEach(products, function (pro) {
                        myVal = myVal + ',' + pro.name;
                    })
                    obj.name.push(myVal);
                } else if (pg.cadLineWork) {
                    obj.name.push("cadLineWork");

                }
                if (pg.transactionDate) {
                    obj.createdAt.push(moment(pg.transactionDate).format("DD/MM/YYYY"));
                } else {
                    obj.createdAt.push("-");
                }

                obj.amount.push(pg.totalAmount);
                obj.status.push(pg.status);


            });
            obj.name1 = "invoice";
        } else if (page.name == "vendorbill") {
            var obj = {};
            obj.missionId = [];
            obj.vendorBillId = [];
            obj.Earning = [];
            obj.paymentStatus = [];
            obj.additionalInfo = [];
            obj.createdAt = [];
            obj.paidAmount = [];
            obj.balance = [];
            obj.Advance = [];
            console.log("inside if vendorbill")
            _.forEach(page, function (pg) {
                if (pg.cad.mission) {
                    obj.missionId.push(pg.cad.mission.missionId);
                } else {
                    obj.missionId.push("-");
                }
                if (pg.cad.vendor) {
                    obj.vendorBillId.push(pg.cad.vendor.dataId);
                } else {
                    obj.vendorBillId.push("-");
                }
                if (pg.cad) {
                    obj.Earning.push(pg.cad.vendorCharges);
                } else {
                    obj.Earning.push("-");
                }

                obj.paymentStatus.push(pg.paymentStatus);
                obj.additionalInfo.push(pg.additionalInfo);
                obj.createdAt.push(moment(pg.createdAt).format("DD/MM/YYYY"));
                obj.paidAmount.push(pg.paidAmount);
                if (pg.cad) {
                    if (pg.cad.vendorCharges > pg.paidAmount) {
                        obj.balance.push(pg.cad.vendorCharges - pg.paidAmount);
                    } else {
                        obj.balance.push("-")
                    }
                    if (pg.cad.vendorCharges < pg.paidAmount) {
                        obj.Advance.push(mainData.cad.vendorCharges - mainData.cad.vendorCharges)
                    } else {
                        obj.Advance.push("-")
                    }
                } else {
                    console.log("inside else")
                }

            });
            obj.name1 = "vendorbill";
        }



        var i = 0;

        var file = "mission";
        // console.log("*****file data", obj);
        sails.hooks.views.render(file, obj, function (err, html) {
            if (err) {
                console.log("errr", err);
                callback(err);
            } else {
                console.log("*****file data*******", obj);
                // var path = "C:/Users/unifli/Documents/googleTile-Mosaic/";

                var newFilename = file + ".pdf";
                var finalPath = newFilename;
                var writestream = fs.createWriteStream(newFilename);
                writestream.on('finish', function (err, response) {
                    fs.readFile(finalPath, function (err, pdfData) {
                        if (err) {
                            res.callback(err, null);
                        } else {

                            res({
                                pdfData: pdfData,
                                path: newFilename,
                                finalPath: finalPath
                            })
                            fs.unlink(finalPath);
                        }
                    });

                });

                var options = {

                    "phantomPath": "C:/Windows//System32/phantomjs",
                    "format": "A4",

                    "directory": "/pdf",
                    "height": "13in", // allowed units: mm, cm, in, px
                    "width": "14in",

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

                };

                pdf.create(html, options).toStream(function (err, stream) {
                    if (err) {
                        console.log("err", err)
                        callback(err);
                    } else {
                        green("IN PDF CREATE");
                        // console.log("In Config To generate PDF");
                        i++;
                        stream.pipe(writestream);
                    }
                });
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


        obj.Cost = page.totalAmount;
        if (page.dfmSubscription) {
            obj.SoldItem = page.dfmSubscription.name;
            obj.price = page.dfmSubscription.amount;


        } else if (page.products[0]) {
            obj.SoldItem = page.products.name;
            obj.price = page.products.amount;
        } else if (page.cadLineWork) {
            obj.SoldItem = "cadLineWork";
            obj.price = page.cadLineWork.amount;
        }
        var i = 0;

        var file = "cad_invoice";
        sails.hooks.views.render(file, obj, function (err, html) {
            if (err) {
                console.log("errr", err);
                callback(err);
            } else {
                var path = "C:/Users/unifli/Documents/googleTile-Mosaic/";
                // var path = "pdf/";
                var newFilename = page.invoiceNo + ".pdf";
                var writestream = fs.createWriteStream(path + newFilename);
                writestream.on('finish', function (err, res) {
                    if (err) {
                        console.log("Something Fishy", err);
                    } else {
                        red("Finish is working");
                        // console.log("Success", res);
                        callback(null, {
                            id: page._id,
                            name: newFilename,
                            url: newFilename
                        });
                    }
                });

                var options = {
                    // "phantomPath": "node_modules/phantomjs/bin/phantomjs",
                    "phantomPath": "C:/Windows/System32/phantomjs",
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
                        console.log("err", err)
                        callback(err);
                    } else {
                        green("IN PDF CREATE");
                        // console.log("In Config To generate PDF");
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
                // console.log("folder----->>>>>", newPath);
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
        // console.log("onlyName", onlyName)
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
            // console.log("newNameExtire", newNameExtire);
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
        var path = name + "-" + moment().format("MMM-DD-YYYY-hh-mm-ss-amoment") + ".xlsx";
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

        // console.log("*************************** Inside email function of Config model ************************** & data is :", data);
        Password.find().exec(function (err, emailKey) {

            // console.log("************ inside emila function ****************", emailKey);
            if (err) {
                console.log(err);
                callback(err, null);
            } else if (emailKey && emailKey.length > 0) {
                if (data.filename && data.filename != "") {
                    var mandrill = require('mandrill-api/mandrill');
                    var mandrillClient = new mandrill.Mandrill(emailKey[0].name);

                    // console.log("**************filename *********************", data.filename);
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
                                // console.log("Email attachment found");
                                for (var idx = 0; idx < data.attachments.length; idx++) {
                                    emailMessage.attachments.push(data.attachments[idx]);
                                }
                            }

                            // console.log("Actual email message sent to mandrill: ", emailMessage);
                            mandrillClient.messages.send({
                                "message": emailMessage
                            }, function (result) {
                                // console.log(result);
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
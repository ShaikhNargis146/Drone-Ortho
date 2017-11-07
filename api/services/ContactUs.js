var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String
    },
    company: {
        type: String,
        default: ""
    },
    designation: {
        type: String,
        default: ""
    },
    description: {
        type: String,
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ContactUs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    sendEnquiry: function (data, callback) {
        console.log("data", data);
        ContactUs.saveData(data, function (err, data1) {
            console.log("data1", data1, err);
            if (err) {
                callback(err, null);
            } else if (data1) {
                var emailData = {}
                emailData.email = global["env"].adminEmail;
                emailData.filename = "New Inquiry (Admin)";
                emailData.subject = "INQUIEY DETAILS";
                emailData.merge_vars = [{
                    "name": "NAME",
                    "content": data1.name
                }, {
                    "name": "EMAIL",
                    "content": data1.email
                },{
                    "name": "PHONE",
                    "content": data1.phone
                },{
                    "name": "COMPANY",
                    "content": data1.company
                },{
                    "name": "DESIGNATION",
                    "content": data1.designation
                },{
                    "name": "DESCRIPTION",
                    "content": data1.description
                }];

                Config.email(emailData, function (err, emailRespo) {
                    console.log("emailRespo", emailRespo);
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (emailRespo) {
                        callback(null, "Contact us form saved successfully!!!");
                    } else {
                        callback("Invalid data", null);
                    }
                });

            } else {
                callback("Invalid data", null);
            }
        });
    },
};
module.exports = _.assign(module.exports, exports, model);
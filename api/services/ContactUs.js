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
        type: String,
        unique: true
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
        ContactUs.save(data).exec(function (err, data1) {
            console.log("data1", data1, err);
            if (err) {
                callback(err, null);
            } else if (data1) {
                console.log("data", data1);
                var emailData = {}
                emailData.email = data1.email;
                // emailData.mobile = data1.mobile;
                emailData.filename = "UNIFLI Inquiry";
                emailData.name = data1.name;
                emailData.subject = "Inquiry Details";
                console.log("email data : ", emailData);

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
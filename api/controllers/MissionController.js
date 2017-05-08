var CryptoJS = require("crypto-js");
var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var PythonShell = require('python-shell');
PythonShell.defaultOptions = {
    scriptPath: '/home/wohlig/Documents/htdocs/unifli-backend/api/controllers'
};

module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getMe: function (req, res) {
        if (req.body) {
            var dt1 = new Date();
            var utcDate = dt1.toUTCString();
            var nonce = "F6xfnbeo7vqZh";
            var timestamp = utcDate;
            var secretkey = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB";
            var publickey = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2";
            var key;
            var payloadhash;
            var signString;
            // NOW UPLOAD THE FILES.
            console.log("hash--", timestamp);

            var sha256 = CryptoJS.algo.SHA256.create();
            var hash = CryptoJS.SHA256("{}");
            console.log("hash--", sha256);
            key = nonce + timestamp + secretkey;
            // var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
            //  var payloadhash = hmac.finalize();

            payloadhash = CryptoJS.HmacSHA256(key, nonce + sha256);
            signString = "GET" + "\n" +
                "https://app.unifli.aero/api/missions/" + "\n" +
                timestamp + "\n" +
                publickey + "\n" +
                nonce + "\n" +
                "user-agent:" + "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" + "\n" +
                "content-length:" + "3495" + "\n" +
                payloadhash
            var signature = CryptoJS.HmacSHA256(key, signString)
            console.log("signature", signature);
            // var request = {
            //     method: 'GET',
            //     url: 'https://app.unifli.aero/api/missions/',
            //     headers: {
            //         "Content-type": undefined,
            //         "X-E38-Date": timestamp,
            //         "X-E38-Nonce": nonce,
            //         "Authorization": signature
            //     }
            // };

            // SEND THE FILES.
            // console.log("request--", request);
            request({
                url: "https://app.unifli.aero/api/missions/f992c907-eaa5-4604-9bc1-01d34bdeaed7",
                method: "GET"
            }, function (err, httpResponse) {
                console.log("err----", err);

                console.log("missionResponse", httpResponse);
                //err
                res.json({
                    value: true,
                    data: httpResponse
                });

            });
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },

    getSign: function (req, res) {
        var returnSign;
        PythonShell.run('APIRequest.py', {
            args: ['hello', 'world']
        }, function (err, results) {
            if (err) throw err;

            // results is an array consisting of messages collected during execution 
            returnSign = results;
            console.log('results:  %j', returnSign);
            url = "https://app.unifli.aero/api/missions/"
            date = returnSign[1]; // (new Date()).toISOString().slice(0, 19).replace(/[^0-9]/g, "") // moment.utc().format('YYYY-MM-DD HH:mm:ss'); // timestamp with UTC time
            console.log('UTC/GMT 0: ' + date);

            method = 'GET'
           
            request({
                url: url,
                method: method,
                headers: returnSign[3],
                timeout:"100",
                verify: "False"
            }, function (err, httpResponse) {
                //err
                console.log(err);
                res.json({
                    value: true,
                    data: httpResponse
                });

            });
        });


    }


};
module.exports = _.assign(module.exports, controller);
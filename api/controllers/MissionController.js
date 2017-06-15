var CryptoJS = require("crypto-js");
var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var PythonShell = require('python-shell');
var https = require("https");
var unirest = require('unirest');

PythonShell.defaultOptions = {
    scriptPath: './api/controllers'
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
                payloadhash;
            var signature = CryptoJS.HmacSHA256(key, signString);
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
            });
        }
    },

    getSign: function (req, res) {
        console.log('User-Agent: ' + req.headers['user-agent']);

        var returnSign;
        PythonShell.run('APIRequest.py', {
            args: [req.headers['user-agent'], 'world']
        }, function (err, results) {
            if (err) throw err;

            // results is an array consisting of messages collected during execution 
            returnSign = results;
            var newHeader = returnSign[3].replace(/'/g, '"');
            newHeader = JSON.parse(newHeader);
            newHeader["user-agent"] = req.headers['user-agent'];
            // console.log("newHeader--- ", newHeader);
            var formdata = {};
            formdata.description = "demonstration";
            formdata.collected_at = returnSign[1];
            // formdata.box = {
            //     "type": "Polygon",
            //     "coordinates": [
            //         [
            //             [-70.6626883860171, -33.47000899895843,
            //                 0.0
            //             ],
            //             [-70.6626883860171, -33.4577211167897,
            //                 0.0
            //             ],
            //             [-70.6504005205141, -33.4577211167897,
            //                 0.0
            //             ],
            //             [-70.6504005205141, -33.47000899895843,
            //                 0.0
            //             ],
            //             [-70.6626883860171, -33.47000899895843,
            //                 0.0
            //             ]
            //         ]
            //     ]
            // };
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            var requestBody = {
                rejectUnauthorized: false,
                url: "https://app.unifli.aero/api/missions/",
                method: "GET",
                headers: newHeader
            };
            // var api_options = {
            //     hostname: "app.unifli.aero",
            //     port: 443,
            //     path: "/api/missions/",
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'authorization': newHeader.authorization,
            //         "X-E38-Nonce": "92301kjsadln98123124",
            //         "X-E38-Date": returnSign[1]
            //     }
            // };

            // unirest.get('https://app.unifli.aero/api/missions/')
            //     .headers({
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //         'authorization': newHeader.authorization,
            //         "X-E38-Nonce": "92301kjsadln98123124",
            //         "X-E38-Date": returnSign[1]
            //     })
            //     .end(function (response) {
            //         console.log(response.body);
            //     });

            // Callback function is used to deal with response
            // var callback = function (response) {
            //     // Continuously update stream with data
            //     var body = '';
            //     response.on('data', function (data) {
            //         body += data;
            //     });

            //     response.on('end', function () {
            //         // Data received completely.
            //         console.log(body);
            //     });
            // }
            // var req = https.request(api_options, function (res) {
            //     res.on('data', function (data) {
            //         process.stdout.write(data);
            //     });
            // });
            // // write data to request body
            // req.write("abc");
            // req.end();
            request.get({
                url: requestBody.url,
                headers: newHeader
            }, function (err, httpResponse) {

                var formdata = {};
                formdata.total_parts = 1;
                formdata.downloadable = true;
                formdata.resource_type = "JPEG Image";
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                request.post({
                    url: "https://app.unifli.aero/api/missions/d6f85c48-5b04-4600-acf2-2fa42526ba5c/processings/5bf99122-3c6f-4762-9f2c-d76155141d6b/chunked/",
                    form: formdata,
                    headers: newHeader,
                    rejectUnauthorized: false,
                }, function (err, httpResponse1, body) {
                    console.log("error occired", err);
                    console.log("on other responce", httpResponse1);
                    res.callback(err, httpResponse1.body);
                });

                // res.callback(err, JSON.parse(httpResponse.body));
            });
            // var url = 'http://requestb.in/ze0r0vze'
            // request(requestBody, function (error, response, body) {
            //     if (!error) {
            //         console.log(response);
            //     }
            // });
        });


    }

};
module.exports = _.assign(module.exports, controller);
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
var crypto = require('crypto')
module.exports = _.cloneDeep(require("sails-wohlig-controller"));

function getDateTime() {
    d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    d = d.replace(/:/g, "");
    d = d.replace(/-/g, "");
    d = d.replace(' ', '');
    return d;
}

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
            console.log(body)
            return body
        });

}
var controller = {
    createMission: function (req, res) {
        console.log("m in getData", req.body);
        var url = "https://app.unifli.aero/api/missions/",
            method = "get",
            nonce = "92301kjsadln98123124",
            publicToken = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB",
            privateToken = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2",
            userAgent = req.headers['user-agent']
        date = getDateTime()

        //assign request to var body here 
        body = {
            description: req.body.description,
            collected_at: date
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
                },
                form: body
            },
            function (error, response, body) {
               var missionDetails=JSON.parse(body);
                console.log("body",missionDetails[0])
                
                req.body.missionId = missionDetails[0].id;
                if (body && missionDetails[0].id) {
                    Mission.saveData(req.body, res.callback);
                } else {
                    res.callback("Please provide Valid AccessToken", null);
                }
            });
    },
    initializeUpload: function (req, res) {
        console.log("m in getData");
        var url = "https://app.unifli.aero/api/missions/d6f85c48-5b04-4600-acf2-2fa42526ba5c/processings/5bf99122-3c6f-4762-9f2c-d76155141d6b/chunked/",
            method = "post",
            nonce = "92301kjsadln98123124",
            publicToken = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB",
            privateToken = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2",
            userAgent = req.headers['user-agent']

        //assign request to var body here 
        body = {
            total_parts: '3',
            downloadable: 'true',
            resource_type: 'JPEG Image'
        }

        contentLength = calculateContentLength(body)

        date = getDateTime()
        //E38 signing function
        sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength);
        //send request to server

        sendRequest(url, method, userAgent, date, nonce, publicToken, sign, body)
    },
    uploadingFiles: function (req, res) {
        console.log("m in getData");
        var url = "http://app.unifli.aero/api/chunked/dca3a410-feef-4cea-9afd-14ccf27ed7f5/",
            method = "post",
            nonce = "92301kjsadln98123124",
            publicToken = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB",
            privateToken = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2",
            userAgent = req.headers['user-agent']

        //assign request to var body here 
        body = {
            total_parts: '3',
            downloadable: 'true',
            resource_type: 'JPEG Image'
        }

        contentLength = calculateContentLength(body)

        date = getDateTime()
        //E38 signing function
        sign = Event38Signer(url, date, method, nonce, publicToken, privateToken, userAgent, contentLength);
        //send request to server

        sendRequest(url, method, userAgent, date, nonce, publicToken, sign, body)
    },
    getMissionFromServer:function(req,res){
        
         console.log("m in getData", req.body);
        var url = "https://app.unifli.aero/api/missions/d6f85c48-5b04-4600-acf2-2fa42526ba5c/",
            method = "get",
            nonce = "92301kjsadln98123124",
            publicToken = "TYQ8R9w3BZJ25zvKQhbFfE3XwAj2YtQAyUaVcOI3hsvEMTIo7p6FQRB3viqAgXRB",
            privateToken = "RNTY5FYNZHDnm7hWn3Z7v7qHaK8lkp2YAmAXR7Irp29wsmV47PA1JtJXQ5KwOdh2",
            userAgent = req.headers['user-agent']
        date = getDateTime()

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
               var missionDetails=JSON.parse(body);
                console.log("body",missionDetails)
               
            });
    }

};
module.exports = _.assign(module.exports, controller);
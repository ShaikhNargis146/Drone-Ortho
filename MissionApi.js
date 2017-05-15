function getSign(req, res) {
    var returnSign;
    PythonShell.run('APIRequest.py', {
        args: [req.headers['user-agent']]
    }, function (err, results) {
        if (err) throw err;

        // results is an array consisting of messages collected during execution 
        returnSign = results;
        var newHeader = returnSign[3].replace(/'/g, '"');
        newHeader = JSON.parse(newHeader);
        url= "https://app.unifli.aero/api/missions/",
            request.get({
                url: url,
                headers: newHeader
            }, function (err, httpResponse) {
                console.log(err);
                res.callback(err, httpResponse);
            });
    });
}
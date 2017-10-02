var path = require('path');

module.exports = {
    index: function (req, res) {
        res.metaView();
    },
    download: function (req, res) {
        Config.readUploaded(req.param("filename"), null, null, null, res);
    },
    backend: function (req, res) {
        var env = require("../../config/env/" + sails.config.environment + ".js");
        res.view("backend", {
            jsFiles: jsFilesBackend,
            title: "Backend",
            description: "Backend",
            keywords: "Backend",
            adminurl: env.realHost + "/api/",
        });
    },
    gitPull: function (req, res) {
        function gitPull() {
            exec('git pull', function (error, stdout, stderr) {
                if (error) {
                    return;
                }
                res.callback(error, {
                    stdout: stdout,
                    stderr: stderr
                });
            });
        }

        function decryptData(text) {
            if (text) {
                if (moment.unix(text).isBetween(moment().add(-1, "minute"), moment().add(1, "minute"))) {
                    gitPull();
                } else {
                    res.notFound();
                }
            } else {
                res.notFound();
            }
        }
        if (req.params && req.params.data) {
            decryptData(req.params.data);
        } else {
            res.notFound();
        }
    },
    getPdf: function (req, res) {
        res.set('Content-Type', "application/pdf");
        files = fs.readFileSync(sails.config.appPath + "/pdf/" + req.param("filename"));
        res.send(files);
    },

    getFile: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        // console.log("------------------------", sails.config.appPath); //check path first

        console.log("------------------------", req.param("filename")); //check path first
        var filePath = path.join("C:\Users", "unifli\Documents\pix4d");
        files = fs.readFileSync(path.join(filePath, req.param("filename")));
        res.send(files);
    }
};
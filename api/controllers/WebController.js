var path = require('path');

module.exports = {
    index: function (req, res) {
        var env = require("../../config/env/" + sails.config.environment + ".js");
        res.view("backend", {
            jsFiles: jsFilesBackend,
            title: "Backend",
            description: "Backend",
            keywords: "Backend",
            adminurl: env.realHost + "/api/",
            realhosturl: env.realHost
        });
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
            realhosturl: env.realHost
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

    getAutocad: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/extras/contours/" + name + "_elev10m_res100cm_size20_DSM.dxf";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    getContourLines: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0]
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/extras/contours/" + name + "_elev10m_res100cm_size20_DSM.shp";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    getContourPdf: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/extras/contours/" + name + "_elev10m_res100cm_size20_DSM.pdf";
        files = fs.readFileSync(filePath);
        res.send(files);
    },
    getTfw: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/2_mosaic/" + name + "_transparent_mosaic_group1.tfw";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    getOrthoM: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/2_mosaic/" + name + "_transparent_mosaic_group1.tif";
        files = fs.readFileSync(filePath);
        res.send(files);
    },


    //C: \Users\ unifli\ Documents\ pix4d\ missionByMe2\ 3 _dsm_ortho\ 1 _dsm
    //missionByMe2_dsm

    getDsm: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/3_dsm_ortho/1_dsm/" + name + "_dsm.tif";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    //C:\Users\unifli\Documents\pix4d\missionByMe2\2_densification\3d_mesh
    //missionByMe2_simplified_3d_mesh.fbx

    getMeshFbx: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/2_densification/3d_mesh/" + name + "_simplified_3d_mesh.fbx";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    //C:\Users\unifli\Documents\pix4d\missionByMe2\2_densification\point_cloud
    //missionByMe2_group1_densified_point_cloud.las

    getPointCloud: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        // var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        console.log("id", req.param("id"));
        console.log("missionName", req.param("missionName"));
        console.log("filename", req.param("filename"));

        var filePath = "/mymountpoint/" + id + "/" + req.param("missionName") + "/2_densification/point_cloud/" + req.param("filename");
        console.log('filePath', filePath);
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    //C:\Users\unifli\Documents\pix4d\missionByMe2\1_initial\report
    //missionByMe2_report

    getQualityReports: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/1_initial/report/" + name + "_generatedReport.pdf";
        files = fs.readFileSync(filePath);
        res.send(files);
    },


    // C:\Users\unifli\Documents\pix4d\missionByMe2
    // missionByMe2
    // .txt

    getProcessingLog: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/" + name + ".log";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    getMeshObj: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        var name = req.param("filename").split('.')[0];
        var id = req.param("id");
        var filePath = "/mymountpoint/" + id + "/" + name + "/2_densification/3d_mesh/" + name + "_simplified_3d_mesh.Obj";
        files = fs.readFileSync(filePath);
        res.send(files);
    },

    getOrtho: function (req, res) {
        res.set('Content-Type', "application/octet-stream");
        files = fs.readFileSync("/mymountpoint/" + req.param("filename"));
        res.send(files);
    },

    downloadWithName: function (req, res) {
        Config.downloadWithName(req.param("filename"), req.query.name, res);
    },
};
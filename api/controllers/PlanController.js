module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var path = require('path');
var fs = require('fs');
var readline = require('readline');
var pdftohtml = require('pdftohtmljs');

var controller = {

    pdfEditor1: function (req, res) {
        var filePath = "C:/Users/unifli/Documents/pix4d/" + req.body.path + "/1_initial/report/" + req.body.path + "_report.pdf";
        var destinationPath = path.join('C:', path.join('Users', path.join('unifli', path.join('Documents', path.join('googleTile-Mosaic', 'report')))));
        // var filePath = "/home/user/Documents/htdocs/unifli-backend/pdf/M2017112.pdf";
        // var destinationPath = "/home/user/Documents/htdocs/unifli-backend/pdf";
        exec('cd C:/pdf2htmlEX-win && pdf2htmlEX --dest-dir ' + destinationPath + ' ' + filePath, {
            maxBuffer: 1024 * 500000
        }, function (error, stdout, stderr) {
            if (error) {
                console.log("error inside --");
                res.callback(error)
            } else if (stdout) {
                console.log("and its working----stdout--->>>>", stdout);
                if (stdout.includes('Working')) {
                    fs.readFile(path, join(destinationPath, req.body.path + '_report.html'), function (err, html) {

                        if (err) {
                            console.log(err);
                        } else {
                            res.json({
                                value: true,
                                data: {
                                    html: html
                                }
                            });
                        }
                    });
                }
            } else {
                console.log("stderr----->>>>>>>");
                if (stderr.includes('Working')) {
                    fs.readFile(path.join(destinationPath, req.body.path + '_report.html'), 'utf8', function (err, html) {

                        if (err) {
                            console.log(err);
                        } else {
                            res.json({
                                value: true,
                                data: {
                                    html: html
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    generatePdf: function (page, response) {
        var pdf = require('html-pdf');
        var destinationPath = "C:/Users/unifli/Documents/pix4d/" + page.body.path + "/1_initial/report/" + page.body.path + '_generatedReport.pdf';

        var options = {
            // "phantomPath": "node_modules/phantomjs/bin/phantomjs",
            "phantomPath": "C:/Windows/System32/phantomjs",
            "format": "A4",
            // Export options 
            "directory": "/.tmp",
            "height": "22in", // allowed units: mm, cm, in, px
            "width": "15in",
            // "format": "Letter", // allowed units: A3, A4, A5, Legal, Letter, Tabloid 
            // "orientation": "portrait", // portrait or landscape 
            // "zoomFactor": "1", // default is 1 
            // Page options 
            "border": {
                "top": "1cm", // defaul t is 0, units: mm, cm, in, px 
                "right": "1cm",
                "bottom": "28.661011px",
                "left": "28.320000px"
            },
            // File options 
            "type": "pdf", // allowed file types: png, jpeg, pdf 
            "timeout": 30000, // Timeout that will cancel phantomjs, in milliseconds 
            "footer": {
                "height": "1cm",
            },
            // "filename": page.filename + ".pdf"
        };
        pdf.create(page.body.htmlData, options).toFile(destinationPath, function (err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
            response.json({
                value: true,
                data: {
                    message: "done"
                }
            });
        });

    },

    generatePdfForHtml: function (page, res) {
        // console.log("page---------",page.body.htmlData);
        var conversion = require("phantom-html-to-pdf")();
        var destinationPath = "C:/Users/unifli/Documents/pix4d/" + page.body.path + "/1_initial/report/" + page.body.path + '_generatedReport.pdf';

        conversion({
            html: page.body.htmlData,
            paperSize: {
                format: "A4",
                width: "15in",
                height: "22in",
                footerHeight: "1cm"
            },
        }, function (err, pdf) {
            var output = fs.createWriteStream(destinationPath)
            console.log(pdf.logs);
            console.log(pdf.numberOfPages);
            // since pdf.stream is a node.js stream you can use it
            // to save the pdf to a file (like in this example) or to
            // respond an http request.
            pdf.stream.pipe(output);
            res.json({
                value: true,
                data: {
                    message: "done"
                }
            });
        });
    }
};

module.exports = _.assign(module.exports, controller);
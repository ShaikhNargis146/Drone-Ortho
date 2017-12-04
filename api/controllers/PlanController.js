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
                console.log("error inside --", error);
                res.callback(error)
            } else if (stdout) {
                console.log("and its working----stdout", stdout);
                if (stdout.includes('Working')) {
                    fs.readFile(path, join(destinationPath, req.body.path + '_report.html'), function (err, html) {

                        if (err) {
                            console.log(err);
                        } else {
                            res.callback(null, html)
                        }
                    });
                }
            } else {
                console.log("stderr", stderr);
                res.callback(stderr)
            }
        });
    },

    generatePdfForHtml: function (page, callback) {
        // console.log("page---------",page.body.htmlData);
        var conversion = require("phantom-html-to-pdf")();
        var destinationPath = "C:/Users/unifli/Documents/pix4d/" + req.body.path + "/1_initial/report/" + req.body.path + '_generatedReport.pdf';

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
        });
    }
};

module.exports = _.assign(module.exports, controller);
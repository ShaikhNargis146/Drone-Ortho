/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        controller: "WebController",
        action: "index",
        skipAssets: true,
        skipRegex: /api|backend/i
    },
    'GET /gitPull/:data': {
        controller: "WebController",
        action: "gitPull",
        skipAssets: true,
        skipRegex: /api|backend/i
    },

    'GET /*': {
        controller: "WebController",
        action: "index",
        skipAssets: true,
        skipRegex: /api|backend/i
    },

    "/api/download/:filename": {
        controller: "WebController",
        action: "download"
    },

    'GET /pdf/:filename': {
        controller: "WebController",
        action: "getPdf"
    },

    'GET /api/getAutocad/:id/:filename': {
        controller: "WebController",
        action: "getAutocad"
    },

    'GET /api/getContourLines/:id/:filename': {
        controller: "WebController",
        action: "getContourLines"
    },

    'GET /api/getContourPdf/:id/:filename': {
        controller: "WebController",
        action: "getContourPdf"
    },
    'GET /api/getTfw/:id/:filename': {
        controller: "WebController",
        action: "getTfw"
    },

    'GET /api/getOrthoM/:id/:filename': {
        controller: "WebController",
        action: "getOrthoM"
    },

    'GET /api/getDsm/:id/:filename': {
        controller: "WebController",
        action: "getDsm"
    },

    // 'GET /api/getMeshObj/:filename': {
    //     controller: "WebController",
    //     action: "getMeshObj"
    // },

    'GET /api/getMeshFbx/:id/:filename': {
        controller: "WebController",
        action: "getMeshFbx"
    },
    'GET /api/getPointCloud/:missionName/:filename/:id': {
        controller: "WebController",
        action: "getPointCloud"
    },

    'GET /api/getQualityReports/:id/:filename': {
        controller: "WebController",
        action: "getQualityReports"
    },

    'GET /api/getProcessingLog/:id/:filename': {
        controller: "WebController",
        action: "getProcessingLog"
    },

    'GET /api/getMeshObj/:id/:filename': {
        controller: "WebController",
        action: "getMeshObj"
    },

    'GET /api/getOrtho/:id/:filename': {
        controller: "WebController",
        action: "getOrtho"
    },

    "GET /api/downloadWithName/:filename": {
        controller: "WebController",
        action: "downloadWithName"
    },



    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

};
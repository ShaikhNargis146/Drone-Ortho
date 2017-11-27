/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMongodbServer'
    // }
    port: 1337,
    realHost: "http://localhost:1337",
    emails: ["chintan@wohlig.com", "jagruti@wohlig.com", "tushar@wohlig.com", "chirag@wohlig.com", "harsh@wohlig.com", "nargis.shaikh@wohlig.com"],
    adminEmail: 'info@unifli.aero',
    CLIENT_ID: '6b7b968f-2227-474a-886a-7f3925098873',
    DOMAIN: 'e247dc39-abba-4fcf-b626-370066fc99e6',
    APPLICATION_SECRET: 'OVuj+j1DV+qIrTgkLGWg95pfledcIqztlDkSDwRomTU=',
    AZURE_SUBSCRIPTION_ID: 'ac825e96-87df-4576-93fb-5a3f24840ed2',

};
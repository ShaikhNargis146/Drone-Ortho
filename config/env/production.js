/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: 82,
  // realHost: "http://13.65.103.46:82",
  realHost: "https://cloud.unifli.aero",
  emails: ["chintan@wohlig.com", "jagruti@wohlig.com", "tushar@wohlig.com", "chirag@wohlig.com", "harsh@wohlig.com", "nargis.shaikh@wohlig.com"],
  adminEmail: 'info@unifli.aero',
  CLIENT_ID: '8071bab1-bd2b-44c3-8187-c4e0ff587a6d',
  DOMAIN: '21890070-e17a-4ba7-a788-e3533a8e1cb8',
  APPLICATION_SECRET: 'e67K/jEBfaNlyR69NSDBULSduGIaU5csBXPKXaFkLRg=',
  AZURE_SUBSCRIPTION_ID: '88979fb6-3173-4a84-840e-0d1317650f11',
  ORTHOFOLDER: '/home/unifliubuntu/files/orthoFiles/'

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
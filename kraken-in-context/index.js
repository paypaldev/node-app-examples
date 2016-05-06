'use strict';

var express = require('express');
var kraken = require('kraken-js');
var ppconfig = require('../ppconfig/sandbox');
var paypal = require('paypal-rest-sdk');


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        paypal.configure({
	        'mode': 'sandbox', //sandbox or live
	        'client_id': ppconfig.client_id,
	        'client_secret': ppconfig.client_secret,
	        'grant_type': 'client_credentials',
	        'content_type': 'application/x-www-form-urlencoded'
	    });
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

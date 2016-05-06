'use strict';

var express = require('express'),
	paypal = require('paypal-rest-sdk'),
	async = require('async'),
    ppconfig = require('../ppconfig/sandbox');

var app = express();

paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': ppconfig.client_id,
        'client_secret': ppconfig.client_secret,
        'grant_type': 'client_credentials',
        'content_type': 'application/x-www-form-urlencoded'
    });

app.listen(3000, function () {
	console.log('express-in-context app listening on port 3000!');
});
app.get('/', function (req, res) {
	res.sendFile( __dirname + '/button.html');
});

app.get('/checkout', function (req, res) {
	//build PayPal payment request
    var payReq = {
        intent:'sale',
        redirect_urls:{
            return_url:'http://localhost:3000/return',
            cancel_url:'http://localhost:3000/cancel'
        },
        payer:{
            payment_method:'paypal'
        },
        transactions:[{
            amount:{
                total:'7.47',
                currency:'USD'
            },
            description:'This is the payment transaction description.'
        }]
    };

    async.waterfall([
            function(callback) {
                 paypal.generate_token( function(err, token) {
                    if(err) {
                        console.log('generate_token ERROR: ');
                        console.log(err);
                        callback(err);
                    } else {
                        console.log('----------------------------------------------------------');
                 		console.log('----------       ACCESS TOKEN RESPONSE          ----------');
                 		console.log('----------------------------------------------------------');
                        console.log(JSON.stringify(token));
                        callback(null, token);
                    }
                });
             },
            function(token, callback) {
                 console.log('----------------------------------------------------------');
                 console.log('----------             CREATE PAYMENT           ----------');
                 console.log('----------------------------------------------------------');
                 console.log(JSON.stringify(payReq));

                 paypal.payment.create(payReq, function (err, response) {
                    if(err) {
                        console.log('create payment ERROR: ');
                        console.log(err);
                        callback(err);
                    } else {
                        console.log('----------------------------------------------------------');
		                console.log('----------     CREATE PAYMENT RESPONSE          ----------');
		                console.log('----------------------------------------------------------');
                        console.log(JSON.stringify(response));

                        var url = response.links[1].href;
                        var tmpAr = url.split('EC-');
                        var token = {};
                        token.redirectUrl = 'https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-' + tmpAr[1];
                        token.token = 'EC-' + tmpAr[1];
                        console.log('------ Token Split ------');
                        console.log(token);

                        callback(null, token);
                    }
                });
             }], function (err, result) {
            if(err){
                    console.log('An ERROR occured!');
                    console.log(err);
                    res.json(err);
                } else {
                    console.log('----------------------------------------------------------');
	                console.log('----------          REDIRECTING USER            ----------');
	                console.log('----------------------------------------------------------');
                    console.log(result.redirectUrl);
                    res.redirect(result.redirectUrl);
                }
        });
});

app.get('/return', function (req, res) {
	console.log('----------------------------------------------------------');
	console.log('----------       RETURN WITH QUERY PARAMS       ----------');
	console.log('----------------------------------------------------------');
	console.log(JSON.stringify(req.query));

	paypal.payment.get(req.query.paymentId, function (err, payment) {
		if(err !== null) {
			console.log('ERROR');
			console.log(err);
			res.json(err);
		} else {
			console.log('----------------------------------------------------------');
            console.log('----------             PAYMENT DETAILS          ----------');
            console.log('----------------------------------------------------------');
            console.log(JSON.stringify(payment));
            var execute_details = { 'payer_id': payment.payer.payer_info.payer_id };
            paypal.payment.execute(payment.id, execute_details, function (err, response) {
            	if(err !== null){
            		console.log('ERROR');
					console.log(err);
					res.json(err);
            	} else {
            		console.log('----------------------------------------------------------');
		            console.log('----------      PAYMENT COMPLETED DETAILS       ----------');
		            console.log('----------------------------------------------------------');
		            console.log(JSON.stringify(response));
		            var displayData = "ID: " + response.id + "<br />State: " + response.state + "<br />";
		            res.send(displayData);
            	}
            })
		}
	})
});

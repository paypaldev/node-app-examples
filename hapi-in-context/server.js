'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Path = require('path');
var async = require('async'),
    paypal = require('paypal-rest-sdk'),
    ppconfig = require('../ppconfig/sandbox');


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': ppconfig.client_id,
        'client_secret': ppconfig.client_secret,
        'grant_type': 'client_credentials',
        'content_type': 'application/x-www-form-urlencoded'
});

const checkoutHandler = function (request, reply) {

        //build PayPal payment request
        var payReq = {
            "intent":"sale",
            "redirect_urls":
                {
                    "return_url":"http://localhost:8000/return",
                    "cancel_url":"http://localhost:8000/cancel"
                },
            "payer":
                {
                    "payment_method":"paypal"
                },
            "transactions":[
                {
                    "amount":
                    {
                        "total":"15.00",
                        "currency":"USD",
                        "details":
                            {
                                "shipping":"2.00",
                                "subtotal":"13.00",
                                "tax":"0.00",
                                "handling_fee":"0.00",
                                "insurance":"0.00",
                                "shipping_discount":"0.00"
                            }
                    },
                    "description":"My Payment Description",
                    "invoice_number": "ABCDEFGHIJK" + Date.now(),
                    "item_list":
                    {
                        "items":
                        [
                            {
                                "quantity":"1",
                                "name":"Item 0 Name",
                                "price":"7.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654321",
                                "description":"Item 0 Description",
                                "tax":"0.00"
                            },
                            {
                                "quantity":"1",
                                "name":"Item 1 Name",
                                "price":"2.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654322",
                                "description":"Item 1 Description",
                                "tax":"0.00"
                            },
                            {
                                "quantity":"1",
                                "name":"Item 2 Name",
                                "price":"2.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654323",
                                "description":"Item 2 Description",
                                "tax":"0.00"
                            },
                            {
                                "quantity":"1",
                                "name":"Item 3 Name",
                                "price":"2.00",
                                "currency":"USD",
                                "sku":"ABCDEFGHIJKL987654324",
                                "description":"Item 3 Description",
                                "tax":"0.00"
                            }
                        ]
                    }
                }
            ]
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
                        return reply.continue(err);
                    } else {
                        console.log('----------------------------------------------------------');
                        console.log('----------          REDIRECTING USER            ----------');
                        console.log('----------------------------------------------------------');
                        console.log(result.redirectUrl);
                        return reply.redirect(result.redirectUrl);
                    }
            });
        };

const completePaymentHandler = function (request, reply) {
        var paymentId = request.query.paymentId;
        paypal.payment.get(paymentId, function (err, payment) {
            if(err !== null) {
                console.log('ERROR');
                console.log(err);
                reply(err);
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
                        reply(err);
                    } else {
                        console.log('----------------------------------------------------------');
                        console.log('----------      PAYMENT COMPLETED DETAILS       ----------');
                        console.log('----------------------------------------------------------');
                        console.log(JSON.stringify(response));
                        reply.view('return', {payment: response, parsedResponse: JSON.stringify(response)});
                    }
                });
            }
        });
};

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route([
        //set routes for public CSS/JS
        {
            method: "GET",
            path: "/public/{path*}",
            handler: {
                directory: {
                    path: "./public",
                    listing: false,
                    index: false
                }
            }
        },
        //set route for home or '/' page.
        {
            method: 'GET',
            path:'/', 
            handler: function (request, reply) {
                return reply.view('main');
            }
        },
        //set route for return or '/return' page.
        {
            method: 'GET',
            path:'/return', 
            handler: completePaymentHandler
        },
        //set route for cancel or '/cancel' page.
        {
            method: 'GET',
            path:'/cancel', 
            handler: function (request, reply) {
                return reply.view('cancel');
            }
        },
        //set route for checkout or '/checkout' page.
        {
            method: 'POST',
            path:'/checkout', 
            handler: checkoutHandler
        }
    ]);
});

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
                html: require('handlebars')
            },
            path: './public/templates',
            layout: true,
            layoutPath: './public/templates/layouts'
        });
});


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
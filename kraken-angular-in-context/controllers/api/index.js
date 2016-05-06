'use strict';

var paypal = require('paypal-rest-sdk');
var async = require('async');

module.exports = function (router) {

    router.post('/createPayment', function (req, res) {
        var reqObj = req.body;
        console.log('----------------------------------------------------------');
        console.log('----------         PAYMENT_DETAILS OBJ          ----------');
        console.log('----------------------------------------------------------');
        console.log(JSON.stringify(reqObj));

        async.waterfall([
            function (callback) {
                 paypal.generate_token( function (err, token) {
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
            function (token, callback) {
                 paypal.payment.create(reqObj, function (err, response) {
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
                        token.redirectUrl = 'https://www.sandbox.paypal.com/checkoutnow?token=EC-' + tmpAr[1];
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
                    console.log('----------        RESPONSE TO ANGULAR           ----------');
                    console.log('----------------------------------------------------------');
                    console.log(JSON.stringify(result));
                    res.json(result);
                }
        });
    });

    router.post('/getPaymentDetails', function (req, res) {
        console.log('----------------------------------------------------------');
        console.log('--------------  PAYMENT DETAILS REQUEST  ----------------');
        console.log('----------------------------------------------------------');
        console.log(JSON.stringify(req.body));
        paypal.payment.get(req.body.paymentId, function (error, payment){
            if(error !== null){
              console.log('ERROR');
              console.log(error);
              res.json(error);
            } else {
              console.log('----------------------------------------------------------');
              console.log('--------------  PAYMENT DETAILS RESPONSE  ----------------');
              console.log('----------------------------------------------------------');
              console.log(JSON.stringify(payment));
              res.json(payment);
            }
        });
    });

    router.post('/executePayment', function (req, res) {
        console.log('----------------------------------------------------------');
        console.log('---------------  EXECUTE PAYMENT REQUEST -----------------');
        console.log('----------------------------------------------------------');
        var pmtDetails = req.body;
        var execute_details = { 'payer_id': pmtDetails.payer.payer_info.payer_id };
        console.log(JSON.stringify(execute_details));
        console.log(JSON.stringify(pmtDetails.id));
        paypal.payment.execute(pmtDetails.id, execute_details, function (err, response) {
                if(err) {
                console.log('execute payment ERROR: ');
                console.log(err);
                res.json(err);
            } else {
                console.log('----------------------------------------------------------');
                console.log('---------------  EXECUTE PAYMENT RESPONSE ----------------');
                console.log('----------------------------------------------------------');
                console.log(JSON.stringify(response));
                res.json(response);
            }
        });
    });
};
'use strict';
angular.module('frontEndApp').service('apiModel', function($http, $cookies, $location, $window, $timeout) {

    function createPayment() {
        var reqUrl = '/api/createPayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.pmtData, config).
            success(function (response) {
                model.createPaymentResponse = response;
                console.log(model.createPaymentResponse);
            }).
            error(function (response) {
                console.log('createPayment ERROR');
                console.log(response);
            });
    }

    function getPaymentDetails() {
        var reqUrl = '/api/getPaymentDetails';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.queryParams, config).
            success(function (response) {
                model.paymentDetails = response;
                console.log(model.paymentDetails);
            }).
            error(function (response) {
                console.log('getPaymentDetails ERROR');
                console.log(response);
            });
    }

    function executePayment() {
        var reqUrl = '/api/executePayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.paymentDetails, config).
            success(function (response) {
                model.completePaymentDetails = response;
                model.executePaymentButton = false;
                console.log(model.completePaymentDetails);
            }).
            error(function (response) {
                console.log('executePayment ERROR');
                console.log(response);
            });
    }

    var model = {
        pmtData: {
            intent:'sale',
            redirect_urls:{
                return_url:'http://localhost:8000/return/#',
                cancel_url:'http://localhost:8000/cancel/#'
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
        },
        createPaymentResponse: {},
        queryParams: {},
        paymentDetails: {},
        executePaymentButton: true,
        completePaymentDetails: {},
        createPayment: function (model) {
            return createPayment(model);
        },
        getPaymentDetails: function (model) {
            return getPaymentDetails(model);
        },
        executePayment: function (model) {
            return executePayment(model);
        }
    };

return model;

});
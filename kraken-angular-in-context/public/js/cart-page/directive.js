'use strict';
angular.module('frontEndApp').directive('cartPage', [function() {
    return {
        restrict: 'E',
        scope: {},
        controller: ['$scope', 'angularLoad', '$location', '$timeout', 'apiModel', function($scope, angularLoad, $location, $timeout, apiModel) {
            $scope.model = apiModel;

            function doCheckout() {
                paypal.checkout.initXO();
                var createPayment = $scope.model.createPayment();
                createPayment.success(function (response) {
                    console.log('createPayment Success: ', response);
                    paypal.checkout.startFlow(response.token);
                });
                createPayment.error(function (err) {
                    console.error('createPayment ERROR ', err);
                    paypal.checkout.closeFlow();
                });
            }            
            
            angularLoad.loadScript('https://www.paypalobjects.com/api/checkout.js').then(function() {
                paypal.checkout.setup("MFUX86KBB6EM2", {
                    async: true,
                    environment: 'sandbox',
                    buttons: [
                        {
                            container: 'paypalForm',
                            type: 'checkout',
                            shape: 'rect',
                            size: 'small',
                            click: doCheckout,
                            color: 'blue'
                        }
                    ]
                });
                paypal.checkout.events.on('success', function (token) { console.log('success, token: ', token)});
                paypal.checkout.events.on('failure', function (error) { console.error('error! ', error)});
                paypal.checkout.events.on('return', function (url) { console.log('return url: ', url)});

            }).catch(function (error) {
                console.log('ERROR: When Rendering Checkout with PayPal Button - ');
                console.log(error);
            });
        }],
        templateUrl: '/js/cart-page/template.html',
    };
}]);
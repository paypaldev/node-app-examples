'use strict';

//since we're using DustJS, 
//we must set the startSymbol and endSymbol to '[[]]'.

angular.module('frontEndApp', ['ngCookies', 'angularLoad'])
.config(function ($interpolateProvider, $cookiesProvider) {
    $interpolateProvider
        .startSymbol('[[');
    $interpolateProvider
        .endSymbol(']]');
    $cookiesProvider.defaults.path = '/';
    $cookiesProvider.defaults.secure = false;
});
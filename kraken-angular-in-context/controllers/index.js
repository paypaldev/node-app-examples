'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = new IndexModel('cart-page');
        res.cookie('XSRF-TOKEN', res.locals._csrf); //setting a cookie that is accessible by Angular
        res.render('index', model);
    });

    router.get('/return', function (req, res) {
        var model = new IndexModel('return-page');
        res.cookie('XSRF-TOKEN', res.locals._csrf); //setting a cookie that is accessible by Angular
        res.render('index', model);
    });
};
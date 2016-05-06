'use strict';

module.exports = function IndexModel(page) {
    if(page === 'cart-page') {
        return {
            component: 'cart-page',
            title: 'Cart Page'
        };
    } else if(page === 'return-page') {
        return {
            component: 'return-page',
            title: 'Return Page'
        };
    } else {
        return {
            name: 'index'
        };
    }
};
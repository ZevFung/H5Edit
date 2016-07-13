'use strict';

module.exports.alert = function(store, params) {
    store.dispatch('ALERT', params);
    setTimeout(function() {
        store.dispatch('HIDEALERT');
    }, 2500);
};
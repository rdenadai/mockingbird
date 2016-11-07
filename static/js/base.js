let init = (function() {
    'use strict';

    // register the service worker if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(reg) {
            console.log('Successfully registered service worker', reg);
        }).catch(function(err) {
            console.warn('Error whilst registering service worker', err);
        });
    }

    window.addEventListener('online', function(e) {
        // re-sync data with server
        actions.showDefaultSnackBar("You are online! :D");
    }, false);

    window.addEventListener('offline', function(e) {
        // queue up events for server
        actions.showDefaultSnackBar("You are offline... :(");
    }, false);

    window.onpopstate = function(event) {
        if(event.state.url) {
            actions.load(event.state.url);
            history.remove(event.state.url);
        }
    };

    // check if the user is connected
//    if (navigator.onLine) {
//        actions.showDefaultSnackBar("You are online");
//    } else {
//        // show offline message
//        actions.showDefaultSnackBar("You are offline");
//    }
    actions.loadHomeScreen();
});

document.addEventListener("DOMContentLoaded", function(event) {
    init();
});
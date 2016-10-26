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
    console.log("You are online");
}, false);

window.addEventListener('offline', function(e) {
    // queue up events for server
    console.log("You are offline");
}, false);

// check if the user is connected
if (navigator.onLine) {
    console.log("You are online");
} else {
    // show offline message
    console.log("You are offline");
}


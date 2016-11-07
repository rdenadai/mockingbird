let actions = (function() {
    'use strict';

    function showDefaultSnackBar(message) {
        let snackbar = new models.SnackBar();
        snackbar.setMessage(message);
        snackbar.show();
    };

    function load(url = '/', elementTo = '#content') {
        functions.load(url, elementTo);
    }

    function loadHomeScreen(elementTo = '#content') {
        history.add({url: '/home/'}, 'Home', '/home/');
        functions.load('/home/', elementTo);
    }

    function addPodcastInterface(elementTo = '#content') {
        history.add({url: '/addpodcast/'}, 'Add Podcast', '/addpodcast/');
        functions.load('/addpodcast/', elementTo);
    };

    return {
        showDefaultSnackBar: showDefaultSnackBar,
        load: load,
        loadHomeScreen: loadHomeScreen,
        addPodcastInterface: addPodcastInterface
    }

})();
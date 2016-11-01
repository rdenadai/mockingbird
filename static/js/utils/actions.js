let actions = (function() {
    'use strict';

    function showDefaultSnackBar(message) {
        let snackbar = new models.SnackBar();
        snackbar.setMessage(message);
        snackbar.show();
    };

    function loadHomeScreen(elementTo = '#content') {
        functions.load('./home/', elementTo);
    }

    function addPodcastInterface(elementTo = '#content') {
        functions.load('./addpodcast/', elementTo);
    };

    return {
        showDefaultSnackBar: showDefaultSnackBar,
        loadHomeScreen: loadHomeScreen,
        addPodcastInterface: addPodcastInterface
    }

})();
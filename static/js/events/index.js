(function() {
    'use strict';

    $(document)
        .off('click', '.action-navigation')
        .on('click', '.action-navigation', function(event) {
            event.preventDefault();
            let targetElement = event.target || event.srcElement;
            if(targetElement.href.indexOf('#home') !== -1) {
                actions.loadHomeScreen();
            }
    });

    $(document)
        .off('click', '#mockingbird-fab-add-podcast')
        .on('click', '#mockingbird-fab-add-podcast', function(evt) {
            actions.addPodcastInterface();
    });

    $(document)
        .off('click', '#mockingbird-add-podcast')
        .on('click', '#mockingbird-add-podcast', function(evt) {
            actions.addPodcastInterface();
    });

})();
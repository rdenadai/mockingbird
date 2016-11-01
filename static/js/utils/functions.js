let functions = (function() {
    'use strict';

    function load(url, elementTo) {
        function execute(response) {
            // Examine the text in the response
            response.text().then(function(data) {
                $(elementTo).html(data);
                $(elementTo).velocity({ opacity: 1, visibility: "visible" });
            });
            return response;
        };

        $(elementTo).velocity({ opacity: 0, visibility: "hidden" }, {
            complete: function(elements) {
                caches.match(url).then(function(response) {
                    if (response) {
                        // retrieve from cache
                        return execute(response);
                    }

                    let headers = new Headers();
                    headers.append("Content-Type", "text/html");

                    let conf = {
                        method: 'GET',
                        headers: headers,
                        mode: 'cors',
                        cache: 'default'
                    };

                    // fetch as normal
                    fetch(url, conf).then(
                        function(response) {
                            if (response.status !== 200) {
                                return;
                            }
                            return execute(response);
                        }
                    )
                    .catch(function(err) {
                        let snackbar = new models.SnackBar();
                        snackbar.setMessage('An error occurred while processing your request.');
                        snackbar.show();
                    });
                });
            }
        });
    }

    return {
        load: load
    }

})();
let functions = (function() {
    'use strict';

    function load(url, elementTo) {
        function parser(response, elementTo) {
            // Examine the text in the response
            response.text().then(function(data) {
                $(elementTo).html(data);
                $(elementTo).velocity({ opacity: 1, visibility: "visible" });
                componentHandler.upgradeElements(document.querySelector(elementTo));
            });
            return response;
        };

        function execute(url, elementTo) {
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
                    return parser(response, elementTo);
                }
            )
            .catch(function(err) {
                let snackbar = new models.SnackBar();
                snackbar.setMessage('An error occurred while processing your request.');
                snackbar.show();
            });
        };

        $(elementTo).velocity({ opacity: 0, visibility: "hidden" }, {
            complete: function(elements) {
                caches.match(url).then(function(response) {
                    if (response) {
                        // retrieve from cache
                        return parser(response, elementTo);
                    }
                    return execute(url, elementTo);
                })
                .catch(function(err) {
                    return execute(url, elementTo);
                });
            }
        });
    }

    return {
        load: load
    }

})();
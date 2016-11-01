let models = (function() {
    'use strict';

    class SnackBar {
        constructor(id = '#default-mockingbird-snackbar') {
            this.id = id;
        }
        setMessage(message = '') {
            this.message = message;
        }
        setTimeout(timeout = 2000) {
            this.timeout = timeout;
        }
        setHandler(handler = null) {
            this.handler = handler;
        }
        setActionText(actionText = 'Undo') {
            this.actionText = actionText;
        }
        show() {
            let data = {
                message: this.message,
                timeout: this.timeout,
                actionHandler: this.handler,
                actionText: this.actionText
            };
            let dom_obj = document.querySelector(this.id);
            dom_obj.MaterialSnackbar.showSnackbar(data);
        }
    }

    return {
        SnackBar: SnackBar
    };

})();

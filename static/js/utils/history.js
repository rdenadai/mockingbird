let history = (function() {
    'use strict';

    class MockingBirdHistory {
        constructor (stateObj, pageName, pageUrl) {
            this.stateObj = stateObj;
            this.pageName = pageName;
            this.pageUrl = pageUrl;
        }
        toIdString() {
            return this.pageUrl;
        }
    };

    class MockingBirdHistoryArray {
        constructor () {
            this.historyArray = [];
        }
        add (historyObject) {
            let obj = this.filter(historyObject);
            if(!(!!obj)) {
                this.historyArray.push(historyObject);
                return true;
            }
            return false;
        }
        remove(historyObject) {
            this.historyArray.forEach(function (item, index, array) {
                if(historyObject.toIdString() === item.toIdString()) {
                    this.historyArray.splice(index, 1);
                    return;
                }
            });
        }
        filter(historyObject) {
            let obj = null;
            this.historyArray.forEach(function (item, index, array) {
                if(historyObject.toIdString() === item.toIdString()) {
                    obj = item;
                    return;
                }
            });
            return obj;
        }
    };


    let wh = window.history;
    let mcarray = new MockingBirdHistoryArray();

    function add(stateObj = {}, pageName = "", pageUrl = "") {
        if(mcarray.add(new MockingBirdHistory(stateObj, pageName, pageUrl))) {
            wh.pushState(stateObj, pageName, pageUrl);
        }
    };

    function remove() {

    };

    return {
        add: add,
        remove: remove
    };

})();

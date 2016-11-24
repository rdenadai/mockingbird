import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import reducers from './reducers';
import { fetchMessages } from './actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
store.dispatch(fetchMessages());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
, document.querySelector('#content'));

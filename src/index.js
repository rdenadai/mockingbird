
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import { persistentStore } from 'redux-pouchdb';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { db, compose } from './utils';
import routes from './routes';
import reducers from './reducers';
import { fetchMessages, fetchConfiguration } from './actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const createStoreWithMiddleware = compose(
    applyMiddleware(promise, thunk),
    persistentStore(db)
)(createStore);
const store = createStoreWithMiddleware(reducers);
store.dispatch(fetchConfiguration());
store.dispatch(fetchMessages());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
, document.querySelector('#content'));

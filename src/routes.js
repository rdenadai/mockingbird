import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './components/landing_page';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
    </Route>
);

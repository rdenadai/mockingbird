import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './containers/landing_page';
import AddPodcast from './containers/add_podcast';
import ShowPodcast from './containers/show_podcast';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/app/add" component={AddPodcast} />
        <Route path="/app/show/:id" component={ShowPodcast} />
    </Route>
);

import React, { FunctionComponent } from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import { TopBar } from './components/app/TopBar';
import { About } from './views/About';
import { Combat } from './views/Combat';
import { Home } from './views/Home';

import './App.scss';

export const App: FunctionComponent = () => (
    <HashRouter>
        <TopBar />
        <Switch>
            <Route exact
                path='/'
                component={Home}
            />
            <Route exact
                path='/about'
                component={About}
            />
            <Route exact
                path='/combat'
                component={Combat}
            />
        </Switch>
    </HashRouter>
);

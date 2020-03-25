import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../root/auth';

// pages
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={Auth(LandingPage, null)}></Route>
                <Route
                    exact
                    path='/login'
                    component={Auth(LoginPage, false)}></Route>
                <Route
                    exact
                    path='/signup'
                    component={Auth(SignupPage, false)}></Route>
            </Switch>
        </Suspense>
    );
};

export default App;

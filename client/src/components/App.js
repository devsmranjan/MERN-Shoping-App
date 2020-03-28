import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Auth from '../root/auth';

// pages
import NavBar from './views/NavBar';
import LandingPage from './views/LandingPage';
import SignupPage from './views/SignupPage';
import LoginPage from './views/LoginPage';

// Theme
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3498db'
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00'
        },
        type: 'light'
    },
    typography: {
        fontFamily: ['Poppins', 'Special Elite'].join(',')
    }
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback={<div>Loading...</div>}>
                <NavBar />
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
        </ThemeProvider>
    );
};

export default App;

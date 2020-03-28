import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';

const AuthButtons = props => {
    const { pathname } = props.location;
    const [authButton, setAuthButton] = useState(<div></div>);

    useEffect(() => {
        switch (pathname) {
            case '/login':
                setAuthButton(<SignupButton />);
                break;
            case '/signup':
                setAuthButton(<LoginButton />);
                break;

            default:
                setAuthButton(
                    <div>
                        <LoginButton />
                        <SignupButton />
                    </div>
                );
                break;
        }
    }, [pathname]);

    return <div>{authButton}</div>;
};

export default withRouter(AuthButtons);

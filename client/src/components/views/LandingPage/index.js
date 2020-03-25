import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../_actions/user/user_actions';

const LandingPage = props => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            const response = dispatch(logoutUser());
            console.log(response.payload.message);
            user.userData.success = false
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    let buttons;
    if (user.userData && !user.userData.success) {
        // if (user.userData && !user.userData.user)
        buttons = (
            <div>
                <a href='/login'>Log In</a>
                <div></div>
                <a href='/signup'>Sign Up</a>
            </div>
        );
    } else {
        buttons = <button onClick={handleLogout}>Logout</button>;
    }

    // console.log(user);

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Landing Page</h1>
                {buttons}
            </div>
        </div>
    );
};

export default withRouter(LandingPage);

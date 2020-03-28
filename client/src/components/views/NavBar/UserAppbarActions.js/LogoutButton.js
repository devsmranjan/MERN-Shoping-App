import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../../_actions/user/user_actions';

const LogoutButton = props => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch(); 

    const handleLogout = () => {
        try {
            const response = dispatch(logoutUser());
            console.log(response.payload.message);
            user.userData.success = false;
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button color='inherit' onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default withRouter(LogoutButton);

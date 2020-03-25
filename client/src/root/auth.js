import React, { useEffect } from 'react';
import { authUserData } from '../_actions/user/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function(ComposedClass, reload, adminRoute = null) {
    const CheckAuthentication = props => {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(authUserData()).then(response => {
                if (!response.payload.user) {
                    if (reload) {
                        props.history.push('/login');
                    }
                } else {
                    if (adminRoute && !response.payload.user) {
                        props.history.push('/');
                    } else {
                        if (reload === false) {
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);

        return <ComposedClass {...props} user={user} />;
    };

    return CheckAuthentication;
}

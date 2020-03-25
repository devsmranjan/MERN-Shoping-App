import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    loginUser,
    resendVerificationLink
} from '../../../_actions/user/user_actions';

const LoginPage = props => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        resendVerficationLinkButton,
        setResendVerficationLinkButton
    ] = useState(<div></div>);

    const handleChangeEmail = value => {
        setEmail(value);
    };

    const handleChangePassword = value => {
        setPassword(value);
    };

    const handleResendLink = e => {
        e.preventDefault();
        const dataToSubmit = {
            email
        };

        dispatch(resendVerificationLink(dataToSubmit))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/');
                }
                alert(response.payload.message);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const onSubmit = e => {
        e.preventDefault();

        const dataToSubmit = {
            email,
            password
        };

        dispatch(loginUser(dataToSubmit))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/');
                } else {
                    setResendVerficationLinkButton(
                        <div>
                            <button onClick={e => handleResendLink(e)}>
                                Resend
                            </button>
                        </div>
                    );

                    alert(response.payload.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <div>
                <div>
                    <h1>Login Page</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <input
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={e => handleChangeEmail(e.target.value)}
                            required
                        />
                        <input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={e => handleChangePassword(e.target.value)}
                            required
                        />
                        <button type='submit'>Login</button>
                        {resendVerficationLinkButton}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LoginPage);

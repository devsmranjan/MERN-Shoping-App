import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signUpUser } from '../../../_actions/user/user_actions';

const SignupPage = props => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleChangeEmail = value => {
        setEmail(value);
    };

    const handleChangePassword = value => {
        setPassword(value);
    };

    const handleChangeUsername = value => {
        setUsername(value);
    };

    const handleChangeName = value => {
        setName(value);
    };

    const onSubmit = e => {
        e.preventDefault();

        const dataToSubmit = {
            email,
            username,
            password,
            name
        };

        dispatch(signUpUser(dataToSubmit))
            .then(response => {
                // if (response.payload.user.isVerified) {
                //     props.history.push('/');
                // } else {
                
                if (response.payload.success) {
                    props.history.push('/');
                }
                alert(response.payload.message);
                // }
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
                    <h1>Signup Page</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <input
                            type='email'
                            placeholder='email'
                            value={email}
                            name='email'
                            onChange={e => handleChangeEmail(e.target.value)}
                            required
                        />
                        <input
                            type='text'
                            placeholder='username'
                            value={username}
                            name='username'
                            onChange={e => handleChangeUsername(e.target.value)}
                            required
                        />
                        <input
                            type='password'
                            placeholder='password'
                            value={password}
                            name='password'
                            onChange={e => handleChangePassword(e.target.value)}
                            required
                        />
                        <input
                            type='text'
                            placeholder='full name'
                            value={name}
                            name='name'
                            onChange={e => handleChangeName(e.target.value)}
                            required
                        />
                        <button type='submit'>Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignupPage);

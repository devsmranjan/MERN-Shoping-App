import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    loginUser,
    resendVerificationLink
} from '../../../_actions/user/user_actions';
import {
    Container,
    TextField,
    Box,
    Grid,
    Paper,
    Typography,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: 'center',
        margin: theme.spacing(2)
        // color: theme.palette.text.secondary
    },
    button: {
        letterSpacing: '2px'
    }
}));

const LoginPage = props => {
    const classes = useStyles();
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
        <Grid
            container
            className={classes.root}
            justify='center'
            alignItems='center'
            style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                    <form
                        noValidate
                        autoComplete='off'
                        onSubmit={e => onSubmit(e)}>
                        <Typography
                            component='h1'
                            variant='h5'
                            style={{ fontWeight: 'bold' }}>
                            Welcome Back!
                        </Typography>
                        <Box height='24px' />
                        <div>
                            <TextField
                                type='email'
                                label='Your Email'
                                placeholder='example@email.com'
                                fullWidth='true'
                                variant='outlined'
                                value={email}
                                onChange={e =>
                                    handleChangeEmail(e.target.value)
                                }
                                required
                            />
                        </div>
                        <Box height='14px' />
                        <div>
                            <TextField
                                type='password'
                                label='Password'
                                placeholder='******'
                                fullWidth='true'
                                variant='outlined'
                                value={password}
                                onChange={e =>
                                    handleChangePassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <Box height='18px' />
                        <Button
                            type='submit'
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            disableElevation>
                            Login
                        </Button>
                    </form>
                    {
                        // resendVerficationLinkButton
                    }
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withRouter(LoginPage);

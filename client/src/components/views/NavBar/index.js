import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthButtons from './AuthButtons';
import UserAppbarActions from './UserAppbarActions.js/index.js';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const NavBar = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user);

    let actionButtons;
    if (user.userData && !user.userData.success) {
        actionButtons = <AuthButtons />;
    } else {
        actionButtons = <UserAppbarActions />;
    }

    return (
        <div className={classes.root}>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        <Link href='/' color='inherit' underline='none'>
                            React Shop
                        </Link>
                    </Typography>
                    {actionButtons}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;

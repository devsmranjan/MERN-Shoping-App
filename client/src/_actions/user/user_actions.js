import axios from 'axios';

import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER,
    LOGOUT_USER,
    RESEND_VERIFICATION_LINK
} from './types';
import { USER_AUTH, USER_DATA } from '../../config';

import Cookies from 'js-cookie';

export const signUpUser = async dataToSubmit => {
    try {
        const response = await axios.post(`${USER_AUTH}/signup`, dataToSubmit);

        return {
            type: SIGNUP_USER,
            payload: response.data
        };
    } catch (error) {
        return {
            type: SIGNUP_USER,
            payload: error.response.data
        };
    }
};

export const loginUser = async dataToSubmit => {
    try {
        const response = await axios.post(`${USER_AUTH}/login`, dataToSubmit);

        Cookies.set('token', response.data.token);

        return {
            type: LOGIN_USER,
            payload: response.data
        };
    } catch (error) {
        return {
            type: LOGIN_USER,
            payload: error.response.data
        };
    }
};

export const resendVerificationLink = async dataToSubmit => {
    try {
        const response = await axios.post(`${USER_AUTH}/resend`, dataToSubmit);


        return {
            type: RESEND_VERIFICATION_LINK,
            payload: response.data
        };
    } catch (error) {
        return {
            type: RESEND_VERIFICATION_LINK,
            payload: error.response.data
        };
    }
};

export const authUserData = async () => {
    try {
        const response = await axios.get(`${USER_DATA}`, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
            }
        });

        return {
            type: AUTH_USER,
            payload: response.data
        };
    } catch (error) {
        return {
            type: AUTH_USER,
            payload: error.response.data
        };
    }
};

export const logoutUser = () => {
    Cookies.remove('token');

    return {
        type: LOGOUT_USER,
        payload: {
            message: 'User logged out!'
        }
    };
};

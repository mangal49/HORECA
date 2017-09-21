import axios from 'axios';
import {
    AUTH_USER_ROLE, AUTH_USER, UNAUTH_USER, AUTH_ERROR,
    FETCH_USER_DATA,SELECT_CUSTOMER, CLEAR_DEFAULT_CUSTOMER,
} from './types';
import { browserHistory } from 'react-router';
import { API_URL } from '../config'
import { statusLoading, statusLoaded } from './Common';

axios.defaults.baseURL = API_URL;

//const API_URL = 'http://localhost:90/testJWT/public/api';

export function signinUser({ username, password }) {
    return (dispatch) => {
        // Submit username and password to server
        // dispatch({ type: AUTH_USER });
        // browserHistory.push('/catalog');
        axios.post(`/auth/signin`, { username, password })
            .then(res => {
                // If request is good
                // - Update state to indicate user in authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('token', res.data.token);
                // - Redirect to the route '/feature'
                browserHistory.push('/catalog');
            }).catch(function (err) {
                // If request is bad
                // - Show an error to the user
                //console.log(err.response.data);
                dispatch(authError(err.response.data));
            });
    }
};

export const fetchUserData = () => {
    return function (dispatch) {
        axios.post(
            `/getUserData`,
            {},
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            dispatch(signoutUser());
        });
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function selectCustomer(cust){
    return {
        type:SELECT_CUSTOMER,
        payload:cust,
    }
}

export function clearDefaultCustomer(){
    return {
        type:CLEAR_DEFAULT_CUSTOMER,
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const setRole = (role) => {
    return {
        type: AUTH_USER_ROLE,
        payload: role
    }
}
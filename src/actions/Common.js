import axios from 'axios';
import { STATUS_LOADING, STATUS_LOADED } from './types';
import { browserHistory } from 'react-router';
import { API_URL } from '../config'

export function statusLoading() {
    return {
        type: STATUS_LOADING,
    };
};
export function statusLoaded() {
    return {
        type: STATUS_LOADED,
    };
};
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_ROLE, } from '../actions/types';

const INITIAL = { role: 'SHOP', authenticated: true };

export default (state = INITIAL, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };

        case AUTH_USER_ROLE:
            return { ...state, role: action.payload };
            break;
        default:
            return state;
            break;
    }
}

import { AUTH_USER, AUTH_USER_ROLE } from '../actions/types';

const INITIAL = { role: '' };

export default (state = INITIAL, action) => {
    switch (action.type) {
        case AUTH_USER_ROLE:
            return { ...state, role: action.payload };
            break;
        default:
            return state;
            break;
    }
}

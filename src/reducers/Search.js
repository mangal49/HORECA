import { SEARCH_DATA, SEARCH_FAVORITE } from '../actions/types';

const INITIAL = { text: '', favorite: true };

export default (state = INITIAL, action) => {
    switch (action.type) {
        case SEARCH_DATA:
            return { ...state, text: action.payload };
            break;
        case SEARCH_FAVORITE:
            return { ...state, favorite: action.payload };
            break;
        default:
            return state;
            break;
    }
}

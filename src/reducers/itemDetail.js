import { FIND_ITEM_DETAIL } from '../actions/types';

//const INITIAL = { text: '', favorite: true, findItem: '' };

const INITIAL = { findItem: '' };


export default (state = INITIAL, action) => {
    switch (action.type) {
        case FIND_ITEM_DETAIL:
            return { ...state, findItem: action.payload };
        default:
            return state;
    }
}

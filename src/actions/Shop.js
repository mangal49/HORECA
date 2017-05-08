import { UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER, ADD_TO_INVOICE } from './types';

export const updateShowOrder = (order) => {
    return {
        type: UPDATE_SHOW_ORDER,
        payload: order
    };
}

export const changeFavorite = (id) => {
    return {
        type: CHANGE_FAVORITE_ORDER,
        payload: id
    };
}

export const addToInvoice = (order) => {
    return {
        type: ADD_TO_INVOICE,
        payload: order
    }
};

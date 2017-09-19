import {
    UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER,
    ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FIND_ITEM_DETAIL, FETCH_SKU,
} from '../actions/types';
import { shopData as initialState } from './store/Shop';

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SKU:
            return { ...state, allSKU: action.payload };
        // case UPDATE_SHOW_ORDER:
        //     return { ...state, showTileData: action.payload };
        case CHANGE_FAVORITE_ORDER:
            let orderUpdate = state.allSKU.find((rs) => { return rs.id == action.payload });
            orderUpdate.favorite = !orderUpdate.favorite;
            let indexDelete = state.allSKU.findIndex((rs) => { return rs.id == action.payload });
            let allSKU = [
                ...state.allSKU.slice(0, indexDelete),
                ...state.allSKU.slice(indexDelete + 1),
                orderUpdate
            ];
            allSKU = allSKU.sort(function (a, b) {
                return a.id - b.id;
            });
            return { ...state, };
        case ADD_TO_ORDER:
            let order = action.payload;
            order.amount = 1;
            let index = state.invoiceOrder.findIndex((rs) => { return rs.id == order.id });
            if (index == -1) {
                return {
                    ...state,
                    invoiceOrder: [...state.invoiceOrder, order]
                }
            } else {
                return {
                    ...state,
                    invoiceOrder: [
                        ...state.invoiceOrder.slice(0, index),
                        ...state.invoiceOrder.slice(index + 1)
                    ]
                }
            }
        case SELECT_ORDER:
            return { ...state, orderObj: action.payload };
        case CLEAR_ORDER:
            return {
                ...state,
                invoiceOrder: []
            }

        default:
            return state;
    }
}

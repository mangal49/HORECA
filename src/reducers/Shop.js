import {
    UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER,
    ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FIND_ITEM_DETAIL, FETCH_SKU,
    SHOW_ORDER_BALANCE, NOT_SHOW_ORDER_BALANCE,
} from '../actions/types';
//import { shopData as initialState } from './store/Shop';

const initialState = {
    allOrder: [],
    allSKU: [],
    showCartBalance: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SKU:
            return { ...state, allSKU: action.payload };
        // case UPDATE_SHOW_ORDER:
        //     return { ...state, showTileData: action.payload };
        // case CHANGE_FAVORITE_ORDER:
        //     let orderUpdate = state.allSKU.find((rs) => { return rs.id == action.payload });
        //     orderUpdate.favorite = Number(!orderUpdate.favorite);
        //     let indexDelete = state.allSKU.findIndex((rs) => { return rs.id == action.payload });
        //     let allSKU = [
        //         ...state.allSKU.slice(0, indexDelete),
        //         ...state.allSKU.slice(indexDelete + 1),
        //         orderUpdate
        //     ];
        //     allSKU = allSKU.sort(function (a, b) {
        //         return a.id - b.id;
        //     });
        //     return { ...state, allSKU };
        case ADD_TO_ORDER:
            let order = action.payload;
            order.amount = 1;
            let index = state.allOrder.findIndex((rs) => { return rs.id == order.id });
            if (index == -1) {
                return {
                    ...state,
                    allOrder: [...state.allOrder, order]
                }
            } else {
                return {
                    ...state,
                    allOrder: [
                        ...state.allOrder.slice(0, index),
                        ...state.allOrder.slice(index + 1)
                    ]
                }
            }
        case SELECT_ORDER:
            return { ...state, orderObj: action.payload };
        case CLEAR_ORDER:
            return { ...state, allOrder: [] }
        case SHOW_ORDER_BALANCE:
            console.log(state);
            return { ...state, showCartBalance: true };
            console.log(state);
        case NOT_SHOW_ORDER_BALANCE:
            return { ...state, showCartBalance: false };
        default:
            return state;
    }
}

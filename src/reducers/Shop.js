import {
    UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER,
    ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FIND_ITEM_DETAIL, FETCH_SKU,
    SHOW_ORDER_BALANCE, NOT_SHOW_ORDER_BALANCE,
    SHOW_ITEM_DETAIL, SHOW_ORDER_MENU_TAB, UPDATE_ORDER
} from '../actions/types';
//import { shopData as initialState } from './store/Shop';

import {
    initialStateShop,
} from './store'

export default (state = initialStateShop, action) => {
    let index = null;
    let orderUpdate = null;
    switch (action.type) {
        case FETCH_SKU:
            return { ...state, allSKU: action.payload };
        // case UPDATE_SHOW_ORDER:
        //     return { ...state, showTileData: action.payload };
        case CHANGE_FAVORITE_ORDER:
            orderUpdate = state.allSKU.find((rs) => { return rs.id == action.payload });
            orderUpdate.favorite = Number(!Number(orderUpdate.favorite));
            let indexDelete = state.allSKU.findIndex((rs) => { return rs.id == action.payload });
            let allSKU = [
                ...state.allSKU.slice(0, indexDelete),
                ...state.allSKU.slice(indexDelete + 1),
                orderUpdate
            ];
            allSKU = allSKU.sort(function (a, b) {
                return a.id - b.id;
            });
            return { ...state, allSKU };
        case ADD_TO_ORDER:
            let sku = action.payload;
            sku.order_amount = 1;
            index = state.allOrder.findIndex((rs) => { return rs.id == sku.id });
            if (index == -1) {
                return {
                    ...state,
                    allOrder: [...state.allOrder, sku]
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

        case UPDATE_ORDER:
            index = state.allOrder.findIndex((rs) => { return rs.id == action.payload.sku.id });
            orderUpdate = state.allOrder.find((rs) => { return rs.id == action.payload.sku.id });
            if (action.payload.type == "UPDATE") {
                orderUpdate.order_amount = Number(orderUpdate.order_amount) + Number(action.payload.qty);
            } else if (action.payload.type == "REPLACE") {
                if (action.payload.qty == "") {
                    action.payload.qty = 1
                }
                orderUpdate.order_amount = Number(action.payload.qty);
            }
            let reGenOrder = [];
            for (let i = 0; i <= state.allOrder.length - 1; i++) {
                if (i == index && orderUpdate.order_amount > 0) reGenOrder.push(orderUpdate);
                else if (i != index) reGenOrder.push(state.allOrder[i]);
            }
            return { ...state, allOrder: reGenOrder };

        case SELECT_ORDER:
            return { ...state, orderObj: action.payload };
        case CLEAR_ORDER:
            return { ...state, allOrder: [] }
        case SHOW_ORDER_BALANCE:
            return { ...state, showCartBalance: true };
        case NOT_SHOW_ORDER_BALANCE:
            return { ...state, showCartBalance: false };
        case SHOW_ITEM_DETAIL:
            return { ...state, showItemDetail: action.payload }
        case SHOW_ORDER_MENU_TAB:
            return { ...state, showTab: action.payload }
        default:
            return state;
    }
}

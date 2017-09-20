import {
    UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER,
    ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FIND_ITEM_DETAIL, FETCH_SKU,
    SHOW_ORDER_BALANCE, NOT_SHOW_ORDER_BALANCE,
    SHOW_ITEM_DETAIL, SHOW_ORDER_MENU_TAB,
} from '../actions/types';
//import { shopData as initialState } from './store/Shop';

const initialState = {
    allOrder: [],
    allSKU: [],
    showCartBalance: 0,
    showItemDetail: {},
    showTab: {
        on: 1,
        value: 'CatalogList',
        transitionName: 'tabOne',
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SKU:
            return { ...state, allSKU: action.payload };
        // case UPDATE_SHOW_ORDER:
        //     return { ...state, showTileData: action.payload };
        case CHANGE_FAVORITE_ORDER:
            let orderUpdate = state.allSKU.find((rs) => { return rs.id == action.payload });
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
            let order = action.payload;
            order.order_amount = 1;
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

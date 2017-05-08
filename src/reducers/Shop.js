import { UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER, ADD_TO_INVOICE } from '../actions/types';
import { shopData as initialState } from './store/Shop';

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SHOW_ORDER:
            return { ...state, showTileData: action.payload };
        case CHANGE_FAVORITE_ORDER:
            let orderUpdate = state.tilesData.find((rs) => { return rs.id == action.payload });
            orderUpdate.favorite = !orderUpdate.favorite;
            let indexDelete = state.tilesData.findIndex((rs) => { return rs.id == action.payload });
            let tilesData = [
                ...state.tilesData.slice(0, indexDelete),
                ...state.tilesData.slice(indexDelete + 1),
                orderUpdate
            ];
            tilesData = tilesData.sort(function (a, b) {
                return a.id - b.id;
            });
            return {
                ...state,
                tilesData
            };
        case ADD_TO_INVOICE:
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
        default:
            return state;
    }
}

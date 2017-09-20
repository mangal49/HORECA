import {
    UPDATE_SHOW_ORDER, CHANGE_FAVORITE_ORDER,
    ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FETCH_SKU, SHOW_ORDER_BALANCE, NOT_SHOW_ORDER_BALANCE,
    SHOW_ITEM_DETAIL, SHOW_ORDER_MENU_TAB, UPDATE_ORDER,
} from './types';
import { API_URL } from '../config'
import axios from 'axios';
import { signoutUser } from './Auth';
import { statusLoading, statusLoaded } from './Common';

axios.defaults.baseURL = API_URL;
//axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
//axios.defaults.headers.common['Content-Type'] = "application/json";
//axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const headers = { 'Authorization': "Bearer " + localStorage.getItem('token') };

export const fetchSKU = () => {
    //แบบ redux- thunk
    return function (dispatch) {
        // ส่งแบบ get จะต้องแนบ Token ตามด้านล่าง
        // axios.get(`${API_URL}/getSKU_0`, {
        //     // params: {
        //     //     token: localStorage.getItem('token')
        //     // }
        // });
        dispatch(statusLoading());
        axios.post(`/getSKU`, {}, { headers }).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: FETCH_SKU, payload: res.data.allSKU });
            dispatch(statusLoaded());
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            dispatch(signoutUser());
        });
    }
}

// export const updateShowOrder = (order) => {
//     return {
//         type: UPDATE_SHOW_ORDER,
//         payload: order
//     };
// };

export const changeFavorite = (id, sku_code, favorite) => {
    return function (dispatch) {
        dispatch({
            type: CHANGE_FAVORITE_ORDER,
            payload: id
        });
        axios.post(`/changeFavorite`,
            { sku_code, favorite: Number(!Number(favorite)) },
            { headers }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
        }).catch(function (err) {
            alert(err.response.data);
            dispatch(signoutUser());
        });
    }
};

export const showMenuTabCatalog = () => {
    return {
        type: SHOW_ORDER_MENU_TAB,
        payload: {
            on: 1,
            value: 'CatalogList',
            transitionName: 'tabOne',
        },
    }
}

export const showMenuTabFavorite = () => {
    return {
        type: SHOW_ORDER_MENU_TAB,
        payload: {
            on: 2,
            value: 'FavoriteList',
            transitionName: 'tabOne',
        },
    }
}

export const showItemDetail = (sku) => {
    return {
        type: SHOW_ITEM_DETAIL,
        payload: sku,
    };
};

export const addToOrder = (sku) => {
    return {
        type: ADD_TO_ORDER,
        payload: sku
    };
};

export const updateOrder = (sku, type, qty) => {
    return {
        type: UPDATE_ORDER,
        payload: {
            sku, type, qty
        }
    }
}

export const selectOrder = (order) => {
    return {
        type: SELECT_ORDER,
        payload: order
    };
};

export const showCartBalance = () => {
    return {
        type: SHOW_ORDER_BALANCE,
    };
};

export const notShowCartBalance = () => {
    return {
        type: NOT_SHOW_ORDER_BALANCE,
    };
};

export const clearOrder = () => {
    return {
        type: CLEAR_ORDER,
    };
};



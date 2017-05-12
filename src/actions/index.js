import { NAV_LEFT_MENU_RENDER, AUTH_USER_ROLE, NAV_LEFT_MENU_SIZE } from './types';
import { updateSearchText, updateSearchFavorite } from './Search';
import { updateShowOrder, changeFavorite, addToInvoice } from './Shop';
import { UpdateFindItem } from './itemDetail';

export const renderNavLeftMenu = (docked, open) => {
    return {
        type: NAV_LEFT_MENU_RENDER,
        payload: { open, docked }
    };
}

export const renderNavLeftMenuSize = (width, height) => {
    return {
        type: NAV_LEFT_MENU_SIZE,
        payload: { width, height }
    };
}

export const setRole = (role) => {
    return {
        type: AUTH_USER_ROLE,
        payload: role
    }
}

exports.updateSearchText = updateSearchText;
exports.updateSearchFavorite = updateSearchFavorite;
exports.UpdateFindItem = UpdateFindItem;

exports.updateShowOrder = updateShowOrder;
exports.changeFavorite = changeFavorite;
exports.addToInvoice = addToInvoice;
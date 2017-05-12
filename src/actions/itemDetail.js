import { FIND_ITEM_DETAIL } from './types';

export const UpdateFindItem = (findItem) => {
    return {
        type: FIND_ITEM_DETAIL,
        payload: findItem
    };
}

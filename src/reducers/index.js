import { combineReducers } from 'redux';
import navLeftMenuReducer from './NavLeftMenu';
import authReducer from './Auth';
import searchReducer from './Search';
import shopReducer from './Shop';
import itemDetail from './itemDetail';

const rootReducer = combineReducers({
  navLeftMenu: navLeftMenuReducer,
  auth: authReducer,
  search: searchReducer,
  shop: shopReducer,
  itemDetail: itemDetail

});

export default rootReducer;

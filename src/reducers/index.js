import { combineReducers } from 'redux';
import navLeftMenuReducer from './NavLeftMenu';
import authReducer from './Auth';
import searchReducer from './Search';
import shopReducer from './Shop';

const rootReducer = combineReducers({
  navLeftMenu: navLeftMenuReducer,
  auth: authReducer,
  search: searchReducer,
  shop: shopReducer,
});

export default rootReducer;

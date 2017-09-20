import { combineReducers } from 'redux';
import navLeftMenuReducer from './NavLeftMenu';
import authReducer from './Auth';
import searchReducer from './Search';
import shopReducer from './Shop';
import commonReducer from './Common';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  navLeftMenu: navLeftMenuReducer,
  form: formReducer,     // <---- Mounted at 'form'
  search: searchReducer,
  shop: shopReducer,
  common: commonReducer,
});

export default rootReducer;

import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(
    reduxThunk,
)(createStore);

export const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

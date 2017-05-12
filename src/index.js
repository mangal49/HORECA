import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';

import Shop from './components/shop'
import Order from './components/shop/Order'
import Receive from './components/shop/Receive'
import ItemDetail from './components/shop/ItemDetail'
import OldOrder from './components/shop/OldOrder'

import Sale from './components/sale'
import AcceptOrder from './components/sale/AcceptOrder';


// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';


import reducers from './reducers';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {/*<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>*/}
    <MuiThemeProvider >
      <Router history={browserHistory}>
        <Route path='/'>

          <Route path='shop' component={App}>
            <IndexRoute component={Order} />
            <Route path='order' component={Order} />
            <Route path='receive' component={Receive} />
            <Route path='oldorder' component={OldOrder} />
            <Route path='itemdetail/:id' component={ItemDetail} />
          </Route>
          <Route path='sale' component={App}>
            <IndexRoute component={AcceptOrder} />
            <Route path='acceptorder' component={AcceptOrder} />
          </Route>

        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));

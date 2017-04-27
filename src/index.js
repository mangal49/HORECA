import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Menu from './components/menu';
import Shop from './components/shop'
import Sale from './components/sale'
import Contact from './components/contact'


import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route >
          <Route path='/menu' component={Menu} />
          <Route path='/Shop' component={Shop} />
          <Route path='/Sale' component={Sale} />
          <Route path='/Contact' component={Contact} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));

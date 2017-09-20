import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
// Auth
import CheckAuth from './components/auth/CheckAuth'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
// App
import App from './components/app';
import Catalog from './components/shop/Catalog'
import OrderHistory from './components/shop/OrderHistory'
import ItemDetail from './components/shop/ItemDetail'

export default (
    <Router>
        <Route path='/signin' component={SignIn} exact />
        <Route path='/signout' component={SignOut} exact />
        {/* <Route path='/chooseCustomer' component={Signin} exact /> */}
        <Route path='/' component={CheckAuth(App)} exact>
            <IndexRoute component={CheckAuth(Catalog)} />
            <Route path='/catalog' component={CheckAuth(Catalog)} exact />
            <Route path='/orderHistory' component={CheckAuth(OrderHistory)} exact />
            <Route path='/itemDetail' component={CheckAuth(ItemDetail)} exact />
        </Route>
    </Router>
);
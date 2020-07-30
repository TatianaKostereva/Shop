import React from 'react';
import ReactDOM from 'react-dom';
import loadProduct from '@/services/loadProduct';
import CartPage from '@/page/CartPage';
import DBProductsContext from '@/db/products';
import DBCart from '@/db/DBCart';
import MainPage from '@/page/MainPage';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DBCurrency from '@/db/DBCurrency';

loadProduct().then((productsData) => {
  ReactDOM.render(
    (
      <Router>
        <DBProductsContext.Provider value={productsData}>
          <DBCurrency>
            <DBCart>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/cart" component={CartPage} />
              </Switch>
            </DBCart>
          </DBCurrency>
        </DBProductsContext.Provider>
      </Router>
    ),
    document.querySelector('#root'),
  );
});

import React from 'react';
import ReactDOM from 'react-dom';
import loadProduct from '@/services/loadProduct';
import CartPage from '@/page/CartPage';
import DBProducts from '@/db/products';
import DBCart from '@/db/DBCart';
import MainPage from '@/page/MainPage';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// loadProduct().then((productsData) => {
  ReactDOM.render(
    (
      <Router>
        <DBProducts>
          <DBCart>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/cart" component={CartPage} />
            </Switch>
          </DBCart>
        </DBProducts>
      </Router>
    ),
    document.querySelector('#root'),
  );
// });
